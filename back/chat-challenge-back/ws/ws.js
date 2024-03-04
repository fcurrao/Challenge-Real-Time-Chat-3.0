const { Server } = require("socket.io");
const { db } = require("../db/db");
const { generateResponse } = require("./dictionary");

const createNewChat = (uuid, socket) => {
  socket.join(uuid);
  const data = {
    sender: "System",
    receiver: uuid,
    message: `Bienvenido a HitGpt. En que puedo ayudarte?`,
    date: new Date().toISOString(),
  };

  db.run(
    "INSERT INTO chats (sender,receiver,message,date) VALUES ($sender,$receiver,$message,$date)",
    {
      $sender: data.sender,
      $receiver: data.receiver,
      $message: data.message,
      $date: data.date,
    },
    function (err, row) {
      if (err) {
        console.log(err);
      } else {
        socket.emit("new_message", { ...data, id: this.lastID });
      }
    }
  );
};

const saveMessage = ({ message, uuid }, socket) => {
  const receivedMessage = {
    sender: uuid,
    receiver: "System",
    message: message,
    date: new Date().toISOString(),
  };
  const sentMessage = {
    sender: "System",
    receiver: uuid,
    message: generateResponse(message),
    date: new Date().toISOString(),
  };
  db.run(
    "INSERT INTO chats (sender,receiver,message,date) VALUES ($sender,$receiver,$message,$date)",
    {
      $sender: receivedMessage.sender,
      $receiver: receivedMessage.receiver,
      $message: receivedMessage.message,
      $date: receivedMessage.date,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        socket.emit("new_message", { ...receivedMessage, id: this.lastID });
      }
    }
  );
  socket.emit("writing");
  db.run(
    "INSERT INTO chats (sender,receiver,message,date) VALUES ($sender,$receiver,$message,$date)",
    {
      $sender: sentMessage.sender,
      $receiver: sentMessage.receiver,
      $message: sentMessage.message,
      $date: sentMessage.date,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        setTimeout(() => {
          socket.emit("new_message", { ...sentMessage, id: this.lastID });
        }, 2000);
      }
    }
  );
};

createWsServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("initialize_chat", (uuid) => {
      createNewChat(uuid, socket);
    });

    socket.on("message_emitted", ({ message, uuid }) => {
      console.log("message_emitted", message, uuid);
      saveMessage({ message, uuid }, socket);
    });
  });
};

module.exports = { createWsServer };
