

let hist_guesses = document.querySelector('.hist_guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
let numberGenerationSubmit=document.querySelector('.numberGenerationSubmit');
let guessCount = 1;
let resetButton;
guessField.focus();
guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keyup', function(event) {
    console.log('eeenter')
    console.log(event.key);
    if (event.key === 'Enter')
    {
        console.log('bbbbbbb')
        event.preventDefault();
        checkGuess();
    }
});

let randomNumber=null
numberGenerationSubmit.addEventListener('click', generate_number);
generate_number();

function generate_number(){
    let random_min=Number(document.querySelector('.min_random').value);
    let random_max=Number(document.querySelector('.max_random').value);
    randomNumber= Math.floor(Math.random() * (random_max - random_min)) + random_min ;
    resetGame();
}

function checkGuess(){
    let userGuess = Number(guessField.value);
    userGuess=test_is_number(userGuess);
    if (guessCount === 1) {
        hist_guesses.textContent = 'Proposals : ';
    }
    hist_guesses.textContent += userGuess + ' ';
    
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Well done, you did it !';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!! GAME OVER !!!';
        setGameOver();
    } else {
        lastResult.textContent = 'False!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
        lowOrHi.textContent = 'Try higher !';
        } else if (userGuess > randomNumber) {
        lowOrHi.textContent = 'try lower !';
        }
    }
    
    guessCount++;
    guessField.value = '';
    guessField.focus();
    }
    
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    //document.body.appendChild(resetButton);
    //resetButton.addEventListener('click', resetGame);
    }
      

function resetGame() {
    guessCount = 1;
    
    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }
    
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    }
      
function test_is_number(N) {

    if (isNaN(N)){
        alert('On t a demandé de rentrer un nombre, cherche pas les embrouilles...');
        return -1;
    }
    return N;
}
