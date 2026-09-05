<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    die("Unauthorized access.");
}

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=Campus_Director_Applications_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');

// Column Headers
fputcsv($output, ['ID', 'First Name', 'Last Name', 'Email', 'WhatsApp', 'College Name', 'City', 'State', 'Degree/Stream', 'Year of Study', 'Reason', 'IP Address', 'Date Submitted']);

$stmt = $pdo->query("SELECT id, first_name, last_name, email, whatsapp, college_name, city, state, degree_stream, year_of_study, reason, ip_address, created_at FROM campus_director_applications ORDER BY id DESC");

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}

fclose($output);
exit;