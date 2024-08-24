import Users from "../Models/productModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

const register = async (req, res) => {
    try {
      const hashedPassword = await hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const product = await Users.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export default register