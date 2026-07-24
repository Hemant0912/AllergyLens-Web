import { useState } from "react";

function AllergyInput({ allergies, setAllergies }) {

  const [value, setValue] = useState("");

  const addAllergy = () => {

    if (value.trim() === "") return;

    if (allergies.includes(value.trim())) return;

    setAllergies([...allergies, value.trim()]);

    setValue("");
  };

  const removeAllergy = (index) => {

    setAllergies(
      allergies.filter((_, i) => i !== index)
    );

  };

  return (
    <div className="mt-2 max-w-3xl mx-auto text-center">

      <h2 className="text-xl font-bold text-blue-900 mb-3">
        Allergies
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-3">

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
  if (e.key === "Enter") {
    addAllergy();
  }
}}
          placeholder="Enter allergy..."
          className="
w-full
sm:max-w-md
px-5
py-2
rounded-xl
border
outline-none
text-base
"
        />

        <button
  onClick={addAllergy}
  className="
    w-full
    sm:w-auto
    bg-blue-800
    text-white
    px-8
    py-3
    rounded-xl
    hover:bg-blue-900
  "
>
  Add
</button>

      </div>

      <div className="flex justify-center flex-wrap gap-3 mt-2">

        {allergies.map((allergy, index) => (

          <div
            key={index}
            className="
            bg-blue-800
            text-white
            px-5
            py-2
            rounded-full
            flex
            items-center
            gap-3
            "
          >

            {allergy}

            <button
              onClick={() => removeAllergy(index)}
            >
              ✕
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AllergyInput;