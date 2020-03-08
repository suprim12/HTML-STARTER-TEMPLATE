<?php
// $to = ;
function checkfield($var)
{
    $var = trim($var);
    $var = htmlspecialchars($var);
    $var = stripslashes($var);
    return $var;
}
if (!empty($_POST['name']) && !empty($_POST['email'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    var_dump($name,$email);
    $name = checkfield($name);
    $email = checkfield($email);

    $subject = "Send from Isolution";
    $txt =  "Name:" . $name . "\n" . "Email:" . $email;
    $headers = "From: mail@isntc.com.np" . "\r\n" .
        "CC: abishkar@gmail.com";

    mail("mail@isntc.com.np", $subject, $txt, $headers);
}
