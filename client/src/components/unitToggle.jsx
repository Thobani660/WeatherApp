import React from "react";

function UnitToggle({ unit, toggleUnit }) {
  return (
    <div className="unit-toggle">
      <button
        onClick={toggleUnit}
        style={{
          border: "1px solid gold",
          boxShadow: "0 4px 8px rgba(201, 132, 4, 0.89)",
          marginTop: "-150px",
        }}
      >
        Switch to {unit === "imperial" ? "Celsius" : "Fahrenheit"}
      </button>
    </div>
  );
}

export default UnitToggle;
