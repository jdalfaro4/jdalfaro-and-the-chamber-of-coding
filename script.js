var mHeader = document.querySelector(".mainheader");
var startBtn = document.querySelector(".startBtn");
var countdown = document.querySelector("#countdown");
var quizDiv = document.querySelector(".quiz");
var startquizDiv = document.querySelector("#startquiz");
var feedbackDiv = document.querySelector("#feedback");
var initialsPage = document.querySelector("#initialsPage");
var FinalScore = document.querySelector("#FinalScore");
var userInitials = document.querySelector("#userInitials");
var initialsdiv = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitInitials")
let questionNumber = 0
let score = 0
let quizQuestions = [
    {
        question : "Who's favorite joke is 'That's what she said'?",
        choices : ["Toby","Michael","Kevin"],
        answer : "Michael"
    },
    {
        question : "Question2",
        choices : ["choice1","choice2","choice3"],
        answer : "choice3"
    },
    {
        question : "Question3",
        choices : ["choice_1","choice_2","choice_3"],
        answer : "choice_1"
    }
]

//Create an initial start button with greeting

//Create a timer for the entire game that reacts to incorrect answers
var timeLeft = 60;

function quizTime() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timerInterval = setInterval(function () {
   

if(timeLeft > 0) {
    timeLeft--;
    countdown.textContent = "Time : " + timeLeft ;
    
   }
else {
    timeLeft = 0;
    countdown.textContent = "Time : " + timeLeft ;
    clearInterval (timerInterval)
    
};
    }, 1000);
}

initialsPage.style.display = "none";

function startquiz() {
    if (questionNumber < 3) {
        startquizDiv.innerHTML = "";

    let currentquestion = quizQuestions[questionNumber]
    quizDiv.innerHTML = "";
    let questionEl = document.createElement("div");
    questionEl.innerHTML = currentquestion.question;

    let optiondiv = document.createElement("div");
    let choices = currentquestion.choices;

    for(let i=0; i< choices.length; i++) {
        let choiceBtn = document.createElement("button");
        choiceBtn.innerHTML = choices[i];
        choiceBtn.addEventListener("click", function(event){
            event.preventDefault();
            console.log(event.target);
            let btnText = event.target.innerHTML;
            if(btnText === currentquestion.answer) {
                feedbackDiv.innerHTML = ""
                feedbackDiv.innerHTML = "Correct!"
                questionNumber ++
                score = score + 10;
                startquiz()
            } else {
                feedbackDiv.innerHTML = ""
                feedbackDiv.innerHTML = "Incorrect!"
                questionNumber ++;
                startquiz()
            }
        })
        optiondiv.append(choiceBtn)
    }

    startquizDiv.append(questionEl,optiondiv)
    }  
    else {
    timeLeft = 0;
    displayInitialsPage ()
    }
    

    
    // if(feedbackDiv.innerHTML === "Correct!"){
        
    // }



}

function displayInitialsPage () {
    startquizDiv.innerHTML = "";
    initialsPage.style.display = "block"
    FinalScore.innerHTML = `${score} out of ${quizQuestions.length*10}`

}

submitBtn.addEventListener ('click', function(event){
    let initials = userInitials.value;
    let userData = {
        name : initials,
        score : score
    }
    localStorage.setItem('quiz_score', JSON.stringify (userData))

})

function init() {
    quizTime()
    startquiz()
}

//game ends when timer reaches 0 or all questoins are answered

//create functions to save my initials and score

//create hyperlink on page to access previous top scores

startBtn.addEventListener("click", init);