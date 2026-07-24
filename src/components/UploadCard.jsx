import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef } from "react";

function UploadCard({
  images,
  setImages,
  allergies,
  setAllergies,
  loading,
  onAnalyze,
}){
  const galleryInput = useRef(null);
  const cameraInput = useRef(null);

  const openGallery = () => {
    galleryInput.current?.click();
  };

  const openCamera = () => {
    cameraInput.current?.click();
  };

  const onSelectImages = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  setImages([
    {
      file,
      preview: URL.createObjectURL(file),
    },
  ]);
};

  return (
    <motion.div
  whileHover={{
    scale: 1.02,
    y: -5,
  }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
      }}
      className="
w-full
max-w-[650px]
mx-auto
bg-white
rounded-3xl
shadow-xl
p-4
min-h-[540px]
flex
flex-col
items-center
"
    >
      <FaCloudUploadAlt
        size={32}
        className="mx-auto text-blue-700 animate-bounce"
      />

      <h2 className="text-xl font-bold text-center mt-4">
        Upload Product Image
      </h2>

      

      <div className="flex justify-center items-center gap-6 mt-6">

        <button
  onClick={openGallery}
  disabled={allergies.length === 0}
  className="
    flex
    items-center
    gap-3
    bg-blue-800
    hover:bg-blue-900
    text-white
    px-6
    py-3
    rounded-xl
    text-base
    shadow-lg
    transition
    hover:scale-105
    disabled:bg-gray-400
    disabled:cursor-not-allowed
    disabled:hover:scale-100
  "
>
  📁 Gallery
</button>

        <button
  onClick={openCamera}
  disabled={allergies.length === 0}
  className="
    flex
    items-center
    gap-3
    bg-green-600
    hover:bg-green-700
    text-white
    px-6
    py-3
    rounded-xl
    text-base
    shadow-lg
    transition
    hover:scale-105
    disabled:bg-gray-400
    disabled:cursor-not-allowed
    disabled:hover:scale-100
  "
>
  📷 Camera
</button>

      </div>
      {allergies.length === 0 && (
  <p className="mt-4 text-red-500 font-medium text-center">
    Please add at least one allergy before uploading images.
  </p>
)}

      <input
        ref={galleryInput}
        type="file"
        accept="image/*"
        hidden
        onChange={onSelectImages}
      />

      <input
        ref={cameraInput}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={onSelectImages}
      />

     {images.length > 0 ? (

  <div className="mt-5 text-center">

    <h3 className="text-xl font-bold text-blue-900 mb-4">
      Selected Image
    </h3>

    <div className="relative inline-block">

      <img
        src={images[0].preview}
        alt="Selected"
        className="w-28 h-28 rounded-3xl object-cover shadow-xl border-4 border-white"
      />

      <button
        onClick={() => setImages([])}
        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full shadow-lg"
      >
        ✕
      </button>

    </div>

  </div>

) : (

  <div className="mt-8">

    <h3 className="text-lg font-bold text-blue-900 mb-4">
      Popular Allergies
    </h3>

    <div className="flex flex-wrap justify-center gap-3">

      {[
        "Milk",
        "Peanut",
        "Egg",
        "Soy",
        "Wheat",
        "Fish",
        "Tree Nuts",
        "Shellfish",
      ].map((item) => (

        <button
          key={item}
          onClick={() => {
            if (!allergies.includes(item)) {
  setAllergies([...allergies, item]);
}
          }}
          className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white transition text-sm font-medium"
        >
          {item}
        </button>

      ))}

    </div>

  </div>

)}
      <button
  onClick={onAnalyze}
  disabled={loading}
  className="
    mt-8
    w-full
    bg-blue-700
    hover:bg-blue-800
    text-white
    py-3
    rounded-2xl
    text-lg
    font-semibold
    transition
    disabled:opacity-50
  "
>
  {loading ? "Analyzing..." : "Analyze Product"}
</button>
    </motion.div>
  );
}

export default UploadCard;