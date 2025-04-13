import axios from "axios";
import { aboutMeAPi } from "./api_url";

export const aboutMeData = async (req, res) => {
  try {
    const { data } = await axios.get(aboutMeAPi);
    return data;
  } catch (error) {
    console.log("error while fetching aboutData..");
  }
};
