import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = userTokencheck();
  const { bool } = useSelector((state) => state.aboutSlice);
  const { logo } = useSelector((state) => state.userLogo);

  const [activeButton, setActiveButton] = useState("home");

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      {bool ? null : (
        <div className="fixed select-none bottom-0 left-0 border-4 font-serif text-sm border-b-white z-10 w-full bg-white py-0">
          <div className="flex justify-around font-bold my-4">
            <div
              className={`flex justify-center items-center ${
                activeButton === "home" ? "text-green-500" : ""
              }`}
              onClick={() => handleClick("home")}
            >
              <Link
                to="/"
                className="flex justify-center items-center flex-col"
              >
                <div>
                  <HomeIcon />
                </div>
                Home
              </Link>
            </div>

            <div
              className={`flex justify-center items-center ${
                activeButton === "contact" ? "text-green-500" : ""
              }`}
              onClick={() => handleClick("contact")}
            >
              <a
                href="tel:7307872065"
                className="flex justify-center items-center flex-col"
              >
                <div>
                  <AddIcCallIcon />
                </div>
                Contact
              </a>
            </div>

            <div
              className={`flex justify-center items-center ${
                activeButton === "blog" ? "text-green-500" : ""
              }`}
              onClick={() => handleClick("blog")}
            >
              <Link
                to="/blog"
                className="flex justify-center items-center flex-col"
              >
                <div>
                  <FeedIcon />
                </div>
                Blog
              </Link>
            </div>

            <div
              className={`flex justify-center items-center ${
                activeButton === "you" ? "text-green-500" : ""
              }`}
              onClick={() => handleClick("you")}
            >
              <Link
                to={!!user || !!logo ? "/profile" : "/register"}
                className="flex justify-center items-center flex-col"
              >
                <div>
                  {!!user || !!logo ? (
                    <div
                      className="border-2 relative rounded-full size-7 outline-2 outline-double"
                      style={{
                        backgroundImage: `url(${logo ? logo : user?.logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  ) : (
                    <AccountCircleIcon />
                  )}
                </div>
                You
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
