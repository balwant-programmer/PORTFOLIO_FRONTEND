import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import { motion } from "framer-motion";
import NameAnimation from "../NameAnimation";
const HomeFooter = () => {
  return (
    <>
      <div className="bg-black font-serif  py-8 px-4 mb-16 md:mb-0 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="max-w-md  mx-auto text-center space-y-4">
            <div>
              <div className="rounded-full  p-1">
                <img
                  src="/InShot_20250227_071440518.jpg"
                  className="rounded-full border-2 border-green-400 brightness-100 shadow-sm shadow-green-400 size-12 mx-auto mb-2  object-cover    "
                  alt="Logo"
                />

                <h2 className="italic font-serif">
                  <NameAnimation />
                </h2>
              </div>
            </div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              <div className="space-y-2  brightness-200">
                <div className="text-white flex">
                  <h2 className="font-serif text-rose-900 text-sm">
                    Education :-:
                  </h2>
                </div>
                <div className="text-white font-serif flex text-[13px]">
                  <p>
                    Post Graduate Diploma in Computer Application (PGDCA) :2023
                    ,[CGPA - 7.73]
                  </p>
                </div>
                <div className="text-white flex  justify-center pb-5">
                  <h2 className="text-[11px] text-green-400">
                    Mangalayatan University of aligarh ,u.p , India
                  </h2>
                </div>

                <div className="text-white flex text-[13px] md:text-md  ">
                  <p>
                    Master of Computer Applications (MCA) : 2025 pursuing ,
                    [SGPA 7.61]
                  </p>
                </div>
                <div className="text-white flex justify-center">
                  <h2 className="text-[11px] text-green-400">
                    Asian International University Manipur
                  </h2>
                </div>

                <div className="text-white text-sm pt-5  ">
                  <p>certificate of MERN STACK : 2025</p>
                </div>
                <div className="text-white flex justify-center font-serif pb-10">
                  <h2 className="text-sm text-green-400">
                    Procoderr.com platForm
                  </h2>
                </div>

                <p className="text-md flex items-center text-green-400 gap-x-2   pt-2 ">
                  <Link
                    to="mailto:Email@gmail.com"
                    className="hover:underline flex gap-x-2 font-serif italic items-center 
              "
                  >
                    <MailIcon
                      className="border-2 rounded-full p-1 shadow-xl border-green-500
               hover:text-red-400 shadow-rose-400 hover:bg-green-400 animate-spin scale-110
                hover:shadow-green-500 transition-all  duration-500"
                    />
                    balwant.programmer12@gmail.com
                  </Link>
                </p>

                <hr className="border-green-400" />
                <p className="text-lg font-serif flex gap-x-2 text-green-400">
                  <LocalPhoneIcon
                    className="border-2 rounded-full p-1 shadow-xl border-green-500 brightness-125 
               hover:text-red-400 shadow-rose-400  hover:bg-green-400  animate-spin scale-110 hover:shadow-green-500 transition-all duration-500"
                  />
                  <Link to="tel:+7307872065" className="hover:underline italic">
                    7307872065
                  </Link>
                </p>
              </div>
            </motion.div>
            <hr className="border-green-400" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <div
              className="bg-black font-thin flex gap-x-3 
    justify-center  flex-wrap mt-3 brightness-200 p-1
     text-white"
            >
              <Link
                to="/"
                className="text-yellow-400 hover:scale-105 text-sm flex items-center font-serif"
              >
                Home{" "}
              </Link>
              <Link
                to="/blog"
                className="px-4  brightness-150   hover:scale-105 text-sm flex items-center font-serif"
              >
                Blog{" "}
              </Link>

              <Link
                to="/chat"
                className=" px-2  text-rose-900 text-sm font-serif 
           flex items-center  
           hover:scale-105"
              >
                Chat
              </Link>
            </div>
          </motion.div>

          <div class="bg-gray-950 mt-16  text-stone-400 italic">
            <div class="container mx-auto text-center">
              <p className="font-thin brightness-200">
                &copy; 2025 Balwant portFolio. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomeFooter;
