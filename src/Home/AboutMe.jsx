import React, { useState } from "react";
import { motion } from "framer-motion";
import AboutMeModel from "./AboutMeModel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const AboutMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModel = () => setIsOpen(true);

  return (
    <motion.div
      className="flex justify-center items-center mb-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        onClick={openModel}
        className="relative rounded-lg overflow-hidden 
        cursor-pointer transform transition-all space-x-1 px-6
         duration-1000 hover:scale-105 hover:shadow-lg p-2
          bg-gradient-to-r  from-blue-300 select-none via-green-500 to-rose-200  text-white"
        aria-label="About Me Section"
      >
        <span className="text-sm   font-serif  transition-al; duration-75 focus:scale-110">
          About Me
        </span>
        <OpenInNewIcon className="text-white" fontSize="small" />
      </div>
      <AboutMeModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.div>
  );
};

export default AboutMe;
