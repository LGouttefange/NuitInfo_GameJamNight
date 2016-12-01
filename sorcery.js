
$( function() {

	var buttons = $(".section button");
	var status = $("#status");
	var currentSection = $(".section").first();


	buttons.click( function() {
		gotoSection($(this).attr("go"));
	} );

	$(".section > action[name='reset']").on("doAction", resetGame);
	$(".section > action[name='start']").on("doAction", startGame);

	function setBackgroundImage(file_name) {
		$("#background-image").css("background-image", "url(img/" + (file_name || "placeholder.png") + ")");
	}
	
	function gotoSection(key) {
		currentSection.hide();
		currentSection = $("#" + key);
		currentSection.show();
		setBackgroundImage(currentSection.find(".img_src").text().trim());
		currentSection.find("action").trigger("doAction");
	}


	function startGame() {
	}

	function resetGame() {
		gotoSection("wakeUp");
	}
	
	function endGame() {
		gotoSection("death");
	}

	$(".section +.section").hide();


} );