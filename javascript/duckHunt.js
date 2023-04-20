const maxLevels = 5;
let currentLevel = 1;
let gamePaused = true;
let gameMuted = false;
let gameFullscreen = false;
let numberOfDucks;
const ducks = () => {
  return document.querySelectorAll('.duck:not(.falling)');
};
const shots = document.querySelectorAll('#shot div');
const dogs = document.querySelectorAll('.dog');

const bullets = () => {
  return document.querySelectorAll('#shot .bullet:not(.lost)');
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
  ducks().forEach(function (duck) {
    duck.style.display = 'block';
  });
}

function startGame() {
  document.getElementById('start').style.display = 'none';

  // TODO Coordenada x de onde está o dog quando inicia o jogo;
  const { left } = dogWalk.getBoundingClientRect();
  document.getElementById('dogWalk').classList.add('jump');
  newGame(2);
}

function newGame(n) {
  currentLevel = n - 1;
  document.getElementById('gameOver').style.display = 'none';
  gamePaused = false;
  numberOfDucks = n;
  createDucks(numberOfDucks);
  createShotDivs(numberOfDucks * 2);
  createHitDivs(numberOfDucks);
  showDucks();
}

window.onclick = function (e) {
  if (!gamePaused && e.target.tagName !== 'BUTTON') {
    decreaseBullet();
    if (e.target.classList == 'duck') {
      const fallingDuck = e.target;

      // TODO Coordenadas de onde cai o passareco
      const x = e.clientX;
      const y = e.clientY;
      fallingDuck.classList.add('falling');
      document.getElementById('dogWithDuck').style.display = 'block';
      increaseScore();
      hit();
      fallingDuck.addEventListener('animationend', function () {
        fallingDuck.remove();
      });
    } else {
      document.getElementById('dogLaugh').style.display = 'block';
    }
  }
  checkGameOver();
};

function checkGameOver() {
  console.log(bullets().length);
  console.log(ducks().length);
  if (bullets().length == 0 && ducks().length > 0) {
    document.getElementById('winner').innerHTML = "Yikes! You lost :(";
    document.getElementById('gameOver').style.display = 'block';
    restart();
  } else if (bullets().length >= 0 && ducks().length == 0) {
    if (currentLevel == 5) {
      document.getElementById('winner').innerHTML = "You've completed the game! CONGRATULATIONS!";
      document.getElementById('gameOver').style.display = 'block';
      restart();
    } else {
      document.getElementById('winner').innerHTML = "You've won! NEXT LEVEL!";
      document.getElementById('gameOver').style.display = 'block';
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
      newGame(currentLevel + 2);
    }
  }
}

function restart() {
  gamePaused = true;
  currentLevel = 1;
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
  clearScore();
  // TODO Refactor this in scss
  const dogWalk = document.getElementById('dogWalk');
  dogWalk.classList.remove('jump');
  const parent = dogWalk.parentNode;
  parent.removeChild(dogWalk);
  parent.appendChild(dogWalk);
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

function clearScore() {
  document.querySelector('#score').innerHTML = 0;
}

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

ducks().forEach(function (duck) {
  duck.style.display = 'none';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    gamePaused = !gamePaused;
    if (gamePaused) {
      // TODO
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