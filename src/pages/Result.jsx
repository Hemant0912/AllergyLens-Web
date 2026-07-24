import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

            {ingredientAnalysis.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-slate-50 rounded-xl p-5"
              >

                <div>

                  <p className="font-bold text-lg">
                    {item.ingredient}
                  </p>

                  <p className="text-gray-500">
                    {item.simpleTerm}
                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full font-bold ${
                    item.status
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status ? "Unsafe" : "Safe"}
                </span>

              </div>

            ))}

          </div>

        </motion.div>

        {/* Nutrition */}

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

    </div>
  );
}

export default Result;