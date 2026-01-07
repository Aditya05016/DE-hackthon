import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
