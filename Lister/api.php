<?php	
	header('Content-Type: application/json');

	include 'database.php';

	$db = DataBase::getDB();
	$user_id = $_COOKIE['user_id'];
	$user_hash = $_COOKIE['user_hash'];
	$output;


	if (!isset($_COOKIE["user_id"])) {
		header('HTTP/1.1 401 Unauthorized');
		exit;
	} else {
		$query = "SELECT account_hash AS hash
				FROM `accounts`
				WHERE account_id = {?}";
		$options = array($user_id);

		$output = $db->selectRow($query, $options);

		if ($output['hash'] != $user_hash) {
			header('HTTP/1.1 401 Unauthorized');
			exit;
		}
	}


	

	switch ($_SERVER['REQUEST_METHOD']) {

		case "GET":

			if (isset($_GET['id'])) {
				$id = mysql_escape_string( $_GET['id'] );

				$query ="SELECT 
							list_id AS id,
							list_title AS title,
							list_category AS category,
							list_date AS date,
							list_rating AS rating,
							list_comment AS comment,
							list_modified AS modified
						FROM `lists`
						WHERE list_id = {?} AND account_id = {?}";
				$options = array($id, $user_id);

				$output = $db->selectRow($query, $options);	
			} else {
				$query = "SELECT
							list_id AS id,
							list_title AS title,
							list_category AS category,
							list_date AS date,
							list_rating AS rating,
							list_comment AS comment,
							list_modified AS modified
						FROM `lists`
						WHERE account_id = {?}
						LIMIT 0, 100";
				$options = array($user_id);

				$output = $db->select($query, $options);
			}

					

			break;

		case "POST":
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$title = mysql_escape_string( $request->title );
			$category = mysql_escape_string( $request->category );

			$query = "INSERT INTO `lists`
						(account_id, list_title, list_category, list_date)
					VALUES ({?}, {?}, {?}, NOW())";
			$options = array($user_id, $title, $category );

			$output = $db->query($query, $options);

			break;

		case "PUT":
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$id = mysql_escape_string( $request->id );
			$title = mysql_escape_string( $request->title );
			$category = mysql_escape_string( $request->category );
			$rating = mysql_escape_string( $request->rating );
			$comment = mysql_escape_string( $request->comment );
			$date = mysql_escape_string( $request->date );

			$query = "UPDATE `lists`
					SET list_title = {?},
						list_category = {?},
						list_rating = {?},
						list_comment = {?},
						list_date = {?},
						list_modified = NOW()
					WHERE list_id = {?}";
			$options = array($title, $category, $rating, $comment, $date, $id);

			$output = $db->query($query, $options);

			break;

		case "DELETE": 
			$id = mysql_escape_string( $_GET['id'] );

			$query = "DELETE FROM `lists` WHERE list_id = {?}";
			$options = array($id);

			$output = $db->query($query, $options);
			break;

	}
	echo json_encode($output);
?>