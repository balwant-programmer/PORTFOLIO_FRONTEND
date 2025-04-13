import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { aboutMeData } from "../api/aboutMeApi";
import Spinner from "../Spinner";
import { useDispatch } from "react-redux";
import { HidentheNavAndmore } from "../redux/Slice/throuaboutHihdeSlice";
import { Mernimage } from "../Data/mernImage";
import { skillName } from "../Data/SkillName";
const AboutMeModel = ({ isOpen, setIsOpen }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1000,
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
          if (success) {
            setImageData(imageData?.aboutMeImage);
            setLoading(false);
          }
        } catch (error) {
          console.log("Error while fetching image data: ", error);
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

  const [image, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="About Me Modal"
        className="mx-2 lg:mx-20 xl:mx-64 p-2 lg:p-6 lg:mt-24 my-10 border-1 border-black  rounded-lg bg-gray-950 shadow-2xl z-50 relative"
        overlayClassName="bg-black  bg-opacity-60 fixed inset-0"
      >
        <div className="text-white">
          <div
            className="absolute top-1 right-1 cursor-pointer text-white
           hover:text-gray-400 shadow flex items-center justify-center rounded-full transition duration-300"
          >
            <CloseIcon
              titleAccess="close"
              fontSize="small"
              onClick={closeModal}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-sm font-serif mr-64 text-cyan-300 mb-2">
                About Me
              </h2>

              <p className="font-serif text-xs select-none text-green-100 mb-4 lg:text-left">
                I'm a passionate MERN stack developer, always learning and
                improving. My journey in full-stack development has taught me a
                lot about building scalable and efficient applications.
              </p>
              <div
                className="flex flex-wrap 
              cursor-pointer gap-2  justify-start
               lg:justify-start"
              >
                {skillName?.map((tech, index) => (
                  <p
                    key={index}
                    className="font-serif border 
                    px-2 rounded-3xl
                    border-green-400
                     shadow-lg 
                     shadow-green-600 text-[11px]
                      text-gray-300
                     hover:bg-green-700
                      hover:text-white transition
                       duration-300"
                  >
                    #{tech}
                  </p>
                ))}
              </div>
              <div>
                <h2
                  className="text-md font-serif
                 mt-7 text-green-500 mb-10"
                >
                  Mern{" "}
                  <span className="text-red-500 font-serif   text-md">
                    Stack
                  </span>
                </h2>
                <div className="flex gap-8 mr-24  items-center justify-start">
                  {Mernimage.map(({ img, title, name }, i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer flex-col items-center relative group"
                    >
                      <img
                        src={img}
                        className="object-cover rounded-full h-5 w-5 md:h-5 md:w-5"
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
                  ))}
                </div>
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <Slider {...settings}>
                {image?.map((img, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={img}
                      alt="MERN Stack"
                      className="w-full brightness-150    h-52 lg:h-72 md:h-72 object-cover"
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AboutMeModel;
