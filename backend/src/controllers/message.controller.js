import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js";
import { io,getRecieverSocketId} from "../lib/socket.js";
export const getusersforsidebar = async (req, res) => {
    try {
        const loggedinuserid=req.user._id;
        const filterusers=await User.find({_id:{$ne:loggedinuserid}}).select("-password");
        res.status(200).json(filterusers);
    }
    catch (error) {
        console.log("Error in getusersforsidebar controller :", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};
export const getmessages=async(req,res)=>
{
    try{
        const {id:usertochatid}=req.params;
        const myid=req.user._id;
        const messages=await Message.find({
            //array of chat messages where either sender has me or reciever is me
            $or:[
                {senderid:myid,recieverid:usertochatid},
                {senderid:usertochatid,recieverid:myid}
            ]
        });
        res.status(200).json({messages});
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"});
        console.log("Error in getmessages controlller:",error.message);
    }
};
export const sendmessage=async (req,res)=>
{
    try{
        const {text,image}=req.body;
        const{id:recieverid}=req.params;
        const senderid=req.user._id;
        let imageurl
        {
            if(image)
            {
                //upload to cloudinary and  get the url
                const uploadresponse=await cloudinary.uploader.upload(image);
                imageurl=uploadresponse.secure_url;
            }
        }
        const newmessage=await Message.create({
            senderid,
            recieverid,
            text,
            image:imageurl,
        });
        await newmessage.save();
        //realtime functionality goes here using socket.io
        const recieverSocketId=getRecieverSocketId(recieverid);
        if(recieverSocketId)
        {
            io.to(recieverSocketId).emit("newmessage",newmessage);
        }
        res.status(200).json(newmessage);
    }
    catch(error)
    {
        console.log("Error in sendmessage controller:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}