<?php
	session_start();
	include 'conn.inc.php';
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("SELECT * FROM products");
	if ($stmt->execute())
		echo json_encode($stmt->fetchAll());
?>