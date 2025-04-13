import React, { useEffect } from "react";
import HomeHeroSection from "./HomeHeroSection";
import Timeline from "./Timeline";
import { motion } from "framer-motion";
import AboutMe from "./AboutMe";
import NavSkill from "./NavSkill";
import ProjectHome from "../ProjectSection/projectHome";
import ContactUse from "./ContactUse";

const Home = () => {
  useEffect(() => {
    document.title = "Balwant portFolio";
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <HomeHeroSection />
      </motion.div>
      <Timeline />
      <AboutMe />
      <NavSkill />
      <ProjectHome />
      <ContactUse />
    </div>
  );
};

export default Home;
