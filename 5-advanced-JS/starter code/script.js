/* var Person = function(name, yearOfBirth, job){
  this.name = name;
  this. yearOfBirth = yearOfBirth;
  this.job = job;
  this.age = function(){
    this.age = 2018-this.yearOfBirth;
  }
}

Person.prototype.lastName='Smith';

var john = new Person ('John', 1992, 'teacher');
var jane = new Person ('Jane', 1990, 'singer');
john.age();
jane.age();
console.log(john,jane);
// Result: Person {name: "John", yearOfBirth: 1992, job: "teacher", age: 26}
//Person {name: "Jane", yearOfBirth: 1990, job: "singer", age: 28}
console.log(john.lastName); // -> Smith
*/
//-----------------------------------------------------------
//Same as above but function is prototype
/*var Person = function(name, yearOfBirth, job){
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.age=function(){
  this.age = 2018-this.yearOfBirth;
};

var john = new Person ('John', 1992, 'teacher');
var jane = new Person ('Jane', 1990, 'singer');
john.age();
jane.age();
console.log(john.age);
console.log(jane.age);
*/
/*-----------------------------------------------------------

var fido = new Dog('Woffie');
fido.bark();

function Dog(name,bark) {
    this.name = name;
    this.bark=function(){
        console.log('Woof!');
    }
};
*/
/*
----------------------------------------------------------
var john = new Person ('John', 1992);
john.age();
console.log(john);
// Result: Person {name: "John", yearOfBirth: 1992, age: 26}
console.log(john.lastName); // -> 'Undefined' because hoisting doesn't work for Prototype
function Person(name, yearOfBirth, job){
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.age = function(){
    this.age = 2018-this.yearOfBirth;
  }
}

Person.prototype.lastName='Smith';
------------------------------------------------------------
*/
/*
var a=1;
var b=0;
function one(){
  if (a==1){b=2}
  else if (b==2){console.log('WTF?!')}
};
one();
console.log(a,b);
*/
/*--------------------------------------------------------------
// IIFE function
(function(win){
  var score = Math.random()*10;
  console.log(score>=5-win)
}
)(5);
*/
// Closures. Calculate how many years left to retiremnt using fucntion passing to function
/*
function retirement(retirementAge){
  var a=' years left until retiremnt'
  return function(yearOfBirth){
    var age = 2018-yearOfBirth;
    console.log((retirementAge-age)+a)
  }
};
var retirementUs = retirement(66);
retirementUs(1992);
*/
// Interview question using closures
/*function interviewQuestion(job){
    return function (name){
      if (job==='designer'){
      console.log(name+', what is UX?');
    }else if (job==='teacher'){
    console.log('What subject do you teach, '+ name+' ?');
  }else{
    console.log('Hello, '+name+ ' what do you do?');
  }
}
}
var teacher=interviewQuestion('teacher');
var designer=interviewQuestion('designer');
var other=interviewQuestion();
teacher('John');
designer('Jack');
other('James')
*/
//-----------------------------------------------------------
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
emily.presentation=john.presentation;
john.presentation.call(emily, 'friendly', 'day');
// Old borrowing method:
//emily.presentation('friendly', 'day');
*/
//--------------------------------------------------------------
//Callback Functions
/*
function one (callback) {
   console.log('Funct one');
   callback();
}

function two () {
   console.log('Funct two')
}

one(two);
*/
//----------------------------------------------------------------
//Quiz game 1.0
/*
var score=0;
var Question = function(question, options, answer){
  this.question = question;
  this.options = options;
  this.answer = answer;
  this.randomQuestion = function(){
    var q = Math.floor(Math.random()*3)+1;
    if (q==1){
      q1.show();
      q1.popup();
    } else if (q==2) {
      q2.show();
      q2.popup();
    }else if (q==3) {
      q3.show();
      q3.popup();
    }
  };
  this.show = function(){
    console.log(this.question);
for (var i=0; i<this.options.length; i++){
  console.log(this.options[i]);
}
};
  this.popup = function() {
    var typed = prompt("Please enter your answer");
    if (typed ==this.answer) {
            score=score+1;
      console.log("Correct!");
      console.log("Your score is: "+score);
      console.log("-----------------------------------------------------");
      q1.randomQuestion();
  }else if (typed =="exit") {
    console.log("Game over!");
  }else{
    console.log("Wrong!")
    console.log("Your score is: "+score);
    console.log("-----------------------------------------------------");
    q1.randomQuestion();
  }
};
};
var q1 = new Question ('What\'s the current year?',
['0. 2016','1. 2017','2. 2018','3. 2019'],3);
var q2 = new Question ('Who is the current US presedent?',
['0. Josh Bush','1. Bill Clinton','2. Donald Trump','3. Barrack Obama'],2);
var q3 = new Question ('In which continent is Brazil?',
['0. Asia','1. South America','2. North America','3. Europe'],1);
q1.randomQuestion();
*/
//Quiz game 1.1
/*
(function Quizgame(){
var score=0;
var Question = function(question, options, answer){
  this.question = question;
  this.options = options;
  this.answer = answer;
  this.randomQuestion = function(){
//Add new questions to the array:
    var list=[q1,q2,q3];
    random = list[Math.floor(Math.random() * list.length)];
    random.show();
    random.popup();
  };
  this.show = function(){
    console.log(this.question);
for (var i=0; i<this.options.length; i++){
  console.log(this.options[i]);
}
  };
  this.popup = function() {
    var typed = prompt("Please enter your answer");
    if (typed ==this.answer) {
            score=score+1;
      console.log("Correct!");
      console.log("Your score is: "+score);
      console.log("-----------------------------------------------------");
      q1.randomQuestion();
  }else if (typed =="exit") {
    console.log("Game over!");
  }else{
    console.log("Wrong!")
    console.log("Your score is: "+score);
    console.log("-----------------------------------------------------");
    q1.randomQuestion();
  }
  };
};
var q1 = new Question ('What\'s the current year?',
['0. 2016','1. 2017','2. 2018','3. 2019'],3);
var q2 = new Question ('Who is the current US presedent?',
['0. Josh Bush','1. Bill Clinton','2. Donald Trump','3. Barrack Obama'],2);
var q3 = new Question ('In which continent is Brazil?',
['0. Asia','1. South America','2. North America','3. Europe'],1);
q1.randomQuestion();
})();*/
//Quiz game 2.0
(function Quizgame(){
var Question = function(question, options, answer){
  this.question = question;
  this.options = options;
  this.answer = answer;
};
Question.prototype.randomQuestion= function() {
  console.log(this.question);
  for (var i=0; i<this.options.length; i++){
  console.log(i+': '+this.options[i]);
  }
};
Question.prototype.verify = function(ans, callback) {
  if (ans===this.answer) {
    var sc;
    console.log("Correct!");
    sc = callback(true);
  }else{
  console.log("Wrong!")
  sc = callback(false);
}
this.displayScore(sc);
};
function init() {
  var list=[q1,q2,q3];
  var n = Math.floor(Math.random() * list.length);
  list[n].randomQuestion();
  var ans = prompt("Please enter your answer");
  if (ans!=='exit'){
    list[n].verify(parseInt(ans), keepScore);
    init();
  }
};
function score(){
  var sc = 0;
  return function(answer){
    if (answer){
      sc++; //adds one to the score
    }
    return sc;
  }
};
var keepScore = score();
Question.prototype.displayScore = function(score){
  console.log("Your score is: "+score);
  console.log("-----------------------------------------------------");
};
var q1 = new Question ('What\'s the current year?',
['2016','2017','2018','2019'],3);
var q2 = new Question ('Who is the current US presedent?',
['Josh Bush','Bill Clinton','Donald Trump','Barrack Obama'],2);
var q3 = new Question ('In which continent is Brazil?',
['Asia','South America','North America','Europe'],1);
init();
})();

/*
function(correct) {
    if(correct) {
        sc++;
    }
    return sc;
}
so when we pass it to verify function we are passing two parameters
the call back function that I have above and the answer that was passed
by the user. That is why inside the verify we pass true or false
inside the callback() and when we call it we get the new score or the
same score depending if the answer is correct. So since we are just
calling the return function of score() we never execute var sc = 0;

*/
