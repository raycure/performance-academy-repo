import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ message: "No refresh token found" });
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // check if the users refresh token is in the database? if its not return 403
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403); // if(err  || aktif olan kullanicin usernamei ile === decoded.username yani tokenda yazan kullanici ismi ayni mi diye kontrol ediliyo)
    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
};
export default handleRefreshToken;
