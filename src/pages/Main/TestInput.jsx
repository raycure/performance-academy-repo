import React, { useState } from "react";
import { createProduct } from "../../../Api/Controllers/productController.js";
import axios from "../api/axios.js";


function TestInput() {
  const [name2, setName] = useState("");
  const [password, setPassword] = useState("deneme");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      const response = await axios.post('/api/products', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name2, password
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
