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
        correct: "All the Right Moves"
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

var indexArr = [];
var numQuestions = Object.keys(questions).length;
var count = 0;
var number = 0;
var randomKey;
var timeout;
var results = {
    correct: 0,
    incorrect: 0,
};

$(document).ready(function () {
    startGame();

    function pickQuestion() {
        clearPage();
        randomIndex();        
        if (count === numQuestions){
            showResults();
        } else if (indexArr.indexOf(number) == -1) {
            indexArr.push(number);
            showQuestion();
            console.log(indexArr);
        } else {
            pickQuestion();
        }
    }

    function showQuestion() {
        timeout = setTimeout(incorrect, 15 * 1000);
        var randomQuestion = questions[randomKey];

        $("#question").html(randomQuestion.question);

        $("#answer1").html(`<h3 class='choices'>${randomQuestion.answers[0]}<h3>`);
        $("#answer2").html(`<h3 class='choices'>${randomQuestion.answers[1]}<h3>`);
        $("#answer3").html(`<h3 class='choices'>${randomQuestion.answers[2]}<h3>`);
        $("#answer4").html(`<h3 class='choices'>${randomQuestion.answers[3]}<h3>`);
        $(".choices").on("click", function () {
            var self = this;
            clearTimeout(timeout);
            showAnswer(self);
        });
    }

    function randomIndex() {
        number = (Math.floor(Math.random() * numQuestions) + 1);
        randomKey = "Q" + number;
    }

    function showAnswer(answer) {
        if ($(answer).html() === questions[randomKey].correct) {
            correct();
        } else {
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
        results.correct++;
        clearPage();
        $("#winLose").html("Congrats, you got it right!");
        timeout = setTimeout(nextQuestion, 1000);
    }

    function incorrect() {
        results.incorrect++;
        clearPage();
        $("#winLose").html("FAIL! Sorry, you're wrong")
        .append("<h3>" + `The correct answer was: ${questions[randomKey].correct}` + "</h3>");
        timeout = setTimeout(nextQuestion, 3000);
    }

    function clearPage() {
        $("#welcome").empty();
        $("#instructions").empty();
        $("#question").empty();
        $("#answer1").empty();
        $("#answer2").empty();
        $("#answer3").empty();
        $("#answer4").empty();
        $("#result").empty();
        $("#correct").empty();
        $("#incorrect").empty();
    }

    function startGame() {
        clearPage();
        $("#welcome").html("Welcome to Stranger things Trivia!");
        $("#instructions").html("<h3>You will have 15 seconds to answer each question</h3>")
            .append("<h3>If time runs out you get the question wrong!</h3>")
            .append("<h3>There are 10 questions total.</h3>")
            .append("<h2>Good Luck!!</h2>")
            .append("<button class='btn btn-primary' id='startBtn' name='Start Game'>Start Game</button>");
        $("#startBtn").on("click", pickQuestion);
    }

    function showResults() {
        clearPage();
        if (results.correct > results.incorrect) {
            $("#result").html("Congratulations! You Won!");
        } else {
            $("#result").html("Sorry, you didn't get enough correct...");
        }
        $("#correct").html(`You got: ${results.correct} correct!`);
        $("#incorrect").html(`You got: ${results.incorrect} wrong :(`);
        timeout = setTimeout(startGame, 3000);
    }
});