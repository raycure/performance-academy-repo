import Users from "../Models/userModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const register = async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await Users.create(req.body);
    const userId = new ObjectId(newUser).toHexString();

    const emailVerifyToken = jwt.sign(
      {
        userId: userId,
      },
      process.env.MAIL_TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, emailVerifyToken) => {
        const verifyLink = process.env.ACTIVATION_LINK + "/" + emailVerifyToken;

        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "evangeline.littel96@ethereal.email",
            pass: "8UN25hkSTYyHZKxSVM",
          },
        });

        const info = transporter.sendMail({
          from: '"admin" <13garbomail@gmail.com>', // sender address
          to: "dev.emresr@gmail.com", // list of receivers
          subject: "reg mail", // Subject line
          text: `${verifyLink}`, // plain text body
          html: `please click this link i wont bite i promise <a href="${verifyLink}">${verifyLink}</a>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
      }
    );

    res.sendStatus(200);

    // todo response with the users id nothing else ig.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default register;
