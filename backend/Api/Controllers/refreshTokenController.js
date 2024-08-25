import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Sessions from "../Models/sessionModel.js";
dotenv.config();
import { ObjectId } from "mongodb";


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  
  if (!cookies?.jwt) return res.status(401).json({ message: "Refresh token not found" });
  const refreshToken = cookies.jwt;
  const decoded = jwt.decode(refreshToken);
  const userIdFromToken = decoded.userId;
  const foundUser = await Sessions.findOne({userId: new ObjectId(userIdFromToken).toHexString()})

  if(!foundUser) return res.status(403).json({message: "fakeid"})
  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
          const accessToken = jwt.sign(
              { "userId": decoded.userId },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '10m' }
          );
          res.json({ accessToken })
      }
  );
};
export default handleRefreshToken;