var descriptions = {
    david: "you're not afraid to tell it like it is",
    alexis: "you're a social butterfly, super fashionable, and are always up for anything",
    jonny: "you just want some family time",
    moira: "you love reliving your glory days and overpronouncing words",
    "uh oh!": "please go back and answer all the questions"
}
var numberOfQuestions = 5; 

$('#submit').on('click', function(e) {
    // gather all checked radio-button values
    var choices = $("input[type='radio']:checked").map(function(i, radio) {
      return $(radio).val();
    }).toArray();

    
    // used this for help on writing js functions
    //appendto.com/2016/10/finding-the-most-frequent-string-in-a-javascript-array/
    var frequencies = {}; 
    for (i = 0; i < choices.length; i++) {
        el = choices[i];
        if (!frequencies[el]) {
            frequencies[el] = 1; 
        } else {
            frequencies[el]++;
        }
    };

    max = 0;
    winner = "";
    Object.keys(frequencies).forEach(function(key)  {
        if (frequencies[key] > max) {
            max = frequencies[key];
            winner = key; 
        }
    })

    if (choices.length < numberOfQuestions) {
        winner = "uh oh!"; 
        document.getElementById('congrats').innerHTML = "";
    }
    document.getElementById('whoami').innerHTML = winner; 
    document.getElementById('whoami-description').innerHTML = descriptions[winner]; 
});

// all from https://www.w3schools.com/howto/howto_css_modals.asp

var result = document.getElementById('myresult');
var btn = document.getElementById('submit');
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  result.style.display = "block";
}
span.onclick = function() {
  result.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == result) {
    result.style.display = "none";
  }
}