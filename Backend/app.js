import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // ✅ Typo fixed here

import { dbConnection } from "./database/dbconnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";




const app = express();

// ✅ Corrected spelling of "dotenv"
dotenv.config({ path: './config/config.env' });

// ✅ Make sure your .env file has FRONTEND_URL spelled correctly
app.use(cors({
    origin: "http://localhost:5173", // ✅ "FRONTED_URL" → "FRONTEND_URL"
    methods: ["POST", "GET"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  })})
dbConnection();
app.use(errorMiddleware);

export default app;
