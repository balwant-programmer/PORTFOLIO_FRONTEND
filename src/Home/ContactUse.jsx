import React, { useState } from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { sendSmsGmailApi } from "../api/api_url";
import Spinner from "../Spinner";
import HomeFooter from "./HomeFooter";

const ContactUse = () => {
  const [userName, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSubmitMessage = async () => {
    if (!userName.trim()) return toast.warning("Please enter your name.");
    if (!userEmail.trim()) return toast.warning("Please enter your email.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail))
      return toast.error("Invalid email address.");
    if (!message.trim()) return toast.warning("Please enter a message.");

    try {
      setLoading(true);
      const { data } = await axios.post(sendSmsGmailApi, {
        userEmail,
        userName,
        message,
      });

      if (data.success) {
        toast.success(data.message);
        setUsername("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="min-h-screen bg-black text-white px-4 py-5"
      >
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-6">
          <div>
            <img
              src="\conteactSms.png"
              alt=""
              height={500}
              width={550}
              className="border-3 rounded-3xl bg-transparent contrast-150"
            />
          </div>

          <div className="lg:w-1/2  rounded-xl shadow-xl  space-y-6">
            <h2 className="text-3xl font-poppins text-rose-500 text-center">
              Contact Me
            </h2>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-[#1e1e1e] text-white placeholder-gray-400 border border-rose-400 outline-none focus:border-blue-500 transition"
            />

            <input
              type="email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#1e1e1e] text-white placeholder-gray-400 border border-rose-400 outline-none focus:border-blue-500 transition"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-3 h-32 rounded-lg bg-[#1e1e1e] text-white placeholder-gray-400 border border-rose-400 outline-none focus:border-blue-500 transition"
            ></textarea>

            <button
              onClick={HandleSubmitMessage}
              className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-rose-500 hover:to-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  Sending
                  <div className="h-5 w-5 rounded-full border-2 border-t-green-500 animate-spin"></div>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6 bg-gray-900 p-5 mx-2 rounded-lg sm:mx-96">
          {[
            {
              href: "https://www.linkedin.com/in/balwant-gupta-67b485353",
              icon: <LinkedInIcon />,
              color: "text-blue-400",
            },
            {
              href: "https://x.com/BalwantGupta123",
              icon: <TwitterIcon />,
              color: "text-sky-400",
            },
            {
              href: "https://github.com/balwant-programmer",
              icon: <GitHubIcon />,
              color: "text-gray-300",
            },
            {
              href: "https://www.instagram.com/balwant.programmer12",
              icon: <InstagramIcon />,
              color: "text-pink-500",
            },
          ].map((item, idx) => (
            <Link
              to={item.href}
              key={idx}
              target="_blank"
              className={`bg-[#1a1a1a] p-3 rounded-full shadow-lg hover:bg-rose-600 hover:scale-110 transform transition-all hover:text-white duration-300 ${item.color}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </motion.div>

      <HomeFooter />
    </>
  );
};

export default ContactUse;
