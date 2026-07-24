import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { explainIngredient } from "../services/ingredientApi";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaExclamationTriangle,
  FaRobot,
  FaLightbulb,
  FaAllergies,
  FaLeaf,
  FaFire,
  FaHeartbeat,
} from "react-icons/fa";

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedIngredient, setSelectedIngredient] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [ingredientInfo, setIngredientInfo] = useState(null);
const [loadingIngredient, setLoadingIngredient] = useState(false);
const [showAllIngredients, setShowAllIngredients] = useState(false);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }
const openIngredient = async (ingredient) => {

  setSelectedIngredient(ingredient);
  setModalOpen(true);

  setLoadingIngredient(true);

  try {

    const data = await explainIngredient(ingredient);

    setIngredientInfo(data);

  } catch {

    setIngredientInfo("Unable to fetch ingredient details.");

  }

  setLoadingIngredient(false);

};

  const {
    productName,
    safe,
    riskLevel,
    healthScore,
    confidence,
    summary,
    recommendation,
    triggeredAllergies,
    ingredientAnalysis,
    nutrition,
    healthInsights,
  } = state;

  const getHealthTip = () => {

  if (healthScore >= 85) {
    return {
      title: "🌟 Excellent Choice",
      color: "green",
      message:
        "This product is a healthy choice and can be included in your diet in moderation.",

      eat: [
        "🥗 Fresh vegetables",
        "🍎 Seasonal fruits",
        "🥛 Low-fat dairy",
        "🌾 Whole grains"
      ],

      avoid: [
        "🍟 Deep fried snacks",
        "🥤 Sugary drinks"
      ]
    };
  }

  if (healthScore >= 60) {
    return {
      title: "🥗 Healthy Choice",
      color: "blue",
      message:
        "Generally safe to consume, but maintain a balanced diet.",

      eat: [
        "🥦 Green vegetables",
        "🍗 Protein-rich foods",
        "🥜 Nuts"
      ],

      avoid: [
        "🍬 Excess sweets",
        "🍕 Too much fast food"
      ]
    };
  }

  if (healthScore >= 40) {
    return {
      title: "⚠ Consume Occasionally",
      color: "yellow",
      message:
        "Consume occasionally and balance it with nutritious foods.",

      eat: [
        "🥗 Salad",
        "🍉 Fruits",
        "💧 Plenty of water"
      ],

      avoid: [
        "🍔 Junk food",
        "🍟 Chips"
      ]
    };
  }

  return {
    title: "🚫 Better to Avoid",
    color: "red",
    message:
      "Choose healthier alternatives whenever possible.",

    eat: [
      "🥬 Vegetables",
      "🍎 Fruits",
      "🥣 Homemade meals"
    ],

    avoid: [
      "🥤 Soft drinks",
      "🍩 Processed snacks"
    ]
  };

};

const healthTip = getHealthTip();

const uniqueIngredients = [
  ...new Map(
    ingredientAnalysis.map(item => [item.simpleTerm.toLowerCase(), item])
  ).values()
];

const visibleIngredients = showAllIngredients
  ? uniqueIngredients
  : uniqueIngredients.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-cyan-50 pb-12">

      {/* Header */}

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto px-6 pt-10"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
        >
          <FaArrowLeft />
          Scan Another Product
        </button>

        <h1 className="text-5xl font-bold text-blue-900 mt-6">
          {productName}
        </h1>
      </motion.div>

      {/* Top Grid */}

      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Overall Result */}

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">
            Overall Result
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between">
              <span className="font-semibold">Safety</span>

              {safe ? (
                <span className="flex items-center gap-2 text-green-600 font-bold">
                  <FaShieldAlt />
                  Safe
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 font-bold">
                  <FaExclamationTriangle />
                  Unsafe
                </span>
              )}
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">
                Risk Level
              </span>

              <span className="font-bold">
                {riskLevel}/10
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">
                Health Score
              </span>

              <span className="font-bold">
                {healthScore}/100
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">
                Confidence
              </span>

              <span className="font-bold">
                {confidence}
              </span>
            </div>

          </div>
        </motion.div>

        {/* Health Score */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:col-span-2 flex items-center justify-center"
        >
          <div className="text-center">

            <div className="w-52 h-52 rounded-full border-8 border-blue-600 flex items-center justify-center mx-auto">

              <div>

                <p className="text-6xl font-bold text-blue-700">
                  {healthScore}
                </p>

                <p className="text-gray-500">
                  Health Score
                </p>

              </div>

            </div>

            <p className="mt-8 text-gray-500">
              AI analyzed your product ingredients and nutrition.
            </p>

          </div>

        </motion.div>

      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-white rounded-3xl shadow-xl p-8"
>

  <h2 className="text-3xl font-bold mb-4">
    💚 Personalized Health Tip
  </h2>

  <h3 className="text-xl font-semibold text-green-700 mb-3">
    {healthTip.title}
  </h3>

  <p className="text-gray-700 leading-7 mb-6">
    {healthTip.message}
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    <div>

      <h4 className="font-bold mb-3">
        ✅ Eat More
      </h4>

      {healthTip.eat.map((item) => (

        <p key={item} className="mb-2">
          {item}
        </p>

      ))}

    </div>

    <div>

      <h4 className="font-bold mb-3 text-red-600">
        🚫 Limit
      </h4>

      {healthTip.avoid.map((item) => (

        <p key={item} className="mb-2">
          {item}
        </p>

      ))}

    </div>

  </div>

</motion.div>
        {/* AI Summary */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >

          <div className="flex items-center gap-3 mb-6">

            <FaRobot className="text-blue-600 text-3xl" />

            <h2 className="text-3xl font-bold">
              AI Summary
            </h2>

          </div>

          <p className="text-lg leading-8 text-gray-700">
            {summary}
          </p>

        </motion.div>
                {/* Recommendation */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaLightbulb className="text-yellow-500 text-3xl" />

            <h2 className="text-3xl font-bold">
              Recommendation
            </h2>
          </div>

          <p className="text-lg leading-8 text-gray-700">
            {recommendation}
          </p>
        </motion.div>

        {/* Triggered Allergies */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">

            <FaAllergies className="text-red-600 text-3xl" />

            <h2 className="text-3xl font-bold">
              Triggered Allergies
            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {triggeredAllergies.length === 0 ? (

              <span className="text-green-600 font-semibold">
                No allergy detected 🎉
              </span>

            ) : (

              triggeredAllergies.map((item, index) => (

                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-5 py-3 rounded-full font-semibold"
                >
                  {item}
                </span>

              ))

            )}

          </div>

        </motion.div>

      {/* Ingredient Analysis */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
  className="bg-white rounded-3xl shadow-xl p-8"
>
  <h2 className="text-3xl font-bold mb-8">
    🧪 Ingredient Analysis
  </h2>

  <div className="space-y-4">
    {visibleIngredients.map((item, index) => (
      <div
        key={index}
        onClick={() => openIngredient(item.ingredient)}
        className="bg-slate-50 rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition"
      >
        <div className="flex items-start gap-3">
          <span className="text-xl">
            {item.status ? "🟢" : "🔴"}
          </span>

          <div>
            <h3 className="font-semibold">
              {item.simpleTerm}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.ingredient}
            </p>
          </div>
        </div>
      </div>
    ))}

    {uniqueIngredients.length > 8 && (
      <div className="text-center mt-5">
        <button
          onClick={() => setShowAllIngredients(!showAllIngredients)}
          className="text-blue-600 font-semibold hover:underline"
        >
          {showAllIngredients
            ? "Show Less"
            : `View All (${uniqueIngredients.length})`}
        </button>
      </div>
    )}
  </div>
</motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >

          <h2 className="text-3xl font-bold mb-8">
            🥗 Nutrition Facts
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

            <div className="bg-orange-100 rounded-2xl p-5 text-center">
              <FaFire className="mx-auto text-3xl mb-3" />
              <p className="font-bold">Calories</p>
              <p>{nutrition.calories}</p>
            </div>

            <div className="bg-green-100 rounded-2xl p-5 text-center">
              <p className="font-bold">Protein</p>
              <p>{nutrition.protein}</p>
            </div>

            <div className="bg-yellow-100 rounded-2xl p-5 text-center">
              <p className="font-bold">Fat</p>
              <p>{nutrition.fat}</p>
            </div>

            <div className="bg-blue-100 rounded-2xl p-5 text-center">
              <p className="font-bold">Carbs</p>
              <p>{nutrition.carbs}</p>
            </div>

            <div className="bg-pink-100 rounded-2xl p-5 text-center">
              <p className="font-bold">Sugar</p>
              <p>{nutrition.sugar}</p>
            </div>

          </div>

        </motion.div>

        {/* Health Insights */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >

          <div className="flex items-center gap-3 mb-6">

            <FaLeaf className="text-green-600 text-3xl" />

            <h2 className="text-3xl font-bold">
              Health Insights
            </h2>

          </div>

          <div className="space-y-4">

            {healthInsights.map((item, index) => (

              <div
                key={index}
                className="bg-green-50 rounded-xl p-5 flex items-center gap-4"
              >

                <FaHeartbeat className="text-green-600" />

                <p>{item}</p>

              </div>

            ))}

          </div>

        </motion.div>

           </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-xl">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                🧪 {selectedIngredient}
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl font-bold text-gray-500 hover:text-red-500"
              >
                ×
              </button>

            </div>

            {loadingIngredient ? (

              <p className="text-gray-600">
                🤖 AI is explaining this ingredient...
              </p>

            ) : (

              <div className="space-y-6">

  <div>
    <h3 className="font-bold text-lg mb-2">
      📖 Description
    </h3>

    <p className="text-gray-700">
      {ingredientInfo?.description}
    </p>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-2">
      🍜 Common Uses
    </h3>

    <ul className="list-disc pl-6 space-y-1">

      {ingredientInfo?.commonUses?.map((item) => (

        <li key={item}>
          {item}
        </li>

      ))}

    </ul>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-2">
      ⚠ Allergy Warnings
    </h3>

    <div className="flex flex-wrap gap-2">

      {ingredientInfo?.allergyWarnings?.map((item) => (

        <span
          key={item}
          className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
        >
          {item}
        </span>

      ))}

    </div>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-2">
      💡 Recommendation
    </h3>

    <p className="text-gray-700">
      {ingredientInfo?.recommendation}
    </p>
  </div>

</div>

            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Result;