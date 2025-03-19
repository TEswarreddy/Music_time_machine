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
        Enter your <span className="font-semibold text-white">CLIENT_ID</span>,{" "}
        <span className="font-semibold text-white">CLIENT_SECRET</span>, and a 
        specific <span className="font-semibold text-white">date (YYYY-MM-DD)</span>. On that day, 
        the songs that were **telecasted on US Radio** will be added to your 
        **Spotify playlist** automatically.
      </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[20px] max-w-3xl leading-[30px]"
          >
            <span className="text-white font-bold">How to Get Your CLIENT_ID and CLIENT_SECRET?</span>
          </motion.p>

          <motion.ol
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-2 text-secondary text-[18px] max-w-3xl leading-[28px] list-decimal pl-5"
    >
      <li>
        Go to the{" "}
        <a
          href="https://developer.spotify.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          Spotify Developer Dashboard
        </a>.
      </li>
      <li>Log in with your Spotify account.</li>
      <li>
        Click on <span className="text-white font-semibold">"Create an App"</span>.
      </li>
      <li>
        Fill in the details:
        <ul className="list-disc pl-5 mt-1">
          <li>
            App Name:{" "}
            <span className="text-white font-semibold">Billboard Playlist Generator</span>
          </li>
          <li>
            Description:{" "}
            <span className="text-white font-semibold">
              Creates a Spotify playlist from Billboard charts
            </span>
          </li>
          <li>
            Redirect URI:{" "}
            <span className="text-white font-semibold">http://localhost:1234</span>
          </li>
        </ul>
      </li>
      <li>
        Click <span className="text-white font-semibold">"Create"</span>.
      </li>
      <li>Once your app is created, open it from the dashboard.</li>
      <li>
        Copy your <span className="text-white font-semibold">Client ID</span> and{" "}
        <span className="text-white font-semibold">Client Secret</span>.
      </li>
      <li>Paste them into your application where needed.</li>
    </motion.ol>


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
