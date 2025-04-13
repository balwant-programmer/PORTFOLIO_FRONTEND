import React, { useState } from "react";
import TechnicalSkills from "./TechnicalSkills";
import SoftSkill from "./SoftSkill";
import { motion } from "framer-motion";

const NavSkill = () => {
  const [showcomp, setshowcomp] = useState(true);
  const HandleTechnical = () => {
    setshowcomp(true);
  };

  const HandleSoftSkill = () => {
    setshowcomp(false);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="lg:mx-72 mx-8 select-none mb-32 -mt-10">
          <div
            className="flex  justify-center items-center font-bold text-lg gap-10
        lg:gap-16 md:gap-24"
          >
            <button onClick={HandleTechnical}>
              <span className="text-rose-600 font-serif
               transition-all duration-300 hover:scale-110">
                Technical Skill
              </span>{" "}
              
              {showcomp && <hr className="border-1 border-red-500" />}
            </button>
            <button onClick={HandleSoftSkill} className="text-red-600">
              <span className="text-blue-700 font-serif ">Soft Skill</span>
              {showcomp ? null : <hr className="border-1 border-red-500" />}
            </button>
          </div>
    <hr  className="border-1 border-green-400"/>
          <div>{showcomp ? <TechnicalSkills /> : <SoftSkill />}</div>
        </div>
      </motion.div>
    </>
  );
};

export default NavSkill;
