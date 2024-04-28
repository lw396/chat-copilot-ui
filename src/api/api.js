import axios from "utils/axios";

export const GroupContactList = async (nickname, offset) => {
  const response = await axios.get("/v1/group_contact_list", {
    params: { nickname: nickname, offset: offset },
  });
  return response;
};
