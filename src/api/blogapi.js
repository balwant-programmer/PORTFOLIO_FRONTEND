import axios from "axios";
import { allblogPostApi, blogLike } from "./api_url";
import { toast } from "react-toastify";
export const allblog = async () => {
  try {
    const response = await axios.get(allblogPostApi);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const bloglikeFun = async (id) => {
  try {
    const response = await axios.post(
      blogLike,
      { id: id },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    toast(error?.response.data);
    return error.response;
  }
};
