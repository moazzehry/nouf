<!-- 
====================================
ملف PHP لمعالجة النماذج
====================================
هذا الملف يوضح كيفية ربط النماذج بـ Backend
يمكن استخدامه مع hosting يدعم PHP
====================================
-->

<?php
// contact-handler.php
// معالج نموذج التواصل

// السماح بـ CORS (إذا كان Frontend على domain مختلف)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// التحقق من طريقة الإرسال
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// استقبال البيانات
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// التحقق من البيانات
$errors = [];

if (empty($name)) {
    $errors[] = 'الاسم مطلوب';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'البريد الإلكتروني غير صحيح';
}

if (empty($phone)) {
    $errors[] = 'رقم الهاتف مطلوب';
}

if (empty($message)) {
    $errors[] = 'الرسالة مطلوبة';
}

// إذا كانت هناك أخطاء
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'يرجى تصحيح الأخطاء التالية',
        'errors' => $errors
    ]);
    exit;
}

// تنظيف البيانات
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// =================================
// الطريقة الأولى: إرسال بريد إلكتروني
// =================================
$to = 'info@lawfirm.com'; // بريد المكتب
$email_subject = "رسالة جديدة من موقع المكتب: $subject";

$email_body = "
<html dir='rtl'>
<head>
    <style>
        body { font-family: Arial, sans-serif; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #C9A961; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1a1a2e; }
        .value { color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>رسالة جديدة من موقع مكتب المحاماة</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>الاسم:</span>
                <span class='value'>$name</span>
            </div>
            <div class='field'>
                <span class='label'>البريد الإلكتروني:</span>
                <span class='value'>$email</span>
            </div>
            <div class='field'>
                <span class='label'>رقم الهاتف:</span>
                <span class='value'>$phone</span>
            </div>
            <div class='field'>
                <span class='label'>الموضوع:</span>
                <span class='value'>$subject</span>
            </div>
            <div class='field'>
                <span class='label'>الرسالة:</span>
                <div class='value'>$message</div>
            </div>
        </div>
    </div>
</body>
</html>
";

$headers = [
    'From: لا-رد <noreply@lawfirm.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/html; charset=UTF-8',
    'MIME-Version: 1.0'
];

$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

// =================================
// الطريقة الثانية: حفظ في قاعدة البيانات
// =================================
/*
// إعدادات قاعدة البيانات
$db_host = 'localhost';
$db_user = 'username';
$db_pass = 'password';
$db_name = 'lawfirm_db';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "INSERT INTO contact_messages (name, email, phone, subject, message, created_at) 
            VALUES (:name, :email, :phone, :subject, :message, NOW())";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':subject' => $subject,
        ':message' => $message
    ]);
    
    $db_saved = true;
} catch (PDOException $e) {
    error_log('Database Error: ' . $e->getMessage());
    $db_saved = false;
}
*/

// =================================
// الطريقة الثالثة: إرسال إلى WhatsApp Business API
// =================================
/*
$whatsapp_number = '966501234567';
$whatsapp_message = urlencode("رسالة جديدة من: $name\nالبريد: $email\nالهاتف: $phone\nالموضوع: $subject\nالرسالة: $message");
$whatsapp_url = "https://api.whatsapp.com/send?phone=$whatsapp_number&text=$whatsapp_message";
// يمكن إرسال طلب HTTP هنا أو حفظ الرابط
*/

// =================================
// الطريقة الرابعة: إرسال إلى Slack/Discord
// =================================
/*
$webhook_url = 'YOUR_WEBHOOK_URL';
$slack_data = json_encode([
    'text' => "رسالة جديدة من موقع المكتب",
    'blocks' => [
        [
            'type' => 'section',
            'text' => [
                'type' => 'mrkdwn',
                'text' => "*رسالة جديدة من موقع مكتب المحاماة*\n\n*الاسم:* $name\n*البريد:* $email\n*الهاتف:* $phone\n*الموضوع:* $subject\n*الرسالة:*\n$message"
            ]
        ]
    ]
]);

$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $slack_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$result = curl_exec($ch);
curl_close($ch);
*/

// =================================
// إرسال الرد
// =================================
if ($mail_sent) {
    // إرسال بريد تأكيد للعميل
    $client_subject = "تأكيد استلام رسالتك - مكتب المحاماة";
    $client_body = "
    <html dir='rtl'>
    <head>
        <style>
            body { font-family: Arial, sans-serif; direction: rtl; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #C9A961; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; line-height: 1.8; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>مكتب المحاماة</h2>
            </div>
            <div class='content'>
                <p>عزيزي/عزيزتي <strong>$name</strong>،</p>
                <p>شكراً لتواصلك معنا. تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <p>فريق عملنا سيتواصل معك خلال 24 ساعة.</p>
                <br>
                <p>مع تحيات،<br><strong>فريق مكتب المحاماة</strong></p>
                <hr>
                <p style='font-size: 12px; color: #666;'>
                    هذا بريد تلقائي، يرجى عدم الرد عليه.
                </p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    mail($email, $client_subject, $client_body, implode("\r\n", $headers));
    
    // إرسال رد نجاح
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
    ]);
} else {
    // إرسال رد فشل
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.'
    ]);
}

// =================================
// تسجيل النشاط (Log)
// =================================
$log_message = date('Y-m-d H:i:s') . " - رسالة جديدة من: $name ($email)\n";
file_put_contents('contact_logs.txt', $log_message, FILE_APPEND);

?>

<!-- 
====================================
كود SQL لإنشاء جدول قاعدة البيانات
====================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'responded') DEFAULT 'new',
    created_at DATETIME NOT NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

====================================
-->

<!-- 
====================================
كود JavaScript لربط النموذج بـ PHP
====================================

// في ملف script.js
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // إظهار حالة التحميل
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('contact-handler.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
            contactForm.reset();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('حدث خطأ في الاتصال بالخادم', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

====================================
-->
