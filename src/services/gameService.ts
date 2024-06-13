import Game from "../models/game";
import { shuffle } from "../utils/shuffle";

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

  return cards.map((value) => ({ value, revealed: false }));
};

export const startNewGame = async (player: string) => {
  const cards = generateCards();
  const shuffledCards = shuffle(cards);
  const newGame = new Game({ player, cards: shuffledCards });

  await newGame.save();
  return newGame;
};
