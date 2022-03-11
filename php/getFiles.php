<?php
// Create a file to parse the SQL table to be used for casting
// 1. Open the SQL table
// 2. Query the table
//		a. Get row number
//		b. Query the table
// 3. Parse it as a json
//		a. Iteratively fetch a row
//		b. Push the json in text
//		c. Ensure json notation is followed


header('Content-Type: application/json');
// 1. Open the SQL table
class FileDB extends SQLite3 {
	function __construct() {
		$this->open('../MediaItems/fileReg.db');
	}
}
$db = new FileDB();

// 2. Query the table
//		a. Get row number
$rowsRes = $db->query('select count(*) from Files;');
$rows = $rowsRes->fetchArray(SQLITE3_ASSOC)["count(*)"];
//		b. Query the table
$res = $db->query('select * from Files;');


// 3. Parse it as a json
echo "[";
$i = 0;
//		a. Iteratively fetch a row
while($row = $res->fetchArray(SQLITE3_ASSOC)){
//		b. Push the json in text
	echo "{";
	echo '"ID":"' . $row["ID"] . '",';
	echo '"HTTP":"' . $row["HTTP"] . '",';
	echo '"TYPE":"' . $row["TYPE"] . '",';
	echo '"NAME":"' . $row["NAME"];
	echo '"}';
//		c. Ensure json notation is followed
	if ($i != $rows - 1) {
		echo',';
	}
	$i = $i + 1;
}
echo "]";

// Close the file after finishing
$db->close();
?>
