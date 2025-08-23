import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import synonymRoutes from "./routes/synonym-routes";
import { errorMiddleware } from "./middleware";

const app: Express = express();

const port = 3001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend and backend
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/synonym", synonymRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});