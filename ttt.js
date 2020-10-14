

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

  const initalize = () => {
    const boxes = document.getElementsByClassName("box");

    for(let i = 0; i< boxes.length; i++){
      boxes[i].addEventListener("click", game.update);
      boxes[i].innerHTML = "";
    }
  }

  const reset = () => {
    console.log("hello");
    board = ['', '', '',  '', '', '',  '', '', ''];

    const boxes = document.getElementsByClassName("box");
    for(let i = 0; i < boxes.length; i++){
      boxes[i].innerHTML ="";
    }
  }

  return {mark, checkBoard, initalize, reset}
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
  let playing = true;


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

  const update = (e) => {
    if(playing){
      if (e.target.innerHTML == ""){
        e.target.innerHTML = game.getCurrentPlayer().symbol;
        gameBoard.mark(game.getCurrentPlayer().symbol, e.target.id);
        const result = gameBoard.checkBoard();

        if ((result == 'x' || result == 'o') || (result == 'none' && turnCounter == 8)){
          displayGameOver(result);
          playing = false;
        }else{
          game.togglePlayer();
          turnCounter++;
        }
      }
    }
  }

  const displayGameOver = (result) => {
    const banner = document.getElementById('banner');
    const gameover = document.createElement('div');

    if (result == 'none'){
      const textContent = document.createTextNode("Gameover, no winner.");
      gameover.appendChild(textContent);
    }else{
      const winnerString = "Gameover, " + result + " was the winner.";
      const textContent = document.createTextNode(winnerString);
      gameover.appendChild(textContent);
    }
    const resetButton = document.createElement('button');
    resetButton.innerHTML = "Play Again?";
    resetButton.addEventListener('click', reset)

    banner.appendChild(gameover);
    banner.appendChild(resetButton);
  }

  const reset = (e) => {
    currentPlayer = player1;
    turnCounter = 0;
    playing = true;
    gameBoard.reset();
    const banner = document.getElementById("banner");
    while (banner.firstChild) {
      banner.removeChild(banner.lastChild);
    }
  }

  return{getCurrentPlayer, togglePlayer, update}
})();

gameBoard.initalize();
