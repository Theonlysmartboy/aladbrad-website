<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form data
    $name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8');
    $service = htmlspecialchars(trim($_POST['service']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
    
    // Validate required fields
    $errors = [];
    if (empty($name)) $errors[] = 'Name is required';
    if (empty($email)) $errors[] = 'Email is required';
    if (empty($phone)) $errors[] = 'Phone is required';
    if (empty($service)) $errors[] = 'Service is required';
    if (empty($message)) $errors[] = 'Message is required';
    
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }
    
    // Email configuration
    $to = 'info@adalbrad.co.ke';
    $subject = 'New Service Inquiry: ' . $service;
    
    // HTML Email content
    $email_content = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a73e8; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #1a73e8; }
            .label { font-weight: bold; color: #1a73e8; display: block; margin-bottom: 5px; }
            .value { color: #555; }
            .message { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Service Inquiry from Adalbrad Website</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span>
                    <span class='value'>$name</span>
                </div>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>$email</span>
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span>
                    <span class='value'>$phone</span>
                </div>
                <div class='field'>
                    <span class='label'>Service:</span>
                    <span class='value'>$service</span>
                </div>
                <div class='field'>
                    <span class='label'>Message:</span>
                    <div class='message'>$message</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers for HTML
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: Adalbrad Website <noreply@adalbrad.co.ke>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Return-Path: info@adalbrad.co.ke'
    ];
    
    // Send email
    $mail_sent = mail($to, $subject, $email_content, implode("\r\n", $headers));
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.']);
    } else {
        // Log error for debugging
        error_log("Failed to send email to: $to from: $email");
        echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at info@adalbrad.co.ke']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Please try again.']);
}
?>