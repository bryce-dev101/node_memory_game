import { Router } from "express";
import * as gameController from "../controllers/gameController";

const router = Router();

// Route to start a new game
router.post("/start", gameController.startNewGame);

// Route to submit card choices
router.post("/submit", gameController.submitCardChoice);

// Route to get game state
router.get("/:gameId", gameController.getGameState);

export default router;
