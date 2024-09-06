import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Sessions from "../Models/sessionModel.js";
dotenv.config();
import { ObjectId } from "mongodb";
import Users from "../Models/userModel.js";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  //checks if theres no refresh token
  if (!cookies?.jwt)
    return res.status(401).json({ message: "Refresh token not found" });

  const refreshToken = cookies.jwt;
  const decoded = jwt.decode(refreshToken);
  const userIdFromToken = decoded.userId;
  const foundUser = await Sessions.findOne({
    userId: new ObjectId(userIdFromToken).toHexString(),
  });

  if (!foundUser) return res.status(403).json({ message: "fakeid" });
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        await Sessions.findOneAndDelete(foundUser);
      }
      const accessToken = jwt.sign(
        { userId: userIdFromToken },

        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.json({ accessToken });
    }
  );
};
export default handleRefreshToken;
