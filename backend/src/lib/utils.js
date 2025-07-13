import jwt from "jsonwebtoken";
export const generateToken=(userID,res)=>
{
   const token =jwt.sign({userID},process.env.JWT_SECRET,{
    expiresIn:"7d"
   }) 
   res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000,//in milliseconds,7 daysa
    httpOnly:true,//prevents XSS attcks cross-site scripting attacks
    sameSite:"lax",
    secure:process.env.NODE_ENV!="development"
   });
   return token;
}