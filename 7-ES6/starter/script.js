// Let and const
/*
//ES5
var name5 = 'Jane Smith'; //can be changed
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5); //Jane Miller

//ES6
const name6 = 'Jane Smith'; //can't be changed
let age6 = 23; //can be changed
//name6 = 'Jane Miller';
//console.log(name6); //Error, assignment to a constant variable

//var is function scoped and const/let are block scoped

//Fucntions
//ES5
function driversLicense(passedTest){

if (passedTest){
  var firstName = 'John';
  var yearOfBirth = 1990;
}
console.log(firstName + ', born in ' + yearOfBirth + ', now allowed to drive a car.');
};
driversLicense(true);
//ES6
function driversLicense(passedTest){

if (passedTest){
  let firstName = 'John';
  const yearOfBirth = 1990;
}
console.log(firstName + ', born in ' + yearOfBirth + ', now allowed to drive a car.');
};
driversLicense(true);// Will get "firstName is not defined" because let and const are block scoped.
//Block is the code wraped betweed the curly bracers{}
//To get an access to let and const ans use them inside the function, we should declare them outside that block and put into function block

//ES6 with let/const inside of function block
function driversLicense(passedTest){
let firstName;
const yearOfBirth = 1990; //constant should be delacred inside the function block

if (passedTest){
  firstName = 'John';
}
console.log(firstName + ', born in ' + yearOfBirth + ', now allowed to drive a car.');
};
driversLicense(true);

// In ES5 in execution context all variables are hoisted and set to undefined
//console.log(firstName);//will return undefined
var firstName = 'John';

//In ES6 if we use let/const before declaration we will get an error
//console.log(firstName+yearOfBirth);//will return Cannot access 'firstName' before initialization
//let firstName = 'John';
const yearOfBirth = 1990;

//Es6 with loop
let i = 23;

for(let i = 0; i < 5; i++){
  console.log(i);//will return 0 1 2 3 4
}

console.log(i);//will return 23 because loop is in the other block
*/

//Strings in ES6
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge (year){
  return 2016-year;
}
//ES5
console.log('This is ' + firstName + ' ' +lastName+ '. He was born in '+yearOfBirth+
'. Today, he is '+calcAge(yearOfBirth)+' years old.');
//ES6 Template literals
//Instead of + we can use backticks (``) and put there text with variables ${var}
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}.
  Today he is ${calcAge(yearOfBirth)} years old.`);

// New string method
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J')); //will return true because John starts with J. It's case sensitive
console.log(n.endsWith('h'));
console.log(n.includes(' '));
console.log(firstName.repeat(5)); //will return JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5)); //will return John John John John John

//Arrow functions
const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(el){
  return 2016-el;
});
console.log(ages5);

//ES6
let ages6 = years.map(el => 2016-el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index+1}: ${2016-el}.`)
console.log(ages6); //["Age element 1: 26.", "Age element 2: 51.", "Age element 3: 34.", "Age element 4: 79."]

//ages6 in two lines
ages6 = years.map((el,index)=>{
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age element ${index+1}: ${age}.` //We have to use Return in case we have more than one line on code
});
console.log(ages6);

//Unlike normal functions, arrow functions don't have this keyword

//ES5
/*
var box5 = {
  color:'green',
  position:1,
  clickMe: function(){
    document.querySelector('.green').addEventListener('click', function(){
      var str = 'This is box number '+this.position+' and it is '+this.color;
      alert(str);
    })
  }
}
box5.clickMe(); //This is box number undefined and it is undefined
//function inside EventListener is not a method so it doesn't have acces to color and position objects
*/
// To have acces to this objects, we need to create var inside fucntion and it will = this

var box5 = {
  color:'green',
  position:1,
  clickMe: function(){
    var self = this;
    document.querySelector('.green').addEventListener('click', function(){
      var str = 'This is box number '+self.position+' and it is '+self.color;
      alert(str);
    })
  }
}
//box5.clickMe();

//ES6
// In ES6 arrow fucntion shares this keyword with its surrounding
const box6 = {
  color:'green',
  position:1,
  clickMe: function(){
    document.querySelector('.green').addEventListener('click', () => {
      var str = 'This is box number '+this.position+' and it is '+this.color;
      alert(str);
    })
  }
}
//box6.clickMe();

const box66 = {
  color:'green',
  position:1,
  clickMe: () => {
    document.querySelector('.green').addEventListener('click', () => {
      var str = 'This is box number '+this.position+' and it is '+this.color;
      alert(str);
    })
  }
}
box66.clickMe();//This is box number undefined and it is undefined
//That because clickMe arrow fuction shares this method with its surrounding which is global context
//So arrow function inside EventListener also don't have this keyword

//Function constructor
//ES5
function Person(name){
  this.name=name;
}
Person.prototype.myFriends5 =
function(friends){
  var arr = friends.map(function(el){
    return this.name+' is friends with '+el;
  }.bind(this)); //using bind we are creating the copy of this function which will have access to this name
  console.log(arr);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person ('John').myFriends5(friends);//Without bind we will have: [" is friends with Bob", " is friends with Jane", " is friends with Mark"]
//Name is missing anonymous function in map don't have access to this name var

//ES6
Person.prototype.myFriends6 =
function(friends){
  var arr = friends.map(el => `${this.name} is friends with ${el}`);
  console.log(arr);
}
new Person ('Mike').myFriends6(friends);
