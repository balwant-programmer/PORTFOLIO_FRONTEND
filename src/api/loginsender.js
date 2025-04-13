import axios from "axios";
import { loginsendApi } from "./api_url";
import { v4 as uuidv4 } from "uuid";
export const loginSenderFun = async () => {
  try {
    const id = uuidv4();
    const { data } = await axios.post(
      `${loginsendApi}/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};
