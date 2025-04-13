import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HidentheNavAndmore } from "../redux/Slice/throuaboutHihdeSlice";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { showChat } from "../redux/Slice/SenderLoginScheSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { sendSmsMessage, getsingleData } from "../api/api_url";
const SenderChayBox = () => {
  const [sendSms, setsendSms] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [smsData, setSmsData] = useState([]);
  const endOfMessagesRef = useRef(null);

  const Handlesendsms = async () => {
    if (!sendSms) {
      toast("Fill Your message!");
      return;
    }

    try {
      const { data } = await axios.post(
        sendSmsMessage,
        { sms: sendSms },
        { withCredentials: true }
      );
      const { success, sms } = data;

      if (success) {
        setSmsData(sms);
        setsendSms("");
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send the message.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getsingleData, {
          withCredentials: true,
        });

        const { success, sms } = data;
        if (success) {
          setSmsData(sms);
          setsendSms("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch messages.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [smsData]);

  const HandleBack = () => {
    console.log(location);
    if (location?.pathname === "/chat" && location?.hash === "#chat") {
      navigate(-2);
    } else {
      navigate(-1);
    }

    dispatch(showChat(true));
    dispatch(HidentheNavAndmore(false));
  };

  useEffect(() => {
    document.title = "chat with me";
  }, []);

  return (
    <>
      <div className="h-full bg-gray-100 mt-0.25">
        <div
          className="bg-gray-200 h-9 fixed w-full 
        top-0 z-50 lg:h-12 md:h-12 flex items-center"
        >
          <div className="flex gap-2 items-center mx-3">
            <img
              src="/InShot_20250227_071440518.jpg"
              alt="Logo"
              className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2
               brightness-105 object-cover outline-1 outline-dotted outline-red-800"
            />
            <h2 className="font-serif text-sm md:text-lg text-green-400">
              Balwant
            </h2>
            <div
              onClick={HandleBack}
              className="absolute right-2 cursor-pointer bg-gray-100 px-2 rounded-tl-lg py-1"
            >
              <h1 className="text-[11px] select-none">↩ back</h1>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="md:mt-12 mx-10 flex flex-col gap-y-24 absolute top-16 ml-32">
            {smsData?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="md:w-72 py-3 flex justify-between rounded-tr-xl font-serif bg-green-200 text-gray-500 px-3 -ml-16">
                  <p className="break-all">{item}</p>
                  <p className="text-green-500">
                    <DoneAllIcon />
                  </p>
                </div>

                <a className="md:w-72 py-3 rounded-tr-xl text-sm font-serif text-gray-500 px-3 bg-gray-100 -ml-16">
                  <p>
                    Sorry for bothering you. Please contact me through my phone
                    📞 7307872065 or via ✉️ at balwant.programmer12@gmail.com
                  </p>
                </a>
              </React.Fragment>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        <div className="fixed bottom-0 w-full z-50">
          <div className="py-3 rounded-md w-full bg-gray-100 outline-none flex items-center">
            <input
              type="text"
              value={sendSms}
              onChange={(e) => setsendSms(e.target.value)}
              placeholder="Here Me!"
              className="w-full py-2 mx-4 bg-transparent outline-none"
            />
            <a
              onClick={Handlesendsms}
              href="#chat"
              className="text-green-500 cursor-pointer mx-4"
            >
              <SendIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SenderChayBox;
