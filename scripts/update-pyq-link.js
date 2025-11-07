import mongoose from "mongoose";
import dotenv from "dotenv";
import Subject from "../models/subject.js";

dotenv.config();

async function updatePYQLink() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Find the Mathematics for CSE subject
    const subject = await Subject.findOne({
      branch: "Computer Science and Engineering",
      sem: 3,
      subject: "Mathematics for CSE",
    });

    if (!subject) {
      console.log("❌ Subject not found");
      process.exit(1);
    }

    console.log("✅ Found subject:", subject.subject);

    // Find Module 2 and update its PYQ link
    const module2 = subject.modules.find(
      (m) => m.moduleName === "Module 2 - Joint probability distribution and Markov chain"
    );

    if (!module2) {
      console.log("❌ Module 2 not found");
      process.exit(1);
    }

    // Update the PYQ link
    module2.pyqLink = "https://drive.google.com/file/d/1UvcxyJG5ehlgutFGDuYH3TytBHhL_RKG/view?usp=drive_link";

    // Save the updated subject
    await subject.save();

    console.log("✅ Updated PYQ link for Module 2");
    console.log("   New link:", module2.pyqLink);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updatePYQLink();

