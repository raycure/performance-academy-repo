import Users from "../Models/productModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const register = async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const product = await Users.create(req.body);
    const userId = new ObjectId(product).toHexString();

    const emailVerifyToken = jwt.sign(
      {
        userId: userId,
      },
      process.env.MAIL_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // const verifyLink = `${process.env.ACTIVATION_LINK} + ${emailVerifyToken}`
    const verifyLink = process.env.ACTIVATION_LINK + "/" + emailVerifyToken;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "murray.damore47@ethereal.email",
        pass: "nZD2kd79HKKgbjbfJd",
      },
    });

    const info = await transporter.sendMail({
      from: '"Maddison " <13garbomail@gmail.com>', // sender address
      to: "dev.emresr@gmail.com", // list of receivers
      subject: "Hello", // Subject line
      text: `${verifyLink}`, // plain text body
      html: `${verifyLink}`, // html body
    });
    console.log("Message sent: %s", info.messageId);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default register;
