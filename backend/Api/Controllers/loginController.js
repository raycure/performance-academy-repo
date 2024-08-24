import Users from "../Models/productModel.js";
import pkg from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
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
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
  const refreshToken = jwt.sign(
    {
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // res.cookie("jwt", refreshToken, { maxAge: 1000 * 10}); // httpOnly: true add later
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.json({ accessToken });
};

export default login;


//  INOTE The client should store the access token temporarily and include it in the Authorization header for protected API requests.
