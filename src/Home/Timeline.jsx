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
        "Currently pursuing my Master's in Computer Applications (MCA). I am deepening my knowledge in algorithms, data structures, and software engineering, preparing for advanced development projects.",
      color: <LockOpenIcon style={{ color: "blue" }} />,
      titleColor: "text-blue-500",
    },
    {
      year: "2025",
      title: "Completed MERN Stack Course",
      description:
        "Successfully completed a MERN Stack (MongoDB, Express, React, Node.js) course. Built several full-stack applications with a focus on RESTful APIs, user authentication, and deploying web applications on cloud platforms.",
      color: <CodeIcon style={{ color: "green" }} />,
      titleColor: "text-green-500",
    },
    {
      year: "2023",
      title: "Completed PGDCA",
      description:
        "Completed PGDCA, where I gained foundational knowledge in computer applications, programming languages like C, C++, and the basics of web development",
      color: <SchoolIcon style={{ color: "purple" }} />,
      titleColor: "text-purple-500",
    },
    {
      year: "2022",
      title: "Started Learning Web Development",
      description:
        "Started learning web development by mastering HTML, CSS, JavaScript, and React. I began building basic projects such as a personal portfolio and a e-commerce  app",
      color: <WorkIcon style={{ color: "orange" }} />,
      titleColor: "text-orange-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-32 p-6 bg-gray-50 mb-10">
      <div className="relative">
        <h2 className="text-2xl font-serif text-center text-rose-600  mb-8">
          Timeline
        </h2>
      </div>
      <div className="relative border-l-4 border-gray-300">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="mb-8 ml-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <div
              className={`absolute -left-4 w-8 h-8 flex
               justify-center items-center rounded-full 
              shadow-green-500 shadow-lg bg-white   transition-shadow duration-300`}
            >
              {item.color}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="md:w-1/4 text-right pr-6">
                <p className="text-xs sm:text-sm text-gray-900 font-poppins">
                  {item.year}
                </p>
                <h3
                  className={`text-sm text-fuchsia-500 
                   sm:text-xl md:text-2xl mb-1 font-serif ${item.titleColor}`}
                >
                  {item.title}
                </h3>
              </div>
              <div className="md:w-3/4">
                <p className="text-sm sm:text-base md:text-lg text-gray-500 font-serif">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
