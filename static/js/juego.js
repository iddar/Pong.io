var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameDiv');
var socket = io();
var border = 75;

var mainState = {

    preload: function() { 
        game.stage.backgroundColor = '#333';

        game.load.image('background', 'assets/img/background.png');  
        game.load.image('bar', 'assets/img/bar.png'); 
        game.load.image('puck', 'assets/img/puck.png');

        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');     
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.sprite(0, 0, 'background');
        this.player1 = game.add.sprite(border, game.height*0.5, 'bar');
        this.player2 = game.add.sprite(game.width-border, game.height*0.5, 'bar');

        game.physics.arcade.enable(this.player1);
        game.physics.arcade.enable(this.player2);

        this.player1.anchor.set(1, 0.5);
        this.player1.rotation = Math.PI;
        this.player2.anchor.set(1, 0.5);

        this.puck = game.add.sprite(0, 0, 'puck');
        this.puck.anchor.set(0.5, 0.5);
        game.physics.arcade.enable(this.puck);
        this.resetPuck();

        this.score = {player1: 0, player2: 0}

        var self = this;
        socket.on('joystick', function(pos) {
            self.updatePos(pos);
        });

    },

    update: function() {
        if (this.puck.x <= border || this.puck.x >= game.width - border - this.puck.width) {
            if (this.puck.x <= border) 
                this.score.player2 ++;   
            else
                this.score.player1 ++;

            console.log(this.score);
            this.resetPuck();
        }
        if ( this.puck.y <= border || this.puck.y >= game.height - border) {
            this.puck.body.velocity.y = this.puck.body.velocity.y * -1;
            this.puck.y = this.puck.y + this.puck.body.velocity.y * 0.1;
        }

        if (Math.abs(this.puck.body.velocity.x) <= 1000)
            this.puck.body.velocity.x += (this.puck.body.velocity.x <= 0)? -2: 2;

        game.physics.arcade.overlap(this.puck, [this.player1, this.player2], this.overPuck);

        // this.player1.rotation += 0.1;
            
    },

    resetPuck: function() {
        this.puck.x = 1920*0.5;
        this.puck.y = 1080*0.5;
        this.puck.body.velocity.x = 200 * ((Math.random() < 0.5) ? 1 : -1);
        this.puck.body.velocity.y = Math.floor(Math.random() * -1200) + 600;
    },

    overPuck: function(puck, bar){
        // Rebota
        puck.body.velocity.x = puck.body.velocity.x * -1;
        puck.x = puck.x + puck.body.velocity.x * 0.1;

        // Tilt
        var diff = bar.y - puck.y;
        var percent = diff / (bar.height * 0.5);
        percent = (puck.x < game.width*0.5) ? percent * -1 : percent;
        game.add.tween(bar).to({rotation: (+0.1 * percent).toString()}, 200, null, true).chain().to({rotation: (-0.1 * percent).toString()}, 200, null, true);

        // Cambia dirección
        puck.body.velocity.y *= Math.abs((percent < 0.25 || percent > 0.75)? percent : -percent) * 2;
    },

    updatePos: function(pos) {
        this.player1.y = this.player1.height * 0.5 + border + (game.height - this.player1.height * 1.5) * pos[0] / 100;
        this.player2.y = this.player1.height * 0.5 + border + (game.height - this.player1.height * 1.5) * pos[1] / 100;
    }
};

game.state.add('main', mainState);  
game.state.start('main'); 