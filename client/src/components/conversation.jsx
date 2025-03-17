import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/chat-store";
import { IoMdSend } from "react-icons/io";

const Conversation = () => {
  const {
    selectedChat,
    chats,
    fetchMsgLoading,
    messages,
    setPrompt,
    fetchResponse,
    addConversationLoading,
    prompt,
  } = useContext(ChatContext);

  const handlePromptInput = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  // automatically scroll down
  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="conversation">
      {chats && chats.length === 0 ? (
        <div className="conversationHeader">
          <h1 className="conversationNotChatYet">Hello, how can I help you?</h1>
          <p className="conversationNotChatYet" style={{ marginTop: "5rem" }}>Create new chat to continue</p>
        </div>
      ) : (
        <>
          {selectedChat === null ? (
            <p className="fetchMsgLoading">Select chat</p>
          ) : (
            <>
              {fetchMsgLoading ? (
                <h1 className="fetchMsgLoading">Loading...</h1>
              ) : (
                <div
                  className="conversationContentBox"
                  ref={messageContainerRef}
                >
                  {messages && messages.length > 0 ? (
                    messages.map((item, index) => {
                      return (
                        <div className="conversationContent" key={index}>
                          {/* question */}

                          <p>{item.question}</p>

                          {/* answer */}

                          <p
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          ></p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="conversationNotChatYet">
                      Not Conversation yet !
                    </p>
                  )}

                  {addConversationLoading && (
                    <h3 className="addConversationLoading">Loading...</h3>
                  )}
                </div>
              )}{" "}
            </>
          )}
        </>
      )}

      {/* ---------------------------- form -------------------- */}
      <>
        {selectedChat === null ? (
          <></>
        ) : (
          <>
            {chats && chats.length > 0 && (
              <div className="promptBox">
                <form onSubmit={(e) => handlePromptInput(e)}>
                  <input
                    type="text"
                    name="question"
                    required
                    placeholder="Enter prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button type="submit">
                    <IoMdSend />
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Conversation;
