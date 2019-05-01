/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying, previous;
init();
//init resets all scores and makes playr 1 active:
function init (){
winScore=100;
scores=[0,0];
roundScore=0;
previous=0;
activePlayer=0;
gamePlaying=true;
document.getElementById('text').value="";
document.querySelector('.dice').style.display='none';
document.querySelector('.dice2').style.display='none';
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
var diceDOM=document.querySelector('.dice');
diceDOM.style.display='block';
diceDOM.src='dice-'+dice+'.png';
if (dice!==1 && dice!==previous) {
  previous=0;
  roundScore=roundScore+dice;
  if (dice==6){previous=dice;}
  document.querySelector('#current-'+activePlayer).textContent=roundScore;
  //console.log(previous);
  //console.log(roundScore);
} else{
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
  document.querySelector('.dice').style.display='none';
};
//save current score, turn passes to the next player:
document.querySelector('.btn-hold').addEventListener('click', function (){
  if (gamePlaying){
    scores[activePlayer]=scores[activePlayer]+roundScore;
    document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
    if (scores[activePlayer]>=winScore){
      document.querySelector('#name-'+activePlayer).textContent='Winner!';
      document.querySelector('.dice').style.display='none';
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
