let gamePaused = true;
let gameMuted = false;
let gameFullscreen = false;
let numberOfDucks = 2;
const ducks = document.querySelectorAll('.duck');
const bullets = () => {
  return document.querySelectorAll('#shot .bullet:not(.lost)').length;
};

function createDucks(n) {
  const duckContainer = document.createElement('div');
  duckContainer.className = 'duck-container';

  for (let i = 1; i <= n; i++) {
    const duck = document.createElement('div');
    duck.className = 'duck';
    duck.id = `duck${i}`;
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

function showDucks() {
  ducks.forEach(function (duck) {
    duck.style.display = 'block';
  });
}

function startGame() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('gameOver').style.display = 'none';
  gamePaused = false;
  createDucks(numberOfDucks);
  createShotDivs(numberOfDucks * 2);
  createHitDivs(numberOfDucks);
  showDucks();
}

window.onclick = function (e) {
  if (!gamePaused && e.target.tagName !== 'BUTTON') {
    if (bullets() > 0) {
      decreaseBullet();
      if (e.target.classList == 'duck') {
        e.target.classList.add('falling');
        document.getElementById('dogWithDuck').style.display = 'block';
        increaseScore();
        hit();
      } else {
        document.getElementById('dogLaugh').style.display = 'block';
      }
    }
  };
}

const dogLaugh = document.getElementById('dogLaugh');

dogLaugh.addEventListener('animationend', () => {
  dogLaugh.style.display = 'none';
});

const decreaseBullet = () => {
  const bulletDivs = document.querySelectorAll('#shot .bullet');
  for (let i = bulletDivs.length; i > 0; i--) {
    const shot = bulletDivs[i - 1];
    if (!shot.classList.contains('lost')) {
      shot.classList.add('lost');
      break;
    }
  }
};

const increaseScore = () => {
  const score = document.querySelector('#score').innerHTML;
  const scoreHTML = document.querySelector('#score');
  let count = Number(score);
  scoreHTML.innerHTML = count + 200;
};

const hit = () => {
  const hit = document.querySelector('#hit');
  const divs = hit.querySelectorAll('div');
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    if (!div.classList.contains('success')) {
      div.classList.add('success');
      break;
    }
  }
};

ducks.forEach(function (duck) {
  duck.style.display = 'none';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    gamePaused = !gamePaused;
    if (gamePaused) {
      // TODO code to pause the game
    } else {
      // TODO if the game is no longer paused, resume it (e.g. start animations, re-enable controls)
    }
  } else if (event.key === 'm') {
    gameMuted = !gameMuted;
    if (gameMuted) {
      // TODO code to mute the game
    } else {
      // TODO code to unmute the game
    }
  } else if (event.key === 'f') {
    gameFullscreen = !gameFullscreen;
    if (gameFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  }
});