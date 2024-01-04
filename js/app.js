const data = [{
        id: 1,
        question: "What is the keyword used to declare a variable in the global scope in JavaScript?",
        answers: [{
                answer: "local",
                isCorrect: false
            },
            {
                answer: "global",
                isCorrect: false
            },
            {
                answer: "var",
                isCorrect: true
            },
            {
                answer: "let",
                isCorrect: false
            }
        ]
    },
    {
        id: 2,
        question: "In React, what is the name of the function used to update the state?",
        answers: [{
                answer: "updateState",
                isCorrect: false
            },
            {
                answer: "modifyState",
                isCorrect: false
            },
            {
                answer: "setState",
                isCorrect: true
            },
            {
                answer: "changeState",
                isCorrect: false
            }
        ]
    },
    {
        id: 3,
        question: "In HTML, what attribute is used to open a link in a new window?",
        answers: [{
                answer: "new-tab",
                isCorrect: false
            },
            {
                answer: "target=\"_blank\"",
                isCorrect: true
            },
            {
                answer: "popup",
                isCorrect: false
            },
            {
                answer: "open-window",
                isCorrect: false
            }
        ]
    },
    {
        id: 4,
        question: "What CSS selector is used to apply a specific style to an HTML element?",
        answers: [{
                answer: "#element",
                isCorrect: true
            },
            {
                answer: "element",
                isCorrect: false
            },
            {
                answer: ".element",
                isCorrect: false
            },
            {
                answer: "element.style",
                isCorrect: false
            }
        ]
    },
    {
        id: 5,
        question: "What is NOT a framework?",
        answers: [{
                answer: "React",
                isCorrect: false
            },
            {
                answer: "Angular",
                isCorrect: false
            },
            {
                answer: "Vue",
                isCorrect: false
            },
            {
                answer: "Python",
                isCorrect: true
            }
        ]
    },
];

const resultScreen = document.querySelector('.result')
const quizScreen = document.querySelector('.quiz');
const question = document.querySelector('.question');
const quiz = document.querySelector('.quiz-row');
const answersContainer = document.querySelector(".quiz-row");
const answer = document.querySelectorAll(".answer");
const submit_btn = document.querySelector('#submit');
const again_btn = document.querySelector('#again');

const modal = document.querySelector('.modal');

modal.addEventListener('click', () => {
    modal.classList.add('active')
    showFirst('grid')
})

let qIndex = 0;
let correct_answers = 0;
let wrong_answers = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
    qIndex = 0;
    correct_answers = 0;
    wrong_answers = 0;
    total = 0;

    resultScreen.style.display = 'none'
    quizScreen.style.display = 'grid'

    showQuestion(qIndex)
}

again_btn.addEventListener('click', () => {
    playAgain()
})

const showFirst = (css) => {
    quizScreen.style.display = css
}

const showResult = () => {
    resultScreen.style.display = 'grid'
    quizScreen.style.display = 'none'

    resultScreen.querySelector('.correct').textContent = `
    Correct Answers: ${correct_answers}
    `
    resultScreen.querySelector('.wrong').textContent = `
    Wrong Answers: ${wrong_answers}
    `

    const score = (correct_answers - wrong_answers) * 20;
    resultScreen.querySelector('.Score').textContent = `
    Score: ${score >= 0 ? score : 0}
    `;
}

const showQuestion = (qNumber) => {

    if (data.length === qIndex) return showResult();

    document.querySelector('.numberQuestions').innerHTML = `
    ${qIndex + 1} of ${data.length} Questions
    `

    selectedAnswer = null
    question.textContent = data[qNumber].question
    quiz.innerHTML = data[qNumber].answers.map((el, idx) => {
        return `
        <div class="answer">
        <input type="radio" id=${idx} name="answer" value=${el.isCorrect} />
            <label for="${idx}"> ${el.answer} </label>
        </div>
        `
    }).join("")

    selectAnswer();
}

const selectAnswer = () => {
    answersContainer.querySelectorAll('.answer').forEach(answerElement => {
        const inputElement = answerElement.querySelector('input');

        inputElement.addEventListener('click', () => {
            answersContainer.querySelectorAll('.answer').forEach(element => {
                element.classList.remove('active');
            });
            answerElement.classList.add('active');
            selectedAnswer = inputElement.value;
        });
    });
};

const submitAnswer = () => {
    submit_btn.addEventListener('click', () => {
        if (selectedAnswer !== null) {
            selectedAnswer === 'true' ? correct_answers++ : wrong_answers++
            qIndex++
            showQuestion(qIndex)
        } else {
            alert('Select an answer')
        }
    })
}

showQuestion(qIndex);
submitAnswer();
showFirst('none')