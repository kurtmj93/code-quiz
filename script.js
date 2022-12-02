// grab HTML elements using JQuery
let quizEl = $('#quiz');
let timerEl = $('#timer');
let timeEl = $('#time');
let feedbackEl = $('#feedback');
let messageEl = $('#message');
let startEl = $('#start');

// array of question objects

let questions = [
    {
        text: "Commonly used data types do NOT include: ",
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },{
        text: "Arrays in Javascript can be used to store _____________.",
        options: ["Numbers and Strings", "Other Arrays", "Booleans","All of the Above"],
        answer: "All of the Above"
    },{
        text: "Click on the answer.",
        options: ["The answer.", "Not the answer.", "Definitely not the answer.", "Don't click here."],
        answer: "The answer."
    }
];

let score = 0;
let isFinished = false;
let totalQuestions = questions.length;

function finishQuiz() {
    startEl.show();
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

function startQuiz() {
    let i = 0;
        let buttons = questions[i].options.map(option => {
            let btn = document.createElement("button");
            btn.id = option;
            btn.textContent = option;
            return btn;
        });
        quizEl.append(buttons);
        let buttonEl = $("button");
        buttonEl.click(function() {
            if (this.id == questions[i].answer) {
                alert('you got it bub');
            } else {
                alert('wrong');
            }
        });
    }

startEl.click(function() {
    startTimer();
    startEl.hide();
    startQuiz();
});