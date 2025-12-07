import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import wordRoutes from "@/route/wordRoutes";
// import scoreRoutes from "@/route/scoreRoutes"; // TODO: スコア保存機能は後で追加

const app = express();

app.use(express.json());

app.use("/audio", express.static(path.join(__dirname, "../audio")));

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/word", wordRoutes);
// app.use("/score", scoreRoutes); // TODO: スコア保存機能は後で追加

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

export { app };
