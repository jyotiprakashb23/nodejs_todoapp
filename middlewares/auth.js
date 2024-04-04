import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next)=>{
    const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Login First.",
    });
  }

  const decodedData = jwt.verify(token,process.env.SECRET_KEY);
  req.user = await User.findById(decodedData._id)
  next();

}