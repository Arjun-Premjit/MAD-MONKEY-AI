<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    die("Unauthorized access.");
}

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=Venture_Submissions_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');

// Column Headers
fputcsv($output, ['ID', 'Category', 'Idea Name', 'Problem Statement', 'Track', 'Sector', 'College', 'Teammates', 'Status', 'IP Address', 'Submitted Date']);

$stmt = $pdo->query("SELECT id, category, idea, problem, track, sector, college, teammates, status, ip_address, created_at FROM venture_submissions ORDER BY id DESC");

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Format teammates JSON array into a readable comma-separated string
    $teammatesList = json_decode($row['teammates'], true);
    $row['teammates'] = is_array($teammatesList) ? implode(', ', $teammatesList) : '';
    
    fputcsv($output, $row);
}

fclose($output);
exit;