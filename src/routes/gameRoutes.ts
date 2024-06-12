import { Router } from "express";
import { addNewGame, fetchGameById } from "../controllers/gameController";

const router = Router();

// Route to add a new game
router.post('/add', addNewGame);

// Route to fetch a game by ID
router.get('/:id', fetchGameById);

export default router;