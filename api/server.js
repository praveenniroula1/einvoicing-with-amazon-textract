import "dotenv/config";
import express from "express";
import cors from "cors";
import textractRouter from "./src/textractRouter.js"; 
import path from "path";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint for Textract upload
app.use("/api/v1/textract", textractRouter);

// Serve static assets (React frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client", "build")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
