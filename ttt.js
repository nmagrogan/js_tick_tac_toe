
//Code for DOM manipulation / seting up game board
function initalizeBoard(){
  const boxes = document.getElementsByClassName("box");

  for(let i = 0; i< boxes.length; i++){
    boxes[i].addEventListener("click", updateGame);
    boxes[i].innerHTML = "";
  }
}

function displayGameOver(result){
  const banner = document.getElementById('banner');
  const gameover = document.createElement('div');
  console.log(result);
  if (result == 'none'){
    const textContent = document.createTextNode("Gameover, no winner.");
    gameover.appendChild(textContent);
  }else{
    const winnerString = "Gameover, " + result + " was the winner.";
    const textContent = document.createTextNode(winnerString);
    gameover.appendChild(textContent);
  }
  banner.appendChild(gameover);
}

function updateGame(e){
  if (e.target.innerHTML == ""){
    e.target.innerHTML = game.getCurrentPlayer().symbol;
    gameBoard.mark(game.getCurrentPlayer().symbol, e.target.id);
    const result = gameBoard.checkBoard();

    if ((result == 'x' || result == 'o') || (result == 'none' && game.turnCounter == 8)){
      displayGameOver(result);
    }else{
      game.togglePlayer();
      game.turnCounter++;
    }
  }
}

//Code for actual logic of TTT game
//gameboard module
const gameBoard = (() => {
  let board = ['', '', '',  '', '', '',  '', '', ''];
  const xWin = 'xxx';
  const oWin = 'ooo';

  const mark = (player, position) => {
    board[position] = player;
  }

  const checkBoard = () => {
    for(let i = 0; i<3; i++){
      //check verticals
      if (board[i] + board[i+3] + board[i+6] == xWin) return 'x';
      else if (board[i] + board[i+3] + board[i+6] == oWin) return 'o';
      //check horizonals
      else if (board[i+(i*2)] + board[(i+1)+(i*2)] + board[(i+2)+(i*2)] == xWin) return 'x';
      else if (board[i+(i*2)] + board[(i+1)+(i*2)] + board[(i+2)+(i*2)] == oWin) return 'o';
    }
    //check diagonals
    if(board[0]+board[4]+board[8] == xWin) return 'x';
    else if(board[0]+board[4]+board[8] == oWin) return 'o';
    else if(board[2]+board[4]+board[6] == xWin) return 'x';
    else if(board[2]+board[4]+board[6] == oWin) return 'o';
    return 'none'

  }
  return {board, mark, checkBoard}
})();

//player factory function
const player = (symbol) => {
  return {symbol}
};

//game module
const game = (() => {
  const player1 = player('x');
  const player2 = player('o');

  let currentPlayer = player1;
  let turnCounter = 0;

  const togglePlayer = () =>{
    if (currentPlayer == player1) {
      currentPlayer = player2;
    }
    else {
      currentPlayer = player1;
    }
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }
  return{getCurrentPlayer, togglePlayer, turnCounter}
})();



//Running functions
initalizeBoard();
