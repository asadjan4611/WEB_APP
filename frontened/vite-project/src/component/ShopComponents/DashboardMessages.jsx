import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url } from "../../serverRoute";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import styles from "../../style/style";
import socketID from "socket.io-client";
const ENDPOINIT = "http://localhost:4000";
const socketId = socketID(ENDPOINIT, { transports: ["websocket"] });
const DashboardMessages = () => {
  const dipatch = useDispatch();
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
  const [images, setImages] = useState();
  const scrollRef = useRef(null);

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
    const messageList = async () => {
      await axios
        .get(
          `${backned_Url}/api/conversation/get-all-conversation-seller/${seller._id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setConversations(res.data.conversations);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };

    messageList();
  }, [seller]);


useEffect(()=>{
   if(seller){
    const userId  = seller?._id;
    socketId.emit("addUser",userId);
    socketId.on("getUsers",(data)=>{
      setOnlineUsers(data);
    });

   }
},[seller]);


 const onlineCheck =(chat)=>{
   const chatMembers = chat.members.find((member)=>member !== useRef._id);
   const online = onlineUsers.find((user)=>user.userId === chatMembers);
   return online ? true:false;
 }
  //get messages
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


//create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
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
          .catch((err) => {
            console.log(err);
          });
      }
      // console.log("every thing is okay in send Messsage Hanlder function")
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    // console.log("Welcome  at  update last message in frontened")
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(
        `${backned_Url}/api/conversation/update-last-message/${currentChat._id}`,
        {
          lastMesssage: newMessage,
          lastMessageId: seller._id,
        }
      )
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
    const handleImageUpload = () => {
    console.log("object");
  };

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleImageUpload={handleImageUpload}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
         
          scrollRef={scrollRef}
          setMessages={setMessages}
            activeStatus={activeStatus}
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
  setActiveStatus
}) => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/dashboard-messages?${data._id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online)
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${backned_Url}/api/user/user-info/${userId}`
        );
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data]);
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } bg-transparent cursor-pointer border-b`}
      onClick={
        (e) => setActive(index) || handleClick(data._id) || setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          //   src={`${user?.avatar?.url}`}
          src= {`${backned_Url}/uploads/${userData?.avatar?.url}`}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
        <div className="w-[12px] h-[12px] bg-[rgb(158,148,148)] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c]">
           { data?.lastMessageId !== userData?._id
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
  setMessages,
activeStatus
}) => {
  return (
 <div className="flex flex-col h-screen"> {/* full height screen */}
  {/* header */}
  <div className="w-full flex p-3 items-center justify-between bg-slate-200 shadow">
    <div className="flex items-center">
      <img
        alt="asad jan"
        className="w-[50px] h-[50px] rounded-full object-cover"
        src={`${backned_Url}/uploads/${userData?.avatar?.url}`}
      />
      <div className="pl-3">
        <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
        <h2 className="text-sm text-gray-500">
          {activeStatus ? "Active now" : ""}
        </h2>
      </div>
    </div>
    <AiOutlineArrowRight
      size={22}
      className="cursor-pointer"
      onClick={() => setOpen(false)}
    />
  </div>

  {/* chat messages area */}
  <div className="flex-1 overflow-y-auto bg-slate-100 p-4">
    {messages &&
      messages.map((item, index) => (
        <div
          key={index}
          className={`flex w-full my-2 ${
            item.sender === sellerId ? "justify-end" : "justify-start"
          }`}
          ref={scrollRef}
        >
          {item.sender !== sellerId && (
            <img
              src={`${backned_Url}/uploads/${userData?.avatar?.url}`}
              className="w-[40px] object-cover h-[40px] rounded-full mr-3"
              alt="user avatar"
            />
          )}

          <div>
            {item.images && (
              <img
                src={item.images?.url}
                className="w-[250px] h-[250px] object-cover rounded-[10px] mb-2"
                alt="sent media"
              />
            )}

            {item.text && (
              <div
                className={`w-max p-2 rounded-lg ${
                  item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                } text-white max-w-[70%]`}
              >
                <p>{item.text}</p>
              </div>
            )}

            <p className="text-[12px] text-[#000000a0] mt-1">
              {format(item.createdAt)}
            </p>
          </div>
        </div>
      ))}
  </div>

  {/* input form fixed at bottom */}
  <form
    className="p-3 w-full flex items-center border-t bg-white"
    onSubmit={sendMessageHandler}
  >
    <div className="mr-3">
      <input
        type="file"
        id="image"
        className="hidden"
        onChange={handleImageUpload}
      />
      <label htmlFor="image">
        <TfiGallery className="cursor-pointer" size={22} />
      </label>
    </div>

    <div className="flex-1 mb-2 relative">
      <input
        type="text"
        required
        placeholder="Enter your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full border rounded-full py-2 pl-4 pr-10 outline-none"
      />
      <button type="submit">
        <AiOutlineSend
          size={20}
          className="absolute right-3 top-2.5 text-blue-500 cursor-pointer"
        />
      </button>
    </div>
  </form>
</div>

  );
};
export default DashboardMessages;
