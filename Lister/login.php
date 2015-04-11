<?php

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$username = $request->username;
	$password = $request->password;


	include 'database.php';
	$db = DataBase::getDB();

	switch ($_SERVER['REQUEST_METHOD']) {

		case 'GET':
			//Check login
			if (isset($_COOKIE['user_id']) && isset($_COOKIE['user_hash'])) {

				$id = $_COOKIE['user_id'];
				$hash = $_COOKIE['user_hash'];
			
				$query = "SELECT account_hash AS hash
						FROM `accounts`
						WHERE account_id = {?}";
				$options = array($id);

				$output = $db->selectRow($query, $options);

				if ($output['hash'] == $hash) {
					header('HTTP/1.1 202 Accepted');
				} else {
					header('HTTP/1.1 401 Unauthorized');
					removeLogin();
				}
			}
			break;

		case 'PUT':
			// Login
			$query = "SELECT account_id AS id, account_password AS password
					FROM `accounts`
					WHERE account_username = {?}";
			$options = array($username);


			$output = $db->selectRow($query, $options);

			// echo $password."\n";
			// echo $output['password'] . ' == ' . md5(md5($password));

			if ($output['password'] == md5(md5($password))) {

				$hash = md5(generateCode(10));

				setcookie("user_id", $output['id'], time()+3600);
				setcookie("user_hash", $hash, time()+3600);

				$query = "UPDATE accounts
						SET account_hash = {?}
						WHERE account_id = {?}";
				$options = array($hash, $output['id']);
				$output = $db->query($query, $options);

				header('HTTP/1.1 202 Accepted');

			} else {
				header('HTTP/1.1 401 Unauthorized');
				removeLogin();
			}

			break;

		case 'POST':
			// Registration

			$query = "SELECT account_username AS username
					FROM `accounts`
					WHERE account_username = {?}";
			$options = array($username);
			$output = $db->selectRow($query, $options);

			if (empty($output)) {
				$query = "INSERT INTO `accounts`
						(account_username, account_password)
					VALUES ({?}, {?})";
				$options = array($username, md5(md5($password)) );

				$output = $db->query($query, $options);

				header('HTTP/1.1 201 Created');
			} else {
				header('HTTP/1.1 406 Not Acceptable');				
			}

			break;

		case 'DELETE': 
				removeLogin();
			break;
	}

	function removeLogin() {
		unset($_COOKIE['user_id']);
		unset($_COOKIE['user_hash']);
		setcookie('user_id', '', time()-300);
		setcookie('user_hash', '', time()-300);
	}



	function generateCode($length=6) {

		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
		$code = "";

		$clen = strlen($chars) - 1;  

		while (strlen($code) < $length) {
			$code .= $chars[mt_rand(0,$clen)];  
		}

		return $code;

	}

?>