import React, { useContext } from "react";
import { ChatContext } from "../context/chat-store";
import { AppContext } from "../context/common-store";
import { RiDeleteBin6Fill } from "react-icons/ri";

const SideBar = ({ menu }) => {
  const {
    chats,
    selectedChat,
    createChat,
    createChatLoading,
    chatsLoading,
    setSelectedChat,
    deleteChat,
  } = useContext(ChatContext);
  const { logoutUser } = useContext(AppContext);

  const handleLogout = () => {
    logoutUser();
  };

  const handleCreatedChat = (id) => {
    setSelectedChat(id);
  };

  const handleDeleteChat = (id) => {
    deleteChat(id);
  };

  return (
    <div className={`sidebar ${menu ? "openSidebar" : "closeSidebar"}`}>
      <h1 style={{ color: "#fff" }}>ChatBot</h1>
      <button onClick={() => createChat()} className="newChatBtn">
        {createChatLoading ? "Loading..." : "New Chat+"}
      </button>
      <p>Recent Chat</p>
      {chats && chats.length === 0 ? (
        <p>Not chat yet!</p>
      ) : (
        <>
          {chatsLoading ? (
            <p className="chatLoading">Loading...</p>
          ) : (
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat._id}
                  onClick={() => handleCreatedChat(chat._id)}
                  style={{
                    color: `${selectedChat === chat._id ? "#fff" : "#000"}`,
                    fontWeight: "bold",
                  }}
                >
                  <span>
                    {chat.latestMessage.length < 21
                      ? chat.latestMessage
                      : chat.latestMessage.slice(0, 20) + "..."}
                  </span>
                  {/* <span>{chat.latestMessage.slice(0, 20)}...</span> */}
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteChat(chat._id);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <button onClick={() => handleLogout()} className="logoutBtn">
        Logout
      </button>
    </div>
  );
};

export default SideBar;
