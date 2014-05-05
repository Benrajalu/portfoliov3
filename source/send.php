<?php


    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){

        $toemail = 'rajalubenoit@gmail.com';
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = htmlentities($_POST['message'], ENT_COMPAT, 'UTF-8');
        $subject = "Contact via portfolio";

        $headers = 'Mime-Version: 1.0'."\r\n"; //header
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: '. $name .' <'.$email.'>'."\r\n\r\n";


        $msg='<p>' . stripslashes($message) . '</p><p>' . $name . ' - ' . $email . '</p>'; 


        if(mail($toemail, $subject, $msg,  $headers)) {
        echo 'Your email was sent successfully.';
        } else {
        echo 'There was a problem sending your email.';
        }
    }
    else{
        echo "failed";
    }


    
?>