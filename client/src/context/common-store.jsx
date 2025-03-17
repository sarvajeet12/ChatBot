import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
// 1. create
export const AppContext = createContext();

// 2. Provider
const ContextProvider = (props) => {
  // TODO: -------------------------------------- State -----------------------------------------------------
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("tokenChatBot"));

  // TODO: ------------------------------------ definition  -----------------------------
  const loginResponseData = (value) => {
    setUser(value);
  };

  // TODO: --------------------------- definition of storeTokenInLS -----------------------------------------
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("tokenChatBot", serverToken);

    // set token time
    localStorage.setItem("tokenChatBotTime", Date.now());
    return;
  };


  // TODO: ------------------------------------- user logout ---------------------------------------------
  const logoutUser = () => {
    setToken(null);
    // setUserDetails(null);
    localStorage.removeItem("tokenChatBot");
    localStorage.removeItem("tokenChatBotTime");
    toast.success("Logout Successfully", {
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
      position: "top-center",
      className: "custom-toast",
    });
    return;
  };

  // bundle
  const contextValue = {
    user,
    // userDetails,
    token,
    loginResponseData,
    // setUserDetails,

    setToken,
    logoutUser,
    storeTokenInLS,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
