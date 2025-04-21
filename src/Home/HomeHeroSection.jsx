import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import Spinner from "../Spinner";
import { getLogoApi, getReumeDownload, getVideoApi } from "../api/api_url";

const Icons = [
  {
    icons: <InstagramIcon />,
    url: "https://www.instagram.com/balwant.programmer12?igsh=cXNkZ3U5OXdtMXQ5",
  },
  { icons: <GitHubIcon />, url: "https://github.com/balwant-programmer" },
  {
    icons: <TwitterIcon />,
    url: "https://x.com/BalwantGupta123?t=Obrl7DrfXLsP37ZKHlPyJw&s=09",
  },
  {
    icons: <LinkedInIcon />,
    url: "https://www.linkedin.com/in/balwant-gupta-67b485353",
  },
];

const HomeHeroSection = () => {
  const [logo, setHeroLogo] = useState(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [video, setVideo] = useState("");

  useEffect(() => {
    setLogoLoading(true);
    const fetchLogo = async () => {
      try {
        const { data } = await axios.get(getLogoApi);
        if (data?.success) setHeroLogo(data?.heroLogo);
      } catch (error) {
        console.log("Error while fetching logo:", error);
      } finally {
        setLogoLoading(false);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(getVideoApi);
        if (data.success) setVideo(data?.videoUrl?.video);
      } catch (error) {
        console.log("Error while fetching video:", error);
      }
    };
    fetchVideo();
  }, []);

  const handleResumeDownload = async () => {
    try {
      const { data } = await axios.get(getReumeDownload);
      if (data.success) {
        window.open(data?.urlResume, "_blank");
      }
    } catch (error) {
      console.error("Error while downloading the resume:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover brightness-50"
        >
          {video && <source src={video} type="video/mp4" />}
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16">
        <div className="flex-1">
          {["Hey , I'm", "Balwant Gupta", "MERN Stack Developer"].map(
            (text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
                viewport={{ once: false }}
                className={`${
                  i === 0
                    ? "text-3xl"
                    : i === 2
                    ? "text-6xl sm:text-8xl brightness-200"
                    : "text-4xl sm:text-6xl"
                } mb-2 font-poppins font-bold bg-gradient-to-r ${
                  i === 0
                    ? "from-pink-500 via-yellow-300 to-green-400"
                    : i === 1
                    ? "from-purple-400 via-blue-500 to-indigo-600"
                    : "from-blue-500 via-purple-600 to-indigo-700"
                } bg-clip-text text-transparent`}
              >
                {text}
              </motion.div>
            )
          )}

          <motion.button
            onClick={handleResumeDownload}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: "easeOut",
              type: "tween",
            }}
            viewport={{ once: true }}
            className="mt-4 px-4 py-2 ml-2 bg-gradient-to-r from-pink-700 via-black to-black 
  text-white rounded text-sm font-poppins flex items-center gap-2 
  transition duration-500 ease-in-out 
  hover:from-pink-600 hover:via-yellow-400 hover:to-green-300"
          >
            Download CV{" "}
            <DownloadIcon fontSize="small" className="text-orange-700" />
          </motion.button>

          <motion.div
            className="flex space-x-4 mt-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
            viewport={{ once: false }}
          >
            {Icons.map(({ icons, url }, index) => (
              <Link
                key={index}
                to={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 ml-2 flex items-center justify-center
                 text-white bg-gradient-to-r from-blue-600 via-purple-900
                  to-rose-800 rounded-full transition duration-300 hover:scale-110 hover:shadow-lg"
              >
                {icons}
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex-1 flex justify-center items-center lg:mt-0 w-full"
        >
          {logoLoading ? (
            <div
              className="w-full 
                 max-w-[400px] h-[400px] sm:h-[400px] md:h-[400px] lg:h-[500px]
                  bg-center bg-no-repeat contrast-150 bg-contain bg-transparent rounded-3xl shadow-xl transition duration-500"
              style={{
                backgroundImage: `url("\hoemImage.png")`,
              }}
            ></div>
          ) : (
            logo && (
              <div
                className="
      w-full max-w-[400px] h-[400px] lg:h-[500px]
      bg-center bg-no-repeat bg-contain
      rounded-3xl shadow-xl transition duration-500
      filter contrast-150 saturate-150 
    "
                style={{ backgroundImage: `url(${logo})` }}
              />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
