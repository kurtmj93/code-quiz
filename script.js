// grab HTML elements using JQuery
let quizEl = $('#quiz');
let questionEl = $('#question');
let mc1El = $('#mc1');
let mc2El = $('#mc2');
let mc3El = $('#mc3');
let mc4El = $('#mc4');
let timerEl = $('#timer');
let timeEl = $('#time');
let feedbackEl = $('#feedback');
let messageEl = $('#message');
let startEl = $('#start');
let scoreEl = $('#score');
let correctEl = $('#correct');
let saveEl = $('#save-score');
let highscoresEl = $('#highscores');
let showscoresEl = $('#showscores');

// variables to use in functions
let qCounter = 0; // question iterator
let score = 0; // score counter
let isFinished = false; // 
let time = 0; // quiz time value is set later by startTimer

// parse stored highscores
let storedscores = JSON.parse(localStorage.getItem("highscores"));

// array of question objects
let questions = [
    {
        qText: "Commonly used data types do NOT include: ",
        answers: [
            {text: "Strings", isAnswer: false },
            {text: "Booleans", isAnswer: false },
            {text: "Alerts", isAnswer: true }, 
            {text: "Numbers", isAnswer: false }
        ]
    },{
        qText: "Arrays in Javascript can be used to store _____________.",
        answers: [
            {text: "Numbers and Strings", isAnswer: false },
            {text: "Other Arrays", isAnswer: false },
            {text: "Booleans", isAnswer: false },
            {text: "All of the Above", isAnswer: true }
        ]
    },{
        qText: "Click on the answer.",
        answers: [
            {text: "The answer.", isAnswer: true },
            {text: "Not the answer.", isAnswer: false },
            {text: "Definitely not the answer.", isAnswer: false }, 
            {text: "Don't click here.", isAnswer: false }
        ]
    }
];

function startQuiz() {
    // show stuff
    quizEl.show();
    feedbackEl.hide();
    scoreEl.show();
    // set start values
    isFinished = false;
    score = 0;
    correctEl.text(score);
    qCounter = 0;
    // first question
    iterateQuiz(qCounter);
}

function finishQuiz() {
    saveEl.show();
    timerEl.hide();
    quizEl.hide();
};

function saveScore() {
    let submitEl = $('#submit');
    submitEl.click(function(event) {
        event.preventDefault();
        let initialsEl = $('#initials');
        // exit function if initials input is blank
        if (initialsEl.val() === "") {
            return;
        }

        let yourscore = {initials: $.trim(initialsEl.val()), s: score}; // lots of troubleshooting from mixing jquery and vanila...
        if (storedscores !== null) {
            storedscores.push(yourscore);
            localStorage.setItem("highscores", JSON.stringify(storedscores));
        } else {
            // creating a blank array to push your score to - if there is no stored data
            let highscores = [];
            highscores.push(yourscore);
            localStorage.setItem("highscores", JSON.stringify(highscores));
            storedscores = JSON.parse(localStorage.getItem("highscores")); // need to update storedscores value here so showScores() works
        }
        showScores();
    });
};

function showScores() {
    if (storedscores !== null) {
        
        storedscores.sort(function(a,b){return b.s - a.s}); // sorts stored scores array by top scores
        highscoresEl.empty(); // empties div if it already has stuff created - fixes duplication issue
      
    let table = document.createElement("table");
        // loops through all stored scores to create rows - cells for initials and score
    for (var i = 0; i < storedscores.length; i++) {
        let hsinit = storedscores[i].initials;
        let hsscore = storedscores[i].s;
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        cell1.textContent = hsinit;
        cell2.textContent = hsscore;
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
      }
    highscoresEl.append(table);
    highscoresEl.show();
    }
};

function startTimer() {
    // number of seconds on the timer
    time = 20;
    timeEl.text(time);
    timerEl.show();
    // sets timer going, updates time every second
    let timer = setInterval(function() {
        time--;
        timeEl.text(time);
        // OR operator checks if time has run out or if questions are finished
        if (isFinished || time === 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000); // 1000ms = 1 second
}

// update question and button texts and values - this could maybe be more efficient
function updateQuestion(qCounter) {
    questionEl.text(questions[qCounter].qText);
    mc1El.text(questions[qCounter].answers[0].text);
    mc1El.val(questions[qCounter].answers[0].isAnswer);
    mc2El.text(questions[qCounter].answers[1].text);
    mc2El.val(questions[qCounter].answers[1].isAnswer);
    mc3El.text(questions[qCounter].answers[2].text);
    mc3El.val(questions[qCounter].answers[2].isAnswer);
    mc4El.text(questions[qCounter].answers[3].text);
    mc4El.val(questions[qCounter].answers[3].isAnswer);
}

// iterate on button click - used in checkTrue listener - means quiz advanced whether correct or incorrect
function countClick() {
    feedbackEl.show();
    correctEl.text(score);
    qCounter++;
    iterateQuiz(qCounter);
}

// check if button value is correct answer
function checkTrue() {
    let buttonEl = $('button');
    buttonEl.click(function() {
    // Unintentionally, this boolean value is being evaluated as a string. It works, but... is it right??
        if (this.value == 'true' ) {
                messageEl.text('Correct!');
                score++;
                countClick();
        } else if (this.value == 'false') {
                messageEl.text("That's not it.");
                time -= 5; // acceptance criteria - remove time when wrong
                timeEl.text(time);
                countClick();
        } else {
            return;
        }
    });
};

// finish quiz or go to next question
function iterateQuiz(qCounter) {
    if (qCounter === questions.length) {
        isFinished = true; // need to update this value to turn off timer
        finishQuiz();
    } else {
        updateQuestion(qCounter);
    }
}


// run global event listeners

startEl.click(function() {
    startTimer();
    startEl.hide();
    startQuiz();
});

showscoresEl.click(function() {
    showScores();
})

checkTrue();
saveScore();