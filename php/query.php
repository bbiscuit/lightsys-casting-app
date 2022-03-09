<?php

header('Content-Type: application/json');

class FileDB extends SQLite3 {
	function __construct() {
		$this->open('../MediaItems/fileReg.db');
	}
}

$db = new FileDB();

// Get the number of rows.
$rowsRes = $db->query('select count(*) from Files;');
$rows = $rowsRes->fetchArray(SQLITE3_ASSOC)["count(*)"];

$res = $db->query('select * from Files;');


echo "[";


$i = 0;
while($row = $res->fetchArray(SQLITE3_ASSOC)){
	echo "{";
	echo '"ID":"' . $row["ID"] . '",';
	echo '"PATH":"' . $row["PATH"] . '",';
	echo '"TYPE":"' . $row["TYPE"] . '",';
	echo '"NAME":"' . $row["NAME"];
	echo '"}';

	if ($i != $rows - 1) {
		echo',';
	}
	$i = $i + 1;
}

echo "]";

$db->close();

?>
