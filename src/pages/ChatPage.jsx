import React, { useState } from "react";
import "../css/chatPage.scss";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <UserList onSelectUser={setSelectedUser} />
      </div>
      <div className="chat-main">
        {selectedUser ? (
          <ChatBox user={selectedUser} />
        ) : (
          <div className="no-chat">
            <p>Chọn 1 người để bắt đầu trò chuyện 💬</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
