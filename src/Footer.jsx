import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "Contact",
      to: "tel:7307872065",
      icon: <AddIcCallIcon fontSize="small" />,
      isExternal: true,
    },
    {
      label: "Blog",
      to: "/blog",
      icon: <FeedIcon fontSize="small" />,
    },
    {
      label: "You",
      to: !!user || !!logo ? "/profile" : "/register",
      icon: !!user || !!logo ? null : <AccountCircleIcon fontSize="small" />,
      isProfile: true,
    },
  ];

  if (bool) return null;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 bg-[#0f0f0f]/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-xl px-4 py-3">
      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-300 font-medium">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          const iconBoxClasses = `p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
            isActive
              ? " bg-rose-900 text-white shadow-lg shadow-indigo-400/40 scale-110"
              : "hover:bg-indigo-500/20 hover:shadow-md hover:shadow-indigo-400/30"
          }`;

          return (
            <div key={index} className="flex flex-col items-center group">
              {item.isExternal ? (
                <a
                  href={item.to}
                  className="flex flex-col items-center hover:text-indigo-400 transition-all duration-300"
                >
                  <div className={iconBoxClasses}>{item.icon}</div>
                  <span className="mt-1">{item.label}</span>
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="flex flex-col items-center hover:text-indigo-400 transition-all duration-300"
                >
                  <div className={iconBoxClasses}>
                    {item.isProfile && (user || logo) ? (
                      <div
                        className="w-7 h-7 rounded-full border border-indigo-400 shadow-inner bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${logo || user?.logo})`,
                        }}
                      ></div>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <span className="mt-1">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
