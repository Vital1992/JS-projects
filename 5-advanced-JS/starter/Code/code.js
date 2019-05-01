//Function returniong function

/*function interviewQuestion(job){
  if (job==='designer'){
    return function(name){
      console.log(name+', what is UX');
    }
  }else if (job==='teacher'){
      return function(name){
        console.log('What do you teach, ' + name + '?');
      }
  }else{
      return function(name){
        console.log('Hello'+name+', what do you do?')
      }
    }
  };
  var teacherQuestion = interviewQuestion('teacher');
  teacherQuestion('John');
  var designerQuestion = interviewQuestion('designer');
  designerQuestion('Jack');
*/
/*
//----------------------------------------------------------------
//Without names:
function interviewQuestion(job){
  if (job==='designer'){
    return function(){
      console.log('What is UX?');
    }
  }else if (job==='teacher'){
      return function(){
        console.log('What do you teach?');
      }
  }else{
      return function(){
        console.log('Hello, what do you do?')
      }
    }
  };
  var teacherQuestion = interviewQuestion('teacher');
  teacherQuestion();
  var designerQuestion = interviewQuestion('designer');
  designerQuestion();
*/

/*function message(input){
  if (input==='чай'){
    return function(){
      alert('И люблю, люблю я чаёчек и конечно кафиёчек!');
    }
  } else {
    return function(){
      alert('Ниправильна!!!!! Другой пиши!');
    }
  }
};

var typing=message('12');
*/
var name;

function show(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = 'tea.jpg';
    img.width = 1500;
    img.height = 800;
    img.alt = 'Tea';
    img.style.position = "absolute";
    img.style.top = "0px";
    img.style.left = "0px";
    img.style.margin = '0px';
    //img.style.position = "relative";
// tip: parent element of another element containing floated elements
//      should have property overflow set to hidden
  //  img.style.float = "left";
  //  img.style.margin = "5px";

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
};

function init(){
  document.getElementById('text').style.display='none';
  document.querySelector('.player-name').style.display='none';
  document.querySelector('.btn').style.display='none';
};
init();
document.querySelector('.btn1').addEventListener('click', function (){
  name = document.getElementById('text1').value
  if (name){
  document.getElementById('text').style.display='block';
  document.querySelector('.player-name').style.display='block';
  document.querySelector('.player-name').textContent=name +' что ты любишь пить?';
  document.querySelector('.btn').style.display='block';
}else{alert('Ну как зовут то?!')}
}
);
document.querySelector('.btn').addEventListener('click', function (){
  input = document.getElementById('text').value
//if input not: Undefined, 0, "", null (those are coercied to false)
  if (input){
    var typing=message(input);
    typing();
  }
  else {
  alert('Давай пиши!');
}
});
function message(typing){
  if (typing==='чай'||typing==='tea'){
    return function(){
      alert(name+', запевай!'+' И люблю, люблю я чаёчек и конечно кафиёчек!');
      show();
    }
  } else {
    return function(){
      alert('Ну '+name+', ниправильна!!!!! Другой пиши!');
    }
  }
};
