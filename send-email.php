<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // If using Composer

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);
    try {
        $smtpHost = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $smtpUsername = $_ENV['SMTP_USERNAME'];
        $smtpPassword = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $smtpPort = $_ENV['SMTP_PORT'];

        $mail->setFrom('contact@tedxdwpsludhianayouth.com', 'Website Contact Form');
        $mail->addAddress('contact@tedxdwpsludhianayouth.com'); // Send to yourself

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
            <strong>Name:</strong> {$name}<br>
            <strong>Email:</strong> {$email}<br>
            <strong>Message:</strong><br>{$message}
        ";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>