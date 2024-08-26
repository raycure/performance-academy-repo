import Users from "../Models/productModel.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const verifyMail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = await jwt.verify(token, process.env.MAIL_TOKEN_SECRET)
    const userId = decoded.userId
    res.status(200).json({ value: token, decide: userId});
    // const updateVerifyStatus = await Users.updates
    // todo update active state
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyMail;


// import Users from "../Models/productModel.js";
// import jwt from "jsonwebtoken";
// import { ObjectId } from "mongodb";

// const verifyMail = async (req, res) => {
//   try {
//     const token = req.params.token;
//     const decoded = await jwt.verify(token, process.env.MAIL_TOKEN_SECRET)
//     const userID = new ObjectId(decoded).toHexString(),


//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export default verifyMail;
