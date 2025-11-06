import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

// ✅ Fetch modules for a specific subject
router.get("/:branch/:semester/:subject", async (req, res) => {
  const { branch, semester, subject } = req.params;
  try {
    const modules = await Module.find({ branch, semester, subject });
    res.status(200).json(modules);
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

// ✅ Add new module data
router.post("/", async (req, res) => {
  const { branch, semester, subject, title, content } = req.body;

  // Optional: Validate required fields
  if (!branch || !semester || !subject || !title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newModule = new Module({ branch, semester, subject, title, content });
    await newModule.save();
    res.status(201).json({ message: "Module added successfully!" });
  } catch (err) {
    console.error("Error adding module:", err);
    res.status(500).json({ error: "Failed to add module" });
  }
});

export default router;