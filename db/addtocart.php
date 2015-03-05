<?php
	session_start();
	include 'conn.inc.php';
	$data = json_decode(file_get_contents("php://input"));
	if (!isset($_SESSION['cart'])) {
		$_SESSION['cart']=array();
		$_SESSION['cartquant']=array();
	}
	$trovato=false;
	foreach($_SESSION['cart'] as $index => $elem) {
		if ($elem==$data->prodid) {
			$trovato=true;
			$_SESSION['cartquant'][$index]++;
			break;
		}
	}
	if ($trovato==false) {
		$len = count($_SESSION['cart']);
		$_SESSION['cart'][$len]=$data->prodid;
		$_SESSION['cartquant'][$len]=1;
	}
	echo 1;
?>