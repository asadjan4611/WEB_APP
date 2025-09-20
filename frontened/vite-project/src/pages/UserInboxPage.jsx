import React from "react";
import Header from "../component/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import socketID from "socket.io-client";
import axios from "axios";
import { backned_Url, Chat_Server_URl } from "../serverRoute";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { conversationRequest } from "../assets/redux/actions/conversation";
const ENDPOINIT = `${Chat_Server_URl}`;
const socketId = socketID(ENDPOINIT, { transports: ["websocket"] });

const UserInboxPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const {   conversation  } = useSelector((state) => state.conversation);

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
    useEffect(() => {
   dispatch(conversationRequest(user));
   setConversations(conversation)
  }, [dispatch]);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };
  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${backned_Url}/api/messages/get-all-messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${backned_Url}/api/messages/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(
        `${backned_Url}/api/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        }
      )
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = () => {
    console.log("object");
  };
  return (
    <div className="w-full">
      {!open && (
        <>
          <Header />
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item} //item contain the members and converstion._id
                key={index}
                index={index}
                setOpen={setOpen} // for opeen  a specific chat
                setCurrentChat={setCurrentChat}
                me={user} //this is send beacuse if the last message is done by customer (user)
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                loading={loading}
                conversations={conversations}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  conversations
}) => {

  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const handleClick = () => {
    
    navigate(`/user-inbox?${conversations[index]._id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me._id);
    const getSeller = async () => {
      try {
        const res = await axios.get(
          `${backned_Url}/api/shop/seller-info/${userId}`
        );
        setUser(res.data.seller);
      } catch (error) {
        console.log(error);
      }
    };
    getSeller();
  }, [data.members, me]);
  return (
    <div
  className={`w-full flex p-3 px-3 ${
    active === index ? "bg-[#00000010]" : "bg-transparent"
  } cursor-pointer border-b`}
  onClick={() => {
    setActive(index);
    handleClick(data._id);
    setCurrentChat(data);
    setUserData(user);
    setActiveStatus(online);
  }}
>

      <div className="relative">
        <img
          //   src={`${user?.avatar?.url}`}
          src={`${user?.avatar?.url}`}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[rgb(158,148,148)] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  handleImageUpload,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  scrollRef,
  activeStatus,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-10 w-full flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={`${userData?.avatar?.url}`}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-lg font-semibold">{userData?.name}</h1>
            <p className="text-sm text-gray-500">
              {activeStatus ? "🟢 Active now" : "⚪ Offline"}
            </p>
          </div>
        </div>
        <AiOutlineArrowRight
          size={24}
          className="cursor-pointer text-gray-600 hover:text-black transition"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex items-end ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
              ref={scrollRef}
            >
              {/* Show avatar only for receiver */}
              {item.sender !== sellerId && (
                <img
                  src={`${userData?.avatar?.url}`}
                  alt="User avatar"
                  className="w-9 h-9 rounded-full object-cover mr-2"
                />
              )}

              <div className="flex flex-col max-w-[70%]">
                {item.images && (
                  <img
                    src={item.images?.url}
                    alt="sent"
                    className="w-56 h-56 object-cover rounded-xl shadow-md mb-2"
                  />
                )}

                {item.text && (
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm font-medium shadow ${
                      item.sender === sellerId
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }`}
                  >
                    {item.text}
                  </div>
                )}
                <span className="text-xs text-gray-400 mt-1">
                  {format(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Input Box */}
      <form
        className="sticky bottom-0 w-full flex items-center gap-3 p-3 bg-white border-t"
        onSubmit={sendMessageHandler}
      >
        {/* Upload Image */}
        <div>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image"
            className="cursor-pointer text-gray-500 hover:text-blue-500 transition"
          >
            <TfiGallery size={22} />
          </label>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            required
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full border rounded-full py-2 pl-4 pr-10 outline-none bg-gray-50 focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit">
            <AiOutlineSend
              size={20}
              className="absolute right-3 top-2.5 text-blue-500 hover:text-blue-700 cursor-pointer transition"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInboxPage;
