<?php
$data = array("ala", "ma", "kota");
header('Content-Type: application/json');
echo json_encode($data);
//move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $_FILES['file']['name']);
?>