import { Schema, model, Document } from "mongoose";

// Interface for the game document structure
interface IGame extends Document {
  player: string;
  cards: { value: string; revealed: boolean }[];
  matchedPairs: number;
  attempts: number;
  startTime: Date;
  endTime?: Date;
}

// Schema for a single card in the game
const cardSchema = new Schema({
  value: { type: String, required: true }, // The value of the card (e.g., 'Dog', 'Cat')
  revealed: { type: Boolean, default: false }, // Whether the card is revealed or not
});

// Schema for the game document
const gameSchema = new Schema<IGame>({
  player: { type: String, required: true },
  cards: { type: [cardSchema], required: true },
  matchedPairs: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
});

// Creating the Game model based on the gameSchema
const Game = model<IGame>("Game", gameSchema);

// Exporting the Game model to be used in other parts of the application
export default Game;
