
$( function() {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	class MoonMoon{
		constructor() {
			this.elem = $("#moon-moon");
			this.startRandomBarks();
		}

		goToDefaultPosition(speed){
			this.elem.animate({bottom:"-50px"},speed || 1000 );
		}

		bark(){
			self = this; //for animate callback
			$("#moon-moon").animate({bottom:"-100px"},200,function(){
				self.goToDefaultPosition(200)
			});
		}

		startRandomBarks() {
			self = this; //for animate callback
			this.bark();
			setTimeout(function(){
				self.startRandomBarks()
			},getRandomInt(5000,10000));
		}
	}

	var DEFAULT_LIFE = 3;

	var life;
	var buttons = $(".section button");
	var status = $("#status");
	var currentSection = $(".section").first();
	var actionsHistory = [];
	var moonMoon = new MoonMoon();


	buttons.click( function() {
		gotoSection($(this).attr("go"))
	} );

	$(".section > action[name='hit']").on("doAction", loseOneLife);
	$(".section > action[name='reset']").on("doAction", resetGame);
	$(".section > action[name='start']").on("doAction", startGame);

	
	function gotoSection(key) {
		currentSection.hide();
		currentSection = $("#" + key);
		actionsHistory.push(currentSection.contents().first().text().replace(/(\r\n|\n|\r)/gm,""));
		currentSection.show();
		currentSection.find("action").trigger("doAction");
	}
	
	function getLife() {
		return life;
	}

	function resetLife() {
		life = DEFAULT_LIFE;
		displayLife();
	}

	function playerIsDead() {
		return life <= 0;
	}

	function loseOneLife() {
		life--;
		displayLife();
		if (playerIsDead())
			endGame();
	}

	function startGame() {
		displayLife();
		resetLife();
	}

	function resetGame() {
		resetLife();
		gotoSection("wakeUp");
	}
	
	function endGame() {
		gotoSection("death");
		console.log(actionsHistory);
	}


	function displayLife() {
		status.find("> .life > .value").text(life);
	}


	$(".section +.section").hide();
	moonMoon.goToDefaultPosition();


} );