
$( function() {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	var DEFAULT_LIFE = 3;

	var life;
	var buttons = $(".section button");
	var status = $("#status");
	var currentSection = $(".section").first();
	var actionsHistory = [];


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


} );