import React from "react";
import { motion } from "framer-motion";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";

const Timeline = () => {
  const timelineData = [
    {
      year: "2025 - Present",
      title: "Pursuing MCA (2nd Year)",
      description:
        "Currently expanding my expertise in advanced computer science concepts, web development, and cutting-edge software engineering practices through my MCA program.",
      color: <LockOpenIcon className="text-blue-500" />,
      titleColor:
        "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent",
    },
    {
      year: "2025",
      title: "Completed MERN Stack Course",
      description:
        "Successfully built full-stack apps with MongoDB, Express, React, and Node.js. Gained strong skills in REST APIs, auth, and deployment.",
      color: <CodeIcon className="text-green-400" />,
      titleColor:
        "bg-gradient-to-r from-green-300 via-teal-400 to-blue-500 bg-clip-text text-transparent",
    },
    {
      year: "2023",
      title: "Completed PGDCA",
      description:
        "Built fundamentals in C, C++, and web basics. This helped form a solid base for my transition to full-stack development.",
      color: <SchoolIcon className="text-purple-400" />,
      titleColor:
        "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent",
    },
    {
      year: "2022",
      title: "Started Learning Web Development",
      description:
        "Started my dev journey with HTML, CSS, JS, and React. Built portfolio & e-commerce projects, sparking my passion for frontend design.",
      color: <WorkIcon className="text-orange-400" />,
      titleColor:
        "bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-500 bg-clip-text text-transparent",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6  mb-4">
      <h2
        className="text-center text-4xl font-bold font-poppins bg-gradient-to-r
       from-rose-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-5"
      >
        My Learning Journey 🚀
      </h2>

      <div className="relative border-l-4 border-gray-700 pl-3">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="relative mb-16"
            >
              {/* Icon Circle */}
              <div
                className={`absolute w-10 h-10 rounded-full  bg-white shadow-xl border-2 flex items-center justify-center 
                ${isEven ? "-left-[34px]" : "-left-[34px]"} 
                border-indigo-500 animate-pulse`}
              >
                {item.color}
              </div>

              {/* Content Container */}
              <div className="ml-4 ">
                <div className="text-sm  mb-1 font-mono">{item.year}</div>
                <h3
                  className={`text-xl md:text-2xl font-poppins mb-2 ${item.titleColor}`}
                >
                  {item.title}
                </h3>
                <div
                  className="px-1 sm:p-8 rounded-2xl bg-gradient-to-br font-poppins lg:w-[1000px] sm:[700px]
                 from-gray-900 via-black to-blue-800"
                >
                  <p
                    className="text-md md:text-3xl p-2 font-poppins leading-relaxed
bg-gradient-to-r
       from-gray-500 via-blue-500 to-purple-900 bg-clip-text text-transparent"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
