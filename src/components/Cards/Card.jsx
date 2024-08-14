import React, { useState } from "react";
import "./cardStyle.css";

function Card({ backContent }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setFlipped(false);
    }, 30000);
    setFlipped(!flipped);
  };

  return (
    <div className="card-container">
      <div onClick={handleClick} className={`card ${flipped ? "flipped" : ""}`}>
        <div className="back">Back</div>
        <div className="front cardContent">{backContent}</div>
      </div>
    </div>
  );
}

export default Card;
