import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "no token verifyda" });
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({"message": "verifyda 403"}); // invalid token
    req.user = decoded.username; // decoded will contain the decoded payload of the token if the verification is successful.
    next();
  });
};

export default verifyJWT;


// plan 
// login oldugunda token at tokenlari storela verifyla direkt
// auth gereken islemlerde verify ve gerekse refresh cagir 
// logoutta cookielerden tokeni sil ve dbdeki active usertokenlardan tokeni sil