import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import { gameRouter } from "./Jeopardy/routes/games";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.send("OK");
});

app.use("/games", gameRouter);

app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});
