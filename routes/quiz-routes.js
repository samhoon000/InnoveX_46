import express from "express";
import Quiz from "../models/quiz.js";

const router = express.Router();

// GET /api/quiz/:subject
router.get("/:subject", async (req, res) => {
  try {
    const { subject } = req.params;

    console.log(`[GET /api/quiz/:subject] Request: subject=${subject}`);

    if (!subject) {
      return res.status(400).json({
        error: "Missing required parameter: subject is required",
      });
    }

    // Decode the subject name
    const decodedSubject = decodeURIComponent(subject);

    // Try multiple subject name variations for better matching
    const subjectMapping = {
      "Mathematics-3": "Mathematics",
      "Mathematics 3": "Mathematics",
      "Mathematics for CSE": "Mathematics",
    };

    const subjectVariations = [
      decodedSubject, // Exact match (decoded)
      subject, // Encoded version
      subjectMapping[decodedSubject] || decodedSubject, // Mapped version
      subjectMapping[subject] || subject, // Mapped version (encoded)
      decodedSubject.replace(/-/g, " "), // Replace hyphens with spaces
      decodedSubject.replace(/\d+/g, "").trim(), // Remove numbers
    ];

    // Remove duplicates
    const uniqueVariations = [...new Set(subjectVariations)];

    console.log(`[GET /api/quiz] Trying ${uniqueVariations.length} subject variations:`, uniqueVariations);

    let quizQuestions = [];

    // Try each subject variation
    for (const subjectVariation of uniqueVariations) {
      console.log(`[GET /api/quiz] Trying: subject="${subjectVariation}"`);
      const questions = await Quiz.find({ subject: subjectVariation });
      if (questions && questions.length > 0) {
        console.log(`[GET /api/quiz] Found ${questions.length} questions with subject: "${subjectVariation}"`);
        quizQuestions = questions;
        break;
      }
    }

    if (quizQuestions.length === 0) {
      console.log(`[GET /api/quiz] No quiz questions found after trying all variations`);
      return res.status(404).json({
        error: "Quiz not found",
        message: `No quiz questions found for subject: ${subject}`,
      });
    }

    console.log(`[GET /api/quiz] Returning ${quizQuestions.length} quiz questions`);
    res.status(200).json(quizQuestions);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Error fetching quiz", message: error.message });
  }
});

export default router;

