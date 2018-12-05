function startButton() {
  $('#js-start-button').click(function(event) {
    goToNext();
  });
}

function submitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()
    var answer = $('input:checked');
    var userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      correctResponse();
    } else {
      incorrectResponse();
    }
  });
}

function nextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
     if(questionNum === 5) {
      createResultsPage(correct);
    } else {
      repeatQuestion();
      goToNext();
  }
  });
}

function restartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {
    questionNum = 1;
    correct = 0;
    goToNext();
  });
}

var questionSet = [
  { 
    number: 1,
    text: `Which of these animals are critically endangered?`,
    answer1: `Chimpanzee`,
    answer2: `Sea Lion`, 
    answer3: `Indian Elephant`, 
    answer4: `Orangutan`
  }, 

  {
    number: 2,
    text: `Which of these animals are critically endangered?`,
    answer1: `Blue Whale`, 
    answer2: `Amur Leapord`, 
    answer3: `Spider Monkey`, 
    answer4: `Giant Panda`
  }, 

  {
    number: 3,
    text: `Which of these animals are critically endangered?`,
    answer1: `Gorilla`, 
    answer2: `Arctic Wolf`, 
    answer3: `Hippopotamus`, 
    answer4: `Black Rhino`
  }, 
  {
    number: 4, 
    text: `Which of these animals are critically endangered?`,
    answer1: `Bengal Tiger`, 
    answer2: `Whale Shark`, 
    answer3: `Polar Bear`, 
    answer4: `Sea Turtle`
  }, 
  {
    number: 5,
    text: `Which of these animals are critically endangered?`,
    answer1: `Great White Shark`, 
    answer2: `Giant Tortoise`, 
    answer3: `Lowland Gorilla`, 
    answer4: `Red Panda`
  }
];

var ANSWERS = [ 
  `Orangutan`, 
  `Amur Leapord`, 
  `Black Rhino`, 
  `Bengal Tiger`, 
  `Lowland Gorilla`, 
];

let questionNum = 1;
let correct = 0;

function questionTemplate(correct, question, answered) {
  return `
    <section id="question-page" role="main">
    <h3 id="question">${question.text}</h3>
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio"></input>
          <span>${question.answer1}</span>
        </label>
        <label>
          <input class="answer" type="radio"></input>
          <span>${question.answer2}</span>
        </label>
        <label>
          <input class="answer" type="radio"></input>
          <span>${question.answer3}</span>
        </label>
        <label>
          <input class="answer" type="radio"></input>
          <span>${question.answer4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>
    </form>

    <div id="status-bar">
      <span id="question-number">Question: ${question.number}/5</span>
      <span id="score-number">Score: ${correct}/${answered}</span>
    </div>
  </section>
  `;
}

function goToNext() {
  var question = questionSet[questionNum - 1];
  var answered = questionNum - 1;
  $('#container').html(questionTemplate(correct, question, answered));
}

function checkUserAnswer(correctAnswers) {
  if(correctAnswers.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function correctResponse() {
  $('#container').html(correctFeedback);
  repeatCorrectAnswers();
}

var correctFeedback = 
`<section class="feedback-page" role="main">
    <h2>Correct. *Insert info about endangered animal*</h2>
    <button id="js-next-button">Next</button>
  </section>
`;

function incorrectResponse() {
  $('#container').html(incorrectFeedback(questionNum));
}

function incorrectFeedback(questionNum) {
  return `
  <section class="feedback-page">
      <h2>Incorrect. It was ${ANSWERS[questionNum - 1]}. *Insert Info about endangered animal*</h2>
      <button id="js-next-button">Next</button>
    </section>`;
}

function createResultsPage(correctAnswers) {
  $('#container').html(
    `<section id="score-page">
      <h2> Score: ${correctAnswers} out of 5</h2>
      <button id="js-restart-button">Try Again</button>
    </section>`
  );
}

function repeatQuestion() {
  questionNum++;
}

function repeatCorrectAnswers() {
  correct++;
}

function buttons() {
  startButton();
  submitButton();
  nextButton();
  restartButton();
}

buttons();
