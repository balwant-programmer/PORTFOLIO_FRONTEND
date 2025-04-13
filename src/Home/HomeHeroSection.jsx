import React, { useState, useEffect } from "react";
import { Link, useFetcher } from "react-router-dom";
import NameAnimation from "../NameAnimation";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { getLogoApi, getReumeDownload, getVideoApi } from "../api/api_url";
import DownloadIcon from "@mui/icons-material/Download";
import Spinner from "../Spinner";

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
    url: "https://www.linkedin.com/in/balwant-gupta-67b485353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const HomeHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logo, setherologo] = useState(null);
  const [logoLoading, seLogoLoading] = useState(false);
  const [Video, setVideo] = useState("");

  useEffect(() => {
    setIsVisible(true);
    seLogoLoading(true);
    const fetchDaat = async () => {
      try {
        const { data } = await axios.get(getLogoApi);
        if (data?.success) {
          setherologo(data?.heroLogo);
          seLogoLoading(false);
        }
      } catch (error) {
        seLogoLoading(false);

        console.log("error while getting the logo fetch");
      } finally {
        seLogoLoading(false);
      }
    };
    fetchDaat();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getVideoApi);
        console.log(data);
        if (data.success) {
          setVideo(data?.videoUrl?.video);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleResumeDownload = async () => {
    try {
      const { data } = await axios.get(getReumeDownload);
      if (data.success) {
        const fileUrl = data?.urlResume;
        window.open(fileUrl, "_blank");
      }
    } catch (error) {
      console.error(
        "Error while downloading the resume:",
        error.response || error.message
      );
    }
  };

  const handleVideoPlay = () => {
    setIsVisible(true);
    seLogoLoading(false);
  };

  return (
    <div className="h-96 relative flex flex-col bg-black brightness-150   items-center px-4 lg:px-16">
      <div className="absolute top-0 left-0 w-full h-96 z-0 opacity-12">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          playsInline
          preload="auto"
          onPlay={handleVideoPlay}
        >
          {Video && <source src={Video} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>

      {logoLoading ? (
        <Spinner />
      ) : (
        logo && (
          <div
            className={`mt-52 transition-opacity rounded-full duration-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={logo}
              alt="Hero Image"
              className="w-60 h-60 py-2 px-6 shadow-green-500 duration-300 cursor-pointer scale-105 shadow-xl bg-green-300 rounded-full brightness-100 mt-5 object-cover mx-auto animate-spin"
            />
          </div>
        )
      )}

      <div
        className={`absolute right-3 top-16 transform -translate-y-1/2 flex
        flex-col space-y-6 transition-opacity duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <div
            className={`text-center transition-opacity  mr-10  relative top-40
             lg:-left-[400px] xl:-left-[700px] md:-left-[300px] md:top-52  duration-1000 ${
               isVisible ? "opacity-100" : "opacity-0"
             }`}
          >
            <div className="text-yellow-500 font-serif shadow-md shadow-green-500 text-lg mt-16 mr-52">
              Hey, I'm
            </div>

            <h1 className=" -ml-32 font-serif text-white mt-4">
              <NameAnimation />
            </h1>
            <div className="font-bold mt-1 mr-16 text-lg font-serif text-cyan-400 sm:text-xl ">
              mern stack{" "}
              <span className="text-green-200 font-serif text-2xl">
                developer
              </span>{" "}
              <br />
              <button
                onClick={handleResumeDownload}
                className="text-green-900 px-3 py-1 mt-2 mb-0 md:py-3 hover:bg-slate-200 flex gap-x-1 items-center font-serif focus:scale-110
       bg-slate-100 rounded text-sm"
              >
                Download cv
                <DownloadIcon fontSize="small" className="text-rose-900" />
              </button>
            </div>
          </div>
        </div>

        {Icons?.map(({ icons, url }, index) => (
          <div className="flex justify-end">
            <Link
              to={url}
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-green-400 animate-spin scale-75
             w-10 h-10 flex items-center justify-center hover:text-red-500
              hover:bg-green-500 shadow-none hover:shadow-[0_0_10px_4px_rgba(4,197,194,1)] 
              transition duration-300 border-2 border-green-500 hover:scale-105 ease-in-out
               rounded-full "
            >
              {icons}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHeroSection;
