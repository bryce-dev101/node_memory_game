import { Request, Response } from "express";
import Game from "../models/game";

export const addNewGame = async (req: Request, res: Response) => {
  try {
    const { player, cards } = req.body;
    const newGame = new Game({ player, cards });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Failed to add new game" });
  }
};

export const fetchGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
};
