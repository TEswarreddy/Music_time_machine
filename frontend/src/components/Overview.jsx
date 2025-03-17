import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Overview = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Project Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[20px] max-w-4xl leading-[30px]"
      >
        Enter your <span className="font-semibold text-white">email</span>,{" "}
        <span className="font-semibold text-white">password</span>, and a 
        specific <span className="font-semibold text-white">date (day/month/year)</span>. On that day, 
        the songs that were **telecasted on US Radio** will be added to your 
        **Spotify playlist** automatically.
      </motion.p>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[20px] max-w-3xl leading-[30px]"
      >
        This project is built using **React.js** for the frontend, **flask**
        for the backend, and **Spotify API** for the playlist creation.

      </motion.p>

      {/* Tilt effect for a visual element (optional) */}
      <div className="mt-10 flex justify-center">
        <Tilt className="xs:w-[250px] w-full">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[180px] flex justify-center items-center flex-col">
              <h3 className="text-white text-[20px] font-bold text-center">
                Find Your Past Music 🎶
              </h3>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </>
  );
};

export default SectionWrapper(Overview, "overview");
