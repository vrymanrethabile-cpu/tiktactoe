# TicTacToe React App

Hey! This is my TicTacToe game for the React assignment. I built it with React and used useReducer for state management like we learned in class.

## What I Built

### Base Game (40 marks)
- 3x3 board that looks pretty good
- X goes first, then O switches automatically
- Can't overwrite cells that are already taken
- Checks for wins in rows, columns, and diagonals
- Detects draws when the board is full
- Shows status like "Next Player: X" or "Winner: O!"
- Works on mobile and desktop
- Hover effects on empty cells
- Added a gradient background and some animations

### Manual Feature - Restart Button (15 marks)
- Added a restart button that resets everything
- It works with the reducer so the state stays consistent
- Pretty straightforward, no bugs (hopefully)

### State Management with useReducer (20 marks)
- Used useReducer like the assignment said
- Actions I made:
  - MAKE_MOVE: when someone clicks a cell
  - RESET_GAME: restarts the game
  - TOGGLE_AI: turns AI on/off
  - AI_MOVE: AI makes its move
- All the game logic is in the reducer, not scattered around
- Components are pretty dumb, they just render and dispatch actions
- All state in one place which makes it easier to manage

### Advanced Feature - Play vs Computer (15 marks)
- Added an AI you can play against
- Used the minimax algorithm so it's actually unbeatable (took me a while to figure this out)
- You can toggle AI mode with a button
- Added a 500ms delay so it doesn't feel instant
- The AI button shows if it's on or off
- Everything works with the state management

## Tech Stack

- React 18.3.1
- Vite 5.4.2 (for the dev server)
- useReducer (for state)
- Regular CSS

## How to Run

You need Node.js installed.

1. Install the packages:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

3. Go to http://localhost:5173 in your browser

To build for production:
```bash
npm run build
```

## Deployment

I used Netlify but Vercel works too.

### Netlify:
1. Push to GitHub first
2. Go to netlify.com and connect your GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click deploy

### Vercel:
1. Push to GitHub
2. Go to vercel.com and import your repo
3. Select Vite as the framework
4. Click deploy

Both are pretty easy, just follow the prompts.

## Project Structure

```
tictactoe/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main component with game logic
│   ├── App.css         # Component styles
│   └── index.css       # Global styles
└── README.md           # This file
```

## How the State Management Works

I used useReducer to keep everything organized:

### State looks like this:
```javascript
{
  board: Array(9).fill(null),      // the 3x3 board
  currentPlayer: 'X',              // whose turn it is
  winner: null,                    // who won (if anyone)
  isDraw: false,                   // is it a draw?
  isAIEnabled: false,              // is AI on?
  isAITurn: false                  // is AI thinking?
}
```

### Actions I made:
- MAKE_MOVE: handles clicks and updates the board
- RESET_GAME: starts over
- TOGGLE_AI: turns AI on/off
- AI_MOVE: AI makes a move using minimax

### Why useReducer is good:
- All state in one place
- Easy to see what changes what
- Components are simpler
- Less bugs hopefully

## Loom Video (10 marks)

Need to record a video showing:
1. Me playing and winning/drawing
2. The restart button working
3. The reducer code (I'll explain it)
4. The AI mode (it's pretty hard to beat now)

Requirements:
- Under 4 minutes
- Face cam on
- Explain what I did
- Show everything working

## Marks

| Thing | Marks | Done? |
|-----------|-------|--------|
| Base Game | 40 | ✅ |
| Manual Feature | 15 | ✅ |
| State Management | 20 | ✅ |
| Advanced Feature | 15 | ✅ |
| Loom Video | 10 | Need to do |
| Deployment | 10 | Need to do |
| **Total** | **110** | **80/110** |

Still need to do the video and deploy it.
