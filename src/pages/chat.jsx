import React, { useState } from "react";
import { Page, Input, Button, Icon } from "zmp-ui";
import Chat from '../pages/chat';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào 👋! Mình có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Cảm ơn bạn đã nhắn! Mình sẽ phản hồi sớm nhé 💬" },
      ]);
    }, 800);

    setInput("");
  };

  return (
    <Page className="page bg-white flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md ${
                msg.from === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex items-center gap-2">
        <Input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-xl px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          size="small"
          className="rounded-full bg-blue-500 text-white p-2"
        >
          <Icon icon="zi-send" />
        </Button>
      </div>
    </Page>
  );
};

export default ChatPage;
