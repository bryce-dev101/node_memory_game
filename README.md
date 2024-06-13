# Kids Memory Game API

## Overview

This is a backend API for a Kids Memory Game where players flip cards to find matching pairs. The backend handles starting a new game, submitting card choices, matching logic, and maintaining a history of attempts. It also provides a leaderboard showing the top 5 games with the fewest attempts and quickest completion times.

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB
- Docker
- Jest
- Supertest

## Setup Instructions

### Prerequisites

- Node.js
- Docker
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node_memory_game.git
   cd node_memory_game
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## API Endpoints

### Start a New Game

- **Endpoint**: `POST /api/games/start`
- **Description**: Starts a new game for a player.
- **Request Body**:
  ```json
  {
    "player": "Player1"
  }
  ```
- **Response**:
  ```json
  {
    "player": "Player1",
    "cards": [
      { "value": "Dog", "revealed": false, "position": "card-1" },
      { "value": "Cat", "revealed": false, "position": "card-2" }
      // ...
    ],
    "matchedPairs": 0,
    "attempts": 0,
    "startTime": "2023-06-11T15:30:41.423Z",
    "endTime": null,
    "_id": "60b7b09e2e35f3d9c10b4c3e"
  }
  ```

### Submit Card Choices

- **Endpoint**: `POST /api/games/submit`
- **Description**: Submits card choices for a game and checks if they match.
- **Request Body**:
  ```json
  {
    "gameId": "your-game-id",
    "card1": "card-1",
    "card2": "card-2"
  }
  ```
- **Response**:
  ```json
  {
    "isMatch": true,
    "cards": [
      { "position": "card-1", "value": "Dog", "revealed": true },
      { "position": "card-2", "value": "Dog", "revealed": true }
    ]
  }
  ```

### Get Game State

- **Endpoint**: `GET /api/games/:gameId`
- **Description**: Retrieves the current state of the game.
- **Response**:

  ```json
  {
    "player": "Player1",
    "cards": [
      { "value": "Dog", "revealed": true, "position": "card-1" },
      { "value": "Cat", "revealed": false, "position": "card-2" }
      // ...
    ],
    "matchedPairs": 1,
    "attempts": 1,
    "startTime": "2023-06-11T15:30:41.423Z",
    "endTime": null,
    "_id": "60b7b09e2e35f3d9c10b4c3e"
  }
  ```
