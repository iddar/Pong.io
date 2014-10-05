var socket = io();


socket.on("showScore",function(score){
  console.log("Player 1: "+score.player1);
  console.log("Player 2: "+score.player2);

  var scoreBoard = document.querySelector('.scoreBoard');
  scoreBoard.innerText = score.player1 + " : " + score.player2;
});
