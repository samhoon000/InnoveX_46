import express from "express";
import Subject from "../models/subject.js";

const router = express.Router();

// Helper function to map branch codes to full names
const mapBranchCodeToName = (branchCode) => {
  const branchMap = {
    CSE: "Computer Science and Engineering",
    ECE: "Electronics and Communication Engineering",
    ME: "Mechanical Engineering",
    CE: "Civil Engineering",
    EE: "Electrical Engineering",
  };
  return branchMap[branchCode.toUpperCase()] || branchCode;
};

// GET /api/modules/:subject
// Query params: branch (required), sem (required)
router.get("/:subject", async (req, res) => {
  try {
    const { subject } = req.params;
    const { branch, sem } = req.query;

    console.log(`[GET /api/modules/:subject] Request: subject=${subject}, branch=${branch}, sem=${sem}`);

    if (!branch || !sem) {
      return res.status(400).json({
        error: "Missing required query parameters: branch and sem are required",
      });
    }

    // Map branch code to full name (e.g., CSE -> Computer Science and Engineering)
    const branchName = mapBranchCodeToName(branch);
    console.log(`[GET /api/modules] Mapped branch: ${branch} -> ${branchName}`);

    // Decode the subject name first
    const decodedSubject = decodeURIComponent(subject);
    
    // Try multiple subject name variations for better matching
    // Map common subject names from subjects collection to modules collection
    const subjectMapping = {
      'Mathematics-3': 'Mathematics for CSE',
      'Mathematics 3': 'Mathematics for CSE',
      'Mathematics': 'Mathematics for CSE',
    };

    const subjectVariations = [
      decodedSubject, // Exact match (decoded)
      subject, // Encoded version
      subjectMapping[decodedSubject] || decodedSubject, // Mapped version (use decoded)
      subjectMapping[subject] || subject, // Mapped version (use encoded)
      decodedSubject.replace(/-/g, ' '), // Replace hyphens with spaces (Mathematics-3 -> Mathematics 3)
      decodedSubject.replace(/\d+/g, '').trim(), // Remove numbers (Mathematics-3 -> Mathematics)
    ];

    // Remove duplicates
    const uniqueVariations = [...new Set(subjectVariations)];

    let moduleData = null;

    console.log(`[GET /api/modules] Trying ${uniqueVariations.length} subject variations:`, uniqueVariations);

    // First try with mapped branch name
    for (const subjectVariation of uniqueVariations) {
      console.log(`[GET /api/modules] Trying: branch=${branchName}, sem=${sem}, subject="${subjectVariation}"`);
      moduleData = await Subject.findOne({
        branch: branchName,
        sem: parseInt(sem),
        subject: subjectVariation,
      });
      if (moduleData) {
        console.log(`[GET /api/modules] Found with mapped branch name and subject: "${subjectVariation}"`);
        break;
      }
    }

    // If not found, try with original branch name
    if (!moduleData) {
      console.log(`[GET /api/modules] Not found with mapped branch, trying original branch name`);
      for (const subjectVariation of uniqueVariations) {
        console.log(`[GET /api/modules] Trying: branch=${branch}, sem=${sem}, subject="${subjectVariation}"`);
        moduleData = await Subject.findOne({
          branch: branch,
          sem: parseInt(sem),
          subject: subjectVariation,
        });
        if (moduleData) {
          console.log(`[GET /api/modules] Found with original branch name and subject: "${subjectVariation}"`);
          break;
        }
      }
    }

    if (!moduleData) {
      console.log(`[GET /api/modules] No module data found after trying all variations`);
      return res.status(404).json({
        error: "Module data not found",
        message: `No modules found for branch: ${branch}, semester: ${sem}, subject: ${subject}`,
      });
    }

    console.log(`[GET /api/modules] Returning module data with ${moduleData.modules?.length || 0} modules`);
    res.status(200).json(moduleData);
  } catch (err) {
    console.error("Error fetching module data:", err);
    res.status(500).json({ error: "Failed to fetch module data" });
  }
});

export default router;

