const easyWords = [
	"dera",
	"uje",
	"ari",
	"perde",
	"kodër",
	"misër",
	"bari",
	"erë",
	"napë",
	"mollë",
	"rrush",
	"ekran",
	"bukur",
	"peshk",
	"buton",
	"fjale",
	"majmun",
	"mali",
	"lule",
	"qyteti",
	"gjiri",
	"deti",
	"plazhi",
	"blu",
	"harta",
	"shpella",
	"shiu",
	"muzika",
	"truri",
	"gjuha",
	"drita",
	"ngjyra",
	"arka",
	"qeveria",
	"këngët",
	"natë",
	"dasma",
	"familja",
	"miqtë",
	"aeroporti",
	"stacioni",
	"treni",
	"bileta",
	"udhëtimi",
	"plani",
	"ushqimi",
	"pija",
	"fruta",
	"libri",
	"poezia",
	"teatri",
	"filmi",
	"kamera",
	"ekrani",
];

const mediumWords = [
	"makina",
	"kamioni",
	"elefant",
	"pjepër",
	"legen",
	"mjekërr",
	"laprak",
	"top",
	"krevat",
	"klejdilegen",
	"manual",
	"zorre",
	"menaxhim",
	"bregdeti",
	"flutura",
	"bukuri",
	"gjelbër",
	"historia",
	"artikulli",
	"shkrimi",
	"ekonomia",
	"kultura",
	"gazeta",
	"lajmet",
	"radiot",
	"valëzimi",
	"muzikës",
	"pasdite",
	"festat",
	"ditëlindja",
	"festimi",
	"perimet",
	"ushqimore",
	"automjeti",
	"biççikleta",
	"sporti",
	"futbolli",
	"kampionati",
	"lojra",
	"udhëtimi",
	"hotel",
	"restoranti",
	"dreq",
	"portokalli",
	"shkolla",
	"profesori",
	"studenti",
];

const hardWords = [
	"televizioni",
	"interneti",
	"kompjuteri",
	"basketbolli",
	"tenxhere",
	"helikopter",
	"selektoj",
	"lavastovilje",
	"kultura",
	"historia",
	"universiteti",
	"biblioteka",
	"studimi",
	"vendndodhja",
	"transporti",
	"kryeministri",
	"kushtetuta",
	"groshë",
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
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const difficultyButtons = document.querySelectorAll(".options");

// PRESET VARAIBLES
let wordArray;
let randomWord;
let guessedLetter;
const randomWordArray = [];
let wrongGuesses = 0;
let wordFormat = wordDiv;
let attempts = 0;
let won;
let points;
let difficultyChoosed;
let startGameTrigger;

// CODE

// Difficulty
console.log(difficultyButtons);
difficultyButtons.forEach((button) =>
	button.addEventListener("click", (e) => {
		removeAllChoosed();
		e.target.classList.add("choosed");
		difficultyChoosed = e.target.textContent;
		console.log(difficultyChoosed);
		selectArray();
		startGame();
	})
);

function selectArray() {
	if (difficultyChoosed === "easy") {
		wordArray = easyWords;
	} else if (difficultyChoosed === "medium") {
		wordArray = mediumWords;
	} else {
		wordArray = hardWords;
	}
}

function removeAllChoosed() {
	easy.classList.remove("choosed");
	hard.classList.remove("choosed");
	medium.classList.remove("choosed");
}

// start game when press button
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

input.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		checkInput();
	}
});

guessButton.addEventListener("click", (e) => {
	checkInput();
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

playAgain.addEventListener("click", (e) => {
	location.reload();
});
leaderboard.addEventListener("click", (e) => {
	alert("send best points with ss te grupi qe te boj leaderboard");
});

function checkInput() {
	console.log(wordDiv);
	guessedLetter = input.value.toLowerCase();
	wordFormat = wordDiv;
	// clearWord();
	let i = 0;
	input.value = "";
	attempts++;
	console.log("attempts: " + attempts);
	let foundmatch = false;
	if (randomWord === guessedLetter) {
		winDisplay();
		foundmatch = true;
	} else {
		randomWordArray.forEach((letter) => {
			if (wordDiv.children[i].textContent === "_") {
				if (
					guessedLetter === letter ||
					(guessedLetter === "e" && letter === "ë") ||
					(guessedLetter === "c" && letter === "ç")
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
	}
	if (!foundmatch) wrongGuesses++;
	console.log("wrongGuesses: " + wrongGuesses);
	if (checkForWin()) {
		won = true;
		winDisplay();
	}
}

function calculatePoints() {
	points = (randomWord.length * 100 - attempts * 10) / (wrongGuesses + 1);
	return Math.round(points);
}
