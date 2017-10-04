<?php
  $servername = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'npcdb';
  $con = mysqli_connect($servername,$username,$password);

  $create_db = "CREATE DATABASE npcdb";

  if ($con->query($create_db)) {
  echo "npcdb created.<br>";
  }else {
  echo "Database not created Because: ".mysqli_error($con);
  }

  mysqli_select_db($con,$dbname) or die(mysqli_error($con));

  $create_table = "CREATE TABLE customers (
  c_id INT(6) AUTO_INCREMENT PRIMARY KEY,
  c_name VARCHAR(150) NOT NULL,
  c_phone VARCHAR(50) NOT NULL,
  c_email VARCHAR(250) NOT NULL,
  c_msg VARCHAR(1000) NOT NULL
  )";

  if ($con->query($create_table)) {
  echo "products table created<br>";
  }else {
  echo "table not created Because: ".mysqli_error($con);
  }
?>
