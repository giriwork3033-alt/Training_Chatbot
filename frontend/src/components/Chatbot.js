import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!msg) return;

    const userMsg = { sender: "You", text: msg };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: msg,
      });

      const botMsg = { sender: "Bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);

    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "Bot", text: "Error connecting to backend" },
      ]);
    }

    setMsg("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "320px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#3b82f6",
          color: "white",
          padding: "10px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        AI Chatbot
      </div>

      {/* Messages */}
      <div
        style={{
          height: "250px",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              textAlign: c.sender === "You" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                background:
                  c.sender === "You" ? "#3b82f6" : "#e5e7eb",
                color: c.sender === "You" ? "white" : "black",
              }}
            >
              {c.text}
            </span>
          </div>
        ))}

        {/* Auto scroll target */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
        }}
      >
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            outline: "none",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}