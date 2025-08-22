//HTML Game - Hovered - originally created ~2017 by Luke Barker 
window.launchHovered = function (task) {

	//link external css sheet
	const cssLink = document.createElement('link');
	cssLink.rel = 'stylesheet';
	cssLink.href = 'css/hovered.css';
	document.head.appendChild(cssLink);
	
	//build game board
	const gameWrapper = document.createElement('div');
	gameWrapper.id = "gamewrapper";
	const gameboardEl = document.createElement('div');
	gameboardEl.id = "gameboard";
	const hoveredMenu = document.createElement('div');
	hoveredMenu.id = "hoveredMenu";
	const taskTitleEl = document.createElement('h2');
	taskTitleEl.id = "taskTitle";


	const hoveredTitle = document.createElement('h1');
	hoveredTitle.textContent = "Hovered";
	const divMenuUpper = document.createElement('div');
	divMenuUpper.id = 'divMenuUpper';

	const pInstruct = document.createElement('p');
	pInstruct.textContent = "Catch those sticky notes!  Avoid squirrel distractions!";
	pInstruct.id = "pInstruct";
	const pTotal = document.createElement('p');
	pTotal.textContent = "Total:";
	const pScore = document.createElement('p');
	pScore.id = "score";
	const pTimeLeft = document.createElement('p');
	pTimeLeft.textContent = "Time Left:";
	const pTimer = document.createElement('p');
	pTimer.id = "timer";
	pTimer.textContent = "--";

	const button1El = document.createElement('button');
	button1El.id = "button1";
	button1El.textContent = "Play!";

	document.body.appendChild(gameWrapper);
	gameWrapper.append(hoveredMenu, taskTitleEl,gameboardEl);
	hoveredMenu.append(divMenuUpper, button1El, pInstruct)
	divMenuUpper.append(hoveredTitle, pTotal, pScore, pTimeLeft, pTimer);

	taskTitleEl.textContent = task.text;

	const targetsFiles = ['media/targets/sticky_note_blue.png','media/targets/sticky_note_green.png','media/targets/sticky_note_pink.png','media/targets/sticky_note_purple.png'];
	const bombFiles = ['media/bombs/squirrel_blue.png','media/bombs/squirrel_gray.png','media/bombs/squirrel_green.png','media/bombs/squirrel_pink.png'];

	let squirrel_count = 0;
	let sticky_notes_caught = 0;


	const interruptions = ["Right in the middle of your work, you get a call from your distant cousin.  It was great catching up and hearing about his plans to become a professional taxidermist, but you'll have to restart your task.",
							"You start working on the task, but a knock at the door interrupted your progress.",
							"You tried to complete the task, but all you could think about was the Pistachio Cheesecake flavored ice cream in the freezer.  After a quick break, it's time to start again.",
							"You were going to work on the task when your cat plopped down in front of you for belly rubs.  Since you're obliged to stop for her, you never started on the task."];

	//this function returns a random number between the two arguments passed to it
	function random(min, max) {
		let num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	}

	var game = function () {
		//create a main object to track high level info
		var main = {
			score: 0,
			update: function () {
				pScore.textContent = main.score;
				score = main.score;
			}
		};

		//get size of gameboard
		let wSize = gameboardEl.offsetWidth;
		let hSize = gameboardEl.offsetHeight;

		//create an empty array to hold each level object
		//var levels = [];
		var levels = [
			{ name: "tutorial", time: 1, duration: 6, minScore: 1, targets: 1, bombs: 2, bombRespawn: 2},
			{ name: "5minLevel", time: 5, duration: 5, minScore: 1, targets: 2, bombs: 5, bombRespawn: 1.5},
			{ name: "10minLevel", time: 10, duration: 7, minScore: 1, targets: 2, bombs: 6, bombRespawn: 1.2},
			{ name: "20minLevel", time: 20, duration: 8, minScore: 1, targets: 3, bombs: 7, bombRespawn: .9},
			{ name: "60minLevel", time: 60, duration: 10, minScore: 1, targets: 3, bombs: 10, bombRespawn: .7}
		];

		//use the constructor function 
		//Values are (level number, duration, min score, targets, bombs, bomb move timer, desc)
		var level = levels.find(opts => opts.time == task.time);
		if (level === undefined) {
  			console.log("level is undefined");
			level = levels[0];
		}

		//create an empty array to hold the target objects	
		var targetEls = [];

		//update the main side bar info
		main.update();

		//define the hover over function that moves the block and updates the score
		let bombSize = 50;
		let targetSize = 40;
		var hover = function (e) {
			main.score += 1;
			sticky_notes_caught += 1;
			main.update();
			e.target.style.top = random(0, hSize - targetSize) + "px";
			e.target.style.left = random(0, wSize - targetSize) + "px";
		}

		//define the hover over function that moves the bombs and updates the score		
		var bombhover = function (e) {
			main.score -= 2;
			squirrel_count += 1;
			main.update();
			e.target.style.top = random(0, hSize - bombSize) + "px";
			e.target.style.left = random(0, wSize - bombSize) + "px";
		}

		//define a function to move the bombs after a given time
		var bombsMove = function () {
			var bombsEl = document.querySelectorAll(".bomb");
			for (var i = 0; i < bombsEl.length; i++) {
				bombsEl[i].style.top = random(0, hSize - bombSize) + "px";
				bombsEl[i].style.left = random(0, wSize - bombSize) + "px";
			}
		}

		//defines a function that executes at the beginning of a level
		var startlevel = function () {
			gameboardEl.textContent="";
			main.score = 0;
			button1El.removeEventListener('click', startlevel);
			var targetEls = [];
			main.update();
			//create the targets
			for (var i = 0; i < level.targets; i++) {
				targetEls[i] = "targetEl" + i;
				target = targetEls[i];
				target = document.createElement("div");
				gameboardEl.appendChild(target);
				target.style.backgroundImage = "url("+ targetsFiles[Math.floor(Math.random() * targetsFiles.length)] + ")";
				target.style.width = targetSize + "px";
				target.style.height = targetSize + "px";
				target.className = "target";
				target.style.position = "absolute";
				target.style.float = "left";
				target.style.margin = 0;
				target.style.padding = 0;
				target.style.zIndex = 1002;
				wSize = gameboardEl.offsetWidth;
				hSize = gameboardEl.offsetHeight;
				target.style.top = random(0, hSize - targetSize) + "px";
				target.style.left = random(0, wSize - targetSize) + "px";
				target.addEventListener("mouseover", hover, false);
			}

			//create the bombs
			for (var i = 0; i < level.bombs; i++) {
				targetEls[i] = "targetEl" + i;
				target = targetEls[i];
				target = document.createElement("div");
				gameboardEl.appendChild(target);
				target.style.backgroundImage = "url("+ bombFiles[Math.floor(Math.random() * bombFiles.length)] + ")";
				target.style.width = bombSize + "px";
				target.style.height = bombSize + "px";
				target.className = "target bomb";
				target.style.position = "absolute";
				target.style.float = "left";
				target.style.margin = 0;
				target.style.padding = 0;
				target.style.zIndex = 1002;
				target.style.top = random(0, hSize - bombSize) + "px";
				target.style.left = random(0, wSize - bombSize) + "px";
				target.addEventListener("mouseover", bombhover, false);
			}
			var bombTimer = (level.bombRespawn) * 1000;
			var bombMover = setInterval(bombsMove, bombTimer);

			//this functions executes at the end of a level		
			var endlevel = function () {

				var toRemove = gameboardEl.querySelectorAll(".target");  //removes all the target and bomb elements
				for (var j = 0; j < toRemove.length; j++) {
					gameboardEl.removeChild(toRemove[j]);
				}
				clearInterval(bombMover);
				clearInterval(timer);  //clears the timer so it doesn't keep counting down below zero
				if (score > 0){
					gameboardEl.textContent = task.resolutionText;
					button1El.textContent = "Close";
					button1El.addEventListener("click", closeGame, false);
				}
				else {
					gameboardEl.textContent = interruptions[Math.floor(Math.random() * interruptions.length)];
					button1El.textContent = "Restart";
					button1El.addEventListener("click", startlevel, false);
				}
			}

			//this section implements the game close out
			let closeGame = function () {
				button1El.removeEventListener('click', closeGame);
				console.log(sticky_notes_caught, squirrel_count);
				//window.score = score;
				//console.log(window.score, sticky_notes_caught, squirrel_count);
				//alert("score " + window.score);
				gameWrapper.remove();
				return (sticky_notes_caught, squirrel_count);
			}

			//this section implements the countdown timer
			var timeremaining = level.duration;
			var countdown = function () {
				timeremaining -= 1;
				var timerEl = document.querySelector("#timer");
				timerEl.textContent = timeremaining;
				if (timeremaining == 0) {
					window.score = score;
					endlevel();
				}
			}
			var timer = setInterval(countdown, 1000);
		}
		button1El.addEventListener("click", startlevel, false);
	}
	game();	
}


