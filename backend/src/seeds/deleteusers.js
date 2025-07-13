/*import mongoose from "mongoose";
import User from "../models/user.model.js"; // adjust the path

// Connect to your MongoDB first
await mongoose.connect("mongodb+srv://kkpkpkp777:g5xpaWv6b8l3IDIM@cluster0.trn5h7t.mongodb.net/chatapi?retryWrites=true&w=majority&appName=Cluster0"); // replace with your URI

// IDs of users to delete
const idsToDelete = [
  "686f6931481f232b28cca0ab",
  "686a14f039a4f0a213e4e44c","686ab06c8cb1f19b78918e2f",
];

// Delete them
const result = await User.deleteMany({ _id: { $in: idsToDelete } });

console.log(`Deleted ${result.deletedCount} users`);

mongoose.disconnect();*/
