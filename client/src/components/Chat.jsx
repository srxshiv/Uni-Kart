import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { base_url } from "../App";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("unikart-auth");

  const location = useLocation();
  const { buyerId, sellerId } = location.state;

  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  async function getMessages() {
    const response = await axios.get(
      `${base_url}/user/messages/${buyerId}_${sellerId}`,
      config
    );
    if (response.status === 200) {
      setMessages(response.data);
    } else {
      console.log("error occurred");
    }
  }

  useEffect(() => {
    getMessages();
    socketRef.current = io("http://localhost:3000");
    socketRef.current.emit("join-room", { buyerId, sellerId });
    socketRef.current.on("receive-message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [buyerId, sellerId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = () => {
    socketRef.current.emit("send-message", {
      senderId: buyerId,
      receiverId: sellerId,
      content: message,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: buyerId, receiverId: sellerId, content: message },
    ]);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">


      <div className="bg-[#FF9D23] text-white p-3 text-lg font-semibold shadow-sm sticky top-0 z-10">
        Chat
      </div>


      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide pb-16 pt-12">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === buyerId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg shadow-sm ${
                msg.senderId === buyerId
                  ? "bg-[#FF9D23] text-white"
                  : "bg-[#F93827] text-white"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <div className="flex items-center p-3 border-t border-gray-200 bg-white sticky bottom-0 z-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D23]"
        />
        <button
          onClick={handleSubmit}
          className="ml-3 bg-[#FF9D23] text-white px-4 py-2 text-sm rounded-lg hover:bg-[#F93827] focus:outline-none focus:ring-2 focus:ring-[#FF9D23]"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
