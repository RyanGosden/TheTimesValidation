<?php

if(isset($_POST['username'])){
  $username = $_POST['username'];

  $json=file_get_contents("json/users.json");
  $jsonDecode = json_decode($json);

  foreach($jsonDecode->users as $val) {
      if($val == $username) {
        echo "exists";
      }
      else{
      }
  }
}
else{
 echo "No data sent";
}
?>
