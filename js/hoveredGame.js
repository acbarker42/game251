//HTML Game - Hovered - originally created ~2016 by Luke Barker 
window.launchHovered = function(){

//link external css sheet
	const cssLink = document.createElement('link');
	cssLink.rel = 'stylesheet';
    cssLink.href = 'css/hovered.css';
    document.head.appendChild(cssLink);


//build game board
	const gameWrapper = document.createElement('div');
	gameWrapper.id = "gamewrapper";

  	const hoveredTitle = document.createElement('h1');
  	hoveredTitle.textContent = "Hovered";

  	const gameboardEl = document.createElement('div');
	gameboardEl.id = "gameboard";

  	const infoscreenEl = document.createElement('div');
  	infoscreenEl.id = "infoscreen";

  	const levelinfo = document.createElement('div');
  	levelinfo.id = "levelinfo";
  	levelinfo.textContent = "Hover over the targets to score points";

  	const button1El = document.createElement('button');
  	button1El.id = "button1";
  	button1El.textContent = "Play!";

  	const button2El = document.createElement('button');
  	button2El.id = "button2";
  	button2El.textContent = "Next level";

  	const hoveredMenu = document.createElement('div');
  	hoveredMenu.id="hoveredMenu";

	const p1 = document.createElement('p');
	p1.textContent = "Total:";
	const p2 = document.createElement('p');
	p2.id = "score";
	const p3 = document.createElement('p');
	p3.id = "level";
	const hr1 = document.createElement('hr');
	const p4 = document.createElement('p');
	p4.id = "levelScore";
	const p5 = document.createElement('p');
	p5.id = "requiredScore";
	const p6 = document.createElement('p');
	p6.textContent = "Time Left:";
	const p7 = document.createElement('p');
	p7.id = "timer";
	p7.textContent = "--";
	const hr2 = document.createElement('hr');
	const p8 = document.createElement('p');
	p8.textContent = "Catch the green targets to score points";
	p8.id = "instructions";

	document.body.appendChild(gameWrapper);
	gameWrapper.append(hoveredTitle, gameboardEl, hoveredMenu);
	gameboardEl.append(infoscreenEl);
	infoscreenEl.append(levelinfo, button1El, button2El);
	hoveredMenu.append(p1,p2,p3,hr1,p4,p5,p6,p7,hr2,p8);

	//document.body.style.filter = "blur(4px)";
	//gameWrapper.style.filter = "none";


//this function returns a random number between the two arguments passed to it
function random(min,max) {
  	let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

	var game = function (){
//create a main object to track high level info
	var main = {
			score: 0,
			level: 1,
			levelScore: 0,
			update: function(){
				p3.textContent = "Level:  " + main.level;
				p2.textContent = main.score;
				score = main.score;
				p4.textContent = "Level Score: " + main.levelScore;
				p5.textContent = "Required Score: " + levels[main.level-1].minScore;
			}
	};
		
//create an empty array to hold each level object
	var levels = [];
	
//create a constructor function to create each level object and push it to the levels array
	var Level = function(lvl, dur, min, tar, bomb, bombRespawn, desc){
			this.level = lvl;
			this.duration = dur;
			this.minScore = min;
			this.targets = tar;
			this.bombs = bomb;
			this.bombRespawn = bombRespawn;
			this.description = desc;
			levels.push(this);
	}
	
//use the constructor function to create all the levels
//Values are (level number, duration, min score, targets, bombs, bomb move timer, desc)
	var level1 = new Level(1,5,10,1,0,1, "Move the mouse over as many targets as you can before time runs out.");
		
//create an empty array to hold the target objects	
	var targetEls = [];
			

//update the main side bar info
	main.update();

//defines a function that updates the info when going to the next level	
	var levelUp = function(){
		main.level += 1;
		startlevel();
		button2El.style.display = "none";
		button2El.removeEventListener("click", levelUp, false);
	}

//defines a function that allows the user to restart the game if they've beaten all levels	
	var restart = function(){
		main.level = 1;
		startlevel();
		button2El.textContent = "Next Level";
		button2El.style.display = "none";
		button2El.removeEventListener("click", restart, false);
	}
	
//define the hover over function that moves the block and updates the score
		var hover = function(e){
			main.score += 1;
			main.levelScore += 1;
			main.update();
			e.target.style.top = random(0, 750-30) + "px";
			e.target.style.left = random(0, 750-30) + "px";
			
		}	

//define the hover over function that moves the bombs and updates the score		
		var bombhover = function(e){
			main.score -= 2;
			main.levelScore -= 2;
			main.update();
			e.target.style.top = random(0, 750-50) + "px";
			e.target.style.left = random(0, 750-50) + "px";
			
		}	
		
//define a function to move the bombs after a given time
		var bombsMove = function(){
			var bombsEl = document.querySelectorAll(".bomb");
			for (var i=0; i<bombsEl.length; i++){
				bombsEl[i].style.top = random(0, 750-50) + "px";
				bombsEl[i].style.left = random(0, 750-50) + "px";
			}
		}
		
//defines a function that executes at the beginning of a level
	var startlevel = function(){
		var targetEls = [];
		main.levelScore = 0;
		main.update();
		infoscreenEl.style.display = "none";  //hide the infoscreen
		infoscreenEl.removeEventListener("click", startlevel, false);  //stop listening for the click to start event
	
		//create the targets
		for(var i=0; i < levels[main.level-1].targets; i++){
			targetEls[i] = "targetEl"+i;
			target = targetEls[i]; 
			target = document.createElement("div");
			gameboardEl.appendChild(target);
			target.style.backgroundImage = "url('media/target.png')";
			target.style.width = 30 + "px";
			target.style.height = 30 + "px";
			target.className = "target";
			target.style.position = "absolute";
			target.style.float = "left";
			target.style.margin = 0;
			target.style.padding = 0;
			target.style.top = random(0, 750-30) + "px";
			target.style.left = random(0, 750-30) + "px";
			target.addEventListener("mouseover", hover, false);
		}
		
		//create the bombs
		for(var i=0; i < levels[main.level-1].bombs; i++){
			targetEls[i] = "targetEl"+i;
			target = targetEls[i]; 
			target = document.createElement("div");
			gameboardEl.appendChild(target);
			target.style.backgroundImage = "url('media/bombs.png')";
			target.style.width = 50 + "px";
			target.style.height = 50 + "px";
			target.className = "target bomb";
			target.style.position = "absolute";
			target.style.float = "left";
			target.style.margin = 0;
			target.style.padding = 0;
			target.style.top = random(0, 750-50) + "px";
			target.style.left = random(0, 750-50) + "px";
			target.addEventListener("mouseover", bombhover, false);
		}
		var bombTimer = (levels[main.level-1].bombRespawn)*1000;
		var bombMover = setInterval(bombsMove, bombTimer); 
		
//this functions executes at the end of a level		
	var endlevel = function(){
				var toRemove = gameboardEl.querySelectorAll(".target");  //removes all the target and bomb elements
				for(var j=0; j< toRemove.length; j++){
					gameboardEl.removeChild(toRemove[j]);
				}
			clearInterval(bombMover); 	
			clearInterval(timer);  //clears the timer so it doesn't keep counting down below zero
			infoscreenEl.style.display = "block";  //pops up the infoscreen
			levelinfo.textContent = "You're score is: " + score;			
			button2El.style.display = "initial";
			button2El.textContent = "Close";
			button2El.addEventListener("click", closeGame, false);
			button1El.style.display = "none";
					
	}
	
//this section implements the game close out

	let closeGame = function(){
		window.score = main.score;
		gameWrapper.remove();
		alert("score " +score);
		return window.score;

	}

//this section implements the countdown timer
	
	var timeremaining = levels[main.level-1].duration;	
	var countdown = function(){
		timeremaining -= 1;		
		var timerEl = document.querySelector("#timer");
		timerEl.textContent = timeremaining;
		if (timeremaining == 0){
			window.score = main.score;
			endlevel();
			
		}			
	}
	
	var timer = setInterval(countdown, 1000);
		
	}	
	
button1El.addEventListener("click", startlevel, false);
		
}
game();
}