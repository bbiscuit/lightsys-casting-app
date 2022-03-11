<?php

$filename = $_FILES['file']['name'];
$location = "../MediaItems/" . $filename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
	echo 'Success';
}
else {
	echo 'Failure';
}

?>
