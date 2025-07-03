import express, { Express } from "express";
import morgan from "morgan";
import synonymRoutes from "./routes/synonym-routes";
import { errorMiddleware } from "./middleware";

const app: Express = express();

const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/synonym", synonymRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});