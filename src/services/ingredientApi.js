import axios from "axios";

const API = "https://allergy-lens.onrender.com/api/v1";

export const explainIngredient = async (ingredient) => {
  const response = await axios.post(`${API}/ingredient/explain`, {
    ingredient,
  });

  return response.data;
};