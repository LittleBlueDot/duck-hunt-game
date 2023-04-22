const maxLevels = 5;
let currentLevel = 1;
let gamePaused = true;
const scoreElement = document.querySelector('#score');
let playerScore = 0;
const inputElement = document.getElementById('name');
let playerName;
let startTime, endTime;
let isAnimationRunning = false;
const dogWalk = document.getElementById('dogWalk');
const dogWithDuck = document.getElementById('dogWithDuck');
const dogLaughing = document.getElementById('dogLaugh');


//LBA
// window.addEventListener('DOMContentLoaded', (event) => {
//   const introSound = document.getElementById('introSound');
//   introSound.play();
// });
// LBA

// function playIntro(){
//   let audio = new Audio("../audio/duck-hunt-intro.mp3");
//   audio.play();
// }

// LBA END
const activeDucks = () => {
  return document.querySelectorAll('.duck:not(.falling)');
};
const bullets = () => {
  return document.querySelectorAll('#shot .bullet:not(.lost)');
};

inputElement.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    playerName = inputElement.value;
    if (!playerName.trim()) {
      alert('Please enter your name to start the game.');
      return;
    }
    startGame();
  }
});

function startGame() {
  startTime = new Date();
  document.getElementById('insertName').style.display = 'none';
  document.getElementById('gameOver').style.display = 'none';
  document.getElementById('level').style.display = 'block';
  document.getElementById('dogWalk').classList.add('jump');
  newGame();
}

function newGame() {
  document.getElementById('level').textContent = 'Level ' + currentLevel;
  gamePaused = false;
  let numberOfducks = currentLevel + 1;
  createDucks(numberOfducks);
  createHitDivs(numberOfducks);
  createShotDivs(numberOfducks + 2);
}

function createDucks(n) {
  const duckContainer = document.createElement('div');
  duckContainer.className = 'duck-container';
  for (let i = 1; i <= n; i++) {
    const duck = document.createElement('div');
    duck.className = 'duck';
    duckContainer.appendChild(duck);
    duck.style.display = 'block';
  }
  document.body.appendChild(duckContainer);
}

function createHitDivs(n) {
  const hitDiv = document.getElementById('hit');
  for (let i = 1; i <= n; i++) {
    const div = document.createElement('div');
    hitDiv.insertBefore(div, hitDiv.firstChild);
  }
}

function createShotDivs(n) {
  const shotDiv = document.getElementById('shot');
  for (let i = 1; i <= n; i++) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    shotDiv.insertBefore(bullet, shotDiv.firstChild);
  }
}

window.onclick = function (event) {
  if (!gamePaused && event.target.tagName !== 'BUTTON') {
    decreaseBullet();
    if (event.target.classList == 'duck') {
      handleDuckHit(event.target);
    } else {
      handleMiss();
    }
    checkGameOver();
  }
};

function handleDuckHit(duck) {
  increaseScore();
  markHit();
  duck.classList.add('falling');
  if (!isAnimationRunning) {
    isAnimationRunning = true;
    dogWithDuck.style.display = 'block';
  }
  duck.addEventListener('animationend', function () {
    duck.remove();
  });
}

function handleMiss() {
  if (!isAnimationRunning) {
    isAnimationRunning = true;
    dogLaughing.style.display = 'block';
  }
}

function decreaseBullet() {
  const bulletDivs = document.querySelectorAll('#shot .bullet');
  for (let i = bulletDivs.length; i > 0; i--) {
    const shot = bulletDivs[i - 1];
    if (!shot.classList.contains('lost')) {
      shot.classList.add('lost');
      break;
    }
  }
}

function increaseScore() {
  let score = parseInt(scoreElement.textContent);
  score += 200;
  scoreElement.textContent = score;
  playerScore = score;
}

function markHit() {
  const divs = document.querySelectorAll('#hit div');
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    if (!div.classList.contains('success')) {
      div.classList.add('success');
      break;
    }
  }
}

dogWithDuck.addEventListener('animationend', handleAnimationEnd);

dogLaughing.addEventListener('animationend', handleAnimationEnd);

function handleAnimationEnd(event) {
  const element = event.target;
  element.style.display = 'none';
  isAnimationRunning = false;
}

function checkGameOver() {
  endTime = new Date();
  if (bullets().length === 0 && activeDucks().length > 0) {
    gameOver('Yikes! You lost :(');
  } else if (bullets().length >= 0 && activeDucks().length === 0) {
    if (currentLevel == maxLevels) {
      gameOver("You've completed the game! CONGRATULATIONS!");
    } else {
      currentLevel++;
      newLevel();
    }
  }
}

function gameOver(message) {
  let timeDiff = Math.round((endTime - startTime) / 1000);
  document.getElementById('level').style.display = 'none';
  document.getElementById('gameOver').style.display = 'block';
  dogWithDuck.style.display = 'none';
  dogLaughing.style.display = 'none';
  isAnimationRunning = false;
  document.getElementById('winner').innerHTML = message;
  document.getElementById('playerName').innerHTML = playerName;
  document.getElementById('totalScore').innerHTML = playerScore;
  document.getElementById('totalTime').innerHTML = timeDiff + 's';
  restart();
}

function restart() {
  gamePaused = true;
  currentLevel = 1;
  playerScore = 0;
  removeDucks();
  removeShots();
  removeHits();
  scoreElement.innerHTML = 0;
  dogWalk.classList.remove('jump');
  dogWalk.remove();
  document.body.appendChild(dogWalk);
}

function newLevel() {
  removeDucks();
  removeShots();
  removeHits();
  newGame();
}

function removeDucks() {
  document.querySelectorAll('.duck').forEach((duck) => {
    duck.classList.remove('flying');
    duck.classList.remove('falling');
    duck.parentNode.removeChild(duck);
  });
}

function removeShots() {
  document.querySelectorAll('#shot div').forEach((shot) => {
    shot.parentNode.removeChild(shot);
  });
}

function removeHits() {
  document.querySelectorAll('#hit div').forEach((hit) => {
    hit.parentNode.removeChild(hit);
  });
}
