console.log("initCastPlayer script.");

const MP3_TYPE = 0;
const MP4_TYPE = 1;

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
loadMediaList = function(media) {
	var list = document.getElementById("load-links");

	media.forEach(e => {
		var link = document.createElement('a');
		link.text = e.NAME;
		var listItem = document.createElement('li');
		listItem.appendChild(link);
		list.appendChild(listItem);

		link.addEventListener("click", function() {
			var url = e.PATH;
			var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
			var mediaInfo;


			if (e.TYPE == MP3_TYPE) {
				mediaInfo = new chrome.cast.media.MediaInfo(url, "audio/mp3");
			}
			else if (e.TYPE == MP4_TYPE) {
				mediaInfo = new chrome.cast.media.MediaInfo(url, "video/mp4");
			}
			mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
			mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
			mediaInfo.metadata.title = e.NAME;

			loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);
			castSession.loadMedia(loadRequest);
		});
	});
}

response.then(response => response.blob())
	.then(myBlob => myBlob.stream().getReader().read())
	.then(please => { 
		var json = String.fromCharCode(...please.value);
		jresult = JSON.parse(json);

		loadMediaList(jresult);
	});


