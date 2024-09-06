import Users from "../Models/userModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import EmailSender from "./emailSender.js";

const register = async (req, res) => {
  try {
    console.log(req.body);

    const { email } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        attempts: existingUser,
        success: false,
        result: null,
        message: "Email already in use.",
      });
    }

    const hashedPassword = await hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await Users.create(req.body);
    const userId = new ObjectId(newUser).toHexString();

    const emailVerifyToken = jwt.sign(
      {
        userId: userId,
      },
      process.env.MAIL_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const verifyLink = process.env.ACTIVATION_LINK + "/" + emailVerifyToken;
    try {
      await EmailSender(verifyLink, email);
    } catch (error) {
      return "email couldnt been sent";
    }
    existingUser.attemptsToLogin = 0;
    await existingUser.save();
    res.sendStatus(200);

    // todo response with the users id nothing else ig.
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error." });
  }
};

export default register;
