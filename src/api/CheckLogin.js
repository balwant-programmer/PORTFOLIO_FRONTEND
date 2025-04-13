import axios from "axios";
import { logicheck } from "./api_url";

export const logicheckFun = async () => {
  try {
    const { data } = await axios.post(
      logicheck,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
   return error?.response?.data;
  }
};
