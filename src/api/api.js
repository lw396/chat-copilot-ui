import axios from "utils/axios";

export const GroupContactList = async (nickname, offset) => {
  const response = await axios.get("/v1/group_contact_list", {
    params: { nickname: nickname, offset: offset },
  });
  return response;
};

export const MessageContentList = async (user_name, offset) => {
  const response = await axios.get("/v1/message_content_list", {
    params: { user_name: user_name, offset: offset },
  });
  return response;
};
