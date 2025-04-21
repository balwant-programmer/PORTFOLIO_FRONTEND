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
      <motion.button
        onClick={openModel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-sm font-semibold shadow-lg transition-all duration-300"
      >
        About Me
        <motion.span
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 45 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <OpenInNewIcon fontSize="small" />
        </motion.span>
      </motion.button>

      <AboutMeModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.div>
  );
};

export default AboutMe;
