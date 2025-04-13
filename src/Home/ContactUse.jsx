import React, { useEffect, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import HomeFooter from "./HomeFooter";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { sendSmsGmailApi } from "../api/api_url";
import Spinner from "../Spinner";
const ContactUse = () => {
  const [userName, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [message, SetMessage] = useState("");
  const [loading, setLaoding] = useState(false);
  const HandleSubmitMessage = async () => {
    try {
      if (!userName.trim()) {
        toast("fill Your Name");
        return;
      }
      if (!userEmail.trim()) {
        toast("Fill Your Email");
        return;
      }
      const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailregex.test(userEmail)) {
        toast("Invalid Email");
        return;
      }

      if (!message.trim()) {
        toast("Fill Your Message");
        return;
      }
      setLaoding(true);
      const { data } = await axios.post(
        sendSmsGmailApi,
        { userEmail, userName, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data?.message);
        setLaoding(false);
        setEmail("");
        setUsername("");
        SetMessage("");
      }
    } catch (error) {
      console.log("error message gmail", error);
    } finally {
      setLaoding(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="min-h-screen  flex flex-col md:flex-row -mt-72">
          <div
            className="w-full md:w-1/3  bg-center bg-cover  h-96 "
            style={{
              backgroundImage:
                "url('/customer-support-concepts_662093-1854.avif')",
            }}
          ></div>

          <div className="w-full md:w-1/3 flex  flex-col  justify-center items-center  p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-rose-600 font-serif  ">
              Contact Us
            </h2>

            <input
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="w-full p-3 placeholder-stone-400 font-serif   bg-slate-100  outline-none  rounded-tl-2xl "
            />

            <input
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
              className="w-full p-3 
           border-green-200 border-2
           bg-slate-100 outline-none placeholder-stone-400 font-serif border-none  rounded-tl-2xl"
            />

            <textarea
              value={message}
              onChange={(e) => SetMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-4 outline-dashed outline-none bg-slate-100 rounded-tl-2xl"
            ></textarea>

            {loading ? (
              <Spinner />
            ) : (
              <>
                <div
                  onClick={HandleSubmitMessage}
                  className="bg-[url('/istockphoto-1452771551-612x612.jpg')] 
        active:scale-110 hover:scale-105 transition-all duration-300  hover:cursor-pointer p-12
         sm:p-24 w-full bg-cover  bg-center"
                ></div>
              </>
            )}
          </div>

          <div
            className="w-full md:w-1/3 flex justify-center md:border-x-2   items-center bg-black
       md:bg-white sm:bg-white lg:bg-white space-x-6 py-6 pb-2"
          >
            <Link
              to="https://www.linkedin.com/in/balwant-gupta-67b485353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
"
              className=" flex items-center justify-center border-2
           shadow-lg hover:bg-green-400  border-green-400 text-green-400 transition-all duration-500 hover:text-pink-400
            bg-back  shadow-green-400 rounded-full p-1"
            >
              <LinkedInIcon
                fontSize="medium"
                className="  shadow-lg  rounded-3xl shadow-rose-400 animate-bounce   "
              />
            </Link>

            <Link
              to="https://x.com/BalwantGupta123?t=Obrl7DrfXLsP37ZKHlPyJw&s=09

"
              className=" flex items-center justify-center border-2
           shadow-lg hover:bg-green-400  border-green-400 text-green-400 transition-all duration-500 hover:text-pink-400
            bg-back  shadow-green-400 rounded-full p-1"
            >
              <TwitterIcon
                fontSize="medium"
                className="  shadow-lg  rounded-full  shadow-rose-400 animate-bounce   "
              />
            </Link>
            <Link
              to="https://github.com/balwant-programmer"
              className=" flex items-center justify-center border-2
           shadow-lg hover:bg-green-400  border-green-400 text-green-400 transition-all duration-500 hover:text-pink-400
            bg-back  shadow-green-400 rounded-full p-1"
            >
              <GitHubIcon
                fontSize="medium"
                className="  shadow-lg  rounded-full shadow-rose-400 animate-bounce   "
              />
            </Link>

            <Link
              to="https://www.instagram.com/balwant.programmer12?igsh=cXNkZ3U5OXdtMXQ5

"
              className=" flex items-center justify-center border-2
           shadow-lg hover:bg-green-400  border-green-400 text-green-400 transition-all duration-500 hover:text-pink-400
            bg-back  shadow-green-400 rounded-full p-1"
            >
              <InstagramIcon
                fontSize="medium"
                className="  shadow-lg  rounded-full shadow-rose-400 animate-bounce   "
              />
            </Link>
          </div>
        </div>
      </motion.div>
      <HomeFooter />
    </>
  );
};

export default ContactUse;
