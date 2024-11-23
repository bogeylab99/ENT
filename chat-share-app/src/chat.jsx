import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch chat history
    socket.on("chat-history", (history) => setMessages(history));

    // Listen for new messages
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        user: user.displayName,
        text: input,
        timestamp: new Date(),
      };
      socket.emit("send-message", message);
      setInput("");
    }
  };

  return (
    <div className="chat">
      <h2>Chat with Friends</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
