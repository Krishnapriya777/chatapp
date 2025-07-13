import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectroute = async (req, res,next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized-No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized-Invalid token" });
        }
        const user = await User.findById(decoded.userID).select("-password");
        if (!user) {
            return res.status(401).json({message:"User not found"});
        }
        req.user=user;//attach user to request object
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
        console.log("Error in protectroute middleware :",error.message);
    }
}