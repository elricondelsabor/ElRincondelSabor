const player = document.getElementById('player');
const coffeeCup = document.getElementById('coffeeCup');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const startButton = document.getElementById('startButton');
let score = 0;
let level = 1;
let isPlaying = false;
let speed = 5;

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', movePlayer);

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

function movePlayer(event) {
    if (!isPlaying) return;
    
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = document.getElementById('gameArea').getBoundingClientRect();

    switch(event.key) {
        case 'ArrowUp':
            if (playerRect.top > gameAreaRect.top) {
                player.style.top = `${player.offsetTop - speed}px`;
            }
            break;
        case 'ArrowDown':
            if (playerRect.bottom < gameAreaRect.bottom) {
                player.style.top = `${player.offsetTop + speed}px`;
            }
            break;
        case 'ArrowLeft':
            if (playerRect.left > gameAreaRect.left) {
                player.style.left = `${player.offsetLeft - speed}px`;
            }
            break;
        case 'ArrowRight':
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
