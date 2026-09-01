<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Unhandled PHP error handler
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        echo json_encode(['status' => 'error', 'message' => 'PHP Error: ' . $error['message']]);
    }
});

// Database connection

require_once 'db.php';

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

// Parse JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['status' => 'error', 'message' => 'No data payload received.']);
    exit;
}

$category  = trim($input['category'] ?? 'College');
$idea      = trim($input['idea'] ?? '');
$problem   = trim($input['problem'] ?? '');
$track     = trim($input['track'] ?? '');
$sector    = trim($input['sector'] ?? '');
$college   = trim($input['college'] ?? '');
$teammates = $input['teammates'] ?? [];
$ip_address = $_SERVER['REMOTE_ADDR'] ?? null;

// Validation
if (empty($idea) || empty($problem) || empty($track) || empty($sector) || empty($college)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required before submitting.']);
    exit;
}

try {
    $sql = "INSERT INTO venture_submissions 
            (category, idea, problem, track, sector, college, teammates, ip_address) 
            VALUES (:category, :idea, :problem, :track, :sector, :college, :teammates, :ip_address)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':category'   => $category,
        ':idea'       => $idea,
        ':problem'    => $problem,
        ':track'      => $track,
        ':sector'     => $sector,
        ':college'    => $college,
        ':teammates'  => json_encode($teammates),
        ':ip_address' => $ip_address
    ]);

    echo json_encode([
        'status'  => 'success',
        'message' => 'Idea submitted successfully.'
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database SQL Error: ' . $e->getMessage()]);
}