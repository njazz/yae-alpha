import React, { useState } from "react";

// Single Fader component
const Fader = ({ index, onChange }) => {
  const [value, setValue] = useState(0);

  const handleInput = (e) => {
    const val = Number(e.target.value);
    setValue(val);
    if (onChange) onChange(index, val);
  };

  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "2px", color: "#fff", textAlign: "left" }}>
        {`F${index}: ${value}%`}
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleInput}
        style={{
          width: "100%",
          height: "36px",
          borderRadius: "5px",
          appearance: "none",
          WebkitAppearance: "none",
          background: `linear-gradient(to right, #ff6633 ${value}%, #555 ${value}%)`,
          outline: "none",
          cursor: "pointer",
          border: "1px #fff",
          margin: "0px"
        }}
      />
    </div>
  );
};

// Page containing 8 Faders as a rounded panel
const FadersPage = ({ onFaderChange }) => {
  return (
    <div
      id="faders"
      className="faders"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "5px",
        // margin: "5px",
        borderRadius: "5px",
        backgroundColor: "#333",
        width: "12vw",
      }}
    >
  {
    Array.from({ length: 8 }, (_, i) => (
        <Fader key={i} index={i} onChange={onFaderChange} />
      ))
  }

    
      
    </div>
  );
};

export default FadersPage;
