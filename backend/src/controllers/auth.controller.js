import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { email, fullname, password } = req.body;
    try {
        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Pssword must be atlest 6 characters long" });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User(
            {
                fullname: fullname,
                email: email,
                password: hashedPassword
            }
        )
        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });

        }
        else {
            res.status(400).json({ message: "Invalid user" });
        }
    }
    catch (error) {
        console.log("Error in signup controller ", error.message);
        res.status(500).json({ message: "internal Server Error" });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(({ message: "Invalid credentials" }));
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(400).json(({ message: "Invalid credentials" }));
        }
        //generate jwt token
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic,
        })
    }

    catch (error) {
        console.log("Error in login controller :", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const logout = async (req, res) => {
    try{
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({message:"User logged out successfully"});
    }
    catch(error)
    {
        console.log("Error in logout controller:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }   
};
// router.put("/update-profile", protectroute, upload.single("profilepic"), updateprofile)



export const updateprofile = async (req, res) => {
  try {
    const userid = req.user._id; // user ID from protectroute

    // Multer puts uploaded file here:
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    //  Upload local file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update the user with new profilepic URL
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { profilepic: result.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateprofile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkauth=async(req,res)=>
{
    try{
        const user=req.user;
        if(!user)
        {
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json(user);
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"});
        console.log("Error in checkroute controller:",error.message);
    }
    
}