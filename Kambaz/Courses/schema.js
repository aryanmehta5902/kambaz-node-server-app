import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
   _id: String,
   title: String,
   image: String,
   description: String
 },
 { collection: "courses" }
);
export default courseSchema;