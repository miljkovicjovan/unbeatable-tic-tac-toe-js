// the boards spots
let Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// width and height
let WIDTH;
let HEIGHT; 

// moves 
let AI = 'X';
let Human = 'O';
let CurrentPlayer = Human;

// setup of the game & calling the AI algorithm
function setup() {
  createCanvas(400, 400);
  WIDTH = width / 3; // width = 400
  HEIGHT = height / 3; // height = 400
  bestMove();
}

// function to see if 3 connected
function threeConnected(a, b, c) {
  return a == b && b == c && a != '';
}

// to check horizontal, vertical, diagonal 
function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (threeConnected(Board[i][0], Board[i][1], Board[i][2])) {
      winner = Board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (threeConnected(Board[0][i], Board[1][i], Board[2][i])) {
      winner = Board[0][i];
    }
  }

  // Diagonal
  if (threeConnected(Board[0][0], Board[1][1], Board[2][2])) {
    winner = Board[0][0];
  }
  if (threeConnected  (Board[2][0], Board[1][1], Board[0][2])) {
    winner = Board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (Board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

//check on which cube the mouse is pressed
function mousePressed() {
  if (CurrentPlayer == Human) {
    // Human make turn
    let i = floor(mouseX / WIDTH);
    let j = floor(mouseY / HEIGHT);
    // If valid turn
    if (Board[i][j] == '') {
      Board[i][j] = Human;
      CurrentPlayer = AI;
      bestMove();
    }
  }
}

// function to drawing the lines and moves
function draw() {
  background(200);
  strokeWeight(4);

  line(WIDTH, 0, WIDTH, height);
  line(WIDTH * 2, 0, WIDTH * 2, height);
  line(0, HEIGHT, width, HEIGHT);
  line(0, HEIGHT * 2, width, HEIGHT * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = WIDTH * i + WIDTH / 2;
      let y = HEIGHT * j + HEIGHT / 2;
      let spot = Board[i][j];
      textSize(32);
      let r = WIDTH / 4;
      if (spot == Human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == AI) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultText = createP('');
    resultText.style('font-size', '40pt');
    if (result == 'tie') {
      resultText.html('Tie!');
    } else {
      resultText.html(`The AI wins AGAIN!`);
    }
  }
}
