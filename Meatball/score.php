<?php
$newScore['title'] = $_POST['title']? $_POST['title']: 'Unnamed';
$newScore['value'] = intval($_POST['value']);

if ($newScore['title'] == '' || $newScore['title'] == 'null') $newScore['title'] = 'Unnamed';

$file = file_get_contents('score.json');
$obj = json_decode($file, true);

if ($newScore['value'] <= $obj['score'][0]['value']) { exit('You score too low. Loser.'); }

foreach ($obj['score'] as $key => $value) {
	if ($newScore['value'] <= $value['value']) {
		array_splice($obj['score'], $key, 0, array($newScore));
		array_splice($obj['score'], 0, 1);
		writeNewRecord($obj);
		break;
	}
}

if ($newScore['value'] > $obj['score'][4]['value']) {
	array_splice($obj['score'], 5, 0, array($newScore));
	array_splice($obj['score'], 0, 1);
	echo 'YOU WIN!<br>';
	writeNewRecord($obj);
}


function writeNewRecord($obj) {
	$file = fopen("score.json","w");
	fwrite($file, json_encode($obj));
	fclose($file);
	print_r($obj['score']);
	exit;
}

?>
