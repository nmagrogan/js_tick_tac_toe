
//Code for DOM manipulation / seting up game board
function initalizeBoard(){
  let boxes = document.getElementsByClassName("box");

  for(let i = 0; i< boxes.length; i++){
    boxes[i].addEventListener("click", displayChoice);
    boxes[i].innerHTML = "";
  }
}

function displayChoice(e){

  if (e.target.innerHTML == ""){
    e.target.innerHTML = game.getCurrentPlayer().symbol;
    gameBoard.mark(game.getCurrentPlayer().symbol, e.target.id);
    game.togglePlayer();
  }
}

//Code for actual logic of TTT game
//gameboard module
const gameBoard = (() => {
  let board = ['', '', '',  '', '', '',  '', '', '']

  const mark = (player, position) => {
    board[position] = player;
  }
  return {board, mark}
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
  return{getCurrentPlayer, togglePlayer}
})();



//Running functions
initalizeBoard();
