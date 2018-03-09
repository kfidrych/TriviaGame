var questions = {
    "Q1": {
        question: "In which U.S. state is the show set?",
        answers: ["Illinois", "Ohio", "Indiana", "Kansas"],
        correct: "Indiana"
    },
    "Q2": {
        question: "In episode three Eleven uses her powers to make a Star Wars toy levitate. Which toy?",
        answers: ["AT-AT Walker", "Land Speeder", "Millenium Falcon", "Jawa Sandcrawler"],
        correct: "Millenium Falcon"
    },
    "Q3": {
        question: "Which comic does Will choose from Dustin’s collection as a prize for the race home in episode one?",
        answers: ["X-Men #134", "Superman #75", "Incredible Hulk #181", "Amazing Spider-Man #121"],
        correct: "X-Men #134"
    },
    "Q4": {
        question: "When Nancy and Steve are studying in her bedroom which 1980s classic pop song is playing in the background?",
        answers: ["Don’t You Forget About Me by Simple Minds", "Africa by Toto", "Down Under by Men at Work", "Nothing's Gonna Stop Us Now by Starship"],
        correct: "Africa by Toto"
    },
    "Q5": {
        question: "Will's dad Lonnie tells Jonathan to take down a film poster from his bedroom wall claiming it as 'inappropriate'. Which poster?",
        answers: ["The Dark Crystal", "Jaws", "Carrie", "The Evil Dead"],
        correct: "The Evil Dead"
    },
    "Q6": {
        question: "The typeface used for the Stranger Things opening title sequence was inspired by the book covers of which successful sci-fi fantasy author?",
        answers: ["Stephen King", "Douglas Adams", "Arthur C Clarke", "Terry Pratchett"],
        correct: "Stephen King"
    },
    "Q7": {
        question: "When Eleven is left alone in Mike’s house she flicks through the TV channels. Which cartoon does she briefly stop on?",
        answers: ["The Smurfs", "Alvin and the Chipmunks", "He-Man and the Masters of the Universe", "The Charlie Brown and Snoopy Show"],
        correct: "He-Man and the Masters of the Universe"
    },
    "Q8": {
        question: "Which Tom Cruise movie is playing at Hawkins cinema the ‘Hawk’ when Nancy sees the “Nancy the Slut” graffiti?",
        answers: ["Risky Business", "All The Right Moves", "Legend", "Top Gun"],
        correct: "All The Right Moves"
    },
    "Q9": {
        question: "Which breakfast product does Eleven steal from the supermarket?",
        answers: ["Eggo frozen waffles", "Kellogg’s cornflakes", "Kellogg’s Pop Tarts", "Cap'n Crunch cereal"],
        correct: "Eggo frozen waffles"
    },
    "Q10": {
        question: "Which 1980s heart-throb does Steve Harrington claim to look like and Nancy Wheeler have hanging on her bedroom wall?",
        answers: ["Josh Brolin", "Matthew Broderick", "Tom Cruise", "Johnny Depp"],
        correct: "Tom Cruise"
    }
}

var numQuestions = Object.keys(questions).length;
var indexArr = [];
var count = 0;
var randomIndex = 0;
var randomKey = function() { return "Q" + randomIndex };
var currentQuestion = function() { return questions[randomKey()] };
var timeout = null;
var qCorrect = 0;
var qIncorrect = 0;

var QUESTION_TIME = 15 * 1000;
var RESULT_TIME = 3 * 1000;

$(document).ready(function () {
    startGame();

    function pickQuestion() {
        clearPage();
        if (count === numQuestions) {
            showResults();
        } else {
            getRandomIndex();
            showQuestion();
        }
    }

    function getRandomIndex() {
        randomIndex = (Math.floor(Math.random() * numQuestions) + 1);
        if (indexArr.indexOf(randomIndex) == -1) {
            indexArr.push(randomIndex);
        } else {
            getRandomIndex();
        }
    }

    function showQuestion() {
        timeout = setTimeout(incorrect, QUESTION_TIME);

        $(".choices").show();
        $("#question").html(currentQuestion().question);

        $("#answer1").html(currentQuestion().answers[0])
        $("#answer2").html(currentQuestion().answers[1])
        $("#answer3").html(currentQuestion().answers[2])
        $("#answer4").html(currentQuestion().answers[3])
    }

    function gradeResponse() { 
        console.log("gradeResponse called");
        var self = this;
        clearTimeout(timeout);
        $(".choices").hide();
        showAnswer(self);
    }

    function showAnswer(answer) {
        console.log("showAnswer called and the answer was ");
        if ($(answer).html() === currentQuestion().correct) {
            console.log("correct");
            correct();
        } else {
            console.log("incorrect");
            incorrect();
        }
    }

    function nextQuestion() {
        clearTimeout(timeout);
        count++;
        $("#winLose").html("");
        pickQuestion();
    }

    function correct() {
        qCorrect++;
        $("#winLose").html("Congrats, you got it right!");
        console.log("qCorrect == " + qCorrect);
        timeout = setTimeout(nextQuestion, RESULT_TIME);
    }

    function incorrect() {
        qIncorrect++;
        $(".choices").hide();
        $("#winLose").html("FAIL!")
            .append("<h3>" + `The correct answer was: ${currentQuestion().correct}` + "</h3>");
        console.log("qIncorrect == " + qIncorrect);
        timeout = setTimeout(nextQuestion, RESULT_TIME); 
    }

    function clearPage() {
        $("#welcome").empty();
        $("#instructions").empty();
        $("#question").empty();
        $("#answer1").html("");
        $("#answer2").html("");
        $("#answer3").html("");
        $("#answer4").html("");
        $("#result").empty();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#winLose").empty();
    }

    function startGame() {
        clearPage();
        $("#welcome").html("Welcome to Stranger things Trivia!");
        $("#instructions").html("<div>You will have 15 seconds to answer each question</div>")
            .append("<div>If time runs out you get the question wrong!</div>")
            .append("<div>There are 10 questions total.</div>")
            .append("<div>Good Luck!!</div>")
            .append("<button class='btn btn-primary' id='startBtn' name='Start Game'>Start Game</button>");
        $("#startBtn").on("click", pickQuestion);
        $("#answer1").on("click", gradeResponse);
        $("#answer2").on("click", gradeResponse);
        $("#answer3").on("click", gradeResponse);
        $("#answer4").on("click", gradeResponse);
        indexArr = [];
        numQuestions = Object.keys(questions).length;
        count = 0;
        randomIndex = 0;
        timeout = null;
        qCorrect = 0;
        qIncorrect = 0;
    }

    function showResults() {
        clearPage();
        if (qCorrect > qIncorrect) {
            $("#result").html("Congratulations! You Won!");
        } else {
            $("#result").html("Sorry, you didn't get enough correct...");
        }
        $("#correct").html(`You got: ${qCorrect} correct!`);
        $("#incorrect").html(`You got: ${qIncorrect} wrong :(`);
        timeout = setTimeout(startGame, RESULT_TIME);
    }
});