import express, { Application, Request, Response, NextFunction } from 'express';
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import { authMiddleware } from './middlewares/auth.middleware';

const app: Application = express();

// const configCors = {
//   origin: true,
//   optionsSuccessStatus: 200,
//   credentials: true
// }

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(configCors))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", authMiddleware as any, projectRoutes)

app.use(errorMiddleware)
export default app;
