<?php

$captcha;
if(isset($_POST['g-recaptcha-response']) && ($_POST['username']) && ($_POST['password1']) && ($_POST['password2'])  ){
  
  $username = $_POST['username'];
  $email = $_POST['email'];

  $captcha= $_POST['g-recaptcha-response'];
  $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LcxfhETAAAAAN_gg8pxPbMqp-sHAriv8nPxthhe&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
  $responseData = json_decode($response);

  if($responseData->success==false)
      {
        echo 'Error - Capture was not filled.';
      }else
      {
        echo "Thank you for signing up ".$_POST["username"];
        echo "<br>";
        echo "Your Email address is: ".$_POST["email"];
      }
}
else{
    echo 'All fields were not filled.';
    exit;
  }
?>
