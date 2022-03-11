<?php

// 1. Upload the file to the web server.
// 2. Register the file to the databse.
//	a. Fetch necessary data from the file.
//	b. Run the upload query.


// 1. Upload the file to the web server.
$filename = $_FILES['file']['name'];
$location = "../MediaItems/" . $filename;

$info = pathinfo(__DIR__ . '/' .$location);

$http = 'http://' . gethostbyname(getHostName()) . '/MediaItems/' . $filename;
$ext = $info['extension'];
$name = $info['basename'];

$type = 0;

if (strcmp($ext, 'mp4') == 0) {
	$type = 1;
}
else if (strcmp($ext, 'mp3') == 0) {
	$type = 0;
}
else {
	echo "Upload error.\n";
	echo "Path: " . $location . "\n";
	exit();
}

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
	echo 'Success';
}
else {
	echo 'Failure';
}

// 2. Register the file to the databse.
class FileDB extends SQLite3 {
	function __construct() {
		$this->open('../MediaItems/fileReg.db');
	}
}
$db = new FileDB();

// a. Fetch necessary data from the file.

// b. Run the upload query.
$cmd = "insert into Files (HTTP, TYPE, NAME) values ('" . $http . "', " . $type . ", '" . $name . "');";


$db->exec($cmd);

$db->close();

?>
