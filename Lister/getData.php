<?php
	header('Content-Type: application/json');

	require 'database.php';

	$data = array(
		array(
			id => '1',
			date => '2015.15.2',
			category => 'book',
			title => 'Test book'
		),
		array(
			id => '2',
			date => '2015.15.2',
			category => 'book',
			title => 'Test book 2'
		),
		array(
			id => '3',
			date => '2015.15.2',
			category => 'movie',
			title => 'Test Movie'
		),
		array(
			id => '4',
			date => '2015.15.2',
			category => 'serie',
			title => 'Test Serie'
		)
	);

	if (isset($_GET['id'])) {

		$id = $_GET['id'];

		foreach ($data as $array) {
			if ($array['id'] == $id) {
				$data = $array;
				break;
			}
		}

	}

	echo json_encode($data);

?>