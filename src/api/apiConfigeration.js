import axios from "axios";
import { registerApi, userImageUpadate, userLogout } from "./api_url";
import { loginApi } from "./api_url";
export const register = async (formdata) => {
  try {
    const { data } = await axios.post(registerApi, formdata);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const loginFunc = async (formdata) => {
  try {
    const { data } = await axios.post(loginApi, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    const resposne = await axios.get(userLogout, {
      withCredentials: true,
    });
    return resposne.data;
  } catch (error) {
    return error.response;
  }
};

export const imageUpadate = async (formDataFileUpadate) => {
  try {
    const { data } = await axios.patch(userImageUpadate, formDataFileUpadate, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
