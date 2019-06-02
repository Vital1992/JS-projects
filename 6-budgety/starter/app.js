/*var data = {
  allItems:{
    exp:[],
    inc:[]
  },
  totals:{
    exp:0,
    inc:0
  }
};
  data.allItems.exp.push(1,2,3,4);
console.log(data.allItems.exp[0]);
*/

var BudgetController = (function(){
//function constructor for expenses
  var Expense = function(id, description, value){
    this.id=id;
    this.description=description;
    this.value=value;
    this.percentage= -1; //adding percentage to the "exp" array of the data structure
  };
  //calculate percantage fore each expense
  Expense.prototype.calcPercentage = function(totalIncome){
    if (totalIncome > 0){ //to avoid dividing by 0
    this.percentage = Math.round((this.value/totalIncome)*100);
    }else{
    this.percentage = -1;
    }
  };
  //return calculated percentage
  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };

  //function constructor for income
  var Income = function(id, description, value){
    this.id=id;
    this.description=description;
    this.value=value;
  };
  //create data structure for all expenses and incomes
  var data = {
    allItems:{
      exp:[],
      inc:[]
    },
    totals:{
      exp:0,
      inc:0
    },
    budget:0, //to store budget: income - expenses
    percentage:-1 //percentage of income that we spent, set to -1 to make initial value non-existent
  };

var calculateTotal = function(type){
  var sum = 0;
  data.allItems[type].forEach(function(cur){ //looping thru exp or inc array to sum up all values
    sum = sum + cur.value //cur.valur selects number from 'value' peram of Exp or Inc object
  });
  data.totals[type] = sum; //to add it to the totals object
};

//public method to allow other modules to add new items to the data sctructure
return{
  addItem: function(type, des, val){
    var newItem, ID;
//ID should = last ID+1
//[data.allItems[type].length-1] is the legnth of the array -1, so it's the last number in the array
// .id+1 adds one to the last number in the array
  if (data.allItems[type].length>0){
// To set the first ID (when array is empty) to 0
  ID = data.allItems[type][data.allItems[type].length-1].id+1;
}else{
  ID=0;
};
//Create new item based on inc or exp type
    if(type=='exp'){
    newItem = new Expense(ID, des, val);
  }else if (type=='inc'){
    newItem = new Income(ID, des, val);
  }
// exp or inc type from "if else" statement will add income or expense into data structure
  data.allItems[type].push(newItem);
  return newItem;
  //Add all of this to the #2 in controller
}, //closing addItem function

  deleteItem: function(type, id){
    var ids, index;
      ids = data.allItems[type].map(function(current){ //map loop unlike forEach loop, returns a brand new array
      return current.id; // returning array of ids of Expense or Income objects
    });

    index = ids.indexOf(id); // returns the index number of the element of the 'id' array that we pass as an arg

    if (index !== -1){ //if the index exists, -1 means we didn't find the element
    data.allItems[type].splice(index, 1) // splice is removing an item, the first arg is the position number at which we want to start deleting
    // the second arg is the number of elements we want to delete
    }
  },

  calculateBudget: function(){
    //Calculate total income and expenses: it's private calculateTotal function
    calculateTotal('exp');
    calculateTotal('inc');
    //Calculate the budget: income-expenses
    data.budget = data.totals.inc - data.totals.exp;
    //Calculate the percentage of income that we spent
    if (data.totals.inc>0){ // To prevent dividing exp by 0
    data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
  }else{
    data.percentage = -1;
  }
  },

  calculatePercenatges: function(){ //calculate the percentage for each expense we have in the data structure
    data.allItems.exp.forEach(function(cur){
      cur.calcPercentage(data.totals.inc);
    });
  },

  getPercentages: function(){ //return all expenses' percentages in one array
    var allPerc = data.allItems.exp.map(function(cur){
      return cur.getPercentage();
    });
    return allPerc;
  },

  getBudget: function(){ //to collect budget, percentage and totals and pass it to updateBudget method
    return{
      budget: data.budget,
      totalInc: data.totals.inc,
      totalExp: data.totals.exp,
      percentage: data.percentage
    };
  },
testing:function(){
//that's how id can be retrieved console.log(data.allItems.inc[0].id);
console.log(data);
}
};

                  })();

var UIController = (function(){

        var DOMstrings={
            inputType:'.add__type',
            inputDescription:'.add__description',
            inputValue:'.add__value',
            inputBtn:'.add__btn',
            incomeContainer:'.income__list',
            expensesContainer:'.expenses__list',
            budgetLabel:'.budget__value',
            incomeLabel:'.budget__income--value',
            expensesLabel:'.budget__expenses--value',
            percentageLabel:'.budget__expenses--percentage',
            container: '.container',
            //using container as event listener because it's parent of "delete" button child which is not available yet in teh DOM when page is loaded
            expensesPercLabel: '.item__percentage',
            dateLabel:'.budget__title--month'
    };

    //1. Round all decimals to 2 points: 2310.4567 -> + 2,310.46
    //2. Add '+' in front of incomes and '-' in front of expenses
    //3. Add commas to separate thousands
            var formatNumber = function(num, type){
              var numSplit, inc, dec, type;
              num = Math.abs(num); //absolute number to remove any signs (+/-)
              num = num.toFixed(2); //round all decimals to 2 points

              numSplit = num.split('.'); //split 2000,495 to 2000 and 495
              int = numSplit[0];
              if (int.length > 3 && int.length<=6){ //length shows how many numbers our value has (5000->4)
                int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3) //first arg of "substr" is the index number wehere we want to start and the second arg is the how many characters we want
              } //2000 -> 2 + , + 000 = 2,000
    else if (int.length>6){
                int = int.substr(0, int.length-6) + ',' + int.substr(int.length-3, 3) + ',' + int.substr(int.length-6, 3)
              };

              dec = numSplit[1];

              return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec; // (type === 'exp' ? '-' : '+') will be replaced with + or -
            };

    return{
        getInput:function(){
            return{ // To return all three values at once we can save them in input object
                type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
//parseFloat - to convert input to number with decimals, otwerwise it will be saved as a string
            };
        },

        addListItem:function(obj, type){
          var html, newHtml;
          //Create HTML string with placeholder text
          if (type =='inc'){
            element = DOMstrings.incomeContainer;
html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          }else if (type =='exp'){
            element = DOMstrings.expensesContainer;
html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
}
          //Replace the placeholder with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

          //Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID){
          var el = document.getElementById(selectorID); //selectorID will be "inc-0" or "exp-0"
          el.parentNode.removeChild(el); // parentNode.removeChild removes the item, in our case by "inc-0" or "exp-0" id
        },

        clearFields: function(){
          var fields, fieldsArr;
          //creating array of input fields
          fields = document.querySelectorAll(DOMstrings.inputDescription +
            ',' + DOMstrings.inputValue);
          // Converting NodeList to the array using slice
          fieldsArr = Array.prototype.slice.call(fields);
          // Using forEach loop. 1) Current (is the value of the array that is being processed)
          //will go thru inputDescription and inputValue.
          // 2) Index is the index number, will go from 0 to the length of the array minus one
          // 3) Array is the entire array 'fieldsArr'
          fieldsArr.forEach(function(current, index, array){
            current.value="";
          });
          // Set the field input focus to the fist field
          fieldsArr[0].focus();
  },
          /*
Nodelists supports the nodelist[i] syntax, just like an array. So it does not
have to convert to an array for this to work.
clearField: function () {
            var fields;
            fields = document.querySelectorAll(DOMstrings.inputDescription +
            ', ' + DOMstrings.inputValue);
            for (var i = 0; i < fields.length; i++) {
                fields[i].value = '';
            }
        },
          */

        displayBudget: function(obj){
          var type;
          obj.budget > 0 ? type = 'inc' : type = 'exp';
          document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
          document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
          document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

          if (obj.percentage>0){ // to not show -1% when we have only expenses
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
          }else{
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';
          }
        },

        displayPercentages: function(percentages){ //passing array with all percentages
          var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); //returns nodeList
          //forEach loop but for nodeLists
          var nodeListForEach = function(list, callback){
            for (var i=0; i<list.length; i++){
              callback(list[i], i)
            }
          };
// When we call "nodeListForEach function", we pass a callback function into it (function(current, index))
//and this function is assigned to "callback" parameter. We loop over the nodeList and in each iteration
//the callback function (callback(list[i], i)) gets called with the arguments that are exactly the same as in
//(function(current, index)). So list[i]=current, i=index. And the code in below function will be exucuted as much
//times as much iterations "var nodeListForEach" has
          nodeListForEach(fields, function(current, index){
            if (percentages[index] > 0){
              current.textContent = percentages[index] + '%'; //displaying percentage number from percentages array using index
            }else{
              current.textContent = '---'; //if percentage is 0
            }
          });
        },
/*
        Alternative way:
        displayPercentages: function(percentages){ //passing array with all percentages
          var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); //returns nodeList
          //forEach loop but for nodeLists
          var nodeListForEach = function(){
            for (var i=0; i<fields.length; i++){
              if (percentages[i]>0){
                fields[i].textContent = percentages[i] + '%'
              }else{
                fields[i].textContent = '---';
              }
            }
          };
          nodeListForEach();
        },
*/

        displayMonth: function(){
        var now, year, months;
        now = new Date(); //returns current Date, then we can use mehods to retrieve the current, date,hour, minute, month, year
        // var christmas = new Date(2019, 11, 25); //another way to pass a day
        year = now.getFullYear(); //method to get a year

        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        month = now.getMonth(); //get a months but as an index
        document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' +year; //months[month] will retrieve month name from the array
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    }


                  })();

var controller = (function(UICtrl,BudgetCtrl){
    var setupEventListeners = function(){
            var DOM = UICtrl.getDOMstrings();
            document.querySelector(DOM.inputBtn).addEventListener('click',CtrlAddItem);
            document.addEventListener('keypress', function(event){
        if (event.keyCode===13 || event.which===13){
            CtrlAddItem()
            }
            });
            document.querySelector(DOM.container).addEventListener('click', CtrlDeleteItem);
    };
    var updateBudget = function(){
      // 1. Calculate the budget
      BudgetCtrl.calculateBudget();
      // 2. Return the budget
      var budget = BudgetCtrl.getBudget();
      // 3. Display the budget on the UI
      UICtrl.displayBudget(budget);
      console.log(budget);
    };

    var updatePercentages = function(){ //Update percenatges for each expense
      // 1. Calculate percentages
      BudgetCtrl.calculatePercenatges();
      // 2. Read percentages from the budget controller
      var percentages = BudgetCtrl.getPercentages();
      // 3. Update the UI with the new percentages
      console.log(percentages);
      UICtrl.displayPercentages(percentages);
    };

    var CtrlAddItem = function(){
      var input, newItem;
    // 1. Get input filed data
      input = UICtrl.getInput();
      console.log(input);
// To prevent adding empty values by clicking on V button and pushing enter button:
    if (input.description !== "" && !isNaN(input.value) && input.value>0) {  // !isNaN means is should not be NaN (so accept only numbers)
    // 2. Add the item to the budget controller
      newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
    // Passing values from UI controller to the Budget controller function which will add those values to the array
    // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
    // 4. Cleat the input field
      UICtrl.clearFields();
    // 5. Calculate and update Budget
      updateBudget();
    // 6. Calculate and update the percentages
      updatePercentages();
  }
    };

    var CtrlDeleteItem = function(event){ //event is the target element of event delegation, the target property of the event is showing us where the event was fired
      //console.log(event.target); //is showing the target element
      //console.log(event.target.parentNode.parentNode.parentNode.parentNode); //moving up to the parent, it's called DOM traversing
      //console.log(event.target.parentNode.parentNode.parentNode.parentNode.id); //to get that item by id
      var itemID, splitID, type, ID;
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //result will be "inc-0" or "exp-0", which is HTML from addListItem
      if (itemID){
        splitID = itemID.split('-');
        type = splitID[0]; //because spliID will have array ["inc","0"] or ["exp","0"]
        ID = parseInt(splitID[1]); //to convert a string into an integer

        //1. Delete the item from the data structure
        BudgetCtrl.deleteItem(type, ID);

        //2. Delete the item from the UI
        UICtrl.deleteListItem(itemID);

        //3. Update and show the new budget
        updateBudget();

        // 4. Calculate and update the percentages
        updatePercentages();
      }
    };

return{
    init:function(){
        UICtrl.displayMonth();
        UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: 0
        }); // to put 0 in all content
        setupEventListeners();
    }
};
                  })(UIController, BudgetController);

controller.init();

/* We can execute something inside var if that var inside function that called
function call(){
  var a = console.log('hi!');
};
call();
*/
