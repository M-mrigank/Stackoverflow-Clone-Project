import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import users from "../models/auth.js"

export const signup=async(req, res)=>{
    const {name, email, password}=req.body;
    try{
        const existingUser=await users.findOne({email});
        if(existingUser){
            return res.status(404).json("User already exist");
        }
        const hashPassword=await bcrypt.hash(password, 12);
        const newUser=await users.create({name, email, password:hashPassword});
        const token=jwt.sign({email:newUser.email, id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'});

        return res.status(200).json({
            result:newUser, 
            token
        });
    }
    catch(error){
        return res.status(500).json("Something went wrong");
    }
}
export const login=async(req, res)=>{
    const {email, password}=req.body;
    try{
        const existingUser=await users.findOne({email});
        if(!existingUser){
            return res.status(404).json("User not found");
        }
        const isPasswordCorrect=await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json("Password is incorrect");
        }
        const token=jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        return res.status(200).json({
            result:existingUser,
            token,
        });
    }
    catch(error){
        return res.status(500).json("Something went wrong");
    }
}