import { Request, Response } from "express";
import * as gameService from "../services/gameService";

export const startNewGame = async (req: Request, res: Response) => {
  try {
    const { player } = req.body;
    const newGame = await gameService.startNewGame(player);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Failed to start a new game" });
  }
};

// Controller to handle submitting card choices
export const submitCardChoice = async (req: Request, res: Response) => {
  try {
    const { gameId, card1, card2 } = req.body;
    const result = await gameService.submitCardChoice(gameId, card1, card2);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Game not found" ||
        error.message === "One or both cards not found"
      ) {
        res.status(404).json({ error: error.message });
      } else if (error.message === "One or both cards already revealed") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit card choice" });
      }
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Controller to handle getting the game state
export const getGameState = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const gameState = await gameService.getGameState(gameId);
    res.status(200).json(gameState);
  } catch (error) {
    res.status(500).json({ error: "Failed to get game state" });
  }
};
