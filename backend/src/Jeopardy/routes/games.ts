import { Router } from "express";
import { JeopardyGameEntity, JeopardyGameType } from "@shared/types/types";
import { pool } from "../../db";

export const gameRouter = Router();

gameRouter.post("/", async (req, res) => {
  try {
    const data: JeopardyGameType = req.body;

    const { userId, title, gameData } = data;

    console.log(`Creating game by user id: ${userId} with title: ${title}`);

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
    console.log(`Retrieving game with id: ${id}`);
    const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    const row: JeopardyGameEntity = result.rows[0];
    res.json(mapEntityToObject(row));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
});

gameRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting game with id: ${id}`);
    const result = await pool.query(`DELETE FROM games WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Could not delete game (game not found" });
    }
    res.json(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete game" });
  }
});

gameRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, gameData } = req.body;
    console.log(`Updating game with id: ${id} and title: ${title}`);
    const result = await pool.query(
      `UPDATE games SET title = COALESCE($2, title), 
            game_data = $3 WHERE id = $1 RETURNING *`,
      [id, title ?? null, gameData]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    const row: JeopardyGameEntity = result.rows[0];
    res.json(mapEntityToObject(row));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update game" });
  }
});

const mapEntityToObject = (entity: JeopardyGameEntity): JeopardyGameType => {
  return {
    id: entity.id,
    userId: entity.user_id,
    title: entity.title,
    gameData: entity.game_data,
  };
};
