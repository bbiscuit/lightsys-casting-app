// Creating button references to a specific media file
//  and adding an event listener to cast said media file
// 1. Associate SQL table media type field with MIME types 
// 2. Fetch the json in text format from getFiles.php
// 3. Load json file and append buttons to html
//		a. Iteratively add link elements for each media file
//			- Name each element base on name field in table
//			- Append each item to the list HTML element
//		b. Add event listener to each link
//		c. On click cast the selected media item
//			- Initialize the cast session and other variables
//			- Setup file to be cast
//			- Specify metadata
//			- Cast the media
// 4. Parsing the josn in text to an actual json file

// 1. Associate SQL table media type field with MIME types 
const MP3_TYPE = 0;
const MP4_TYPE = 1;

// 2. Fetch the json that was created in text from getFiles.php
const phpGetURL = '../php/getFiles.php';
const response = fetch(phpGetURL, {
	method: 'GET',
	mode: 'same-origin',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
});

// 3. Load json file and append buttons to html
var jresult;
loadMediaList = function(media) {
	var list = document.getElementById("load-links");
//		a. Iteratively add link elements for each media file
	media.forEach(e => {
		var link = document.createElement('a');
//			- Name each element base on name field in table
		link.text = e.NAME;
		var listItem = document.createElement('li');
//			- Append each item to the list HTML element
		listItem.appendChild(link);
		list.appendChild(listItem);
//		b. Add event listener to each link
		link.addEventListener("click", function() {
//		c. On click cast the selected media item
//			- Initialize the cast session and other variables
			var url = e.HTTP;
			var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
			var mediaInfo;

			// Check which type of media it is based on TYPE field in SQL table
			if (e.TYPE == MP3_TYPE) {
//			- Setup file to be cast
				mediaInfo = new chrome.cast.media.MediaInfo(url, "audio/mp3");
			}
			else if (e.TYPE == MP4_TYPE) {
//			- Setup file to be cast
				mediaInfo = new chrome.cast.media.MediaInfo(url, "video/mp4");
			}
//			- Specify metadata
			mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
			mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
			mediaInfo.metadata.title = e.NAME;
//			- Cast the media
			loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);
			castSession.loadMedia(loadRequest);
		});
	});
}

// 4. Parsing the josn in text to an actual json file
response.then(response => response.blob())
	.then(myBlob => myBlob.stream().getReader().read())
	.then(please => { 
		var json = String.fromCharCode(...please.value);
		jresult = JSON.parse(json);

		loadMediaList(jresult);
	});


