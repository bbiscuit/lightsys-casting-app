
mSToS = function(min, sec) {
	return sec + min * 60;
};


const TIME_DELAY = 500;

class Controls {
	constructor() {
		// Snag HTML elements.
		this.playPause = document.getElementById("a-play-pause");
		this.muteUnmute = document.getElementById("a-mute-unmute");
		this.volumeInput = document.getElementById("input-volume");
		this.volumeDisplay = document.getElementById("p-volume");
		this.seekMinutesInput = document.getElementById("input-seek-minutes");
		this.seekSecondsInput = document.getElementById("input-seek-seconds");
		this.seek = document.getElementById("a-seek");
		this.seekDisplay = document.getElementById("p-seek");
		this.durationDisplay = document.getElementById("p-duration");

		// Fields.
		this.duration = -1;
		this.seekMinutes = 0;
		this.seekSeconds = 0;

		this.seekMinutesInput.value = 0;
		this.seekSecondsInput.value = 0;

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

		// Initialize remote player.
		//this.controller = new cast.framework.RemotePlayerController(new cast.framework.RemotePlayer());

		// Setup initial display values.
		this.volumeDisplay.innerText = "Volume: ???%";
		this.seekDisplay.innerText = "Time: " + this.seekMinutes + ":" + (this.seekSeconds / 10) + (this.seekSeconds % 10);

	}

	/**
	 * Binds callbacks to the controls.
	 */
	bindCallbacks() {
		var self = this;

		this.playPause.addEventListener("click", function() {
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);
			controller.playOrPause();
		});

		this.muteUnmute.addEventListener("click", function() {
			var player = new cast.frameworkRemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			controller.muteOrUnmute();

		});

		this.volumeInput.addEventListener("change", function() {
			var player = new cast.framework.RemotePlayer();
			var controller = new cast.framework.RemotePlayerController(player);

			var input = parseInt(self.volumeInput.value);

			if (input != NaN) {
				player.volumeLevel = input / 100;
				controller.setVolumeLevel();
			}
		});

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

startControls = function() {
	var c = new Controls();
	c.bindCallbacks();
}
