// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // The bugs will start off screen to the left and have variable speeds
    this.x = -200;
    this.y = y;
    this.speed = speed = Math.random() * 10 + 4;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Moves the enemy along according to its randomly generated speed
    this.x += this.speed;

    // Enemies are reset once they've moved 500px to the right
    if (this.x > 500) {
        this.reset();
    }
};

// Resets enemies to start at the left of the canvas
Enemy.prototype.reset = function() {
    // Enemies are put back at their starting places, 200px to the left of the canvas.
    this.x = -200;
    // Random horizontal speed between 4px - 14px / tick is created during the reset 
    this.speed = Math.random() * 10 + 4;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    // Create x and y variables for the player class. Used for movement, controls and collisions.
    this.x = x;
    this.y = y;
};

// Points / score counter
function pointsCounter(score) {
    // Get the element with the "points" id
    var pointContainer = document.getElementById("points");
    // Set it equal to the score variable
    pointContainer.innerHTML = score;
}

// The score variable starts at 0
var score = 0;

// Display hearts equal to the number of lives left
function heartDisplay() {
    // Get the heartContainer elment
    var heartContainer = document.getElementById("heartContainer");
    // Create the object containing the heart image
    var heart = "<img src='images/Heart.png'>";
    // Create an empty array to hold the respective number of hearts
    var heartArray = [];
    // Use a for loop to display the same number of heart as the number of lives remaining
    for (var i = 0; i < lives; i++) {
        heartArray.push(heart);
    }
    // Display the hearts in the heartContainer element
    heartContainer.innerHTML = heartArray;
}


// Lives counter
function livesCounter(life) {
    // Lose one life each time an Enemy hits the Player
    // var livesContainer = document.getElementById("lives");
    // livesContainer.innerHTML = life;
    // Alert the user when they're out of lives, give them their score and urge them to try again
    if (lives === 0) {
        alert("The bugs got you! But you scored " + score + " points. Try again!");
        // Reset their score to 0
        score = 0;
        // Update the "points" element with the 0 score
        pointsCounter(score);
        // Reset their lives to 3
        lives = 3;
        // Update the lives counter
        // livesContainer.innerHTML = lives;
    }
    // Display full hearts at the beginning of the game
    heartDisplay();
}
// Set lives to 3
var lives = 3;


// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // When the player scores when making to the top line of water
    if (this.y < 50) {
        // And is reset in the bottom middle of the screen
        this.reset();
        // This scores 100 points
        score += 100;
        // And the score counter is updated
        pointsCounter(score);
    }
    // Run the collision function to check for any run-ins with the bugs
    this.collision();
    heartDisplay();
};

// Draw the Player on the screen,
Player.prototype.render = function() {
    // The image / sprite for the player
    var img = new Image();
    img.src = 'images/char-boy.png';
    // Draw the Player sprite at the object's x / y parameter coordinates
    ctx.drawImage(img, this.x, this.y);
};

// Map the event listener keys to movement directions
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

// Detect collisions between the Player and all the Enemy objects in the allEnemies array
Player.prototype.collision = function() {
    // For each enemy...
    for (var i = 0; i < allEnemies.length; i++) {
        // ...draw a bounding box around it and see if it overlaps with a bounding box drawn around the Player sprite 
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            // If it does, reset the Player sprite to the starting location
            this.reset();
            // Update the score in the element with the "points" id
            pointsCounter(score);
            // Reduce the lives by 1 by running the livesCounter function
            lives--;
            livesCounter(lives);
        }
    }
};

// Reset the Player sprite at the starting location
Player.prototype.reset = function() {
    // This is the bottom middle of the canvas
    this.x = 202;
    this.y = 402;
}

// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Create 3 Enemies, one for each row of tiles - the 2nd - 4th rows from the top
var bug1 = new Enemy(145);
var bug2 = new Enemy(225);
var bug3 = new Enemy(60);

// Create the allEnemies array and insert the Enemy objects
var allEnemies = [
    bug1, bug2, bug3
];
// Place the Player object in a variable called player
var player = new Player(202, 402);

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
