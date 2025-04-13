import axios from "axios";
import { skillallapi } from "./api_url";

export const skillfetch = async () => {
  try {
    const { data } = await axios.get(skillallapi);
    return data;
  } catch (error) {
    console.log("error skill fetch");
  }
};
