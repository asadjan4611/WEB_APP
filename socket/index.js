const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server and welcome!");
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

//   define a message object

const creatMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  // when conect the socket

  console.log("a user is connected");
  // take  user id and socket id from user

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send an get message
  const messages = {}; // object to track the messages

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = creatMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    //store the message in the messages object

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push[message];
    }
    // send the message to reciever

    io.to(user?.socketId).emit("getMessage", message);
    console.log("everything is okay in send message")
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    //update the seen flag fro the message
    if (messages(senderId)) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to sender

        io.to(user.socketId).emit("messageSent", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  // uppdate and get the last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
    console.log("everything is okay at updatelast message")
  });

  //  when the user or socket is disconncted

  socket.on("disconnect", () => {
    console.log("User is disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT || 4000}`);
});
