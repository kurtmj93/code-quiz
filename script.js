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

// variables to use in functions
let qCounter = 0;
let score = 0;

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
    qCounter = 0;
    iterateQuiz(qCounter);
}

function finishQuiz() {
    startEl.show();
    timerEl.hide();
    quizEl.hide();
};

function startTimer() {
    // number of seconds on the timer
    let time = 20;
    timeEl.text(time);
    timerEl.show();
    // sets timer going, updates time every second
    let timer = setInterval(function() {
        time--;
        timeEl.text(time);
        // checks if time has run out
        if (time === 0) {
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
                countClick();
        } else if (this.value == 'false') {
                messageEl.text("That's not it.");
                countClick();
        } else {
            return;
        }
    });
};

// finish quiz or update counter
function iterateQuiz(qCounter) {
    if (qCounter === questions.length) {
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