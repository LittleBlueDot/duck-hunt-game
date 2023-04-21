const ducksAlive = () => {
  return document.querySelectorAll('.duck:not(.falling)');
};
const bullets = () => {
  return document.querySelectorAll('#shot .bullet:not(.lost)');
};

const maxLevels = 5;
let currentLevel = 1;
let gamePaused = true;
let gameMuted = false;
let gameFullscreen = false;
let playerScore = 0;
let playerName;
let levelElement = document.getElementById("level");
let startTime, endTime;
let isAnimationRunning = false;


const dogWithDuck = document.getElementById('dogWithDuck');
const dogLaughing = document.getElementById('dogLaugh');
const inputElement = document.getElementById("name");

inputElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    playerName = inputElement.value;
    if (!playerName.trim()) {
      alert("Please enter your name to start the game.");
      return;
    }
    startGame();
  }
});

function startGame() {
  startTime = new Date();
  document.getElementById('insertName').style.display = 'none';
  document.getElementById('gameOver').style.display = 'none';
  document.getElementById('insertName').style.display = 'none';
  document.getElementById('dogWalk').classList.add('jump');
  document.getElementById('level').style.display = 'block';
  newGame();
}

function newGame() {
  levelElement.textContent = "Level " + currentLevel;
  gamePaused = false;
  let numberOfducks = currentLevel + 1;
  createducksAlive(numberOfducks);
  createShotDivs(numberOfducks + 2);
  createHitDivs(numberOfducks);
  showducksAlive();
}

function createducksAlive(n) {
  const duckContainer = document.createElement('div');
  duckContainer.className = 'duck-container';
  for (let i = 1; i <= n; i++) {
    const duck = document.createElement('div');
    duck.className = 'duck';
    duckContainer.appendChild(duck);
  }
  document.body.appendChild(duckContainer);
}

function createShotDivs(n) {
  const shotDiv = document.getElementById('shot');
  const bulletDivs = shotDiv.querySelectorAll('.bullet');
  for (let i = 1; i <= n; i++) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.id = `bullet${bulletDivs.length + i}`;
    shotDiv.insertBefore(bullet, shotDiv.firstChild);
  }
}

function createHitDivs(n) {
  const hitDiv = document.getElementById('hit');
  for (let i = 1; i <= n; i++) {
    const div = document.createElement('div');
    hitDiv.insertBefore(div, hitDiv.firstChild);
  }
}

function showducksAlive() {
  ducksAlive().forEach(function (duck) {
    duck.style.display = 'block';
  });
}

window.onclick = function (e) {
  if (!gamePaused && e.target.tagName !== 'BUTTON') {
    decreaseBullet();
    if (e.target.classList == 'duck') {
      const fallingDuck = e.target;
      fallingDuck.classList.add('falling');
      if (!isAnimationRunning) {
        isAnimationRunning = true;
        dogWithDuck.style.display = 'block';
      }
      increaseScore();
      hit();
      fallingDuck.addEventListener('animationend', function () {
        fallingDuck.remove();
      });
    } else {
      if (!isAnimationRunning) {
        isAnimationRunning = true;
        dogLaughing.style.display = 'block';
      }
    }
    checkGameOver();
  }
};

dogWithDuck.addEventListener('animationend', function () {
  dogWithDuck.style.display = 'none';
  isAnimationRunning = false;
});

dogLaughing.addEventListener('animationend', function () {
  dogLaughing.style.display = 'none';
  isAnimationRunning = false;
});

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
  const score = document.querySelector('#score').innerHTML;
  const scoreHTML = document.querySelector('#score');
  let count = Number(score);
  scoreHTML.innerHTML = count + 200;
  playerScore = count + 200;
}

function hit() {
  const hit = document.querySelector('#hit');
  const divs = hit.querySelectorAll('div');
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    if (!div.classList.contains('success')) {
      div.classList.add('success');
      break;
    }
  }
}

function checkGameOver() {
  endTime = new Date();
  let timeDiff = Math.round((endTime - startTime) / 1000);
  if (bullets().length == 0 && ducksAlive().length > 0) {
    document.getElementById('winner').innerHTML = "Yikes! You lost :(";
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('playerName').innerHTML = playerName;
    document.getElementById('totalScore').innerHTML = playerScore;
    document.getElementById('totalTime').innerHTML = timeDiff + "s";
    restart();
  } else if (bullets().length >= 0 && ducksAlive().length == 0) {
    if (currentLevel == 5) {
      document.getElementById('winner').innerHTML = "You've completed the game! CONGRATULATIONS!";
      document.getElementById('gameOver').style.display = 'block';
      document.getElementById('playerName').innerHTML = playerName;
      document.getElementById('totalScore').innerHTML = playerScore;
      document.getElementById('totalTime').innerHTML = timeDiff + "s";
      restart();
    } else {
      document.getElementById('winner').innerHTML = "You've won! NEXT LEVEL!";
      currentLevel++;
      newLevel();
    }
  }
}

function restart() {
  gamePaused = true;
  currentLevel = 1;
  dogWithDuck.style.display = 'none';
  dogLaughing.style.display = 'none';
  document.getElementById('level').style.display = 'none';
  document.querySelectorAll('.duck').forEach(duck => {
    duck.classList.remove('flying');
    duck.classList.remove('falling');
  });
  document.querySelectorAll('.duck').forEach(duck => {
    duck.parentNode.removeChild(duck);
  });
  document.querySelectorAll('#shot div').forEach(shot => {
    shot.parentNode.removeChild(shot);
  });
  document.querySelectorAll('#hit div').forEach(hit => {
    hit.parentNode.removeChild(hit);
  });
  document.querySelector('#score').innerHTML = 0;
  playerScore = 0;
  const dogWalk = document.getElementById('dogWalk');
  dogWalk.classList.remove('jump');
  const parent = dogWalk.parentNode;
  parent.removeChild(dogWalk);
  parent.appendChild(dogWalk);
}

function newLevel() {
  document.querySelectorAll('.duck').forEach(duck => {
    duck.classList.remove('flying');
    duck.classList.remove('falling');
  });
  document.querySelectorAll('.duck').forEach(duck => {
    duck.parentNode.removeChild(duck);
  });
  document.querySelectorAll('#shot div').forEach(shot => {
    shot.parentNode.removeChild(shot);
  });
  document.querySelectorAll('#hit div').forEach(hit => {
    hit.parentNode.removeChild(hit);
  });
  newGame();
}