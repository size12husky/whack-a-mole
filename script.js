document.addEventListener("DOMContentLoaded", () => {
	const moles = document.querySelectorAll(".mole");
	const scoreDisplay = document.querySelector(".score");
	const startBtn = document.getElementById("start-button");
	const countdown = document.querySelector(".countdown");
	const scoreContainer = document.querySelector(".score-container");
	const roundContainer = document.querySelector(".round");
	const messageContainer = document.querySelector(".message-container");

	let playerScore = 0;
	scoreDisplay.innerText = playerScore;

	let roundCount = 1;
	roundContainer.innerText = roundCount;

	let moleDelay = 1500;

	startBtn.addEventListener("click", startGame);

	async function startGame() {
		whackAMole();
	}

	async function whackAMole() {
		scoreContainer.style.display = "flex";
		roundContainer.innerText = roundCount;
		countDown();
		messageContainer.style.display = "none";
		startBtn.style.display = "none";
		await delay(3000);

		playerScore = 0;
		while (playerScore < 10) {
			let moleIndex = Math.floor(Math.random() * 16);
			console.log(moleIndex);
			for (let mole of moles) {
				if (mole.dataset.index == moleIndex) {
					mole.style.backgroundImage = "url('mole.png')";
					mole.style.backgroundSize = "cover";
					mole.style.backgroundRepeat = "no-repeat";
					mole.style.backgroundPosition = "center";
					const handleClick = () => {
						playerScore++;
						scoreDisplay.innerText = playerScore;
						mole.style.backgroundImage = "none";
						mole.removeEventListener("click", handleClick);
					};
					mole.addEventListener("click", handleClick);
					await delay(moleDelay);
					mole.removeEventListener("click", handleClick);
					mole.style.backgroundImage = "none";
				}
			}
		}
		roundCount++;
		messageContainer.style.display = "flex";
		moleDelay -= 100;
		console.log(roundCount, moleDelay);
		startBtn.style.display = "flex";
		startBtn.innerText = "Next Round";
		startBtn.removeEventListener("click", startGame);
		startBtn.addEventListener("click", whackAMole);
		scoreContainer.style.display = "none";
	}

	async function countDown() {
		countdown.style.display = "flex";
		let count = 3;
		for (let i = 0; i < 3; i++) {
			countdown.innerText = count;
			count--;
			await delay(1000);
		}
		countdown.style.display = "none";
	}

	function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
});
