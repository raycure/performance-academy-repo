import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const handleLogout = (req, res) => {
    // INOTE delete the accesstoken when the button clicked

  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.sendStatus(204)
  
//   INOTE checked active session tokens find the current one with refresh token if the jwt token exist delete the token gotta give the same options 
// delete refresh token in the db these arent the same things gotta delete both refresh token and active users token
};
export default handleRefreshToken;
