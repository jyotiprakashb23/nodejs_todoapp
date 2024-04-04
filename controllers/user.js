import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";



export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exists",404))
  
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  setCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");
  //we have to manually select the password as because we have used the
  // select property with a false value in our schema

  if (!user) return next(new ErrorHandler("Invalid username or password ",400))

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Incorrect password ",400))

  

  setCookie(user, res, `Welcome back , ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res,next) => {
 try {
  res.status(200).json({
    success: true,
    message: "Your details have been fetched.",
    user:req.user
  });
 } catch (error) {
  next(error);
 }
};

export const logOut = (req,res)=>{
  res.status(200).cookie("token","",{
    expires:new Date(Date.now())
  }).json({
    success:true,
    user:req.user
  })
}
export const getAllUsers = async (req, res ,next) => {
 try {
  const users = await User.find({});
  res.json({
    success: true,
    users: users,
  });
 } catch (error) {
  next(error);
 }
};
