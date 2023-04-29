var rows = 3;
var cols = 3;
var scl = 1;
var board_width = cols * 100 * scl;
var board_height = rows * 100 * scl;
var board;
let player = 'x';
let ai = 'o';
let playerTurn;
let winner;

var resetBtn, selectTurn;

function setup() {
  
  createCanvas(500, 300);
  

  resetBtn = createButton("Restart");
  resetBtn.position(320, 90);
  resetBtn.size(60, 20);

  selectTurn = createSelect();
  selectTurn.position(320, 50);
  selectTurn.option("Player moves first");
  selectTurn.option("AI moves first");
  selectTurn.changed(mySelectEvent);

  resetGame();
  
}

function draw() {

  
  resetBtn.mouseClicked(resetGame);

  winner = checkWinner();

  
  if (winner == 'x' || winner == 'o') {
    console.log(winner);
    textSize(32);
    textFont("Arial");
    noStroke();
    text(winner.toUpperCase() + " won!", 320, 200);   
  }
  else if (winner == 't') {
    console.log("Tie");
    textSize(32);
    textFont("Arial");
    noStroke();
    text("Tie!", 320, 200);   
  }
  else {
    if (playerTurn == false) {
      aiMove();
      playerTurn = true;
    }
  }

  drawBoard();
  
  
}

function mousePressed() {
  if (playerTurn == true) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (mouseX > j * 100 && mouseX < (j * 100 + 100) && mouseY > i * 100 && mouseY < (i * 100 + 100)) {
          board[i][j] = player;
          playerTurn = false;
        }
      }
    }
  }
}

function mySelectEvent() {
  let item = selectTurn.value();

  if (item == "Player moves first") {
    return true;
  }
  else {
    return false;
  }

}

function aiMove() {
  let bestScore = -2;
  let score;
  let moveSpot = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] == ' ') {
        board[i][j] = ai;
        score = miniMax(board, false);
        console.log(score);
        console.log(i, j);
        board[i][j] = ' ';
        if (score > bestScore) {
          bestScore = score;
          moveSpot = {i, j};
        }
      }
    }
  }
  board[moveSpot.i][moveSpot.j] = ai;

}

function miniMax(board, isMaximizing) {
  let result = checkWinner();

  if (result == 'x') {
    return -9; //extreme
  }
  else if (result == 'o') {
    return 9; //extreme
  }
  else if (result == 't') {
    return 0;
  }

  else if (isMaximizing) {
    let bestScore = -10;
    let score;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] == ' ') {
          board[i][j] = ai;
          score = miniMax(board, false);
          board[i][j] = ' ';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    // Diminish the magnitude of the score by one point
    return bestScore - Math.sign(bestScore);
  }
  else {
    let bestScore = 10;
    let score;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] == ' ') {
          board[i][j] = player;
          score = miniMax(board, true);
          board[i][j] = ' ';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    // Diminish the magnitude of the score by one point
    return bestScore - Math.sign(bestScore);
  }

}

function checkWinner() {
  
  let w = null;
  
  if (board[0][0] == 'x' && board[0][1] == 'x' && board[0][2] == 'x' ||
            board[1][0] == 'x' && board[1][1] == 'x' && board[1][2] == 'x' ||
            board[2][0] == 'x' && board[2][1] == 'x' && board[2][2] == 'x' ||
            board[0][0] == 'x' && board[1][0] == 'x' && board[2][0] == 'x' ||
            board[0][1] == 'x' && board[1][1] == 'x' && board[2][1] == 'x' ||
            board[0][2] == 'x' && board[1][2] == 'x' && board[2][2] == 'x' ||
            board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == 'x' ||
            board[2][0] == 'x' && board[1][1] == 'x' && board[0][2] == 'x') {
                return 'x';
        }
        else if (board[0][0] == 'o' && board[0][1] == 'o' && board[0][2] == 'o' ||
            board[1][0] == 'o' && board[1][1] == 'o' && board[1][2] == 'o' ||
            board[2][0] == 'o' && board[2][1] == 'o' && board[2][2] == 'o' ||
            board[0][0] == 'o' && board[1][0] == 'o' && board[2][0] == 'o' ||
            board[0][1] == 'o' && board[1][1] == 'o' && board[2][1] == 'o' ||
            board[0][2] == 'o' && board[1][2] == 'o' && board[2][2] == 'o' ||
            board[0][0] == 'o' && board[1][1] == 'o' && board[2][2] == 'o' ||
            board[2][0] == 'o' && board[1][1] == 'o' && board[0][2] == 'o') {
                return 'o';
        }

        let full = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 'x' || board[i][j] == 'o') {
                    full ++;
                }
            }
        }

        if (full == 9) {
            return 't';
        }

        return false;
    
  return w;
}

function drawBoard() {
  // draw board
  stroke(0);
  strokeWeight(7);
  line(board_width / 3, 0, board_width / 3, board_height);
  line(board_width / 3 * 2, 0, board_width / 3 * 2, board_height);
  line(0, board_height / 3, board_width, board_height / 3);
  line(0, board_height / 3 * 2, board_width, board_height / 3 * 2);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] == 'o') {
        circle(j * 100 + 50, i * 100 + 50, 80);
      }
      else if (board[i][j] == 'x') {
        line(j * 100 + 10, i * 100 + 10, j * 100 + 80, i * 100 + 80);
        line(j * 100 + 80, i * 100 + 10, j * 100 + 10, i * 100 + 80);
      }
    }
  }
}

function resetGame() {
  clear();
  winner = null;
  board = [];
  playerTurn =  mySelectEvent();
  background(255);

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row[j] = ' ';
    }
    board.push(row);
  }
  
}
