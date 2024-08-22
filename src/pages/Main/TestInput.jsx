import React, { useState } from "react";
import { createProduct } from "../../../Api/Controllers/productController.js";
import api from "../api/axios.js";


function TestInput() {
  const [name2, setName] = useState("");
  const [password, setPassword] = useState("deneme");
  const REGISTER_URL = "/api/products"

  const handleChange = (e) => {
    setName(e.target.value);
  };
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        REGISTER_URL,
        JSON.stringify({ name: name2, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
    
    // try {
    //   const response = await fetch('http://localhost:3001/api/products', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({name: name2, password
    //     }),
    // })
    // } catch (error) {
    //   console.log("Error:", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
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