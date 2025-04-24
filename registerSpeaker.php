<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize form data
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST['phone']));
    $topic   = htmlspecialchars(trim($_POST['topic']));
    $about   = htmlspecialchars(trim($_POST['about']));

    // Validate required fields
    if (!$name || !$email || !$phone || !$topic || !$about) {
        echo "Please fill out all fields correctly.";
        exit;
    }

    // Email configuration
    $to      = "contact@tedxdwpsludhianayouth.com";  // 🔴 Replace with your email
    $subject = "New Speaker Registration - TEDx DWPS Ludhiana Youth";
    $message = "
        <h2>New Speaker Registration</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Topic:</strong> $topic</p>
        <p><strong>About:</strong><br>$about</p>
    ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: TEDx Website <no-reply@tedxdwpsludhianayouth.com>"; // ✅ Replace with domain-based email

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Nomination successful! Thank you for nominating. We'll get back to you!";
    } else {
        echo "Something went wrong. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
