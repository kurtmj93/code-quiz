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

// variables to use in functions
let qCounter = 0; // question iterator
let score = 0; // score counter
let isFinished = false; // 
let time = 0; // quiz time value is set later by startTimer

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
    quizEl.show();
    feedbackEl.hide();
    scoreEl.show();
    isFinished = false;
    qCounter = 0;
    score = 0;
    correctEl.text(score);
    iterateQuiz(qCounter);
}

function finishQuiz() {
    startEl.show();
    timerEl.hide();
    quizEl.hide();
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

// iterate on button click, for use in checkTrue
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
    // Unintentionally, this boolean value is being evaluated as a string. It works, but is it right
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

// finish quiz or update counter
function iterateQuiz(qCounter) {
    if (qCounter === questions.length) {
        isFinished = true; // need to update this value to turn off timer
        finishQuiz();
    } else {
        updateQuestion(qCounter);
    }
}

// start quiz button
startEl.click(function() {
    startTimer();
    startEl.hide();
    startQuiz();
});

// run global button listener
checkTrue();