$.wait = function (callback, seconds) {
	return window.setTimeout(callback, seconds * 1000);
}
$( function() {

	var buttons = $(".section button");
	var status = $("#status");
	var currentSection = $(".section").first();
	var $characterSprite = $("#sprite");


	function sectionHasSprite() {
		return currentSection.find("sprite").length > 0;
	}

	function pathOfSprite(name) {
		return "img/sprite/" + name + ".png";
	}

	function tryShowSprite(sprite_name) {
		if (sectionHasSprite())
			showSprite(sprite_name);
	}

	function swapSprites(sprite_name) {
		hideSprite();
		$.wait(function () {
			tryShowSprite(sprite_name)
		}, 1)
		;
	}

	buttons.click( function() {
		gotoSection($(this).attr("go"));
	} );


	function pathOfImage(file_name) {
		return "img/" + file_name + ".jpg";
	}

	function backgroundShouldBeReplaced(file_name) {
		return $("#background-image").find("> img").attr("src") !== pathOfImage(file_name);
	}

	function setBackgroundImage(file_name) {
		if (backgroundShouldBeReplaced(file_name)) {

			$("#background-image").find("> img")
				.fadeOut(800, function () {
					$(this).attr("src", pathOfImage(file_name || "placeholder"));
					$(this).fadeIn(800);
				})

		}
	}

	function showSprite(name) {
		var spriteUrl = pathOfSprite(name);
		$characterSprite
			.attr("src", spriteUrl)
			.css("top", currentSection.position().top - $characterSprite.height())
			.animate({'left': "+=50px", 'opacity': 1}, 300)


	}

	function hideSprite() {
		$characterSprite
			.animate({'left': "-=50px", 'opacity': 0}, 300);

	}

	function gotoSection(key) {
		currentSection.hide();
		currentSection = $("#" + key);

		setBackgroundImage(currentSection.find("img_src").text().trim());
		swapSprites(currentSection.find("sprite").text());
		currentSection.show();
		currentSection.find("action").trigger("doAction");
	}




	$(".section +.section").hide();


} );