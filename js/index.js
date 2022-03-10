console.log("initCastPlayer script.");

const phpGetURL = '../php/getFiles.php';
const response = fetch(phpGetURL, {
	method: 'GET',
	mode: 'same-origin',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
});

// Load JSON database.

var jresult;

response.then(response => response.blob())
	.then(myBlob => myBlob.stream().getReader().read())
	.then(please => { 
		var json = String.fromCharCode(...please.value);
		jresult = JSON.parse(json);

		console.log(jresult);
	});

// Load links from document.
var test1 = document.getElementById("a-test1");

// Set button press event listeners.

test1.addEventListener("click", function() {
	console.log("does this work?");
});

// Set controls event listeners.

// Load control elements.

var playPause = document.getElementById("a-play-pause");
var muteUnmute = document.getElementById("a-mute-unmute");
var inputVolume = document.getElementById("input-volume");
var volume = document.getElementById("p-volume");
var inputSeekMinutes = document.getElementById("input-seek-minutes");
var inputSeekSeconds = document.getElementById("input-seek-seconds");
var seekLink = document.getElementById("a-seek");
var seek = document.getElementById("p-seek");
var duration = document.getElementById("p-duration");
var paused = false;
var muted = false;

// Set control event listeners.

playPause.addEventListener("click", function() {
	paused = !paused;

	if(paused) {
		playPause.text = "Play";
	}
	else {
		playPause.text = "Pause";
	}
});

muteUnmute.addEventListener("click", function() {
	muted = !muted;

	if (muted) {
		muteUnmute.text = "Unmute";
	}
	else {
		muteUnmute.text = "Mute";
	}
});

inputVolume.addEventListener("change", function() {
	console.log("volume updated");
});

seekLink.addEventListener("click", function() {
	console.log("seek initiated");
});

// Setup casting functions.

var setupRemotePlayer = function() {



};
