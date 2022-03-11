console.log("initCastPlayer script.");

window['__onGCastApiAvailable'] = function(isAvailable) {
	console.log("__onGCastApiAvailable callback.");
	var castContext = cast.framework.CastContext.getInstance();
	if (isAvailable) {
		castContext.setOptions({
			receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
		});
	}

	startControls();
};
