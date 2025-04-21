import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
        if (success) setfrontendImage(skillDat);
      } catch (error) {
        console.error("Error fetching skill data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="text-white"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Technical Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-sm text-gray-300 mt-2 tracking-wide"
        >
          The tools & technologies I work with
        </motion.p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-4 sm:px-8">
        {loading ? (
          <div className="col-span-full flex justify-center">
            {/* Shimmer effect while loading */}
            <div className="w-full grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-900 rounded-xl shadow-md animate-pulse"
                >
                  <div className="h-12 w-12 bg-gray-700 rounded-xl mb-3"></div>
                  <div className="h-4 w-20 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          frontendImage?.map(({ img, title, name }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              className="group"
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className="relative flex flex-col items-center justify-center 
                p-4 rounded-xl bg-gray-900 shadow-md hover:shadow-2xl 
                hover:scale-105 transition-all duration-300"
                style={{ transform: "translateZ(0)" }}
              >
                <img
                  src={img}
                  alt={title}
                  className="w-12 h-12 object-cover 
                  rounded-xl group-hover:scale-110 
                  transition-transform duration-300 drop-shadow-md"
                />
                <p className="mt-3 text-sm font-semibold tracking-wide">
                  {title}
                </p>

                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
                  text-xs px-4 py-1 rounded-full text-white bg-black/60 
                  opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  {name}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TechnicalSkills;
