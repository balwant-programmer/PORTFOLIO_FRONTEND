import axios from "axios";
import { useEffect, useState } from "react";
import { userApi } from "../api/api_url";
export const userTokencheck = (recivedAat) => {
  const [user, setUSer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(userApi, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        setUSer(response?.data);
        return;
      }
    };
   
      fetchData();
    
  }, []);
  return user;
};
