import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import moduleRoutes from "./routes/moduleRoutes.js";

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


app.use("/api/modules", moduleRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));