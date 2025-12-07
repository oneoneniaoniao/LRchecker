import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { initializeDatabase } from "./config/initDb";

const port = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // データベースの初期化
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
