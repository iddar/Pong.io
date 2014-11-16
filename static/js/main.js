var socket = io();

socket.on('button', function(player){
  if (player) {
    console.log("El player 2 pulso el boton");
  }else{
    console.log("El player 1 pulso el boton");
  }
});

socket.on('joystick', function(position){
  console.log("El jugador 1 esta en la posicion: " + position[0]);
  console.log("El jugador 2 esta en la posicion: " + position[1]);
});

var score = [2,3];

socket.emit('score',score);

window.addEventListener("load", function (){
  var canvasGame = document.querySelector('body');
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (canvasGame.requestFullScreen) {
      canvasGame.requestFullScreen();
    } else if (canvasGame.mozRequestFullScreen) {
      canvasGame.mozRequestFullScreen();
    } else if (canvasGame.webkitRequestFullScreen) {
      canvasGame.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
});

