<?php
  //CONNECTION
  $servername = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'npcdb';
  $con = mysqli_connect($servername,$username,$password,$dbname);
  //JSON FROM CLIENT
  $data = json_decode(file_get_contents("php://input"));
  $name = $data->name;
  $phone = $data->phone;
  $email = $data->email;
  $msg = $data->msg;
  //INSERT QUERY
  $insert_sql = "INSERT INTO customers (c_name, c_phone, c_email, c_msg) VALUES ('$name','$phone','$email','$msg')";
  //INSERTION
  if (mysqli_query($con,$insert_sql)) {
    echo "data inserted";
  }else {
    echo "error sending data";
  }
?>
