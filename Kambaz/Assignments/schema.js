import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    points: { type: String },
    dueDate: { type: Date },
    availableFrom: { type: Date },
    editorDueDate: { type: Date },
    editorAvailableFrom: { type: Date },
    course: { type: String, ref: "Course", required: true },
  },
  { collection: "assignments" }
);

export default schema;