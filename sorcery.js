
$( function() {

	var buttons = $(".section button");
	var status = $("#status");
	var currentSection = $(".section").first();


	buttons.click( function() {
		gotoSection($(this).attr("go"));
	} );

	$(".section > action[name='reset']").on("doAction", resetGame);
	$(".section > action[name='start']").on("doAction", startGame);

	function pathOfImage(file_name) {
		return "img/" + file_name;
	}

	function backgroundShouldBeReplaced(file_name) {
		return $("#background-image").find("> img").attr("src") !== pathOfImage(file_name);
	}

	function setBackgroundImage(file_name) {

		//$("#background-image").css("background-image", "url(img/" + (file_name || "placeholder.png") + ")");

		if (backgroundShouldBeReplaced(file_name)) {

			$("#background-image").find("> img")
				.fadeOut(800, function () {
					$(this).attr("src", "img/" + (file_name || "placeholder.png"));
				})
				.fadeIn(800);
		}


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


	$(".section +.section").hide();


} );