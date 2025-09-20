import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url, Chat_Server_URl } from "../../serverRoute";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import socketID from "socket.io-client";

const ENDPOINT = `${Chat_Server_URl}`;
const socketId = socketID(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const scrollRef = useRef(null);

  // ✅ socket listener
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // ✅ auto update messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // ✅ load conversations
  useEffect(() => {
    if (!seller?._id) return;
    axios
      .get(`${backned_Url}/api/conversation/get-all-conversation-seller/${seller._id}`, { withCredentials: true })
      .then((res) => setConversations(res.data.conversations))
      .catch((err) => toast.error(err.response?.data?.message));
  }, [seller]);

  // ✅ add seller to socket
  useEffect(() => {
    if (seller?._id) {
      socketId.emit("addUser", seller._id);
      socketId.on("getUsers", (data) => setOnlineUsers(data));
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMember = chat.members.find((m) => m !== seller._id);
    return onlineUsers.some((u) => u.userId === chatMember);
  };

  // ✅ fetch messages for current chat
  useEffect(() => {
    if (!currentChat?._id) return;
    axios
      .get(`${backned_Url}/api/messages/get-all-messages/${currentChat._id}`)
      .then((res) => setMessages(res.data.messages))
      .catch(console.error);
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ send message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = { sender: seller._id, text: newMessage, conversationId: currentChat._id };
    const receiverId = currentChat.members.find((m) => m !== seller._id);

    socketId.emit("sendMessage", { senderId: seller._id, receiverId, text: newMessage });

    try {
      const res = await axios.post(`${backned_Url}/api/messages/create-new-message`, message);
      setMessages([...messages, res.data.message]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[90%] bg-white mt-15 h-[85vh] rounded shadow-md overflow-hidden">
      {!open ? (
        <>
          <h1 className="text-center text-2xl font-bold py-4 border-b">💬 Messages</h1>
          <div className="overflow-y-auto h-[calc(85vh-60px)]">
            {conversations.length > 0 ? (
              conversations.map((item, index) => (
                <MessageList
                  key={index}
                  data={item}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={seller._id}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500 text-lg">No Chats Yet</div>
            )}
          </div>
        </>
      ) : (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          scrollRef={scrollRef}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

// ✅ Sidebar message list
const MessageList = ({ data, setOpen, setCurrentChat, me, setUserData, online }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== me);
    axios.get(`${backned_Url}/api/user/user-info/${userId}`).then((res) => {
      setUser(res.data.user);
      setUserData(res.data.user);
    });
  }, [data, me, setUserData]);

  return (
    <div
      className="flex items-center p-4  cursor-pointer hover:bg-gray-100 transition"
      onClick={() => {
        setOpen(true);
        setCurrentChat(data);
        navigate(`/dashboard-messages?${data._id}`);
      }}
    >
      <div className="relative ">
        <img src={`${user?.avatar?.url}`} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>
      <div className="ml-3 flex-1">
        <h2 className="font-medium text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-500 truncate">{data?.lastMessage || "No messages yet..."}</p>
      </div>
    </div>
  );
};

// ✅ Chat screen
const SellerInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId, userData, scrollRef, activeStatus }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mt-5 p-4 bg-blue-600 text-white shadow">
        <div className="flex items-center">
          <img src={`${userData?.avatar?.url}`} className="w-10 h-10 rounded-full" alt="user" />
          <div className="ml-2">
            <h2 className="font-semibold">{userData?.name}</h2>
            <p className="text-xs">{activeStatus ? "Active now" : "Offline"}</p>
          </div>
        </div>
        <AiOutlineArrowRight size={22} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-3 ${msg.sender === sellerId ? "justify-end" : "justify-start"}`} ref={scrollRef}>
            {msg.sender !== sellerId && (
              <img src={`${userData?.avatar?.url}`} className="w-8 h-8 rounded-full mr-2" alt="avatar" />
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] shadow ${
                msg.sender === sellerId ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[11px] mt-1 opacity-70">{format(msg.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessageHandler} className="p-3 border-t flex items-center bg-white">
        <label htmlFor="file" className="cursor-pointer mr-3 text-gray-500">
          <TfiGallery size={22} />
        </label>
        <input type="file" id="file" className="hidden" />

        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full border rounded-full px-4 py-2 outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2.5 text-blue-600">
            <AiOutlineSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
