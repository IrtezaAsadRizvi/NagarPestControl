<?php
  //CONNECTION
  $servername = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'npcdb';
  $con = mysqli_connect($servername,$username,$password,$dbname);

  //SELECT QUERY
  $select_query = "SELECT * FROM `customers`";
  $rs = mysqli_query($con,$select_query);

  while ($row = $rs->fetch_assoc()) {
    $data[] = $row;
  }
  print json_encode($data);
?>
