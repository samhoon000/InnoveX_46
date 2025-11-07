import express from "express";
import SubjectList from "../models/subject-list.js";

const router = express.Router();

// GET /api/subjects/:branch/:semester
router.get("/:branch/:semester", async (req, res) => {
  try {
    const { branch, semester } = req.params;

    console.log(`[GET /api/subjects/:branch/:semester] Request: branch=${branch}, semester=${semester}`);

    if (!branch || !semester) {
      return res.status(400).json({
        error: "Missing required parameters: branch and semester are required",
      });
    }

    const branchUpper = branch.toUpperCase();
    const semesterNum = parseInt(semester);

    console.log(`[GET /api/subjects] Searching for: branch=${branchUpper}, semester=${semesterNum}`);

    const subjectList = await SubjectList.findOne({
      branch: branchUpper,
      semester: semesterNum,
    });

    if (!subjectList) {
      console.log(`[GET /api/subjects] No data found for branch=${branchUpper}, semester=${semesterNum}`);
      return res.status(404).json({
        error: "Subject list not found",
        message: `No subjects found for branch: ${branch}, semester: ${semester}`,
      });
    }

    console.log(`[GET /api/subjects] Found ${subjectList.subjects?.length || 0} subjects`);

    res.status(200).json({
      branch: subjectList.branch,
      semester: subjectList.semester,
      subjects: subjectList.subjects,
    });
  } catch (err) {
    console.error("Error fetching subject list:", err);
    res.status(500).json({ error: "Failed to fetch subject list", details: err.message });
  }
});

export default router;

