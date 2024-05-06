import axios from "utils/axios";

export const SearchGroupContact = async (nickname) => {
  return await axios.get("/v1/group_contact", {
    params: { nickname: nickname },
  });
};

export const AddGroupContact = async (user_name) => {
  return await axios.post("/v1/message_content", {
    data: { user_name: user_name },
  });
};

export const GroupContactList = async (nickname, offset) => {
  return await axios.get("/v1/group_contact_list", {
    params: { nickname: nickname, offset: offset },
  });
};

export const MessageContentList = async (user_name, offset) => {
  return await axios.get("/v1/message_content_list", {
    params: { user_name: user_name, offset: offset },
  });
};

export const DeleteMessageContent = async (user_name) => {
  return await axios.delete("/v1/group_contact", {
    data: { user_name: user_name },
  });
};
