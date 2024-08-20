import express from "express";
// import TestProduct from "./Models/productModel.js"; not using anywhere so might be unnecessary
const router = express.Router();
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../Controllers/productController.js";

router.get('/', getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product 
router.delete("/:id", deleteProduct);

export default router;