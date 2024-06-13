import * as gameService from "../src/services/gameService";
import Game from "../src/models/game";
import { shuffle } from "../src/utils/shuffle";
import mongoose from "mongoose";

// Mock Mongoose models
jest.mock("../src/models/game", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(true),
      };
    }),
  };
});

// Mock shuffle function
jest.mock("../src/utils/shuffle", () => {
  return {
    __esModule: true,
    shuffle: jest.fn((array) => array), // Mock implementation
  };
});

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Game Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new game with shuffled cards", async () => {
    const player = "Player1";
    const generatedCards = [
      { value: "Dog", revealed: false, position: 'card-1' },
      { value: "Cat", revealed: false, position: 'card-2' },
      { value: "Bird", revealed: false, position: 'card-3' },
      { value: "Fish", revealed: false, position: 'card-4' },
      { value: "Horse", revealed: false, position: 'card-5' },
      { value: "Sheep", revealed: false, position: 'card-6' },
      { value: "Cow", revealed: false, position: 'card-7' },
      { value: "Pig", revealed: false, position: 'card-8' },
      { value: "Dog", revealed: false, position: 'card-9' },
      { value: "Cat", revealed: false, position: 'card-10' },
      { value: "Bird", revealed: false, position: 'card-11' },
      { value: "Fish", revealed: false, position: 'card-12' },
      { value: "Horse", revealed: false, position: 'card-13' },
      { value: "Sheep", revealed: false, position: 'card-14' },
      { value: "Cow", revealed: false, position: 'card-15' },
      { value: "Pig", revealed: false, position: 'card-16' },
    ];

    // Mock the generateCards function
    jest.spyOn(gameService, "generateCards").mockReturnValue(generatedCards);

    const newGame = await gameService.startNewGame(player);

    // Debugging statements to verify the flow
    console.log("Generated Cards:", generatedCards);
    console.log("New Game Object:", newGame);

    // Check if the shuffle function was called with the generated cards
    expect(shuffle).toHaveBeenCalledWith(generatedCards);

    // Check if the game was saved with the correct player and shuffled cards
    expect(Game).toHaveBeenCalledWith({ player, cards: generatedCards });
    expect(newGame.save).toHaveBeenCalled();
  });
});
