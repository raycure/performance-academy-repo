import Users from "../Models/productModel.js";
import jwt, { decode } from "jsonwebtoken";
import { ObjectId } from "mongodb";

const verifyMail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = await jwt.verify(token, process.env.MAIL_TOKEN_SECRET);
    const userId = decoded.userId;
    console.log("userId vermailcontrollerda: ", userId);

    const updateVerifyStatus = await Users.updates;
    // todo update active state
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyMail;
