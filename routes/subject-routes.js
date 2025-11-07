import express from "express";
import Subject from "../models/subject.js";

const router = express.Router();

// GET /api/subjects?branch=...&sem=...&subject=...
router.get("/", async (req, res) => {
  try {
    const { branch, sem, subject } = req.query;

    if (!branch || !sem || !subject) {
      return res.status(400).json({
        error: "Missing required query parameters: branch, sem, and subject are required",
      });
    }

    const subjectData = await Subject.findOne({
      branch: branch,
      sem: parseInt(sem),
      subject: subject,
    });

    if (!subjectData) {
      return res.status(404).json({
        error: "Subject not found",
        message: `No subject found for branch: ${branch}, semester: ${sem}, subject: ${subject}`,
      });
    }

    res.status(200).json(subjectData);
  } catch (err) {
    console.error("Error fetching subject:", err);
    res.status(500).json({ error: "Failed to fetch subject data" });
  }
});

export default router;

