import { createContext, useContext, useEffect, useState } from "react";
import { apiConnector } from "../service/api-connector";
import { auth, chatConversation } from "../service/apis";
import { AppContext } from "./common-store";
import axios from "axios";
import { toast } from "react-toastify";
const GEMINI_API = import.meta.env.VITE_GEMINI_KEY;

// 1. create
export const ChatContext = createContext();

// 2. Provider
const ChatProvider = (props) => {
  const { token, setToken } = useContext(AppContext);
  const authorizationToken = `Bearer ${token}`;
  const [messages, setMessages] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null); // storing id of created chats

  // -------------------- time out ------------------------------

  setTimeout(() => {
    const storedTokenTime = localStorage.getItem("tokenChatBotTime");
    const currentTime = Date.now();

    if (currentTime - storedTokenTime >= 1800000) {
      setToken(null);
      // setUserDetails("");
      localStorage.removeItem("tokenChatBot");
      localStorage.removeItem("tokenChatBotTime");
    }
  });

  // --------------------------------------------- create chat -----------------------------------
  const [createChatLoading, setCreateChatLoading] = useState(false);

  const createChat = async () => {
    setCreateChatLoading(true);
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "POST",
        chatConversation.NEW_CHAT_API,
        null,
        headers
      );

      if (!response.data.success) {
        alert(response.data.message);
        setCreateChatLoading(false);
      } else {
        setCreateChatLoading(false);
        getAllChats();
        // console.log("create chat response : ", response);
        toast.success("New Chat Created Successfully", {
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          position: "top-center",
          className: "custom-toast",
        });
      }
    } catch (error) {
      // console.log("Error occur while create chat", error);
      setCreateChatLoading(false);
    }
  };

  // ----------------------------------------- get all created chats ----------------------------------
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);

  const getAllChats = async () => {
    setChatsLoading(true);
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "GET",
        chatConversation.GET_CHATS_API,
        null,
        headers
      );

      if (!response.data.success) {
        alert(response.data.message);
        setChatsLoading(false);
      } else {
        setChats(response.data.response);
        // console.log("fetch chats response : ", response);
        setChatsLoading(false);
      }
    } catch (error) {
      // console.log("Error occur while get all created chats", error);
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    getAllChats();
  }, [token]);

  // ----------------------------------------- add conversation -----------------------------------
  const [prompt, setPrompt] = useState("");
  const [addConversationLoading, setAddConversationLoading] = useState(false);

  const fetchResponse = async () => {
    setAddConversationLoading(true);

    if (prompt === "") return alert("Write prompt");
    setPrompt("");

    try {
      const response = await axios({
        url: GEMINI_API,
        method: "POST",
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      const message = {
        question: prompt,
        answer:
          response["data"]["candidates"][0]["content"]["parts"][0]["text"],
      };

      setMessages((prev) => [...prev, message]);

      setAddConversationLoading(false);

      // --------------- add conversation (purpose is adding in database) --------------------
      try {
        const headers = {
          Authorization: authorizationToken,
        };

        const resp = await apiConnector(
          "POST",
          `${chatConversation.ADD_CONVERSATION_API}/${selectedChat}`,
          {
            question: prompt,
            answer:
              response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          },
          headers
        );

        if (!resp.data.success) {
          alert(resp.data.message);
        } else {
          // console.log("while add conversation : ", resp.data.response);
        }
      } catch (error) {
        // console.log("error while add conversation: ", error);
        throw error;
      }
    } catch (error) {
      // console.log("error while fetching response from api : ", error);
      setAddConversationLoading(false);
      throw error;
    }
  };

  // ------------------------------------- get all conversation (selected chat) --------------------------------
  const [fetchMsgLoading, setFetchMsgLoading] = useState(false);

  async function fetchMessages() {
    setFetchMsgLoading(true);
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "GET",
        `${chatConversation.GET_CONVERSATION_API}/${selectedChat}`,
        selectedChat,
        headers
      );

      if (!response.data.success) {
        alert(response.data.message);
        setFetchMsgLoading(false);
      } else {
        setMessages(response.data.response);
        setFetchMsgLoading(false);
        getAllChats();
        // console.log("fetch messages response : ", response);
      }
    } catch (error) {
      // console.log("Error occur while fetch message : ", error);
      setFetchMsgLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  // --------------------------------------------- delete created chat ----------------------------
  async function deleteChat(id) {
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "DELETE",
        `${chatConversation.DELETE_CHAT_API}/${id}`,
        id,
        headers
      );

      if (!response.data.success) {
        alert(response.data.message);
      } else {
        // console.log("delete chat response : ", response);
        getAllChats();
        toast.success("Chat Deleted Successfully", {
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
          position: "top-center",
          className: "custom-toast",
        });
      }
    } catch (error) {
      // console.log("error while delete chat : ", error.response);
      throw error;
    }
  }

  const chatValue = {
    chats,
    createChatLoading,
    chatsLoading,
    selectedChat,
    fetchMsgLoading,
    messages,
    addConversationLoading,
    prompt,
    createChat,
    setSelectedChat,
    deleteChat,
    fetchResponse,
    setPrompt,
  };

  return (
    <ChatContext.Provider value={chatValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
