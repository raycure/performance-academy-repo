import Users from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { decode, verify } = pkg;
import { ObjectId } from "mongodb";

const verifyMail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = await jwt.verify(token, process.env.MAIL_TOKEN_SECRET);
    const userId = decoded.userId;

    await Users.findOneAndUpdate({ _id: userId }, { verified: true });
    // { new: true } would return updated version for this file other files would get updated version with or without   { new: true }
    res.redirect("http://localhost:5173/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyMail;
