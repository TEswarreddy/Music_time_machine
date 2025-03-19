import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const CreatePlaylist = () => {
  const [form, setForm] = useState({
    CLIENT_ID: "",
    CLIENT_SECRET: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://music-time-machine.onrender.com/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Playlist created: ${data.playlist_name}`);
      } else {
        alert("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className="flex flex-col items-center bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <motion.h2
        variants={textVariant()}
        className="text-white text-2xl font-bold mb-6"
      >
        Create Spotify Playlist
      </motion.h2>

      <motion.form
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <input
          type="CLIENT_ID"
          name="CLIENT_ID"
          value={form.CLIENT_ID}
          onChange={handleChange}
          placeholder="CLIENT_ID"
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="CLIENT_SECRET"
          name="CLIENT_SECRET"
          value={form.CLIENT_SECRET}
          onChange={handleChange}
          placeholder="CLIENT_SECRET"
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
        >
          {loading ? "Creating..." : "Create Playlist"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default SectionWrapper(CreatePlaylist, "create-playlist");
