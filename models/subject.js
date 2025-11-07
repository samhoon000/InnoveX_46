import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
  },
  youtubeLinks: {
    type: [String],
    default: [],
  },
  pdfLinks: {
    type: [String],
    default: [],
  },
  quizLink: {
    type: String,
    default: "",
  },
  pyqLink: {
    type: String,
    default: "",
  },
  gateFocusedQA: {
    type: [String],
    default: [],
  },
});

const subjectSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  modules: {
    type: [moduleSchema],
    default: [],
  },
});

export default mongoose.model("Subject", subjectSchema, "modules");

