//Click/Touch the guitar, or any key to play!

//Convert circle elements to paths
MorphSVGPlugin.convertToPath("circle");

//Note to self: Name stuff better in illustrator!
//Varibles for the animation
stringStringyness = 2;
guitar = document.getElementById('guitar_2_');
stringStraight_6_ = document.getElementById('stringStraight_6_');
stringPlucked_6_ = document.getElementById('stringPlucked_6_');
stringStraight_7_ = document.getElementById('stringStraight_7_');
stringPlucked_7_ = document.getElementById('stringPlucked_7_');
stringStraight_8_ = document.getElementById('stringStraight_8_');
stringPlucked_8_ = document.getElementById('stringPlucked_8_');
stringStraight_9_ = document.getElementById('stringStraight_9_');
stringPlucked_9_ = document.getElementById('stringPlucked_9_');
stringStraight_10_ = document.getElementById('stringStraight_10_');
stringPlucked_10_ = document.getElementById('stringPlucked_10_');
stringStraight_11_ = document.getElementById('stringStraight_11_');
stringPlucked_11_ = document.getElementById('stringPlucked_11_');
speaker_1 = document.getElementById('speaker-1');
speakerWobble_1 = document.getElementById('speaker-wobble-1');
speaker_2 = document.getElementById('speaker-2');
speakerWobble_2 = document.getElementById('speaker-wobble-2');
note_1 = document.getElementById('note-1_2_');
note_2 = document.getElementById('note-2_2_');
note_3 = document.getElementById('note-3_2_');
note_4 = document.getElementById('note-4_2_');
spark_1 = document.getElementById('spark-1');
spark_2 = document.getElementById('spark-3');
spark_3 = document.getElementById('spark-4');

//Declare timeline
var pluck = new TimelineMax({
	paused: true
})

//String Animtaions
pluck.to(stringStraight_6_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_6_.getAttribute('points')}})
					.to(stringStraight_6_, 1, {morphSVG: {points: stringStraight_6_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness, 0.04)})

					.to(stringStraight_7_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_7_.getAttribute('points')}}, "-=1.1")
					.to(stringStraight_7_, 1, {morphSVG: {points: stringStraight_7_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness,0.04)}, "-=1")

					.to(stringStraight_8_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_8_.getAttribute('points')}}, "-=1.1")
					.to(stringStraight_8_, 1, {morphSVG: {points: stringStraight_8_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness, 0.04)}, "-=1")

					.to(stringStraight_9_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_9_.getAttribute('points')}}, "-=1.1")
					.to(stringStraight_9_, 1, {morphSVG: {points: stringStraight_9_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness, 0.04)}, "-=1")
					
					.to(stringStraight_10_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_10_.getAttribute('points')}}, "-=1.1")
					.to(stringStraight_10_, 1, {morphSVG: {points: stringStraight_10_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness, 0.04)}, "-=1")

					.to(stringStraight_11_, 0.1, {ease: Expo.easeOut,morphSVG: {points: stringPlucked_11_.getAttribute('points')}}, "-=1.1")
					.to(stringStraight_11_, 1, {morphSVG: {points: stringStraight_11_.getAttribute('points')},ease: Elastic.easeOut.config(stringStringyness, 0.04)}, "-=1")

//Note Animations
					.to(note_1, 0.4, {x:"-50%", y:"-50%"}, "-=1.1")
					.to(note_1, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(note_1, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

					.to(note_2, 0.4, {x:"50%", y:"-50%"}, "-=1.1")
					.to(note_2, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(note_2, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

					.to(note_3, 0.4, {x:"-20%", y:"-50%"}, "-=1.1")
					.to(note_3, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(note_3, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

					.to(note_4, 0.4, {x:"50%", y:"-25%"}, "-=1.1")
					.to(note_4, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(note_4, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

//Sparks Animations
					.to(spark_1, 0.4, {x:"-50%", y:"50%"}, "-=1.1")
					.to(spark_1, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(spark_1, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

					.to(spark_2, 0.4, {x:"-50%", y:"-50%"}, "-=1.1")
					.to(spark_2, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(spark_2, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

					.to(spark_3, 0.4, {x:"50%", y:"-50%"}, "-=1.1")
					.to(spark_3, 0.2, {opacity:1 , ease:SlowMo.easeIn}, "-=1.1")
					.to(spark_3, 0.2, {opacity:0 , ease:SlowMo.easeOut}, "-=0.9")

//Speaker Animtaions
					.to(speaker_1, 0.1, {ease: Expo.easeOut,morphSVG:speakerWobble_1}, "-=1.1")
					.to(speaker_1, 0.4, {morphSVG:speaker_1,ease: Elastic.easeOut}, "-=1")

					.to(speaker_2, 0.1, {ease: Expo.easeOut,morphSVG:speakerWobble_2}, "-=1.05")
					.to(speaker_2, 0.4, {morphSVG:speaker_2,ease: Elastic.easeOut}, "-=0.95");


//Trigger Audio
var i = 0;
function playAudio() {
	if (i < 12) {
		++i;
	} else {
		i = 1;
	}
	var myAudio = document.getElementById("audio-" + i);
	myAudio.play();
}

function rockOut() {
	pluck.restart();
	pluck.play();
	playAudio();
}

//Do the stuff when clicked
guitar.addEventListener("click", rockOut);

export default LoginFormAnimation