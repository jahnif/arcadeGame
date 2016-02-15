// Enemies our player must avoid
var Enemy = function(y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -200;
    this.y = y;
    this.speed = speed = Math.random() * 10 + 8;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;

    if (this.x > 700) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = -450;
    this.speed = Math.random() * 10 + 2;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
};

//Point counter
function pointsCounter(score) {
    var pointContainer = document.getElementById("points");
    pointContainer.innerHTML = score;
}

var score = 0;

Player.prototype.update = function(dt) {
    if (this.y < 50) {
        this.reset();
        score += 100;
        pointsCounter(score);
    }
    this.collision();
};

Player.prototype.render = function() {
    var img = new Image();
    img.src = 'images/char-boy.png';
    ctx.drawImage(img, this.x, this.y);
};
Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (allowedKeys === 'right' && this.x < 400) {
        this.x += 101;
    } else if (allowedKeys === 'up' && this.y > 0) {
        this.y -= 83;
    } else if (allowedKeys === 'down' && this.y < 400) {
        this.y += 83;
    }
};
Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            this.reset();
            score -= 300;
            if (score < 0 ) {
                score = 0;
            }
            pointsCounter(score);
        }
    }
};
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 402;
}

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var slowBug1 = new Enemy(145);
var mediumBug1 = new Enemy(225);
var fastBug1 = new Enemy(60);

var allEnemies = [
    slowBug1, mediumBug1, fastBug1
];
// Place the player object in a variable called player
var player = new Player(202, 402);

player.collision();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
