import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";
import { usegetproject } from "../Hooks/usegetproject";
import Spinner from "../Spinner";

const ProjectHome = () => {
  const [visited, setvisited] = useState(false);
  const data = usegetproject();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    className: "rounded-xl",
  };

  const filteredProjects = data.filter(
    (project) => project.name !== "Test Project"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="px-4 py-16 text-white bg-[#0f0f0f] min-h-screen"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500"
        >
          My Projects
        </motion.h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          A collection of cool things I’ve built 🧑‍💻
        </p>
      </div>

      {data.length === 0 ? (
        <Spinner />
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2">
          {filteredProjects.map(
            ({ images, introduction, name, Technology, _id, websiteLink }) => (
              <div
                key={_id}
                className="bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-xl p-3"
              >
                <div className="w-full">
                  <Slider {...settings}>
                    {images.length === 0 ? (
                      <div className="animate-pulse bg-gray-700 h-72 rounded-xl"></div>
                    ) : (
                      images.map((img, index) => (
                        <div key={index}>
                          <motion.img
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            src={img}
                            alt={`${name} ${index}`}
                            className="w-full h-52 sm:h-64 md:h-72 object-contain object-center sm:object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      ))
                    )}
                  </Slider>
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4">
                  <Link
                    to={websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-1 text-xl sm:text-2xl font-bold text-white rounded-full 
                      bg-gradient-to-r from-purple-600 to-rose-500 hover:scale-105 transform transition-all duration-300 shadow-lg 
                      hover:bg-gradient-to-l hover:from-rose-500 hover:to-purple-600"
                  >
                    {name} <LaunchIcon className="ml-2" fontSize="small" />
                  </Link>

                  <Link
                    to={`/explore/${_id}`}
                    onClick={() => setvisited(true)}
                    className="inline-block text-sm sm:text-base font-semibold text-blue-400 hover:text-rose-400 underline transition-all duration-200"
                  >
                    Explore Project
                  </Link>
                </div>

                <div className="mt-4 bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] p-4 rounded-lg">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {introduction ? (
                      introduction
                    ) : (
                      <div className="h-5 bg-gray-700 w-full animate-pulse rounded"></div>
                    )}
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-rose-400 mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Technology.length === 0 ? (
                        <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
                      ) : (
                        Technology.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800 text-green-400 text-xs font-mono px-3 py-1 rounded-full border border-rose-400 shadow-sm"
                          >
                            #{tech.toUpperCase()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectHome;
