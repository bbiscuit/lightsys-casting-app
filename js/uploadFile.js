var input = document.querySelector('input[type="file"]')

input.addEventListener('change', function() {
	console.log(input.files[0]);
	var data = new FormData();
	data.append('file', input.files[0]);

	fetch('../php/uploadFile.php', {
  		method: 'POST',
  		body: data
	}).then(response => {
		console.log(response);
	});


});

