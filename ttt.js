
//Code for DOM manipulation / seting up game board
function initalizeBoard(){
  let boxes = document.getElementsByClassName("box");

  for(let i = 0; i< boxes.length; i++){
    boxes[i].addEventListener("click", displayChoice);
  }
}

function displayChoice(e){
  e.target.innerHTML = "x";
  gameBoard.mark("x", e.target.id);
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

  const play = () => {
    console.log("playing");
  }
  return{play}
})();



//Running functions
initalizeBoard();

game.play();
