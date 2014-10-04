var events = require('events');
var eventsIO;

eventsIO = (function () {

  function eventsIO() {}
  eventsIO.prototype = new events.EventEmitter();

  eventsIO.prototype.parse = function (line) {
    if( typeof(line.analog) === "object" ) {
      this.emit('analog', line);
    }
    else if( typeof(line.player) === "number" ) {
      this.emit('buttonpress', line.player);
    }
  };

  return eventsIO;

})();

module.exports = new eventsIO();
