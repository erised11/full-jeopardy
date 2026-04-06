import { Router } from "express";
import bcrypt from "bcryptjs";
import { JeopardyGameEntity, JeopardyGameType } from "@shared/types/types";
import { pool } from "../../db";

export const gameRouter = Router();

// POST /games — create a new game
gameRouter.post("/", async (req, res) => {
  try {
    const data: JeopardyGameType = req.body;
    const { userId, title, gameData, password } = data;

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    const result = await pool.query(
      "INSERT INTO games (user_id, title, game_data, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, gameData, passwordHash]
    );

    res.status(201).json(mapEntityToObject(result.rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create game" });
  }
});

// GET /games — list all games
gameRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT *, (password_hash IS NOT NULL) as has_password FROM games ORDER BY created_at DESC"
    );
    res.json(result.rows.map(mapEntityToObject));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// GET /games/:id — get a single game
gameRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT *, (password_hash IS NOT NULL) as has_password FROM games WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.json(mapEntityToObject(result.rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
});

// DELETE /games/:id — delete a game (password required if protected)
gameRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body ?? {};

    const game = await pool.query(
      "SELECT password_hash FROM games WHERE id = $1",
      [id]
    );
    if (game.rows.length === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    if (game.rows[0].password_hash) {
      if (!password) {
        res.status(401).json({ error: "Password required" });
        return;
      }
      const valid = await bcrypt.compare(password, game.rows[0].password_hash);
      if (!valid) {
        res.status(401).json({ error: "Incorrect password" });
        return;
      }
    }

    const result = await pool.query("DELETE FROM games WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// PUT /games/:id — update a game (password required if protected)
gameRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, gameData, password } = req.body;

    const game = await pool.query(
      "SELECT password_hash FROM games WHERE id = $1",
      [id]
    );
    if (game.rows.length === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    if (game.rows[0].password_hash) {
      if (!password) {
        res.status(401).json({ error: "Password required" });
        return;
      }
      const valid = await bcrypt.compare(password, game.rows[0].password_hash);
      if (!valid) {
        res.status(401).json({ error: "Incorrect password" });
        return;
      }
    }

    const result = await pool.query(
      "UPDATE games SET title = COALESCE($2, title), game_data = $3 WHERE id = $1 RETURNING *, (password_hash IS NOT NULL) as has_password",
      [id, title ?? null, gameData]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    res.json(mapEntityToObject(result.rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update game" });
  }
});

const mapEntityToObject = (entity: JeopardyGameEntity & { has_password?: boolean }): JeopardyGameType => ({
  id: entity.id,
  userId: entity.user_id,
  title: entity.title,
  hasPassword: entity.has_password ?? entity.password_hash !== null,
  createdAt: entity.created_at,
  gameData: entity.game_data,
});
