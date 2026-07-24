import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import UploadCard from "../components/UploadCard";
import AllergyInput from "../components/AllergyInput";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import FoodBot from "../components/FoodBot";

function Home() {

  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [images, setImages] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [loading, setLoading] = useState(false);


const analyzeProduct = async () => {

  if (images.length === 0) {
    alert("Please select at least one image.");
    return;
  }

  setLoading(true);

  try {

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    formData.append("allergies", allergies.join(","));

    const response = await api.post("/scan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("FULL RESPONSE");
console.log(response.data);
console.log("Ingredient Analysis:", response.data.ingredientAnalysis);

    navigate("/result", {
  state: response.data,
});

  } catch (error) {

  console.log("ERROR:", error);

  if (error.response) {
    console.log("Response:", error.response.data);
    console.log("Status:", error.response.status);

    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }

} finally {

    setLoading(false);

  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300 relative overflow-hidden">
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-30"></div>
    <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300 rounded-full blur-[150px] opacity-30"></div>

      <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="pt-4 relative text-center"
>

  <button
    onClick={toggleTheme}
    className="absolute top-4 right-8 text-2xl"
    title="Toggle Theme"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

        <img
          src={logo}
          alt="logo"
          className="w-12 mx-auto"
        />

        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mt-4 transition-colors">
          AllergyLens
        </h1>

       <p className="text-base text-gray-500 dark:text-gray-400 mt-2 transition-colors">
          AI Powered Food Safety Scanner
        </p>

      </motion.div>

     <div className="max-w-6xl mx-auto mt-3 px-4">

  <AllergyInput
    allergies={allergies}
    setAllergies={setAllergies}
  />

  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

    {/* Left Side */}

    <div>

      <UploadCard
  images={images}
  setImages={setImages}
  allergies={allergies}
  setAllergies={setAllergies}
  loading={loading}
  onAnalyze={analyzeProduct}
/>

    </div>

    {/* Right Side */}

    <FoodBot />

  </div>

</div>

<footer className="mt-10 border-t border-slate-200 dark:border-slate-700 bg-white/40 dark:bg-slate-900/70 backdrop-blur-sm transition-colors">

  <div className="max-w-6xl mx-auto py-6 text-center">

    <h3 className="text-blue-800 font-bold">
      AllergyLens
    </h3>

    <p className="text-gray-600 mt-2">
      AI Powered Food Safety Scanner
    </p>

    <p className="text-sm text-gray-500 mt-3">
      © {new Date().getFullYear()} AllergyLens. All Rights Reserved.
    </p>

    

  </div>

</footer>

</div>

);
}

export default Home;