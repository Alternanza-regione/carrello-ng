<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("INSERT INTO users(username,usersurname,useremail,userpasswd) VALUES (?,?,?,?)");
	$stmt->bindParam(1,$data->signupname);
	$stmt->bindParam(2,$data->signupsurname);
	$stmt->bindParam(3,$data->signupemail);
	$stmt->bindParam(4,$data->signuppwd);
	if ($stmt->execute())
		echo 1;
	else
		echo 0;
?>