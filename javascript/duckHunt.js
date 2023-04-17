let gamePaused = false;
let gameMuted = false;
let gameFullscreen = false;


const bullets = () => {
    const bullet = document.querySelector('#shot');
    return bullet.querySelectorAll(':not(.lost)').length - 1;
};

window.onclick = function (e) {
    if (bullets() > 0) {
        decreaseBullet();
        if (e.target.classList == "duck") {
            e.target.classList.add('falling');
            increaseScore();
            hit();
        }
    }
};

const decreaseBullet = () => {
    const shots = document.querySelectorAll('#bullet3, #bullet2, #bullet1');
    for (let i = 0; i < shots.length; i++) {
        const shot = shots[i];
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