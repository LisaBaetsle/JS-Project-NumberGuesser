/* GAME FUNCTION:
  - player must guess a number between min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if he looses the game
  - Let player choose to play again
*/

// Game values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess)

  // Validate the input
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum) {
    // Game over - Won
    gameOver(true, `${winningNum} is correct. Yay, you won!`, 'green')

  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // Game over, you lose
      gameOver(false, `Game over. 0-00H, you lose! The correct number was ${winningNum}`, 'red')
      
    } else {
      guessInput.style.borderColor = 'red'

      guessInput.value = '';
      // Game continues, answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red')
    }
  }
});

// Function game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Change text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = "Play Again";
  guessBtn.className += 'play-again';
}

  // Function get random winning number
  function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

// Function set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
};

console.log(winningNum);