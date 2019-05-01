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
/*function retirement(retirementAge){
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
