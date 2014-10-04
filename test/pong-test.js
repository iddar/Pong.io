var URL = 'http://0.0.0.0:3000';

var should = require('chai').should();
var io = require('socket.io-client');
var supertest = require('supertest');
var api = supertest(URL);

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe("Socket Server",function(){
  var client = io.connect(URL, options);

  it('Get player buttom press',function(){

    client.on('button',function(data){
      data.should.be.a('number');
      client.disconnect();
    });

  });

  it('Get joystick values', function () {

    client.on('button',function(position){
      position.to.eql([ 0, 1023 ]);
      client.disconnect();
    });

  });

});

describe('Get a home page', function() {

  it('Print index page', function(done) {
    api.get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

});
