<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	$dbh = new PDO($conn, $user, $pass);
	$stmt = $dbh->prepare("SELECT * FROM users WHERE useremail=? AND userpasswd=?");
	$stmt->bindParam(1,$data->username);
	$stmt->bindParam(2,$data->password);
	if ($stmt->execute()) {
		if ($stmt->rowCount() > 0) {
			$result = $stmt->fetch();
			$_SESSION['userid']=$result['userid'];
			$_SESSION['useremail']=$result['useremail'];
			$_SESSION['username']=$result['username'];
			$_SESSION['usersurname']=$result['usersurname'];
			$_SESSION['userlevel']=$result['userlevel'];
			echo 1;
		}
		else
			echo 0;
	}
?>