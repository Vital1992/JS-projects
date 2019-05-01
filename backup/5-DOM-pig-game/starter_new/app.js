/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, activePlayer, roundScore, gamePlaying, previous, winScore;
init();
//init resets all scores and makes playr 1 active:
function init (){
winScore=100;
scores=[0,0];
roundScore=0;
previous=0;
activePlayer=0;
gamePlaying=true;
document.getElementById('text').value="100";
//document.querySelector('.dice').style.display='none';
//document.querySelector('.dice2').style.display='none';
document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
};
//rolls the dice:
document.querySelector('.btn-roll').addEventListener('click', function (){
  if (gamePlaying){
var dice = Math.floor(Math.random()*6)+1;
var dice2 = Math.floor(Math.random()*6)+1;
var diceDOM=document.querySelector('.dice');
var diceDOM2=document.querySelector('.dice2');
diceDOM.style.display='block';
diceDOM.src='dice-'+dice+'.png';
diceDOM2.style.display='block';
diceDOM2.src='dice-'+dice2+'.png';

if (dice!==1 && dice2!==1 && dice!==previous && dice2!==previous) {
  previous=0;
  roundScore=roundScore+dice+dice2;
  if (dice==6 || dice2==6){previous=6}
  document.querySelector('#current-'+activePlayer).textContent=roundScore;
}
//player looses ENTIRE score ans turn if has two 6 in a row
else if (dice==previous || dice2==previous){
  scores[activePlayer]=0;
  document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
  nextPlayer()
}else{
  nextPlayer()
}
  }
}
);

//next player function with toggle to switch active player mark:
function nextPlayer(){
  activePlayer===0? activePlayer=1:activePlayer=0;
  roundScore=0;
  previous=0;
  document.getElementById('current-0').textContent=0;
  document.getElementById('current-1').textContent=0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.dice').style.display='none';
  //document.querySelector('.dice2').style.display='none';
};
//save current score, turn passes to the next player:
document.querySelector('.btn-hold').addEventListener('click', function (){
  if (gamePlaying){
    scores[activePlayer]=scores[activePlayer]+roundScore;
    document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
    if (scores[activePlayer]>=winScore){
      document.querySelector('#name-'+activePlayer).textContent='Winner!';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.dice2').style.display='none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlaying=false;
    }else{
      nextPlayer()
    }
  }
});
//new game:
document.querySelector('.btn-new').addEventListener('click', function (){
    init()
});
//save score from input field
document.querySelector('.btn-set').addEventListener('click', function (){
  winScore = document.getElementById('text').value;
  //console.log(winScore);
});
