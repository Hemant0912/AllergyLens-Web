import axios from "axios";

const API = "https://allergy-lens.onrender.com/api/v1";

export const askFoodBot = async (message) => {
  const response = await axios.post(`${API}/chat`, {
    message,
  });

  return response.data;
};