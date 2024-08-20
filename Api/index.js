import express from "express";
import mongoose from "mongoose";
import TestProduct from "./Models/productModel.js";
import productRoute from "./Routes/productRoute.js"
import cors from "cors"

const port = 3001

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);

app.post('/api/products', (req, res) => {
  // Handle the POST request here
  console.log(req.body); // Log the request body to see what is being sent
  res.json({ message: 'Product created successfully!' });
});

mongoose
  .connect(
    "mongodb+srv://devemresr:IHybYDDzzbfGdcGe@performance-academy.2x7gw.mongodb.net/Performance_Academy?retryWrites=true&w=majority&appName=Performance-Academy"
  )
  .then(() => {
    console.log("connected");
    app.listen(3001, () => {
      console.log("port 3000");
    });
  })
  .catch(() => {
    console.log("didnt connect");
  });


  export default app