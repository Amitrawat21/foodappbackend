import User from "../Model/UserSchema.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

class Userclass {
  constructor() {}

  static Registration = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(201).json({ message: "please enter all detail" });
    }
    try {
      const isExisting = await User.findOne({ email: req.body.email });
      if (isExisting) {
        return res.status(403).json({ status : 403, message: "please enter all detail" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({ ...req.body, password: hashedPassword });
      const resp = await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
      );

      return res.json({ success : true ,  user: resp, token: token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };


  
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all details" });
    }
  
    try {
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        const passCompare = await bcrypt.compare(password, userLogin.password);
        if (passCompare) {
          const token = jwt.sign(
            { id: userLogin._id, isAdmin: userLogin.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
          );
          const { password: _, ...userWithoutPassword } = userLogin.toObject();
          
          return res.json({ success: true, user: userWithoutPassword, token: token });
        } else {
          return res.status(401).json({ message: "Password is incorrect" });
        }
      } else {
        return res.status(404).json({ message: "User email not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
}

export default Userclass;
