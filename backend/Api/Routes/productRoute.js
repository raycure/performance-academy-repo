import express from "express";
const router = express.Router();
import {
  getProducts,
  getProduct,
  updateProduct,
  register,
  deleteProduct,
  login,
} from "../Controllers/productController.js";
import verifyJWT from "../Middleware/verifyJWT.js";


router.post("/register", register);
router.get("/", verifyJWT ,getProducts);
router.get("/:id", getProduct);
// router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

export default router;
