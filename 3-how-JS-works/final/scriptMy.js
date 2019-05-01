/*
var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);

        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}
john.calculateAge();

var dice = Math.floor(Math.random()*6)+5;
console.log(dice);
*/

var a=1;
var b=1;
if (a==1){console.log('yeah')}
else if (a==2 || b==2 || (a==1 && b==1)){console.log('no')}
