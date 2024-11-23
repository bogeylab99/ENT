const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app's origin
    methods: ["GET", "POST"],
  },
});

let messages = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send existing messages to the client
  socket.emit("chat-history", messages);

  // Handle new messages
  socket.on("send-message", (data) => {
    messages.push(data);
    io.emit("receive-message", data); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
