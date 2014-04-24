<?php
require 'phpMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$name = $_POST['name'];
$email = $_POST['email'];
$message = htmlentities($_POST['message'], ENT_COMPAT, 'UTF-8');

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup server
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'rajalubenoit@gmail.com';                            // SMTP username
$mail->Password = 'p99xrddy!!';                           // SMTP password
$mail->SMTPDebug = 1;
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
$mail->Port = 587;

$mail->From = $email;
$mail->FromName = $name;
$mail->addAddress('rajalubenoit@gmail.com', 'Benoit Rajalu');  // Add a recipient
$mail->addReplyTo($email, $name);

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Contact portfolio';
$mail->Body    = '<p>' . $message . '</p><p>' . $name . ' - ' . $email . '</p>' ;

if(!$mail->send()) {
   echo 'Message could not be sent.';
   echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}

echo 'Message has been sent';

?>