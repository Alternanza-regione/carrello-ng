<?php
	session_start();
	include 'conn.inc.php';
	$rows=[];
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("SELECT * FROM products WHERE prodid=?");
	foreach($_SESSION['cart'] as $index => $elem) {
		$stmt->bindParam(1,$elem);
		$stmt->execute();
		$row=$stmt->fetch();
		$row['quant']=$_SESSION['cartquant'][$index];
		array_push($rows,$row);
	}
	echo json_encode($rows);
?>