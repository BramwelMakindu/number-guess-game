const numberInput = document.querySelector('.input');
const submitBtn = document.querySelector('.submit-btn');
const resultMsg = document.querySelector('.result-msg');
const newGameBtn = document.querySelector('.start-game');
const prevGuessesEl = document.querySelector('.prev-guesses');
const guessCountEl = document.querySelector('.guesses-count');
const fireworks = document.querySelectorAll('.firework');

let randomNum = Math.floor(Math.random() * 100);
console.log(randomNum);

let guessCount = 1;

submitBtn.addEventListener('click', () => {
    playGame()
    numberInput.value = '';
})

function playGame() {
    let guess = numberInput.value;
    resultMsg.classList.add('active');

    if (guess < 1) {
        alert('Please pick a number more than 1')
    } else if (guess > 100){
        alert('Please pick a number less than 100')
    } else{
        validateGuess();
        guessCount++;
        displayGuess();
        checkguesses();
    }

    function validateGuess() {
        if (guess == randomNum) {
            resultMsg.innerHTML = 'Congratulations you got it!';
            fireworks.forEach((firework) => {
                firework.classList.add('active')
            });
            endGame();
        } else if (guess < randomNum) {
            resultMsg.innerHTML = 'Too low try again!'
        } else if (guess > randomNum) {
            resultMsg.innerHTML = 'Too high try again!';
        }
    }


    function displayGuess() {
        guessCountEl.innerHTML = `${11 - guessCount}`;
        if (guessCountEl.innerHTML <= 5) {
            guessCountEl.style.color = 'red';
        }

        prevGuessesEl.innerHTML += `${guess}, `;
    }

    function checkguesses() {
        if (guessCount === 11) {
            resultMsg.innerHTML = `Game over! The number was ${randomNum}`;
            endGame();
        }
    }
}

function endGame() {
    numberInput.setAttribute('disabled', '');
    submitBtn.setAttribute('disabled', '');
    newGameBtn.classList.add('active');
    newGame();
}

function newGame() {
    newGameBtn.addEventListener('click', () => {
        randomNum = Math.floor(Math.random() * 100);
        guessCount = 1;
        resultMsg.innerHTML = '';
        numberInput.removeAttribute('disabled');
        submitBtn.removeAttribute('disabled');
        guessCountEl.innerHTML = '10'
        guessCountEl.style.color = 'green';
        prevGuessesEl.innerHTML = '';
        fireworks.forEach((firework) => {
            firework.classList.remove('active')
        });
        newGameBtn.classList.remove('active');
    })
}