import { Router } from "express";
import { prisma } from "../db";

import { JeopardyGame } from "@shared/types/types";

export const gameRouter = Router();

gameRouter.post("/", async (req, res) => {
  try {
    const { userId, title, gameData } = req.body;

    const data: JeopardyGame = gameData;

    const game = await prisma.game.create({
      data: {
        userId,
        title,
        data,
      },
    });

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create game" });
  }
});
