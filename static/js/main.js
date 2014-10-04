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
