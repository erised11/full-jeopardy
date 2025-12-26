import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { gameRouter } from "./routes/games";

dotenv.config();

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
