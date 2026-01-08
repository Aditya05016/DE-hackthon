import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import subcategoryRoutes from "./routes/subCategory.routes";
import productRoutes from "./routes/prdouct.routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

export default app;
