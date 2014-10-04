var socket = io();


socket.on("showScore",function(score){
  console.log("Player 1: "+score[0]);
  console.log("Player 2: "+score[1]);
});
