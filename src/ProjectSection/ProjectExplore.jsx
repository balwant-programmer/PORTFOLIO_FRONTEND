import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getprojectApi } from "../api/api_url";
import axios from "axios";
import Spinner from "../Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css/bundle";

const ProjectExplore = () => {
  const { id } = useParams();
  const [objectSingle, setObjectSingle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getprojectApi);
        console.log(data?.projectData);
        if (data?.projectData && data?.projectData.length > 0) {
          const singleData = data?.projectData?.filter(
            (project) => project._id === id
          );
          setObjectSingle(singleData[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Link
        to="/"
        className="text-end absolute md:mt-16 sm:mt-16 lg:top-16 right-3
         top-1 px-3 rounded focus:text-blue-400 font-bold hover:text-red-300 text-green-400"
      >
        <span className="text-red-600">↩ </span> back
      </Link>

      <div
        className="bg-white font-serif select-none lg:mx-72 md:mx-24
       mx-1 mt-6 md:mt-12 rounded-xl  overflow-hidden"
      >
        <div
          className="swiper-container"
          style={{ width: "100%", height: "250px" }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
            spaceBetween={-10}
            slidesPerView={2}
            loop={true}
            Pagination
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {objectSingle?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="prjectimage" width={250} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className=" md:mx-64 space-y-4 bg-gray-100 px-3 py-1 rounded-md">
        <div>
          <p className="md:text-lg text-gray-600 text-sm  font-poppins text-md">
            {objectSingle?.introduction}
          </p>
        </div>

        <div className="select-none">
          <h2 className="md:text-2xl font-serif  text-black mb-2  text-md select-none">
            Technology
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {objectSingle?.Technology?.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-900 brightness-200 text-green-500 px-4 p-1 font-mono shadow-inner shadow-rose-500 rounded-full text-sm"
              >
                #{tech?.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="select-none">
          <h2 className="md:text-2xl font-serif text-lg text-gray-800 mb-2 select-none">
            Deploy
          </h2>
          <div className="text-lg text-gray-600 ">
            {objectSingle?.deploy?.map((deploy, idx) => (
              <p
                key={idx}
                className="mt-2 text-blue-500 font-serif text-sm select-none"
              >
                {deploy}
              </p>
            ))}
          </div>
        </div>

        <div className="pb-24 select-none">
          <p className="text-lg text-gray-800 mb-2 font-serif text-md">
            Website Link
          </p>
          <Link
            to={objectSingle?.websiteLink}
            className="text-blue-500 font-poppins text-md hover:text-blue-700 underline"
          >
            Open Website
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectExplore;
