import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { useSelector } from "react-redux";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const contactRef = useRef(null);
  const popupRef = useRef(null);
  const { bool } = useSelector((state) => state.aboutSlice);
  const { logo } = useSelector((state) => state.userLogo);
  const location = useLocation();
  const user = userTokencheck();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !contactRef.current.contains(event.target)
      ) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!bool && (
        <div className="relative hidden md:block sm:block">
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="fixed z-50 top-0 w-full flex py-2 justify-between items-center font-poppins bg-transparent backdrop-blur-lg px-8"
          >
            <Link
              to="/"
              className="text-4xl italic font-poppins bg-gradient-to-r from-sky-400 via-purple-900 to-pink-400 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
            >
              B
            </Link>

            <div className="flex items-center space-x-16 text-[16px] lg:text-[17px]">
              <Link to="/">
                <button
                  className={`transition-all duration-300 font-poppins ${
                    location.pathname === "/"
                      ? "text-3xl brightness-100 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  Home
                </button>
              </Link>

              <Link to="/blog">
                <button
                  className={`transition-all duration-300 font-poppins tracking-wide ${
                    location.pathname === "/blog"
                      ? "text-3xl brightness-100 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                      : "text-white hover:text-pink-300"
                  }`}
                >
                  Blog
                </button>
              </Link>

              <button
                ref={contactRef}
                onMouseEnter={() => setPopupVisible(true)}
                onMouseLeave={() =>
                  setTimeout(() => setPopupVisible(false), 300)
                }
                className="transition-all duration-300 font-poppins text-white 
                  hover:bg-clip-text hover:text-3xl 
                  hover:bg-gradient-to-r hover:from-sky-400 hover:via-purple-900 hover:to-pink-400"
              >
                Contact
              </button>

              {!!logo || !!user ? (
                <Link to="/profile">
                  <div
                    className="border-2 border-rose-500 rounded-full size-8 p-1 cursor-pointer hover:scale-105 transition"
                    style={{
                      backgroundImage: `url(${logo || user?.logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </Link>
              ) : (
                <Link to="/register">
                  <button
                    className={`flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 duration-300 hover:bg-gray-800 ${
                      location.pathname === "/register"
                        ? "text-3xl text-rose-400"
                        : "text-white"
                    }`}
                  >
                    Sign up
                    <PersonIcon />
                  </button>
                </Link>
              )}
            </div>
          </motion.nav>

          <AnimatePresence>
            {isPopupVisible && (
              <motion.div
                ref={popupRef}
                onMouseEnter={() => setPopupVisible(true)}
                onMouseLeave={() => setPopupVisible(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="fixed z-50 -ml-40 w-72 p-5 rounded-xl mt-2 bg-black bg-opacity-80 backdrop-blur-md shadow-2xl"
                style={{
                  top:
                    contactRef.current?.getBoundingClientRect().bottom ||
                    "auto",
                  left:
                    contactRef.current?.getBoundingClientRect().left || "auto",
                }}
              >
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <MailIcon className="text-green-300 bg-gray-800 p-1 rounded-full shadow-md hover:text-red-400 hover:bg-green-400 transition-all duration-300" />
                    <Link
                      to="mailto:balwant.programmer12@gmail.com"
                      className="font-poppins bg-gradient-to-r brightness-200 from-blue-700 via-pink-900 to-yellow-900 bg-clip-text text-transparent text-xl"
                    >
                      balwant.programmer12@gmail.com
                    </Link>
                  </div>

                  <hr className="border-gray-700" />

                  <div className="flex items-center gap-3">
                    <LocalPhoneIcon className="text-green-300 bg-gray-800 p-1 rounded-full shadow-md hover:text-red-400 hover:bg-green-400 transition-all duration-300" />
                    <Link
                      to="tel:+7307872065"
                      className="font-poppins bg-gradient-to-r brightness-200 from-blue-700 via-pink-900 to-yellow-900 bg-clip-text text-transparent hover:underline"
                    >
                      7307872065
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Navbar;
