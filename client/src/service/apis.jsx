const BASE_URL = "http://localhost:4000/api/v1";

export const auth = {
  SEND_OTP_API: BASE_URL + "/user/send-otp",
  LOGIN_API: BASE_URL + "/user/login",
  USER_DETAILS_API: BASE_URL + "/user/user-details",
};

export const chatConversation = {
  NEW_CHAT_API: BASE_URL + "/chat/new",
  GET_CHATS_API: BASE_URL + "/chat/get-chats",
  ADD_CONVERSATION_API: BASE_URL + "/chat/",
  GET_CONVERSATION_API: BASE_URL + "/chat/",
  DELETE_CHAT_API: BASE_URL + "/chat/",
};
