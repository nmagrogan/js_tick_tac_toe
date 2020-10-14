let boxes = document.getElementsByClassName("box");

for(let i = 0; i< boxes.length; i++){
  boxes[i].addEventListener("click", displayChoice);
}

function displayChoice(e){
  console.log(e.target.innerHTML = "x");
}
