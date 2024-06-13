import Game from "../models/game";
import { shuffle } from "../utils/shuffle";

// Define the Card interface
interface Card {
  value: string;
  revealed: boolean;
  position: string;
}

export const generateCards = () => {
  const cardValues = [
    "Dog",
    "Cat",
    "Bird",
    "Fish",
    "Horse",
    "Sheep",
    "Cow",
    "Pig",
  ];
  const cards = cardValues.concat(cardValues);

  return cards.map((value, index) => ({
    value,
    revealed: false,
    position: `card-${index + 1}`,
  }));
};

export const startNewGame = async (player: string) => {
  const cards = generateCards();
  const shuffledCards = shuffle(cards);
  const newGame = new Game({ player, cards: shuffledCards });

  await newGame.save();
  return newGame;
};

// Function to submit card choices
export const submitCardChoice = async (
  gameId: string,
  card1: string,
  card2: string
) => {
  const game = await Game.findById(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  const card1Index = game.cards.findIndex((card) => card.position === card1);
  const card2Index = game.cards.findIndex((card) => card.position === card2);

  if (card1Index === -1 || card2Index === -1) {
    throw new Error("One or both cards not found");
  }

  if (game.cards[card1Index].revealed || game.cards[card2Index].revealed) {
    throw new Error("One or both cards already revealed");
  }

  game.cards[card1Index].revealed = true;
  game.cards[card2Index].revealed = true;

  const isMatch = game.cards[card1Index].value === game.cards[card2Index].value;

  if (!isMatch) {
    game.cards[card1Index].revealed = false;
    game.cards[card2Index].revealed = false;
  }

  // Increment attempts count
  game.attempts += 1;

  await game.save();

  return {
    isMatch,
    cards: [
      {
        position: card1,
        value: game.cards[card1Index].value,
        revealed: game.cards[card1Index].revealed,
      },
      {
        position: card2,
        value: game.cards[card2Index].value,
        revealed: game.cards[card2Index].revealed,
      },
    ],
  };
};

// Function to get the game state
export const getGameState = async (gameId: string) => {
  const game = await Game.findById(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  return game;
};
