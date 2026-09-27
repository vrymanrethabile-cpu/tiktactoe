import React, { useReducer, useEffect } from 'react';
import './App.css';

// starting state for the game
const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  isAIEnabled: false,
  isAITurn: false
};

// action types for the reducer
const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET_GAME: 'RESET_GAME',
  TOGGLE_AI: 'TOGGLE_AI',
  AI_MOVE: 'AI_MOVE'
};

// all the ways to win (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// check if someone won
const checkWinner = (board) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// check if it's a draw (board full, no winner)
const checkDraw = (board) => {
  return board.every(cell => cell !== null);
};

// minimax algorithm for the AI - this makes it unbeatable
// took me a while to understand this but it basically looks at all possible moves
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  
  if (winner === 'O') return 10 - depth; // AI wins, good
  if (winner === 'X') return depth - 10; // player wins, bad
  if (checkDraw(board)) return 0; // draw, neutral

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// figure out the best move for the AI using minimax
const getBestMove = (board) => {
  let bestScore = -Infinity;
  let bestMove = 0;
  
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

// main reducer function to handle all game state changes
const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      if (state.winner || state.isDraw || state.board[action.payload.index] !== null) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[action.payload.index] = state.currentPlayer;

      const winner = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);

      return {
        ...state,
        board: newBoard,
        winner,
        isDraw,
        currentPlayer: winner || isDraw ? state.currentPlayer : state.currentPlayer === 'X' ? 'O' : 'X',
        isAITurn: !winner && !isDraw && state.isAIEnabled && state.currentPlayer === 'X'
      };
    }

    case ACTIONS.RESET_GAME:
      return {
        ...initialState,
        isAIEnabled: state.isAIEnabled
      };

    case ACTIONS.TOGGLE_AI:
      return {
        ...state,
        isAIEnabled: !state.isAIEnabled
      };

    case ACTIONS.AI_MOVE: {
      if (state.winner || state.isDraw || !state.isAIEnabled) {
        return state;
      }

      // Get available moves
      const availableMoves = state.board
        .map((cell, index) => cell === null ? index : null)
        .filter(index => index !== null);

      if (availableMoves.length === 0) {
        return state;
      }

      // use minimax to get the best move (AI is smart now)
      const bestIndex = getBestMove([...state.board]);
      const newBoard = [...state.board];
      newBoard[bestIndex] = 'O';

      const winner = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);

      return {
        ...state,
        board: newBoard,
        winner,
        isDraw,
        currentPlayer: winner || isDraw ? 'O' : 'X',
        isAITurn: false
      };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // this handles the AI move - adds a small delay so it feels more natural
  useEffect(() => {
    if (state.isAITurn && state.isAIEnabled && !state.winner && !state.isDraw) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.AI_MOVE });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.isAITurn, state.isAIEnabled, state.winner, state.isDraw]);

  const handleCellClick = (index) => {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } });
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  const handleToggleAI = () => {
    dispatch({ type: ACTIONS.TOGGLE_AI });
  };

  // get the right message to show based on game state
  const getStatusMessage = () => {
    if (state.winner) {
      return `Winner: ${state.winner}! 🎉`;
    }
    if (state.isDraw) {
      return "Draw! 🤝";
    }
    return `Next Player: ${state.currentPlayer}`;
  };

  return (
    <div className="app">
      <h1 className="title">TicTacToe</h1>
      <div className="status">{getStatusMessage()}</div>
      
      <div className="board">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? cell.toLowerCase() : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || state.winner || state.isDraw || state.isAITurn}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="button restart" onClick={handleReset}>
          🔄 Restart Game
        </button>
        <button
          className={`button toggle-ai ${state.isAIEnabled ? 'active' : ''}`}
          onClick={handleToggleAI}
        >
          🤖 {state.isAIEnabled ? 'AI: ON' : 'AI: OFF'}
        </button>
      </div>
    </div>
  );
}

export default App;
