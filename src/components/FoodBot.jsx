
import { askFoodBot } from "../services/chatApi";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function FoodBot() {
  const [messages, setMessages] = useState([
  {
    sender: "bot",
    text:
      "👋 Hello! I'm FoodBot AI.\n\nAsk me anything about food, nutrition, ingredients, allergies, or healthy eating.",
  },
]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await askFoodBot(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't answer that. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };
  const sendQuickQuestion = async (question) => {

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: question,
    },
  ]);

  setLoading(true);

  try {

    const data = await askFoodBot(question);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.reply,
      },
    ]);

  } catch {

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Sorry, I couldn't answer that.",
      },
    ]);

  }

  setLoading(false);

};

  return (
    <motion.div
  whileHover={{
    scale: 1.02,
    y: -5,
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
justify-between
"
>

      <div className="text-center mb-2">

        <motion.img
  src="/foodbot.png"
  alt="FoodBot"
  animate={{
  y: [0, -12, 0],
  rotate: [-2, 2, -2],
}}
  transition={{
    repeat: Infinity,
    duration: 2.5,
  }}
  className="w-24 mx-auto drop-shadow-xl"
/>

        <h2 className="text-xl font-extrabold mt-2 text-blue-900">
  FoodBot AI
</h2>
        
        <p className="text-gray-500 mt-1">
  Your personal AI food safety assistant
</p>
<div className="flex flex-wrap justify-center gap-2 mt-2">

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
    🥗 Nutrition
  </span>

  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
    🥜 Allergies
  </span>

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
    🍕 Ingredients
  </span>

  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
    ❤️ Healthy Eating
  </span>

</div>

      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mt-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            className="bg-slate-100 inline-block rounded-xl px-4 py-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl w-fit">

    <motion.span
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1 }}
    >
        🤖
    </motion.span>

    <div className="flex gap-1">

        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="w-2 h-2 bg-blue-500 rounded-full"
        />

        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: 0.2,
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
        />

        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: 0.4,
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
        />

    </div>

</div>
          </motion.div>
        )}
<div ref={chatEndRef}></div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">

  {[
    "Can I eat Maggi?",
    "Is Pizza healthy?",
    "Can I eat soya manchurian?",
    "Is Coke healthy?",
    "High protein foods"
  ].map((question) => (

    <button
      key={question}
      onClick={() => sendQuickQuestion(question)}
      className="
        px-3
        py-2
        rounded-full
        bg-blue-50
        hover:bg-blue-600
        hover:text-white
        transition
        text-sm
      "
    >
      {question}
    </button>

  ))}

</div>

      <div className="mt-auto pt-4 flex gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask about any food..."
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
        />

        <button
  onClick={sendMessage}
  disabled={loading}
          className="
bg-blue-600
hover:bg-blue-700
disabled:bg-gray-400
disabled:cursor-not-allowed
text-white
px-4
rounded-xl
"
        >
          <FaPaperPlane />
        </button>

      </div>

    </motion.div>
  );
}