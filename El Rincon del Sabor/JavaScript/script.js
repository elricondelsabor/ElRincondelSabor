const player = document.getElementById('player');
const coffeeCup = document.getElementById('coffeeCup');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const startButton = document.getElementById('startButton');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
let score = 0;
let level = 1;
let isPlaying = false;
let speed = 5;

startButton.addEventListener('click', startGame);
upBtn.addEventListener('click', () => movePlayer('up'));
downBtn.addEventListener('click', () => movePlayer('down'));
leftBtn.addEventListener('click', () => movePlayer('left'));
rightBtn.addEventListener('click', () => movePlayer('right'));

function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    level = 1;
    speed = 5;
    scoreDisplay.textContent = `Puntuación: ${score}`;
    levelDisplay.textContent = `Nivel: ${level}`;
    resetPlayer();
    placeCoffeeCup();
}

function movePlayer(direction) {
    if (!isPlaying) return;

    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = document.getElementById('gameArea').getBoundingClientRect();

    switch(direction) {
        case 'up':
            if (playerRect.top > gameAreaRect.top) {
                player.style.top = `${player.offsetTop - speed}px`;
            }
            break;
        case 'down':
            if (playerRect.bottom < gameAreaRect.bottom) {
                player.style.top = `${player.offsetTop + speed}px`;
            }
            break;
        case 'left':
            if (playerRect.left > gameAreaRect.left) {
                player.style.left = `${player.offsetLeft - speed}px`;
            }
            break;
        case 'right':
            if (playerRect.right < gameAreaRect.right) {
                player.style.left = `${player.offsetLeft + speed}px`;
            }
            break;
    }

    checkCollision();
}

function resetPlayer() {
    player.style.top = '175px';
    player.style.left = '275px';
}

function placeCoffeeCup() {
    const gameAreaRect = document.getElementById('gameArea').getBoundingClientRect();
    const x = Math.floor(Math.random() * (gameAreaRect.width - coffeeCup.offsetWidth));
    const y = Math.floor(Math.random() * (gameAreaRect.height - coffeeCup.offsetHeight));
    coffeeCup.style.left = `${x}px`;
    coffeeCup.style.top = `${y}px`;
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const coffeeCupRect = coffeeCup.getBoundingClientRect();

    if (
        playerRect.left < coffeeCupRect.left + coffeeCupRect.width &&
        playerRect.left + playerRect.width > coffeeCupRect.left &&
        playerRect.top < coffeeCupRect.top + coffeeCupRect.height &&
        playerRect.top + playerRect.height > coffeeCupRect.top
    ) {
        score++;
        scoreDisplay.textContent = `Puntuación: ${score}`;
        placeCoffeeCup();

        if (score % 5 === 0) {
            level++;
            levelDisplay.textContent = `Nivel: ${level}`;
            speed += 2;
        }
    }
}
