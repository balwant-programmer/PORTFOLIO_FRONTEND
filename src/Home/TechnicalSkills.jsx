import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { ToolsImage } from "../Data/TechnicalToolsImage";
import axios from "axios";
import { skillfetch } from "../api/skillApi";
import Spinner from "../Spinner";

const TechnicalSkills = () => {
  const [frontendImage, setfrontendImage] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);
        const { skillDat, success } = await skillfetch();
        if (success) {
          setfrontendImage(skillDat);
          setLoading(false);
        }
      } catch (error) {
        console.log("Eroor skill", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <div className="select-none   text-black mt-12 ">
          <div className=" rounded-md ">
            <div className="flex gap-x-6  gap-y-10  lg:gap-10  md:gap-5  items-center flex-wrap ">
              {loading ? (
                <Spinner />
              ) : (
                frontendImage?.map(({ img, title, name }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 2, y: 0 }}
                    transition={{ duration: 2 }}
                  >
                    <div
                      className="flex cursor-pointer flex-col  p-2 rounded-lg lg:p-5
                  shadow-xl shadow-green-300 
                  hover:bg-rose-500 items-center relative group "
                    >
                      <img
                        src={img}
                        className="object-cover brightness-200 rounded-full  h-10 w-10 md:h-12 md:w-12"
                        alt="React.js"
                      />
                      <p className="text-green-500 font-serif">{title}</p>
                      <p
                        className="hidden absolute
                            -top-8  group-hover:block : rounded-full shadow
                            shadow-green-400 px-2 text-sm transition-all duration-300"
                      >
                        {name}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TechnicalSkills;
