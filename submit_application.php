<?php
// Prevent HTML error output from corrupting JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Catch any unhandled fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        echo json_encode(['status' => 'error', 'message' => 'PHP Fatal Error: ' . $error['message'] . ' in ' . $error['file'] . ' line ' . $error['line']]);
    }
});

// Database connection parameters
$host     = 'localhost';
$dbname   = 'madmonkey_newwebsite';
$username = 'madmonkey_newwebsite';
$password = 'NP!jF;nV07Ya';
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'DB Connection Failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// 1. Sanitize Data
$first_name    = trim($_POST['first_name'] ?? '');
$last_name     = trim($_POST['last_name'] ?? '');
$email         = trim($_POST['email'] ?? '');
$whatsapp      = trim($_POST['whatsapp'] ?? '');
$college_name  = trim($_POST['college_name'] ?? '');
$city          = trim($_POST['city'] ?? '');
$state         = trim($_POST['state'] ?? '');
$degree_stream = trim($_POST['degree_stream'] ?? '');
$year_of_study = trim($_POST['year_of_study'] ?? '');
$reason        = trim($_POST['reason'] ?? '');
$ip_address    = $_SERVER['REMOTE_ADDR'] ?? null;

// Validation
if (empty($first_name) || empty($last_name) || empty($email) || empty($whatsapp) || 
    empty($college_name) || empty($city) || empty($state) || empty($degree_stream) || 
    empty($year_of_study) || empty($reason)) {
    echo json_encode(['status' => 'error', 'message' => 'Please complete all required fields.']);
    exit;
}

try {
    // 2. Insert into MySQL
    $sql = "INSERT INTO campus_director_applications 
            (first_name, last_name, email, whatsapp, college_name, city, state, degree_stream, year_of_study, reason, ip_address) 
            VALUES (:first_name, :last_name, :email, :whatsapp, :college_name, :city, :state, :degree_stream, :year_of_study, :reason, :ip_address)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':first_name'    => $first_name,
        ':last_name'     => $last_name,
        ':email'         => $email,
        ':whatsapp'      => $whatsapp,
        ':college_name'  => $college_name,
        ':city'          => $city,
        ':state'         => $state,
        ':degree_stream' => $degree_stream,
        ':year_of_study' => $year_of_study,
        ':reason'        => $reason,
        ':ip_address'    => $ip_address
    ]);

    // 3. Email Dispatch via Native Mail
    $to      = 'Campus@madmonkey.ai';
    $subject = "New Campus Director Application: $first_name $last_name ($college_name)";
    
    $message = "New Campus Director Application\n";
    $message .= "-----------------------------------\n";
    $message .= "Name: $first_name $last_name\n";
    $message .= "Email: $email\n";
    $message .= "WhatsApp: $whatsapp\n";
    $message .= "College: $college_name\n";
    $message .= "Location: $city, $state\n";
    $message .= "Degree/Stream: $degree_stream\n";
    $message .= "Year: $year_of_study\n\n";
    $message .= "Reason:\n$reason\n";

    $headers = "From: noreply@madmonkey.ai\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    @mail($to, $subject, $message, $headers);

    echo json_encode([
        'status'  => 'success',
        'message' => 'Application submitted successfully! We will reach out on WhatsApp within 48 hours.'
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database SQL Error: ' . $e->getMessage()]);
}