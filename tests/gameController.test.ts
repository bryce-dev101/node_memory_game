import request from 'supertest'
import mongoose from 'mongoose';
import app from '../src/app';
import Game from '../src/models/game';

// Connect to a test database before running the tests
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/memory-game-test';
  await mongoose.connect(mongoUri);
});

// Close the database connection after running the tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Clear the database before each test
beforeEach(async () => {
  await Game.deleteMany({});
});

describe('Game API Endpoints', () => {
  it('should start a new game', async () => {
    const response = await request(app)
      .post('/api/games/start')
      .send({ player: 'Player1' })
      .expect(201);

    expect(response.body.player).toBe('Player1');
    expect(response.body.cards.length).toBeGreaterThan(0);
  });

  it('should submit card choices', async () => {
    const game = await Game.create({
      player: 'Player1',
      cards: [
        { value: 'Dog', revealed: false, position: 'card-1' },
        { value: 'Dog', revealed: false, position: 'card-2' },
      ],
      matchedPairs: 0,
      attempts: 0,
      startTime: new Date(),
    });

    const response = await request(app)
      .post('/api/games/submit')
      .send({ gameId: game._id, card1: 'card-1', card2: 'card-2' })
      .expect(200);

    expect(response.body.isMatch).toBe(true);
    expect(response.body.cards).toHaveLength(2);
  });

  it('should get the game state', async () => {
    const game = await Game.create({
      player: 'Player1',
      cards: [
        { value: 'Dog', revealed: false, position: 'card-1' },
        { value: 'Cat', revealed: false, position: 'card-2' },
      ],
      matchedPairs: 0,
      attempts: 0,
      startTime: new Date(),
    });

    const response = await request(app)
      .get(`/api/games/${game._id}`)
      .expect(200);

    expect(response.body.player).toBe('Player1');
  });
});