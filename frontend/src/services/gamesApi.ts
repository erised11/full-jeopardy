import { JeopardyGameType } from "@shared/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordError";
  }
}

export const gamesApi = {
  async getGames() {
    const response = await fetch(`${API_URL}/games`);
    if (!response.ok) {
      throw new Response("Failed to load games", { status: 500 });
    }
    const data: JeopardyGameType[] = await response.json();
    return data;
  },

  async getGame(gameId: string | undefined) {
    const response = await fetch(`${API_URL}/games/${gameId}`);
    if (response.status === 404) {
      throw new Response("Game not found", { status: 404 });
    }
    if (!response.ok) {
      throw new Response("Failed to load game", { status: 500 });
    }
    const game: JeopardyGameType = await response.json();
    return game;
  },

  async createGame(gameData: JeopardyGameType) {
    const response = await fetch(`${API_URL}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) {
      throw new Error("Failed to create game");
    }
    return response.json();
  },

  async updateGame(draftGame: JeopardyGameType, password?: string) {
    const response = await fetch(`${API_URL}/games/${draftGame.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draftGame, password }),
    });
    if (response.status === 401) {
      const data = await response.json();
      throw new PasswordError(data.error ?? "Incorrect password");
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  async deleteGame(gameId: number | null, password?: string) {
    const response = await fetch(`${API_URL}/games/${gameId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.status === 401) {
      const data = await response.json();
      throw new PasswordError(data.error ?? "Incorrect password");
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
};
