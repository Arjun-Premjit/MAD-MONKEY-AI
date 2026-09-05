<?php
session_start();
require_once 'db.php';

// Redirect if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: admin_dashboard.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!empty($email) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id']        = $admin['id'];
            $_SESSION['admin_name']      = $admin['name'];
            
            header('Location: admin_dashboard.php');
            exit;
        } else {
            $error = 'Invalid email or password.';
        }
    } else {
        $error = 'Please fill in all fields.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--  <?php echo password_hash('Admin@123', PASSWORD_BCRYPT);?>-->
  <title>Admin Login | Mad Monkey AI</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center min-vh-100">

  <div class="card border-0 shadow-lg rounded-4 p-4 p-md-5" style="max-width: 420px; width: 100%; background: #ffffff;">
    <div class="text-center mb-4">
      <h4 class="fw-bold mb-1">mad <span style="color: #ec4899;">monkey ai</span></h4>
      <p class="text-muted fs-7">Campus Director Portal Admin</p>
    </div>

    <?php if ($error): ?>
      <div class="alert alert-danger py-2 fs-7 rounded-3"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="">
      <div class="mb-3">
        <label class="form-label fw-semibold fs-7">Admin Email</label>
        <input type="email" name="email" class="form-control rounded-3 py-2" placeholder="admin@madmonkey.ai" required>
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold fs-7">Password</label>
        <input type="password" name="password" class="form-control rounded-3 py-2" placeholder="••••••••" required>
      </div>

      <button type="submit" class="btn text-white w-100 rounded-pill py-2.5 fw-bold shadow-sm" style="background: linear-gradient(135deg, #7e22ce 0%, #ec4899 100%);">
        Sign In ➔
      </button>
    </form>
  </div>

</body>
</html>