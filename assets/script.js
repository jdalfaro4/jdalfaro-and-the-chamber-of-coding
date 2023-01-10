var mHeader = document.querySelector(".mainheader");
var startBtn = document.querySelector("#startBtn");
var countdown = document.querySelector("#countdown");
var quizDiv = document.querySelector(".quiz");
var startquizDiv = document.querySelector("#startquiz");
var initialsPage = document.querySelector("#initialsPage");
var finalScore = document.querySelector("#FinalScore");
var userInitials = document.querySelector("#userInitials");
var initialsdiv = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitInitials")
var highScore = document.querySelector("#highScore");
var introDescr = document.querySelector("#introDescr");
var highscoreName = document.querySelector("#highscoreName");
var highscoreScore = document.querySelector("#highscoreScore");
let questionNumber = 0
let score = 0
let quizQuestions = [
    {
        question : "Who's favorite joke is 'That's what she said'?",
        choices : ["Toby","Michael","Kevin"],
        answer : "Michael"
    },
    {
        question : "Who is the 'Mother of cats'?",
        choices : ["Kelly","Meredith","Angela"],
        answer : "Angela"
    },
    {
        question : "What is the name of Jim and Pam's daughter?",
        choices : ["Cece","Roxanne","Grace"],
        answer : "Cece"
    }
]

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
let answerCorrect = false;
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
                answerCorrect = true;
                questionNumber ++
                score = score + 10;
                startquiz()
            } else {
                answerCorrect = false;
                questionNumber ++;
                timeLeft = timeLeft - 15;
                startquiz()
            }
        })
        optiondiv.append(choiceBtn)
    }
    if(questionNumber > 0) {
        let feedbackEl = document.createElement("div");
        if(answerCorrect){
            feedbackEl.innerHTML = "Correct"
            // create correct div element
        } else {
            // create incorrect div element
            feedbackEl.innerHTML = "Incorrect";
        }
        startquizDiv.append(questionEl, optiondiv, feedbackEl);
        // startquezDiv.append(questionEl, optiondiv, correct/incorrectdiv)
    } else {
        startquizDiv.append(questionEl, optiondiv);
    }
   // startquizDiv.append(questionEl,optiondiv)
    } else {
        console.log()
    timeLeft = 0;
    displayInitialsPage ()
    }
    // if(feedbackDiv.innerHTML === "Correct!"){

    
        
}
//game ends when timer reaches 0 or all questoins are answered
function displayInitialsPage () {
    startquizDiv.innerHTML = "";
    initialsPage.style.display = "block";
    finalScore.innerHTML = `${score} out of ${quizQuestions.length*10}`

}
//create functions to save my initials and score
submitBtn.addEventListener ('click', function(event){
    let initials = userInitials.value;
    let userData = {
        name : initials,
        score : score
    }
    localStorage.setItem('quiz_score', JSON.stringify(userData))
    //create hyperlink on page to access previous top scores
    
})

submitBtn.addEventListener ('click', function(event){
    initialsPage.innerHTML = ""
    let startOver = document.createElement("button");
    startOver.innerHTML = ("Start Over");
})


highScore.addEventListener ('click', function(event) {
    console.log("John")
    quizDiv.innerHTML = ""
    initialsPage.innerHTML = ""
    let results = localStorage.getItem("quiz_score")
    let obj = JSON.parse(results);
    document.getElementById('highscoreName').innerHTML = obj.name;
    document.getElementById('highscoreScore').innerHTML = obj.score;

    let gobackBtn = document.createElement("button");
    gobackBtn.innerHTML = ("Go Back");

})

function init() {
    quizTime()
    startquiz()
}

mHeader.setAttribute("style", "text-align : center;")
mHeader.style.marginTop = "200px";
startBtn.setAttribute("style", "width : 200px; height : 30px;")
introDescr.setAttribute("style", "font-size : 18px;")


startBtn.addEventListener("click", init);