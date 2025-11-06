import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  branch: String,
  semester: String,
  subject: String,
  moduleNumber: Number,
  videos: [String],
  pdfs: [String],
  pyqs: [String],
  quizzes: [String],
  gateQuestions: [String]
});

export default mongoose.model("Module", moduleSchema);