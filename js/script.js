'use strict'

//selecting elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayerl = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const currentPlayerl = document.querySelector('#current--0');
const currentPlayer2 = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new'); //for new game
const btnRoll = document.querySelector('.btn--roll'); //for rolling the dice
const btnHold = document.querySelector('.btn--hold');//for holding the score

let score,currentScore, activePlayer, playing;


//the init function handles reloading of the game
const init = function () {
   currentScore = 0;
   activePlayer = 0;
   score = [0,0];
   playing = true; //this logic makes the btn function sieze to wirk when the game is won
   
   
   scorePlayerl.textContent= 0;
   scorePlayer2.textContent= 0;
   currentPlayerl.textContent= 0
   currentPlayer2.textContent= 0
   diceEl.classList.add('hidden'); //hides the dice 
   player1.classList.remove('player--winner')
   player2.classList.remove('player--winner') 
   player1.classList.add('player--active')
   player2.classList.remove('player--active') 
}
init();

//create a function switchPlayer to handle switching btw players
const switchPlayer = function () {
   document.querySelector(`#current--${activePlayer}`).textContent = 0;
      //re-assign the active player
      activePlayer =  activePlayer === 0 ? 1 : 0;// if the active player = 0, the new player 1 else 0
      currentScore = 0;
      player1.classList.toggle('player--active') //toggle methods changes the player--active class to either of the players
      player2.classList.toggle('player--active')
}

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing){
      //create a function for rolling the dice 
      const rollDice = Math.trunc(Math.random() * 6) + 1;
      // console.log(rollDice)
      //Now remove the hidden value of the dice element and call the dice img from the html
      diceEl.classList.remove('hidden'); //removes the hidden element of the dice
      diceEl.src = `./img/dice-${rollDice}.png`; //calling the dice image
   
      //create an if statement, stating when rolling the dice is not equal to 1
      if (rollDice !== 1){
         //add the dice to the current player score
         currentScore += rollDice; 
         document.querySelector(`#current--${activePlayer}`).textContent = currentScore; //dynamically changes the active player current score
   
         // (currentPlayerl.textContent = currentScore;)---Not a goood practice, for only one of the players
   
         //switching to the next player if the rolled dice is equal to 1
      } else {
         //call the fuction switchPlayer inorder for you not to repeat the same code twice
         switchPlayer();
      }  
  }
});

btnHold.addEventListener('click', function () {
   if (playing) {
      //adding current score to active player score
      // score[1]=score[1] + currentScore; /...not a good practice
      score[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
      if (score[activePlayer] >= 20){
         playing = false
         diceEl.classList.add('hidden'); //add the dice when the game is won
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      } else {
         //call the fuction switchPlayer inorder for you not to repeat the same code twice
         switchPlayer();
      }
   }
});

btnNew.addEventListener('click', init);