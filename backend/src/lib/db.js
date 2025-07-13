import mongoose from "mongoose";
export const connectdb=async ()=>
{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfully: ${conn.connection.host}`);

    }
    catch(error){
        console.log("Mongoose connection error:",error);

    }
}