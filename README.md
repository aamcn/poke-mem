# Memory Game

A card game to test your memory skills. The game includes three difficulty levels and if the player wins the round they can upload their finish time to the leaderboard.

# Features

Card game featuring memorable characters.
Clickable cards: Score a point if you haven't clicked it before or lose the round if you have.
Multiple difficulty: Easy (4 cards), Medium (6 cards), and Hard (9 cards) game modes.
Timer logs how quickly you can click all the cards correctly.
Submit your score to be stored in the database leaderboard tables.
Leaderboard page displays each difficulties top scores.

# Prerequisites

Before running this project, make sure you have:

Node.js (v14 or higher)

# Installation

npm or yarn package manager

Clone the repository
git clone https://github.com/aamcn/poke-mem
cd memory-game

Install dependencies
npm install

Set up environment variables
Update POST and GET URLS to your own Leaderboard database.

Run the in development.
npm run dev

The app will start on http://localhost:5173

# Development

Code Quality Tools
ESLint: Code linting and style enforcement
Prettier: Code formatting

Running with Development Tools

# Run ESLint

npx eslint .

# Format code with Prettier

npx prettier . --write

# Backend Integration

This front end is designed to work with the memory-game-backend application. The frontend makes requests to these endpoints to:

Submit high scores when players complete games
Retrieve leaderboard data for display in the leaderboard page
Filter scores by difficulty for different game modes

# Database Schema

Leaderboard Tables
Each difficulty level has its own table with identical structure:

Column Type Description
id SERIAL PRIMARY KEY Unique identifier
player_name VARCHAR(50) Player's name
finish_time VARCHAR(8) Completion time (MM:SS:MS)

# Author

Aaron McNulty
Link: https://github.com/aamcn/poke-mem
GitHub: @aamcn

# Acknowledgments

Built using the pokeApi https://pokeapi.co/
