$.wait = function (callback, seconds) {
	return window.setTimeout(callback, seconds * 1000);
};
var audioElement = document.createElement('audio');

function addAudio() {
	audioElement = document.createElement('audio');
	audioElement.setAttribute('autoplay', 'autoplay');
	//audioElement.load()
	$.get();
	audioElement.addEventListener("load", function () {
		audioElement.play();
	}, true);



}
$( function() {
	addAudio();
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

	$("#input_name").blur(function(){
		$("name").text($(this).val() );
	});

	$("#input_loveInterest").blur(function(){
		$("loveInterest").text($(this).val() );
	});

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

	function pathOfSoundFX(file_name) {
		return "soundfx/" + file_name + ".mp3";
	}

	function applySoundFX(currentSection) {
		audioElement.pause();
		if( currentSection.find('soundfx').length >  0 ){
			$(audioElement).attr('src', pathOfSoundFX(currentSection.find('soundfx').text()));
			audioElement.play();
		}
	}

	buttons.click( function() {
		gotoSection($(this).attr("go"));
	} );

	$(".section > action[name='setGender']").on("doAction", setGender);

	function setGender(){
		if( $(this).data('gender') === "male" )
			$('fille').hide();
		else
			$('garcon').hide();

	}

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
		applySoundFX(currentSection);

		setBackgroundImage(currentSection.find("img_src").text().trim());
		swapSprites(currentSection.find("sprite").text());
		currentSection.show();
		currentSection.find("action").trigger("doAction");
	}




	$(".section +.section").hide();
	addAudio();

} );