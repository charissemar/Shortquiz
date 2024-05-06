const questions = [
    {
        question: "In JavaScript, which function is used to parse a string and return a floating-point number?",
        answers: [
            { text: "parseInt", correct: false},
            { text: "parseFloat", correct: true},
            { text: "parseDouble", correct: false},
            { text: "parseLong", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false},
            { text: "Computer Style Sheets", correct: false},
            { text: "Cascading Style Sheets", correct: true},
            { text: "Colorful Style Sheets", correct: false}
        ]
    },
    {
        question: "Which of the following is not a valid data type in Python?",
        answers: [
            { text: "List", correct: false},
            { text: "Tuple", correct: false},
            { text: "Dictionary", correct: false},
            { text: "Array", correct: true}
        ]
    },
    {
        question: "In Java, which keyword is used to explicitly refer to the superclass?",
        answers: [
            { text: "super", correct: true},
            { text: "extends", correct: false},
            { text: "parent", correct: false},
            { text: "superclass", correct: false}
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Structured Query Language", correct: true},
            { text: "Standard Question Language", correct: false},
            { text: "Sequential Query Language", correct: false},
            { text: "Structured Question Language", correct: false}
        ]
    },
    {
        question: "Which of the following is not a valid programming language?",
        answers: [
            { text: "Python", correct: false},
            { text: "Ruby", correct: false},
            { text: "HTML", correct: true},
            { text: "Java", correct: false}
        ]
    },
    {
        question: "In C++, which operator is used to allocate memory for an object?",
        answers: [
            { text: "new", correct: true},
            { text: "allocate", correct: false},
            { text: "malloc", correct: false},
            { text: "memory()", correct: false}
        ]
    },
    {
        question: "Which of the following is a relational database management system?",
        answers: [
            { text: "MongoDB", correct: false},
            { text: "SQLite", correct: true},
            { text: "Redis", correct: false},
            { text: "Elasticsearch", correct: false}
        ]
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true},
            { text: "High Transfer Text Protocol", correct: false},
            { text: "Hyper Transfer Text Protocol", correct: false},
            { text: "High Text Transfer Protocol", correct: false}
        ]
    },
    {
        question: "What does the acronym API stand for?",
        answers: [
            { text: "Application Program Interface", correct: false},
            { text: "Advanced Programming Interface", correct: false},
            { text: "Application Programming Interface", correct: true},
            { text: "Automated Programming Interface", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
});

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();
