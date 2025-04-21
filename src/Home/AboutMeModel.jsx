import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { aboutMeData } from "../api/aboutMeApi";
import Spinner from "../Spinner";
import { useDispatch } from "react-redux";
import { HidentheNavAndmore } from "../redux/Slice/throuaboutHihdeSlice";
import { Mernimage } from "../Data/mernImage";
import { skillName } from "../Data/SkillName";

const AboutMeModel = ({ isOpen, setIsOpen }) => {
  const [image, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(HidentheNavAndmore(true));
      document.body.style.overflow = "hidden";

      const fetchData = async () => {
        try {
          setLoading(true);
          const { imageData, success } = await aboutMeData();
          if (success) setImageData(imageData?.aboutMeImage || []);
        } catch (error) {
          console.error("Error fetching image data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    dispatch(HidentheNavAndmore(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="About Me Modal"
      className="mx-4 md:mx-16 xl:mx-60 p-3 md:p-8 mt-14 bg-gradient-to-br
       from-[#0f0f0f] via-[#181818] to-[#111111] border border-gray-800 
       rounded-2xl shadow-2xl relative overflow-hidden h-[100vh] sm:h-[90vh] md:h-[80vh] lg:h-[80vh]"
      overlayClassName="bg-black/70 fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="text-white font-sans relative">
        {/* Close Icon */}
        <div className="absolute top-3 right-3 cursor-pointer hover:text-red-400 transition">
          <CloseIcon onClick={closeModal} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div>
            <h2
              className="text-2xl md:text-4xl font-poppins
             bg-gradient-to-r from-green-400 to-teal-300 text-transparent bg-clip-text mb-2"
            >
              Who Am I?
            </h2>

            <p
              className="text-sm  font-poppins brightness-125  
           
            leading-relaxed mb-4"
            >
              I’m a{" "}
              <span className="text-green-400 font-semibold">
                MERN Stack Developer
              </span>{" "}
              who loves turning concepts into full-fledged products. I thrive in
              building fast, scalable, and user-friendly web applications.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {skillName.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-green-600/10 border border-green-400 text-green-300 text-xs font-medium px-3 py-1 rounded-full hover:bg-green-600 hover:text-white transition duration-300"
                >
                  #{tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-green-400 mb-4">
              MERN <span className="text-3xl text-red-900">Stack</span>
            </h3>

            <div className="flex flex-wrap gap-5">
              {Mernimage.map(({ img, title, name }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group relative hover:scale-110 transition-transform"
                >
                  <img
                    src={img}
                    alt={title}
                    className="h-8 w-8 rounded-full  shadow-md"
                  />
                  <p className="text-green-300 text-xs mt-1">{title}</p>
                  <span className="absolute -top-7 bg-green-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Slider */}
          <div className="relative">
            {loading ? (
              <Spinner />
            ) : (
              <Slider {...sliderSettings}>
                {image.map((img, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center px-2"
                  >
                    <img
                      src={img}
                      alt={`MERN Slide ${i}`}
                      className="rounded-xl h-40 lg:h-72 object-cover shadow-xl border border-gray-700 hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutMeModel;
