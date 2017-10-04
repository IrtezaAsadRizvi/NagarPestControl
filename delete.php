<?php
  //CONNECTION
  $servername = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'npcdb';
  $con = mysqli_connect($servername,$username,$password,$dbname);
  //JSON FROM CLIENT
  $data = json_decode(file_get_contents("php://input"));
  $id = $data->id;
  //DELETE QUERY
  $delete_query = "DELETE FROM customers WHERE c_id = ".$id;
  //DELETION
  if (mysqli_query($con,$delete_query)) {
    echo "data deleted";
  }else {
    echo "error deleting data";
  }
?>
