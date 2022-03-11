// After the API is loaded, the google cast API then calls
// this callback to set castContext options as well as
// initialize player controls.
//
// This must be declared PRIOR TO the API script load, because it's
// a callback.
window['__onGCastApiAvailable'] = function(isAvailable) {
	// 1. If the Google Cast API was successfully loaded,
	// set cast instance options.
	// 2. Load controls interface.

	// 1. If the Google Cast API was successfully loaded,
	// set cast instance options 
	var castContext = cast.framework.CastContext.getInstance();
	if (isAvailable) {
		castContext.setOptions({
			receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
		});
	}

	// 2. Load controls interface.
	startControls();
};
