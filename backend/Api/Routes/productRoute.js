import express from "express";
const router = express.Router();
import { getProducts, getProduct, updateProduct, deleteProduct, login } from "../Controllers/productController.js";

router.post("/", login);
router.get('/', getProducts);
router.get("/:id", getProduct);
// router.post("/", createProduct);



// update a product
router.put("/:id", updateProduct);

// delete a product 
router.delete("/:id", deleteProduct);

export default router;