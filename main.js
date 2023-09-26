const wordArray = [
	"makina",
	"kamioni",
	"dera",
	"uje",
	"ari",
	"elefant",
	"perde",
	"kodër",
	"pjepër",
	"misër",
	"bari",
	"erë",
	"legen",
	"mjekërr",
	"napë",
	"mollë",
	"rrush",
	"laprak",
	"tenxhere",
	"top",
	"helikopter",
	"krevat",
	"klejdilegen",
	"selektoj",
	"manual",
	"ekran",
	"bukur",
	"peshk",
	"buton",
	"fjale",
	"majmun",
	"zorre",
	"menaxhim",
	"lavastovilje",
];

// Inport Buttons/Other Items
const startGameButton = document.querySelector(".start-game-buttom");
const startGameHeader = document.querySelector(".start-game-header");
const gameDiv = document.querySelector(".game");
const wordDiv = document.querySelector(".word");
const input = document.querySelector(".enterInput");
const guessButton = document.querySelector(".guess");
const incorrectP = document.querySelector(".incorrect");
const span = document.querySelector(".span");
const endGame = document.querySelector(".end-game");

const guessedWordDiv = document.querySelector(".guessed-word");
const winningMassege = document.querySelector(".winning-message");
const attemptsDiv = document.querySelector(".attempts");
const playAgain = document.querySelector(".play-again");
const pointsDiv = document.querySelector(".points");
const leaderboard = document.querySelector(".leaderboard");
const mistakes = document.querySelector(".mistakes");

// PRESET VARAIBLES
let randomWord;
let guessedLetter;
const randomWordArray = [];
let wrongGuesses = 0;
let wordFormat = wordDiv;
let attempts = 0;
let won;
let points;

// CODE

// start game when press button
startGameButton.addEventListener("click", (e) => {
	startGame();
});

function startGame() {
	showGameScreen();
	selectRandomWord();
	showDisplay();
	checkGuess();
	// update screen
}

function showGameScreen() {
	startGameHeader.style.display = "none";
	gameDiv.style.display = "flex";
}

function selectRandomWord() {
	const randomWordNumber = Math.floor(Math.random() * wordArray.length);
	randomWord = wordArray[randomWordNumber];
	console.log(randomWord);
}

function showDisplay() {
	for (i = 0; i < randomWord.length; i++) {
		const span = document.createElement("span");
		span.innerHTML = "_";
		wordDiv.append(span);
		randomWordArray.push(randomWord.charAt(i));
		console.log(randomWordArray);
	}
}

function checkGuess() {}

guessButton.addEventListener("click", (e) => {
	console.log(wordDiv);
	guessedLetter = input.value;
	wordFormat = wordDiv;
	// clearWord();
	let i = 0;
	input.value = "";
	attempts++;
	console.log("attempts: " + attempts);
	let foundmatch = false;
	randomWordArray.forEach((letter) => {
		if (wordDiv.children[i].textContent === "_") {
			if (
				guessedLetter === letter ||
				(guessedLetter === "e" && letter === "ë")
			) {
				console.log("match");
				wordDiv.children[i].textContent = letter;
				foundmatch = true;
			} else {
				console.log("no Match");
				wordDiv.children[i].textContent = "_";
			}
			console.log(i);
		}
		i++;
	});

	if (!foundmatch) wrongGuesses++;
	console.log("wrongGuesses: " + wrongGuesses);
	if (checkForWin()) {
		won = true;
		winDisplay();
	}
});

function correctInput(input) {}

function clearWord() {
	while (wordDiv.firstChild) {
		wordDiv.removeChild(wordDiv.lastChild);
	}
}

function checkForWin() {
	for (let i = 0; i < randomWord.length; i++) {
		if (wordDiv.children[i].textContent === "_") {
			return false;
		}
	}
	return true;
}

function winDisplay() {
	endGame.classList.add("show");
	guessedWordDiv.innerHTML = `Word: ${randomWord}`;
	winningMassege.innerHTML = `You: ${won ? "Won" : "Lose"}`;
	attemptsDiv.innerHTML = `${attempts} Attempts`;
	mistakes.innerHTML = `${wrongGuesses} Mistakes`;
	pointsDiv.innerHTML = `${calculatePoints()} Points`;
	console.log(randomWord.length);
	console.log(attempts);
	console.log(wrongGuesses);
}

function calculatePoints() {
	return ((randomWord.length + 1) * 100) / (wrongGuesses + 1);
}

playAgain.addEventListener("click", (e) => {
	location.reload();
});
leaderboard.addEventListener("click", (e) => {
	alert("send best points with ss te grupi qe te boj leaderboard");
});
