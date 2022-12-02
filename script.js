// grab HTML elements using JQuery
let quizEl = $('#quiz');
let timerEl = $('#timer');
let timeEl = $('#time');
let feedbackEl = $('#feedback');
let messageEl = $('#message');
let startEl = $('#start')

// array of question objects

let questions = [
    {
        "text": "Commonly used data types do NOT include: ",
        "mc1": "Strings",
        "mc2": "Booleans",
        "mc3": "Alerts",
        "mc4": "Numbers",
        "answer": "Alerts"
    },{
        "text": "Arrays in Javascript can be used to store _____________.",
        "mc1": "Numbers and Strings",
        "mc2": "Other Arrays",
        "mc3": "Booleans",
        "mc4": "All of the Above",
        "answer": "All of the Above"
    },{
        "text": "Click on the answer.",
        "mc1": "The answer.",
        "mc2": "Not the answer.",
        "mc3": "Definitely not the answer.",
        "mc4": "Don't click here.",
        "answer": "The answer."
    }
];

let score = 0;
let isFinished = false;

function finishQuiz() {
    alert("it's over");
};

function startTimer() {
    let time = 5;
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

startEl.click(function() {
    startTimer();
});