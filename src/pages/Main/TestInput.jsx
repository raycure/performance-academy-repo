import React, { useState } from "react";
import { createProduct } from "../../../Api/Controllers/productController.js";


function TestInput() {
  const [name2, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name2
        }),
    })
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="/api/products" method="POST">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name2}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </label>

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}

export default TestInput;
