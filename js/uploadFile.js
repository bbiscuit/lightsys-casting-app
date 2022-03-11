var input = document.querySelector('input[type="file"]')

input.addEventListener('change', function() {
	console.log(input.files[0]);
	fetch('../php/uploadFile.php', {
  		method: 'POST',
  		body: input.files[0]
	}).then(response => {
		console.log("done.");
	}).catch(e => {
		console.log("error.");
	});


});

