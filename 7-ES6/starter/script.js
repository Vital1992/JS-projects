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
/*
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
*/
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
/*
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
*/
/*------------------------------------------------------------------------------------------------------------
//Destructuring - the way to extract data from an object or an array
//ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

//ES6
const [name, age] = ['John', 26]; //will create a const called name and const called age

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};
const {firstName, lastName} = obj; //created two new constanst with data from obj

//If we don't want the var names match with key names we can use different names
const {firstName: a, lastName: b} = obj;//a will be John and b will be Smith

//In ES5 if we had more than one value to return from a function we used objects
//In ES6
function calcAgeRetirement(year){
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}
const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);
*/
//Arrays in ES6
const boxes = document.querySelectorAll('.box');
//Transform Nodelist into Array
//ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
console.log(boxesArr5);//result: [div.box.green, div.box.blue, div.box.orange], each box is the Object with lots of internal vars and objects
boxesArr5.forEach(function(cur){
  cur.style.backgroundColor = 'dodgerblue';//style.backgroundColor set the style object of each div.box to another backgroundColor
});

//ES6
const boxesArr6 = Array.from(boxes);//Transform Nodelist into Array
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//Loops

// In ES5 forEach loop and map we can't brake from them and we also can't use the continue statement, so have to use for loop
/*
for(var i=0; i<boxesArr5.length; i++){
  if(boxesArr5[i].className === 'box blue'){
    //continue; // all boxes except for 'box blue' will have tho following textContent
    break; //only first box will have tho following textContent
  }
  boxesArr5[i].textContent = 'I changed to blue'
};
*/
//ES6
// For of loop
/*
for (const cur of boxesArr6){ //we can use any other name for 'cur'
  if (cur.className === 'box blue'){
    continue; // all boxes except for 'box blue' will have tho following textContent
  }
  cur.textContent = 'I changed to blue'
};
*/
//Or we can use 'includes' method
for (const cur of boxesArr6){ //we can use any other name for 'cur'
  if (cur.className.includes('blue')){
    continue; // all boxes except for 'box blue' will have tho following textContent
  }
  cur.textContent = 'I changed to blue'
};

//ES5

var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur){
  return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);
/*
//Or
var ages = [20, 17, 8, 21, 14, 11];
var result=[];
for(var i=0; i<ages.length; i++){
    if (ages[i]>=18){result.push(i)}
}
console.log(result);*/

//ES6
console.log(ages.findIndex(cur => cur >= 18)); //result= 3 //findIndex returns the index for the element in which this expression >= 18 returns true
console.log(ages.find(cur => cur >=18)); //result= 21 //find returns the element

//Spread operator
//It's a convenient way to expand elements of an array in places like arguments and function calls
//It takes an array and transforms it into single values
function  addFourAges(a, b, c, d){
  return a+b+c+d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);
//Imagine that we had these four numbers in an array instead of four different vars. We need to pass an array into function

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages); //null is this variable
console.log(sum2);

//ES6
var sum3 = addFourAges(...ages); //... is the spread operatot that expands this array into its components
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bugFamily = [...familySmith,'Lily', ...familyMiller]; //merges familySmith array with familyMiller array
//'Lily' will be addes in the middle of two arrays
console.log(bugFamily);

//We also can use spread operator with a Nodelist
const h = document.querySelector('h1');
const boxes1 = document.querySelectorAll('.box');
const all = [h, ...boxes]; //do don't use spread with 'h' because it's a node, not a Nodelist
//'all' it's a Nodelist with 'h' node and boxes1 Nodelist
//To convert 'all' Nodelist into array:
Array.from(all).forEach(cur => cur.style.color = 'Purple');

//Rest paremeters --------------------------------------------------------------------------------------------
//Allow us to pass an orbitrary number of an arguments into a function and use these arguments in that function
//The Rest parameters receive a couple of single values and transforms them into an array when we call a function with multiple parameters

//Example: We want to create a function that receives an arbitrary number of years and prints to the console
//whether each person corresponding to these numbers is a full age or not
/*
//ES5
function isFullAge5(){
  //console.log(arguments);//will return object
  var argsArr = Array.prototype.slice.call(arguments);//converts into array

  argsArr.forEach(function(cur){
    console.log((2016-cur)>=18);//result will true(1990), false(1999), true(1965)
  })
}

isFullAge5(1990,1999,1965);

//ES6
function isFullAge6(...years){//as soon as we call a fun it will transform arguments into an array
  //console.log(years);//will return [1990,1999,1965]
  years.forEach(cur => console.log((2016-cur)>=18));//result will be true(1990), false(1999), true(1965)
}
isFullAge6(1990,1999,1965);
*/

//If we want to use different full ages:
//ES5
function isFullAge5(limit){//limit is the age which is full age (e.g. 21)
  var argsArr = Array.prototype.slice.call(arguments, 1);//1 will start cutting at position 1, so 21 won't get into array
  console.log(argsArr);

  argsArr.forEach(function(cur){
    console.log((2016-cur)>=limit);//result will true(1990), false(1999), true(1965)
  })
}

isFullAge5(21,1990,1999,1965);

//ES6
function isFullAge6(limit, ...years){//as soon as we call a fun it will transform arguments into an array
  //console.log(years);//will return [1990,1999,1965]
  years.forEach(cur => console.log((2016-cur)>=limit));//result will true(1990), false(1999), true(1965)
}
isFullAge6(16,1990,1999,1965);

//Dafault parameters
//We use then whenever we want one or more parameters of the function to be preset, so want them to have a default value
/*
//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality){
  lastName === undefined ? lastName = 'Smith' : lastName; //if undefined then: 'Smith'
  nationality === undefined ? nationality = 'american' : nationality;
  this.firstName = firstName
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson('John',1990); //so lastName and nationalitywill be undefined
var emily = new SmithPerson('Emily',1983,'Diaz','spanish');//will owerwrite dafualt parameters
*/
//ES6
function SmithPerson(firstName, yearOfBirth, lastName='Smith', nationality='american'){
  this.firstName = firstName
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson('John',1990); //so lastName and nationalitywill be undefined
var emily = new SmithPerson('Emily',1983,'Diaz','spanish');//will owerwrite dafualt parameters

//Maps
//In ES6 we can use maps instead of objects
//In object we are limited to strings, but in maps we can use any kind of key: nums, strings, booleans, functions, objects

const question = new Map();//created map
question.set('question', 'What is the official name of latest JS version?');
//set creates new key 'question' which is string

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong');

console.log (question.get('question')); //get is used to retrieve data from the map
console.log(question.size); //to get length
//question.delete(4); //removes one value with key 4
if (question.has(4)){//checks for element
  console.log('Answer 4 is here');
}

//question.clear();//clear the whole map
//-----------------
//To loop thru the map we use forEach
question.forEach((value, key)=>
console.log(`This is ${key}, and it's set to ${value}`)); //e.g. This is 1, and it's set to ES5

//For of Loop
for (let [key,value] of question.entries()){ //question.entries() returns all entries of our questions map
//and then we can use destructuring to store keys and values in two separate values [key,value]
    if (typeof(key)==='number'){
      console.log(`Answer ${key}:${value}`);//Answer 1:ES5, Answer 2:ES6, Answer 3:ES2015, Answer 4:ES7
    }
}
const ans = parseInt(prompt('Write a correct answer'));
console.log(question.get(ans === question.get('correct')))//question.get will return true or false
