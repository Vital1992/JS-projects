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
    }
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
            expensesContainer:'.expenses__list'
    };
    return{
        getInput:function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        addListItem:function(obj, type){
          var html, newHtml;
          //Create HTML string with placeholder text
          if (type =='inc'){
            element = DOMstrings.incomeContainer;
html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          }else if (type =='exp'){
            element = DOMstrings.expensesContainer;
html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
}
          //Replace the placeholder with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);

          //Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function(){
          var fields, fieldsArr;
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
    };

    var CtrlAddItem = function(){
      var input, newIteml;
    // 1. Get input filed data
      input = UICtrl.getInput();
      console.log(input);
    // 2. Add the item to the budget controller
      newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
    // Passing values from UI controller to the Budget controller function which will add those values to the array
    // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
    // Cleat the input field
    UICtrl.clearFields();
    // 4. Calculate the budget
    // 5. Display the budget on the UI
    };
return{
    init:function(){
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
