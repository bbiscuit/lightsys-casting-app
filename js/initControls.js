/**
 * Helper function to convert minute-seconds
 * time data to seconds.
 *
 * @param min The minutes time component.
 * @param sec The seconds time component.
 *
 * @return The time, in seconds.
 */
mSToS = function(min, sec) {
	return sec + min * 60;
};


const TIME_DELAY = 500;

/**
 * Data structure to control remote media player
 * interface.
 */
class Controls {
	constructor() {
		// 1. Snag HTML control elements from document.
		// 2. Setup an interface update function to be called
		// repeatedly after TIME_DELAY ms.

		// 1. Snag HTML control elements from document.
		this.playPause = document.getElementById("a-play-pause");
		this.muteUnmute = document.getElementById("a-mute-unmute");
		this.volumeInput = document.getElementById("input-volume");
		this.volumeDisplay = document.getElementById("p-volume");
		this.seekMinutesInput = document.getElementById("input-seek-minutes");
		this.seekSecondsInput = document.getElementById("input-seek-seconds");
		this.seek = document.getElementById("a-seek");
		this.seekDisplay = document.getElementById("p-seek");
		this.durationDisplay = document.getElementById("p-duration");
	
		this.seekMinutesInput.value = 0;
		this.seekSecondsInput.value = 0;


		// 2. Setup an interface update function to be called
		// repeatedly after TIME_DELAY ms.
		var self = this;

		this.updateInterval = setInterval(function() {	
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			if (player.isPaused) {
				self.playPause.text = "Play";
			}
			else {
				self.playPause.text = "Pause";
			}

			if (player.isMuted) {
				self.muteUnmute = "Unmute";
			}
			else {
				self.muteUnmute = "Mute";
			}

			// Set volume display.
			self.volumeDisplay.innerText = "Volume: " + Math.round(player.volumeLevel * 100) + "%";
			self.seekDisplay.innerText = "Time: " + controller.getFormattedTime(player.currentTime);	

			self.durationDisplay.innerText = "Duration: " + controller.getFormattedTime(player.duration);
		}, TIME_DELAY);
	}

	/**
	 * Binds callbacks to the controls.
	 */
	bindCallbacks() {
		var self = this;

		// Event listener for toggling play/pause on the video.
		this.playPause.addEventListener("click", function() {
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);
			controller.playOrPause();
		});

		// Event listener for toggling mute/unmute on the video.
		this.muteUnmute.addEventListener("click", function() {
			var player = new cast.frameworkRemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			controller.muteOrUnmute();

		});

		// Event listener for inputing a volume change on the video.
		this.volumeInput.addEventListener("change", function() {
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			var input = parseInt(self.volumeInput.value);

			if (input != NaN) {
				player.volumeLevel = input / 100;
				controller.setVolumeLevel();
			}
		});

		// Event listener for seeking through the video.
		this.seek.addEventListener("click", function() {
		
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			var minutes = parseInt(self.seekMinutesInput.value);
			var seconds = parseInt(self.seekSecondsInput.value);

			if (minutes != NaN && seconds != NaN) {
				var input = mSToS(minutes, seconds);

				player.currentTime = input;
				controller.seek();
			}
		});
	}

}

// Function to start the controls, to be called **AFTER!** the API is loaded completely.
startControls = function() {
	var c = new Controls();
	c.bindCallbacks();
}
