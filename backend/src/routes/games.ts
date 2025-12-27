import { Router } from "express";
import { JeopardyGame } from "@shared/types/types";
import { pool } from "../db";

export const gameRouter = Router();

gameRouter.post("/", async (req, res) => {
  try {
    const data: JeopardyGame = req.body;

    const { userId, title, gameData } = data;

    const result = await pool.query(
      "INSERT INTO games (user_id, title, game_data) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, gameData]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create game" });
  }
});

gameRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM games ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

gameRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    const row = result.rows[0];
    res.json({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      gameData: row.game_data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
});

gameRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, gameData } = req.body;
    const result = await pool.query(
      `UPDATE games SET title = COALESCE($2, title), 
            game_data = $3 WHERE id = $1 RETURNING *`,
      [id, title ?? null, gameData]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    const row = result.rows[0];

    res.json({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      gameData: row.game_data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update game" });
  }
});
