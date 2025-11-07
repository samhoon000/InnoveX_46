import mongoose from "mongoose";

const subjectListSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjects: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("SubjectList", subjectListSchema, "subjects");

