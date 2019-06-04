// Let and const

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
