//set value to false if game is not pause
let pauseGame= false;
/**
 * @description Enemies our player must avoid.
 **/
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(60, 200);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';

};

/**
  * @description This function returns a radndom integer between the specified values.
  * Reference :
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 **/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/**
  * @description Update the enemy's position, required method for game
  * Parameter: dt, a time delta between ticks
 **/
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    if (pauseGame!=true){
      this.x += this.speed * dt;
        if (this.x > 550) {
        this.x = -150;
        }
    }else{
       this.x = this.x;
    }
};

/**
 * @description Draw the enemy on the screen, required method for game
 **/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description  Constructor for player object.
 **/
let Player = function(x, y, speed){
   this.score = 0;
   this.life = 3;
   this.x = x;
   this.y = y;
   this.speed = speed;
   // The deafult image/sprite for our enemies
   this.sprite = 'images/char-boy.png';
   // list of characters
   this.listPlayers = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png'];
   console.log('List of Players' + this.listPlayers.length);

}

/**
 * @description  Collision detection.
 * If collied with ennemy Resets the player to starting position.
 **/
Player.prototype.update = function(dt) {
  //collision
  let dx;
  let dy;
  let distance;
  
  for (let enemy of allEnemies) {
    dx = enemy.x - this.x;
    dy = enemy.y - this.y;
    distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    //Collision
    if (distance < 50){
       this.gameLost();
       console.log("collision  !!!! ");
    }

    //game won function
    if (this.y < 10) {
         this.score += 10;
         //playerWon = true;
         this.gameWon();
         console.log("score" + this.score);
    }
  }
};

/**
 * @description Game Lost. Player has No more lives . Restes Player to starting position.
 * Resets life back to 3, and score to 0.
 **/
Player.prototype.gameLost = function() {
    this.x = 200;
    this.y = 400;
    this.life -= 1;

    if (this.life === 0) {
      popup('You have run out off lives.');
      this.life = 3;
      this.score = 0;
    }

};

/**
 * @description Once the player reaches the water, scores 10 points
 *
 **/
Player.prototype.gameWon = function() {
    this.x = 200;
    this.y = 400;
    this.score += 10;
    popup('You Made It.');
};

/**
 * @description Popup message when user lost game or score points
 * Resets life to 3, score to 0.
 **/
let popup = function(message){
  let el = document.getElementById('overlay');
  let msg = document.getElementById("message");
  el.style.visibility = "visible";
  gameMessage(message);
  gameScore();

  setTimeout(function() {
    el.style.visibility = "hidden";

  }, 5000);
}

/**
 * @description Popup message: game score.
 *
 **/
let gameScore = function(){
  let score = document.getElementById("score");
  score.innerHTML = " Score " + player.score;
}

/**
 * @description Popup message: inform if player won or lose
 *
 **/
let gameMessage = function(message){
  let msg = document.getElementById("message");
  msg.innerHTML = message;
}

/**
 * @description  Reset player back to starting position
 *
 **/
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

/**
 * @description Hides the popup message
 *
 **/
function cancel_modal() {
  let el = document.getElementById('overlay');
  el.style.visibility = "hidden";
}

/**
 * @description  Draws the header text, scores and lives
 *
 **/
Player.prototype.renderPanel= function () {
  ctx.fillStyle = '#DDD';
  ctx.fillRect(0, 0, 510, 50);
  ctx.font ='30px Arial';
  ctx.fillText("Score: " + this.score, 0, 40, 150);
  ctx.strokeText("Score: " + this.score, 0, 40, 150);
  ctx.fillText("Life: " + this.life, 350, 40);
  ctx.strokeText("Life: " + this.life, 350, 40);
 };

/**
 * @description Draws the player object
 *
 **/
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Handles player's input
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 **/
Player.prototype.handleInput = function(key) {
   switch (key) {
    case "down": // IE specific value
    case "ArrowDown":
      if (pauseGame!=true && this.y < 50 * 8) {
          this.y += this.speed;
          this.y += 10;
		  }else {
          this.y = this.y;
      }
      break;
    case "up": // IE specific value
    case "ArrowUp":
      if (pauseGame!=true && this.y > 0) {
         this.y -= this.speed;
		     this.y -= 10;
		  }else {
         this.y = this.y;
      }
      break;
    case "left": // IE specific value
    case "ArrowLeft":
      if (pauseGame!=true && this.x > 0) {
        this.x -= this.speed;
		    this.x -= 7;
      }else{
        this.x=this.x;
      }
      break;
    case "right": // IE specific value
    case "ArrowRight":
      //does not allow player from scrolling offscreen to the right
      if (pauseGame!=true && this.x < 50 * 8) {
        this.x += this.speed;
        this.x += 7;
      }else {
        this.x=this.x;
      }
      break;
    case "enter":
      // Press enter to change Player
      changePlayer();
      break;
    case "pause":
      //Press pause key to stop game, press again to unfreez game
      pauseFrogger();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

};

/**
 * @description press pause key to freeze game, press 2nd time to unfreez
 *
 **/
let pauseFrogger = function(){
   pauseGame = !pauseGame;
}
/**
 * @description Create new enemy instances.
 **/
let allEnemies = [new Enemy(-100, 60, 400), new Enemy(-100, 140, 200), new Enemy(-100, 210, 300)];


/**
 * @description New player instance
 **/
let player = new Player(200,400,50);


/**
 * @description This listens for key presses and sends the keys to the Player.handleInput() method.
**/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
        32: 'pause'
    };
    if (e.keyCode == 13){
      console.log('key enter was pressed');
    }
    if (e.keyCode == 38){
      console.log('key up was pressed');
    }

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * @description Change Player by pressing enter key
**/

let n = 0;
let pl = null;
let changePlayer = function() {
    n = (n+1)%player.listPlayers.length;
    console.log('n' + n);
    for (i =0; i < player.listPlayers.length ; i++){
      pl = player.listPlayers[n];

      console.log('players' + player.listPlayers[i]);
    }
    console.log('pl' + pl);

    player.sprite = pl;

};
