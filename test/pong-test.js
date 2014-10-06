var URL = 'http://0.0.0.0:3000';

var should = require('chai').should();
var io = require('socket.io-client');
var supertest = require('supertest');
var api = supertest(URL);

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var eventsIO = require('../lib/eventsIO');

describe("Events library",function(){

  it('Get event analog',function(done){
    eventsIO.parse('{"analog": [0,1023]}');
    eventsIO.on('analog', function (analog) {
      analog.should.be.a('array');
      analog.to.eql([0,1023]);
    });
    done();

  });

  it('Get evente buttom', function (done) {
    eventsIO.parse('{"player": 1 }');
    eventsIO.on('buttonpress', function (player) {
      player.should.be.a('number');
      player.to.eql(1);
    });
    done();

  });

});


describe("Socket Server",function(){
  var client = io.connect(URL, options);

  it('Get player buttom press',function(done){

    client.on('button',function(data){
      data.should.be.a('number');
      client.disconnect();
      done();
    });

  });

  it('Get joystick values', function (done) {

    client.on('button',function(position){
      position.to.eql([ 0, 1023 ]);
      client.disconnect();
      done();
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

  it('Print score page', function(done) {
    api.get('/score')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

});
