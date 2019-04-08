$.getJSON("data.json", function(data) {
  $('#quiz-title').append(`<h1>${data.quiz_title}</h1>`);

  data.questions.forEach(question => {
    var current_question = $(`<div class="question"></div>`);
    current_question.append(`<div class="q-header">
                            <h3 class="question_name">${question.question_name}</h3>
                            <img class="question_img_url" src=${question.question_img_url}></div>`)

    var current_choices = $(`<div class="choices"></div>`);
    question.choices.forEach(choice => {

      var current_label = $(`<label></label>`)
      current_label.append(`<input type="radio" name=${question.name} value=${choice.value}>`);
    
      var curr_choice = $(`<div class="choice"></div>`)
      if (choice.img) {
        curr_choice.append(`<img src=${choice.img} class="img-with-border"/>`);
      }
      if (choice.caption) {
        curr_choice.append(`<p class="caption">${choice.caption}</p>`);
      }
      current_label.append(curr_choice);
      current_choices.append(current_label);
      
    });

    current_question.append(current_choices);
    $('.questions').append(current_question);
  }); 

  $('#submit').html(data.submit_button);
});

var descriptions = {
    david: "you're not afraid to tell it like it is",
    alexis: "you're a social butterfly, super fashionable, and are always up for anything",
    jonny: "you just want some family time",
    moira: "you love reliving your glory days and overpronouncing words",
    "uh oh!": "please go back and answer all the questions"
}

var winner = ""; // need this to be global 

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
    Object.keys(frequencies).forEach(function(key)  {
        if (frequencies[key] > max) {
            max = frequencies[key];
            winner = key; 
        }
    })

    $.getJSON("data.json", function(data) {
      console.log(winner);
      var current_outcome;
      if (data.questions.length < data.number_of_questions) {
        current_outcome= $(`<p id="error">${data.error}</p>`);
      } else {
        current_outcome = $(`<p id="congrats">${data.congrats}</p>
                              <p id="whoami">${winner}</p>
                              <p id="whoami-description">${data.outcomes[winner].text}</p>`);
      }
      $('.result-content').append(current_outcome);
    }); 
  
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