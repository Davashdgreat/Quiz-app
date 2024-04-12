const questions = [
    {
        question: "What is my name?",

        answers: [
            {Text: "Ashley Davidson young", correct:false},
            {Text: "Ashaolu David Olaoluwatomi", correct:true},
            {Text: "Ashen Viper zilla", correct:false},
            {Text: "Ashluxe Gucci Feragamo", correct:false}
        ]
    },
    {
        question: "What is my nickname?",

        answers: [
            {Text: "Davash", correct:true},
            {Text: "Davido", correct:false},
            {Text: "Dave", correct:false},
            {Text: "Davidoski", correct:false}
        ]
    },
    {
        question: "What am i?",

        answers: [
            {Text: "UI/UX designer", correct:false},
            {Text: "Product manager", correct:false},
            {Text: "Tech Support", correct:false},
            {Text: "Web Developer", correct:true}
        ]
    },
    {
        question: "What languages don't i know?",

        answers: [
            {Text: "JavaScript", correct:false},
            {Text: "German", correct:true},
            {Text: "React", correct:false},
            {Text: "Node", correct:false}
        ]
    },
];

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answerbtn')
const nextButton = document.getElementById('nextbtn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Next'
    showQuestion()
}

function showQuestion(){

    resetState()

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.Text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}


function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'

    if (isCorrect){
        selectedBtn.classList.add('correct')
        score++
    }
    else{
        selectedBtn.classList.add('Incorrect')
    }        

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    }) 
    
    nextButton.style.display = 'block'

    
    
}

function showScore(){
    resetState()
    questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!'
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

nextButton.addEventListener( "click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
});  

startQuiz()