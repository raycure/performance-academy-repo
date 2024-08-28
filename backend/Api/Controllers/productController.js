import Users from "../Models/userModel.js";
import Sessions from "../Models/sessionModel.js";
import pkg from "bcryptjs";
import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { SiPayloadcms } from "react-icons/si";
dotenv.config();
const { hash, compare } = pkg;

const test = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "401 testte" });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);
    const userIdFromToken = decoded.userId;

    res.json({ message: "Token payload", payload: userIdFromToken });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Users.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Users.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Users.delteMany({});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { test, updateProduct, deleteProduct };
