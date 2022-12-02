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

let score = 0;
let isFinished = false;
let totalQuestions = questions.length;

function finishQuiz() {
    startEl.show();
    timerEl.hide();
    quizEl.hide();
};

function startTimer() {
    let time = 15;
    timeEl.text(time);
    // changes timer css to display with jQuery
    timerEl.show();
    // sets timer going
    let timer = setInterval(function() {
        time--;
        timeEl.text(time);
        // OR operator checks if questions are finished or time has run out
        if (isFinished || time === 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

let qCounter = 0;
console.log(questions.length);

function showQuestion(qCounter) {
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


function checkTrue() {
    let buttonEl = $('button');
    buttonEl.click(function() {
        feedbackEl.show();
    // Unintentionally, this boolean value is being evaluated as a string. It works, but it's not right
        if (this.value == 'true') {
                messageEl.text('Correct!');
                qCounter++;
        } else {
                messageEl.text("That's not it, Fam.");
        }
    });
};

function startQuiz() {
    quizEl.show();
    if (qCounter < questions.length) {
        showQuestion(qCounter);
        checkTrue();
    } else {
        finishQuiz();
    }
}

startEl.click(function() {
    startTimer();
    startEl.hide();
    startQuiz();
});