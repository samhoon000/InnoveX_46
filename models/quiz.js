import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
  },
  answer: {
    type: String,
    enum: ["a", "b", "c", "d"],
    required: true,
  },
}, {
  collection: "quiz"
});

export default mongoose.model("Quiz", quizSchema);

