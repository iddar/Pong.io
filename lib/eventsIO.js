var events = require('events');
var eventsIO;

eventsIO = (function () {

  function eventsIO() {}
  eventsIO.prototype = new events.EventEmitter();

  // Parse: Evalua la cadena y dependiendo del
  // caso lanza uno de los dos eventos posibles.
  // params:
  //   {string} line
  // Events:
  //   {analog} -> array(2)
  //   {buttonpress} -> number
  eventsIO.prototype.parse = function (line) {
    if( typeof(line.analog) === "object" ) {
      this.emit('analog', line.analog);
    }
    else if( typeof(line.player) === "number" ) {
      this.emit('buttonpress', line.player);
    }
  };

  return eventsIO;

})();

module.exports = new eventsIO();
