import React from "react";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import { motion } from "framer-motion";

const HomeFooter = () => {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-6xl mx-auto text-center space-y-14"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-28 h-28 mx-auto">
            <img
              loading="lazy"
              src="/file_0000000094d46230813f8227ae7b46c2_conversation_id=6803e857-63d8-800b-99ff-4e36c1ddb55a&message_id=5d2267c2-9de2-4cc8-a3b1-9ffbc90ba992.png"
              alt="logo"
              className="rounded-full border-4 border-emerald-500 shadow-lg object-cover w-full h-full transition-transform duration-300"
            />
            {/* Ping only on larger screens */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-20 animate-ping hidden sm:block"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Balwant <span className="text-rose-500 text-6xl">Gupta</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 text-left text-sm px-2">
          {[
            {
              title: "🎓 PGDCA (2023)",
              detail: "CGPA: 7.73 — Mangalayatan University, Aligarh (U.P.)",
              delay: 0.3,
            },
            {
              title: "🎓 MCA (2025)",
              detail: "SGPA: 7.61 — Asian International University, Manipur",
              delay: 0.5,
            },
            {
              title: "🧑‍💻 MERN Stack (2025)",
              detail: "Procoderr.com — Certified Full Stack Developer",
              delay: 0.7,
              full: true,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: item.delay, duration: 0.8 }}
              className={`bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] border border-gray-700 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:shadow-rose-500/30 transition-all duration-300 ${
                item.full ? "md:col-span-2" : ""
              }`}
            >
              <p className="text-rose-400 font-semibold text-lg mb-1">
                {item.title}
              </p>
              <p className="text-green-300">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center items-center gap-4">
            <MailIcon className="text-emerald-400 animate-pulse" />
            <Link
              to="mailto:balwant.programmer12@gmail.com"
              className="bg-gradient-to-r from-pink-400 via-green-300 to-blue-400 bg-clip-text text-transparent font-medium hover:underline"
            >
              balwant.programmer12@gmail.com
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <LocalPhoneIcon className="text-yellow-400 animate-pulse" />
            <Link
              to="tel:+7307872065"
              className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent font-medium hover:underline"
            >
              +91 73078 72065
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/"
            className="px-5 py-2 text-sm rounded-full border border-green-400 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="px-5 py-2 text-sm rounded-full border border-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
          >
            Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-10 pb-10 border-t border-gray-700 text-xs text-stone-400"
        >
          <p>&copy; 2025 Balwant Portfolio. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeFooter;
