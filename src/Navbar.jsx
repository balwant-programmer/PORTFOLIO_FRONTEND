import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { useSelector } from "react-redux";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
const Navbar = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const contactButtonRef = useRef(null);
  const { bool } = useSelector((state) => state.aboutSlice);
  const { logo } = useSelector((state) => state.userLogo);
  const handleContactHover = () => {
    setPopupVisible(true);
  };
  const handleContactLeave = () => {
    setPopupVisible(false);
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      handleContactLeave(true);
    });
  }, []);

  const user = userTokencheck();

  const [selector, setSelector] = useState("Home");
  const HandleNavBar = (item) => {
    setSelector(item);
  };

  return (
    <>
      {bool ? null : (
        <div className="relative hidden md:block  sm:block">
          <nav
            className="
        bg-black fixed z-50 top-0 w-full flex
         py-1 justify-between items-center font-sans "
          >
            <div className="flex items-center lg:gap-3 md:mx-10 lg:mx-40 lg:text-[15px]">
              <Link
                to="/"
                className="font-semibold text-transparent
           bg-clip-text bg-gradient-to-r from-red-300 via-blue-500 to-purple-100 
           italic text-4xl drop-shadow-lg hover:scale-105 transform transition-all
            duration-300 ease-in-out"
              >
                B
              </Link>
            </div>
            <div className="flex lg:gap-10 md:gap-0 md:mx-24  md:text-[15px] lg:text-[17px] lg:mx-40">
              <Link to="/" onClick={() => HandleNavBar("Home")}>
                <button
                  className={`px-5 font-serif p-1 duration-500  ${
                    selector === "Home" ? "text-green-400" : "text-white"
                  }  ease-in-out  hover:scale-110`}
                >
                  Home
                </button>
              </Link>

              <Link to="/blog" onClick={() => HandleNavBar("blog")}>
                <button
                  className={`px-3 font-medium duration-500 
          ease-in-out  hover:scale-110
          font-serif  ${selector === "blog" ? "text-green-400" : "text-white"}`}
                >
                  Blog
                </button>
              </Link>

              <button
                ref={contactButtonRef}
                onMouseEnter={handleContactHover}
                className="px-5 py-0 rounded 
            
             to-green-300 text-white font-serif brightness-150 duration-500 
          ease-in-out  hover:scale-110 "
              >
                Contact
              </button>
              {!!logo || !!user ? (
                <Link to="/profile">
                  <div
                    className="border-t-red-200 border-b-red-300 border-l-red-900
              
                  border-r-red-700 border-2 relative rounded-full size-8 p-1 cursor-pointer"
                    style={{
                      backgroundImage: `url(${logo ? logo : user?.logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </Link>
              ) : (
                <Link
                  to={!!user ? "/profile" : "/register"}
                  onClick={() => HandleNavBar("signup")}
                >
                  <button
                    className={`border-2 px-5 py-0 md:px-5 mt-1 md:text-[10px] lg:text-[15px]
               duration-500 
          ease-in-out  hover:scale-110  rounded font-medium *:
           ${selector === "signup" ? "text-green-400" : "text-white"}
          `}
                  >
                    Sign up
                  </button>
                </Link>
              )}
            </div>
          </nav>
          {isPopupVisible && (
            <div
              className="fixed z-50  -ml-24 bg-white w-72 p-5 rounded-xl shadow-lg  mt-2"
              style={{
                top: contactButtonRef.current
                  ? contactButtonRef.current.getBoundingClientRect().bottom
                  : "auto",
                left: contactButtonRef.current
                  ? contactButtonRef.current.getBoundingClientRect().left
                  : "auto",
              }}
            >
              <div>
                <div className="space-y-2  brightness-200">
                  <p className="text-md flex items-center text-green-400 gap-x-2   pt-2 ">
                    <Link
                      to="mailto:Email@gmail.com"
                      className="hover:underline   text-sm flex gap-x-2 font-serif  items-center 
              "
                    >
                      <MailIcon
                        className="border-2 rounded-full p-1 shadow-xl border-green-500 
               hover:text-red-400 shadow-rose-400 hover:bg-green-400 animate-spin scale-110
                hover:shadow-green-500 transition-all   duration-500"
                      />
                      balwant.programmer12@gmail.com
                    </Link>
                  </p>

                  <hr className="border-green-400" />
                  <p className="text-lg font-serif flex gap-x-2 text-green-400">
                    <LocalPhoneIcon
                      className="border-2 rounded-full p-1 shadow-xl border-green-500 
               hover:text-red-400 shadow-rose-400 hover:bg-green-400  animate-spin scale-110 hover:shadow-green-500 transition-all duration-500"
                    />
                    <Link
                      to="tel:+7307872065"
                      className="hover:underline italic"
                    >
                      7307872065
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
