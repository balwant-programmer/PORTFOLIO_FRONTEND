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
        const singleData = data?.projectData?.filter(
          (project) => project._id === id
        );
        setObjectSingle(singleData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-gradient-to-tr from-[#0f0f0f] to-[#1c1c1c] min-h-screen text-white font-poppins pb-20 pt-10 px-4">
      <Link
        to="/"
        className="inline-block mb-6 text-sm md:text-base font-semibold text-rose-400 hover:text-blue-300 transition duration-300 md:mt-16"
      >
        <span className="text-red-500 text-lg">↩</span> Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto bg-[#111] rounded-xl shadow-2xl overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          className="rounded-xl"
        >
          {objectSingle?.images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Project Slide ${idx}`}
                className="w-full h-[250px] sm:h-[550px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-[#1f1f1f] p-6 rounded-xl shadow-md space-y-6">
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {objectSingle?.introduction}
        </p>

        <div>
          <h2 className="text-xl font-semibold text-rose-400 mb-2">
            🛠️ Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {objectSingle?.Technology?.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-800 text-green-400 text-xs font-mono px-3 py-1 rounded-full border border-rose-500"
              >
                #{tech.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            🚀 Deployment Info
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {objectSingle?.deploy?.map((deploy, idx) => (
              <li key={idx}>{deploy}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            🌐 Visit Website
          </h2>
          <Link
            to={objectSingle?.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 underline hover:text-rose-400 transition"
          >
            {objectSingle?.websiteLink}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplore;
