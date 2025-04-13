import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";
import { usegetproject } from "../Hooks/usegetproject";
import Spinner from "../Spinner";
const ProjectHome = () => {
  const [visited, setvisited] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };
  const data = usegetproject();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {" "}
        <div
          className="bg-[url('/TP_white_horiz.png')] rounded-xl
    md:mx-1 bg-cover 
    bg-center pb-24 -mt-24 mx-2 md:h-40 sm:h-40 lg:h-80 bg-white
  "
        ></div>
        <hr className="border-rose-200 mt-10" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          {data.length === 0 ? (
            <Spinner />
          ) : (
            <div className="mx-2 lg:mx-96 md:64  pb-64 select-none">
              {data?.map(
                ({
                  images,
                  introduction,
                  name,
                  Technology,
                  _id,
                  websiteLink,
                }) => (
                  <React.Fragment key={Math.random()}>
                    <Slider {...settings}>
                      {images?.map((img) => (
                        <div key={Math.random()}>
                          <img
                            src={img}
                            height={250}
                            width={250}
                            alt="project"
                          />
                        </div>
                      ))}
                    </Slider>

                    <div className="mx-2 flex justify-center mt-4">
                      <Link
                        to={websiteLink}
                        className="mx-10  border-2 py-2 px-6
                       rounded-lg
               bg-black  flex items-center shadow-xl
                shadow-rose-900  text-lg font-serif gap-x-1
                 focus:scale-110 transition-all duration-200 
                  hover:bg-black text-green-400 "
                      >
                        {name}
                        <span className="text-rose-500">
                          <LaunchIcon fontSize="small" />
                        </span>
                      </Link>
                    </div>

                    <div className="mt-8  bg-gray-100 p-2 mb-10">
                      <p className="font-serif text-gray-700 text-sm">
                        {introduction}
                      </p>
                      <div className="font-serif mt-3">
                        <h2 className="md:text-2xl font-bold text-gray-800 mb-3  text-md">
                          <span className="text-rose-500  font-serif">T</span>
                          echnology
                        </h2>
                        <div className="flex  flex-wrap gap-x-4 gap-y-2 mb-3">
                          {Technology?.map((tech) => (
                            <p
                              key={Math.random() + 33}
                              className="bg-gray-900 
                             text-green-500 px-4 p-1 font-mono
                              shadow-inner shadow-rose-500
                             rounded-full text-sm"
                            >
                              #{tech.toUpperCase()}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mb-9">
                        <Link
                          to={`/explore/${_id}`}
                          onClick={() => setvisited(true)}
                          className={`underline   
                  font-serif text-sm   md:text-lg ${
                    visited ? "text-red-500" : "text-blue-500"
                  }`}
                        >
                          {" "}
                          Explore More
                        </Link>

                        <hr className="mt-2" />
                      </div>
                    </div>
                  </React.Fragment>
                )
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProjectHome;
