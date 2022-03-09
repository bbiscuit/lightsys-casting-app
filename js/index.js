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
