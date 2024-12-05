// script.js

// Variables
let score = 0;
let currentTime = 60;
let timerId = null;
let moleTimerId = null;
let moleSpeed = 1000; // Default speed for medium difficulty

// DOM Elements
const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const difficultySelect = document.getElementById('difficultyLevel');
const startButton = document.getElementById('start-button');

let molePosition;

// Functions

// Set difficulty based on selection
function setDifficulty() {
    const difficulty = difficultySelect.value;
    if (difficulty === 'easy') {
        moleSpeed = 1200;
    } else if (difficulty === 'medium') {
        moleSpeed = 800;
    } else if (difficulty === 'hard') {
        moleSpeed = 500;
    }
}

// Randomly select a square for the mole
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    const randomIndex = Math.floor(Math.random() * squares.length);
    const randomSquare = squares[randomIndex];
    randomSquare.classList.add('mole');
    molePosition = randomSquare.id;
}

// Move the mole periodically
function moveMole() {
    moleTimerId = setInterval(randomSquare, moleSpeed);
}

// Update score when mole is clicked
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === molePosition) {
            score++;
            scoreDisplay.textContent = score;
            molePosition = null; // Prevent multiple clicks
        }
    });
});

// Countdown timer
function countDown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime <= 0) {
        clearInterval(timerId);
        clearInterval(moleTimerId);
        alert('Game Over! Your final score is ' + score);
        resetGame();
    }
}

// Start game function
function startGame() {
    // Reset variables
    score = 0;
    currentTime = 60;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = currentTime;

    // Set difficulty
    setDifficulty();

    // Start mole movement and timer
    moveMole();
    timerId = setInterval(countDown, 1000);
}

// Reset game
function resetGame() {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    squares.forEach(square => {
        square.classList.remove('mole');
    });
}

// Event Listeners
startButton.addEventListener('click', () => {
    resetGame();
    startGame();
});