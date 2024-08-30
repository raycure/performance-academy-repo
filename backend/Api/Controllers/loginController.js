import Users from "../Models/userModel.js";
import pkg from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Sessions from "../Models/sessionModel.js";
dotenv.config();
const { hash, compare } = pkg;

const login = async (req, res) => {
  const { email, password } = req.body;

  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().required(),
  });
  const { error, value } = objectSchema.validate({ email, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: "Invalid/Missing credentials.",
      errorMessage: error.message,
    });
  }

  const user = await Users.findOne({ email: email, removed: false });
  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: "No account with this email has been registered.",
    });
  let databasePassword = await Users.findOne({ _id: user._id, removed: false });

  const isMatch = await pkg.compare(password, databasePassword.password);

  if (!isMatch)
    return res.status(403).json({
      success: false,
      result: null,
      message: "Invalid credentials.",
    });

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3s" }
  );
  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "Lax",
    path: "/",
    secure: false, // add secure true for prod
  });
  const addActiveUser = await Sessions.create({
    token: refreshToken,
    userId: user._id,
    // expiresAt: new Date(Date.now() + 30 * 1000), // 7 days from now
  });

  return res.json({
    accessToken: accessToken,
    foundUser: addActiveUser,
    message: "Successfully login user",
  });
};

export default login;
