// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 500) + 200;
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt; // every enemy has different speed
    if (this.x >= 500) { //? when the enemy goes behind the canvas they will reset their position
      this.x = -100;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
  }
  restart() { //player default postition
    this.x = 200;
    this.y = 400;
  }
  handleInput(direction) {
    if (direction == "right" && this.x < 400) {
      this.x += 100;
    }
    if (direction == "left" && this.x >= 100) {
      this.x -= 100;
    }
    if (direction == "up" && this.y > 1) {
      this.y -= 83;
    }
    if (direction == "down" && this.y < 400) {
      this.y += 83;
    }
  }
  update() {
    allEnemies.forEach(enemy => {
      if (checkCollisions(this.x, this.y, enemy.x, enemy.y)) {
        restart(false); //if restart(false) ouccor that means the player hit the enemey otherwise the player wins.
      }
    });
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Key {
  constructor() { //key is randomize positioned the player has to get it to show the goal.
    this.x = 0 + 100 * Math.floor(Math.random() * 4);
    this.y = 60 + 83 * Math.floor(Math.random() * 3);
    this.sprite = "images/Key.png";
  }
  restart() {
    this.x = 0 + 100 * Math.floor(Math.random() * 4);
    this.y = 60 + 83 * Math.floor(Math.random() * 3);
  }
  update() {
    if (checkCollisions(player.x, player.y, this.x, this.y)) {
      this.x = -100;
      goal.show();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Goal {
  constructor() { //hide the goal until the player get the key
    this.x = -200;
    this.y = -200;
    this.sprite = "images/Selector.png";
  }
  restart() {
    this.x = -200;
    this.y = -200;
  }
  show() {//show the goal to the player.
    this.x = 200;
    this.y = -40;
  }
  update() {
    if (checkCollisions(player.x, player.y, this.x, this.y)) {
      restart(true);
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

function checkCollisions(// check the collision the player with selected object
  player_x_location,
  player_y_location,
  obj_x_location,
  obj_y_location
) {
  if (
    player_x_location <= obj_x_location + 50 &&
    player_x_location >= obj_x_location &&
    (player_y_location <= obj_y_location + 83 &&
      player_y_location >= obj_y_location)
  ) {
    return true;
  } else {
    return false;
  }
}
function restart(isWon) {
  let hearts = document.querySelector("#hearts");
  let score = document.querySelector("#score");
  let high_score = document.querySelector("#high-score");
  player.restart();
  key.restart();
  goal.restart();
  if (isWon) {
    score.innerHTML = Number(score.innerHTML) + 50;
  } else {
    if (hearts.innerHTML.length >= 1) {
      hearts.innerHTML = hearts.innerHTML.slice(0, -1);
    } else {
      hearts.innerHTML = "❤❤❤";
      if (Number(high_score.innerHTML) < Number(score.innerHTML))
        high_score.innerHTML = Number(score.innerHTML);
      score.innerHTML = "0";
    }
  }
}

const enemy1 = new Enemy(-100, 60);
const enemy2 = new Enemy(-100, 60 + 83);
const enemy3 = new Enemy(-100, 60 + 83 + 83);
const enemy4 = new Enemy(-100, 60 + 83 + 83 + 83);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player(200, 400);
const key = new Key();
const goal = new Goal();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
