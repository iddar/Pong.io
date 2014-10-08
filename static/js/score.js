var socket = io();
var playerOne = document.querySelector('#PlayerOne');
var playerTwo = document.querySelector('#PlayerTwo');
var winner = document.querySelector('#winner');
socket.on("showScore",function(score){
    playerOne.innerText = '0' + score.player1;
    playerTwo.innerText = '0' + score.player2;

    // if(score.player1 < 7 && score.player2 < 7){
    //   document.getElementById("winner").style.display = "none";
    // }
    if( (score.player1 > 0 && score.player1 < 7) || (score.player2 > 0 && score.player2 < 7)){
      document.getElementById("winner").style.display = "none";
    }
    if(score.player1 === 7){
      winner.innerText = 'Player 1 winner';
      document.getElementById("winner").style.display = "block";
    }else if(score.player2 === 7){
      winner.innerText = 'Player 2 winner';
      document.getElementById("winner").style.display = "block";
    }
});

socket.on('button',function(player){
    playerOne.innerText = '0' + score.player1;
    playerTwo.innerText = '0' + score.player2;
    document.getElementById("winner").style.display = "none";
});
