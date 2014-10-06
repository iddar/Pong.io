var socket = io();
socket.on("showScore",function(score){
    var playerOne = document.querySelector('#PlayerOne');
    var playerTwo = document.querySelector('#PlayerTwo');
    playerOne.innerText = '0' + score.player1;
    playerTwo.innerText = '0' + score.player2;
});
