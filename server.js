import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import moduleRoutes from "./routes/moduleRoutes.js";
import subjectRoutes from "./routes/subject-routes.js";
import subjectListRoutes from "./routes/subject-list-routes.js";
import moduleRoutesNew from "./routes/module-routes.js";
import quizRoutes from "./routes/quiz-routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(" MongoDB Connected");
  console.log(" Connected to database:", mongoose.connection.name);
})
.catch((err) => {
  console.error("❌ DB Error:", err);
});


// More specific routes first
app.use("/api/subjects", subjectListRoutes); // GET /api/subjects/:branch/:semester
app.use("/api/modules", moduleRoutesNew); // GET /api/modules/:subject
app.use("/api/quiz", quizRoutes); // GET /api/quiz/:subject

// Less specific routes last
app.use("/api/subjects", subjectRoutes); // GET /api/subjects?branch=...&sem=...&subject=...
app.use("/api/modules", moduleRoutes); // GET /api/modules/:branch/:semester/:subject


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));