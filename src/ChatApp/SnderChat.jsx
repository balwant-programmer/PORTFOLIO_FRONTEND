import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HidentheNavAndmore } from "../redux/Slice/throuaboutHihdeSlice";
import { loginSenderFun } from "../api/loginsender";
import { logicheckFun } from "../api/CheckLogin";
import { LoginSender, showChat } from "../redux/Slice/SenderLoginScheSlice";
const SnderChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bool: login } = useSelector((state) => state.senderReducers);
  const { chat } = useSelector((state) => state.senderReducers);

  const HandleChat = async () => {
    const response = await loginSenderFun();
    console.log(response);
    const { success } = response;
    if (success) {
      navigate("/chat");
      dispatch(showChat(false));
      dispatch(LoginSender(true));
      dispatch(HidentheNavAndmore(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await logicheckFun();
      if (!data) return;
      const { message, success } = data;
      if (!success) {
        dispatch(LoginSender(true));
        return;
      }
    };
    fetchData();
  }, [login]);

  const AlreadyLogin = () => {
    navigate("/chat");
    dispatch(HidentheNavAndmore(true));
    dispatch(LoginSender(false));
    dispatch(showChat(false));
  };

  return (
    <>
      {login ? (
        <>
          {chat && (
            <div
              onClick={HandleChat}
              className="fixed cursor-pointer select-none
               lg:bottom-16  bottom-24
       right-1  text-green-500
        px-1 py-2 
      rounded-tl-3xl shadow-xl flex 
      items-center gap-1 md:gap-2 hover:scale-110 hover:text-rose-400 transition-all duration-300 focus:scale-125"
             >
              <h2 className="text-[12px] py-1 px-2 flex  md:text-md font-serif">Chat with me</h2>
              <img
                src="/InShot_20250227_071440518.jpg"
                alt="Logo"
                className="h-4 w-4 md:h-6 md:w-6
                 rounded-full  border-1 brightness-105 
        object-cover outline-double outline-red-300"
              />
            </div>
          )}
        </>
      ) : (
        <>
          {chat && (
            <div
              onClick={AlreadyLogin}
              className="fixed cursor-pointer select-none
               lg:bottom-16  bottom-24
       right-1  text-green-500
        px-1 py-2 
      rounded-tl-3xl shadow-xl flex 
      items-center gap-1 md:gap-2 hover:text-rose-900 font-serif hover:scale-110 transition-all duration-300 focus:scale-125"
            >
              <h2 className="text-[11px] py-1 px-1 flex  md:text-md font-serif">Chat with me</h2>
              <img
                src="/InShot_20250227_071440518.jpg"
                alt="Logo"
                className="h-4 w-4 md:h-6 md:w-6
                 rounded-full  border-1 brightness-105 
        object-cover outline-double outline-red-300 "
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SnderChat;
