import React, { useState } from "react";
import TechnicalSkills from "./TechnicalSkills";
import SoftSkill from "./SoftSkill";
import { motion } from "framer-motion";

const NavSkill = () => {
  const [showcomp, setshowcomp] = useState(true);

  const tabStyle = (isActive) => `
    px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
        : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r px-12 hover:from-blue-600 hover:via-purple-500 hover:to-pink-500 hover:text-white"
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="lg:mx-72 mx-8 select-none mb-32 -mt-16 ">
        <div className="flex justify-center  font-poppins -space-x-5 text-lg mb-8">
          <button
            onClick={() => setshowcomp(true)}
            className={tabStyle(showcomp)}
          >
            Technical Skills
          </button>
          <button
            onClick={() => setshowcomp(false)}
            className={tabStyle(!showcomp)}
          >
            Soft Skills
          </button>
        </div>

        <div>{showcomp ? <TechnicalSkills /> : <SoftSkill />}</div>
      </div>
    </motion.div>
  );
};

export default NavSkill;
