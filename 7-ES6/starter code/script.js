/*
//V 1.0
let parkInstances = []; //creating an array where will be all instances of Park fun constructor
let streetInstances = []; //creating an array where will be all instances of Street fun constructor
class Park { //superclass
  constructor(name, buildYear, trees, parkArea){
    this.name = name;
    this.buildYear = buildYear;
    this.trees = trees;
    this.parkArea = parkArea;
    parkInstances.push(this); //will push each instance into parkInstances array
  }
  treeDensity(){ //this fun will be prototype
    for (const cur of parkInstances){
    let average = cur.trees/cur.parkArea
    console.log(`${cur.name} has a tree density of ${average} trees per square mile`)
    if (cur.trees >1000){
      console.log(`${cur.name} has more than 1000 trees`)
    }
  }
}
  averageAge(){
    let ages =[];
    for (const cur of parkInstances){
      ages.push(new Date().getFullYear() - cur.buildYear) //push all ages into ages array
    }
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    //reduce() method to reduce our array to a single value. It does this by applying a function to each element in the array.
    //The function that we pass as the first parameter of the reduce method receives two parameters, a and b. In this code, a is our accumulator.
    //It will accumulate our sum as our function works. b is the current value being processed.
    //The second parameter of the reduce method is the initial value we wish to use.
    //We’ve set our initial value to zero which allows us to use empty arrays with our arrSum functions.
/*
    //In ES5:
    var arrAvg = function(arr){
  return arr.reduce(function(a,b){
    return a + b
  }, 0)/arr.length
}
*//*
    console.log(`---------PARK REPORTS------------`)
    console.log(`Our ${ages.length} parks have an average age of ${arrAvg(ages)} years`)
  }
}

class Street {
  constructor(name, length, age){
    this.name = name;
    this.length = length;
    this.age = age;
    streetInstances.push(this);
  }
  averageLength(){
    let length =[];
    for (const cur of streetInstances){
      length.push(cur.length) //push all lengths into length array
    }
    const arrSum = arr => arr.reduce((a,b) => a + b, 0);
    console.log(`---------STREET REPORTS------------`)
    console.log(`Our ${length.length} streets have a total length of ${arrSum(length)} miles, with an average of ${arrSum(length)/length.length} miles`)
  }
  streetSize(){
    let size;
    for (const cur of streetInstances){
    if (cur.length<=10){
      size='tiny'
    }else if (cur.length>10 && cur.length<=20){
      size='small'
    }else if (cur.length>20 && cur.length<=30){
      size='normal'
    }else if (cur.length>30 && cur.length<=40){
      size='big'
    }else if (cur.length>40){
      size='huge'
    }
    console.log(`${cur.name}, built in ${cur.age}, is a ${size} street`)
  }
  }
}

const downtown = new Park('Bellevue Downtown Park', 1990, 310, 40);
const sammamish = new Park('Sammamish State Park', 1889, 1001, 59);
const coulon = new Park('Gene Coulon Park', 1946, 90, 48);

const bearWay = new Street('Bear Way', 12, 1892);
const newport = new Street('Newport Way', 23, 1988);
const lakeSammamish = new Street('Lake Sammamish Street', 32, 1993);
const fallCity = new Street('Fall City Street', 41, 1888);
downtown.averageAge();
downtown.treeDensity();
newport.averageLength();
newport.streetSize();
*/
/*
//V 1.1 with sublass
let instances = []; //creating an array where will be all instances of Park and Street fun constructor
class Street { //superclass
  constructor(type, name, buildYear, length){
    this.type = type;
    this.name = name;
    this.buildYear = buildYear;
    this.length = length;
    instances.push(this); //will push each instance into instances array
  }
  averageLength(){
    let length =[];
    for (const cur of instances){
      if (cur.type === 'pk'){ //look only for streets
        continue;
      }
      length.push(cur.length) //push all lengths into length array
    }
    const arrSum = arr => arr.reduce((a,b) => a + b, 0);
    console.log(`---------STREET REPORTS------------`)
    console.log(`Our ${length.length} streets have a total length of ${arrSum(length)} miles, with an average of ${arrSum(length)/length.length} miles`)
  }
  streetSize(){
    let size;
    for (const cur of instances){
      if (cur.type === 'pk'){
        continue;
      }
    if (cur.length<=10){
      size='tiny'
    }else if (cur.length>10 && cur.length<=20){
      size='small'
    }else if (cur.length>20 && cur.length<=30){
      size='normal'
    }else if (cur.length>30 && cur.length<=40){
      size='big'
    }else if (cur.length>40){
      size='huge'
    }
    console.log(`${cur.name}, built in ${cur.buildYear}, is a ${size} street`)
  }
  }
}
class Park extends Street {
  constructor(type, name, buildYear, length, trees){
    super(type, name, buildYear, length)
    this.trees = trees;
  }
  treeDensity(){ //this fun will be prototype
    for (const cur of instances){
      if (cur.type === 'st'){
        continue;
      }
    let average = cur.trees/cur.length
    console.log(`${cur.name} has a tree density of ${average} trees per square mile`)
    if (cur.trees >1000){
      console.log(`${cur.name} has more than 1000 trees`)
    }
  }
}
  averageAge(){
    let ages =[];
    for (const cur of instances){
      if (cur.type === 'st'){
        continue;
      }
      ages.push(new Date().getFullYear() - cur.buildYear) //push all ages into ages array
    }
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    console.log(`---------PARK REPORTS------------`)
    console.log(`Our ${ages.length} parks have an average age of ${arrAvg(ages)} years`)
  }
}
const bearWay = new Street('st', 'Bear Way', 1892, 12);
const newport = new Street('st', 'Newport Way', 1988, 23);
const lakeSammamish = new Street('st', 'Lake Sammamish Street', 1993, 32);
const fallCity = new Street('st', 'Fall City Street', 1888, 42);
const downtown = new Park('pk', 'Bellevue Downtown Park', 1990, 40, 310);
const sammamish = new Park('pk', 'Sammamish State Park', 1889, 59, 1001);
const coulon = new Park('pk', 'Gene Coulon Park', 1946, 48, 90);
downtown.averageAge();
downtown.treeDensity();
downtown.averageLength();
downtown.streetSize();
*/

//V 2.0

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
  constructor(name, buildYear){
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Element {
  constructor(name, buildYear, area, numTrees){
    super(name, buildYear);
    this.area = area;
    this.numTrees = numTrees;
  }

  treeDensity(){
    const density = this.numTrees/this.area;
    console.log(`${this.name} has a tree density of ${density} trees per square mile`)
  }
}

class Street extends Element {
  constructor(name, buildYear, length, size = 3){
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet(){
    const classification = new Map();//created map
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');
    console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street`)
  }
}

const allParks = [new Park('Bellevue Downtown Park', 1990, 40, 310),
new Park('Sammamish State Park', 1889, 59, 1001),
new Park('Gene Coulon Park', 1946, 48, 90)];

const allStreets = [new Street('Bear Way', 1892, 12, 1),
new Street('Newport Way', 1988, 23),
new Street('Lake Sammamish Street', 1993, 32, 4),
new Street('Fall City Street', 1888, 42, 5)];

function calc(arr){
  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
  return [sum, sum/arr.length];
}

function reportParks(p){
  console.log(`---------PARKS REPORTS------------`)
  //Density
  p.forEach(el => el.treeDensity());

  //Average age
  const ages = p.map(el => new Date().getFullYear() - el.buildYear);
  const [totalAge, avgAge] = calc(ages);
  console.log(`Our ${p.length} parks have an average of ${avgAge} years`)

  //Which park has more than 1000 trees
  const i = p.map(el => el.numTrees).findIndex(el => el >= 1000); //Loop thru all parks put all trees in i array and
  //then find index of the park that has more then 1000
  console.log(`${p[i].name} has more than 1000 trees`)
}

function reportStreets(s){
  console.log(`---------STREETs REPORTS------------`)
  //Total and avg lrngth of streets
  const [totalLength, avgLength] = calc (s.map(el => el.length));
  console.log(`Our ${s.length} streets have a total length of ${totalLength} miles, with average of ${avgLength} miles`)
  //Calssify sizes
  s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
