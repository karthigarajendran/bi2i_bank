<?php 
$to = 'chauhanjeet3@gmail.com'; // Put in your email address here
$subject  = "Borrow Loan - Newsletter Form Data"; // The default subject. Will appear by default in all messages. Change this if you want.

// User info (DO NOT EDIT!)
$newsletteremail = stripslashes($_REQUEST['newsletteremail']); // sender's name

// The message you will receive in your mailbox
// Each parts are commented to help you understand what it does exaclty.
// YOU DON'T NEED TO EDIT IT BELOW BUT IF YOU DO, DO IT WITH CAUTION!
$msg .= "Newsletter Email: ".$newsletteremail."\r\n\n";  // add sender's name to the message
$msg .= "\r\n\n"; 

$mail = @mail($to, $subject, $msg, "From:".$email);  // This command sends the e-mail to the e-mail address contained in the $to variable

if($mail) {
	header("Location:index.html");	
} else {
	echo 'Message could not be sent!';   //This is the message that will be shown when an error occured: the message was not send
}

?>