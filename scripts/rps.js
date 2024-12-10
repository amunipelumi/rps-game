// JavaScript logic for the RPS game
let outcomes = JSON.parse(localStorage.getItem('outcomes')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const resultElem = document.querySelector('.js-result');
const scoresElem = document.querySelector('.js-scores');
const movesElem = document.querySelector('.js-moves');

// Handle constant display of scores
const updateScore = () => {
  scoresElem.innerHTML = `Wins: ${outcomes.wins}. Losses: ${outcomes.losses}. Ties: ${outcomes.ties}.`;
};
updateScore();

// Function that randomly picks a move for computer
function pickCompMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}

// Function to compute game result
function gameResult(myMove){
  const computerMove = pickCompMove();
  let result = '';

  if (computerMove === myMove){
    result = 'There was a tie';
    outcomes.ties += 1;
  } else if ((computerMove === 'rock') && (myMove === 'paper')){
    result = 'You won';
    outcomes.wins += 1;
  } else if ((computerMove === 'paper') && (myMove === 'scissors')){
    result = 'You won';
    outcomes.wins += 1;
  } else if ((computerMove === 'scissors') && (myMove === 'rock')){
    result = 'You won';
    outcomes.wins += 1;
  } else {
    result = 'You lost';
    outcomes.losses += 1;
  }

  // Save game scores and display outcomes
  localStorage.setItem('outcomes', JSON.stringify(outcomes));
  resultElem.innerHTML = `${result}.`;
  movesElem.innerHTML = `You
    <img 
      src="/images/${myMove}-emoji.png"
      class="moves-img"
      alt="paper.png"
    >
    <img 
      src="/images/${computerMove}-emoji.png"
      class="moves-img"
      alt="paper.png"
    >
    Computer`;
  updateScore();
}

// My moves event listeners
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    gameResult('rock');
  } else if (event.key === 'p'){
    gameResult('paper');
  } else if (event.key === 's'){
    gameResult('scissors');
  }
});

document.querySelector('.js-rock').addEventListener('click', () => {
  gameResult('rock');
});

document.querySelector('.js-paper').addEventListener('click', () => {
  gameResult('paper');
});

document.querySelector('.js-scissors').addEventListener('click', () => {
  gameResult('scissors');
});

// Clear game memory
const resetScores = () => {
  localStorage.removeItem('outcomes');
  outcomes = {wins: 0, losses: 0, ties: 0};
  updateScore();
};

document.querySelector('.js-reset').addEventListener('click', () => {
  resetScores();
});

// Auto play game
const autoPlayGame = () => {
  const randomMove = pickCompMove();
  gameResult(randomMove);
};

let autoPlaying = true;
let intervalId;

function autoPlay(){
  if (autoPlaying){
    intervalId = setInterval(autoPlayGame, 1000);
    document.querySelector('.js-auto').innerHTML = 'Stop Play';
    autoPlaying = false;
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-auto').innerHTML = 'Auto Play';
    autoPlaying = true;
  }
  // console.log(autoPlaying);
}

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay();
});
