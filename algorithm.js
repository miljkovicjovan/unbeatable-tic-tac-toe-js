// function to find the best move
function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (Board[i][j] == '') {
        Board[i][j] = AI;
        let score = minimax(Board, 0, false);
        Board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  Board[move.i][move.j] = AI;
  CurrentPlayer = Human;
}

// make the scores
let scores = {
  X: 10,
  O: -10,
  tie: 0
};

// function of the minimax algorithm
function minimax(Board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (Board[i][j] == '') {
          Board[i][j] = AI;
          let score = minimax(Board, depth + 1, false);
          Board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (Board[i][j] == '') {
          Board[i][j] = Human;
          let score = minimax(Board, depth + 1, true);
          Board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
