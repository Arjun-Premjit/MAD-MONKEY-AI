<?php
session_start();
require_once 'db.php';

// Auth Guard
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit;
}

// Active Section (default: director)
$section = $_GET['section'] ?? 'director';

// Search & Pagination Parameters
$search = trim($_GET['search'] ?? '');
$page   = max(1, intval($_GET['page'] ?? 1));
$limit  = 10;
$offset = ($page - 1) * $limit;

// --- DIRECTORS DATA METRICS ---
$total_directors = $pdo->query("SELECT COUNT(*) FROM campus_director_applications")->fetchColumn();
$director_colleges = $pdo->query("SELECT COUNT(DISTINCT college_name) FROM campus_director_applications")->fetchColumn();

// --- VENTURES DATA METRICS ---
$total_ventures  = $pdo->query("SELECT COUNT(*) FROM venture_submissions")->fetchColumn();
$venture_colleges = $pdo->query("SELECT COUNT(DISTINCT college) FROM venture_submissions")->fetchColumn();

// Fetch Data Based on Active Section
if ($section === 'venture') {
    $query = "SELECT * FROM venture_submissions WHERE 1=1";
    $params = [];
    if (!empty($search)) {
        $query .= " AND (idea LIKE :s OR problem LIKE :s OR college LIKE :s OR track LIKE :s OR sector LIKE :s)";
        $params[':s'] = "%$search%";
    }
    
    $countStmt = $pdo->prepare($query);
    $countStmt->execute($params);
    $filtered_total = $countStmt->rowCount();
    $total_pages    = ceil($filtered_total / $limit);

    $query .= " ORDER BY id DESC LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($query);
    foreach ($params as $k => $v) { $stmt->bindValue($k, $v); }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $ventures = $stmt->fetchAll();
} else {
    // Campus Director Data
    $query = "SELECT * FROM campus_director_applications WHERE 1=1";
    $params = [];
    if (!empty($search)) {
        $query .= " AND (first_name LIKE :s OR last_name LIKE :s OR college_name LIKE :s OR email LIKE :s)";
        $params[':s'] = "%$search%";
    }

    $countStmt = $pdo->prepare($query);
    $countStmt->execute($params);
    $filtered_total = $countStmt->rowCount();
    $total_pages    = ceil($filtered_total / $limit);

    $query .= " ORDER BY id DESC LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($query);
    foreach ($params as $k => $v) { $stmt->bindValue($k, $v); }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $directors = $stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portal | Mad Monkey AI</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <style>
    body { background-color: #f8f9fa; }
    .fs-7 { font-size: 0.875rem; }
    .fs-8 { font-size: 0.75rem; }
    .bg-purple-subtle { background-color: #f3e8ff; color: #7e22ce; }
    .nav-pills .nav-link.active { background: linear-gradient(135deg, #7e22ce 0%, #ec4899 100%); font-weight: bold; }
  </style>
</head>
<body>

  <!-- HEADER NAVBAR -->
  <nav class="navbar navbar-expand-lg bg-white border-bottom py-3">
    <div class="container-fluid px-4">
      <span class="navbar-brand fw-bold fs-5">mad <span style="color: #ec4899;">monkey ai</span> <small class="text-muted fs-7 fw-normal">| Admin Portal</small></span>
      <div class="d-flex align-items-center gap-3">
        <span class="fs-7 fw-medium text-secondary">👤 <?= htmlspecialchars($_SESSION['admin_name'] ?? 'Admin') ?></span>
        <a href="admin_logout.php" class="btn btn-outline-danger btn-sm rounded-pill px-3">Logout</a>
      </div>
    </div>
  </nav>

  <div class="container-fluid px-4 py-4">

    <!-- NAVIGATION TABS FOR SECTIONS -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <ul class="nav nav-pills bg-white p-1 rounded-pill shadow-sm border">
        <li class="nav-item">
          <a class="nav-link rounded-pill px-4 fs-7 <?= $section === 'director' ? 'active' : 'text-dark' ?>" href="?section=director">
            Campus Directors (<?= $total_directors ?>)
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link rounded-pill px-4 fs-7 <?= $section === 'venture' ? 'active' : 'text-dark' ?>" href="?section=venture">
             Venture Submissions (<?= $total_ventures ?>)
          </a>
        </li>
      </ul>
    </div>

    <?php if ($section === 'director'): ?>
      <!-- =================================================== -->
      <!-- SECTION 1: CAMPUS DIRECTOR APPLICANTS              -->
      <!-- =================================================== -->
      
      <!-- METRICS -->
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
            <div class="text-muted fs-8 fw-bold text-uppercase">Total Director Applicants</div>
            <div class="display-6 fw-bold text-dark mb-0"><?= $total_directors ?></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
            <div class="text-muted fs-8 fw-bold text-uppercase">Unique Colleges</div>
            <div class="display-6 fw-bold" style="color: #7e22ce;"><?= $director_colleges ?></div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER -->
      <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <form method="GET" class="d-flex gap-2" style="max-width: 380px; width: 100%;">
            <input type="hidden" name="section" value="director">
            <input type="text" name="search" class="form-control rounded-3 py-2 fs-7" placeholder="Search name, email, or college..." value="<?= htmlspecialchars($search) ?>">
            <button type="submit" class="btn btn-dark rounded-3 px-3 fs-7">Search</button>
          </form>
          <a href="export_csv.php" class="btn btn-success rounded-pill px-4 fs-7 fw-bold">
            <i class="bi bi-file-earmark-excel me-1"></i> Export Directors CSV
          </a>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light fs-8 text-uppercase text-muted">
              <tr>
                <th>ID</th>
                <th>Applicant Name</th>
                <th>Contact Details</th>
                <th>College & Location</th>
                <th>Stream / Year</th>
                <th>Motivation Statement</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody class="fs-7">
              <?php if (count($directors) > 0): ?>
                <?php foreach ($directors as $app): ?>
                  <tr>
                    <td class="fw-bold">#<?= $app['id'] ?></td>
                    <td class="fw-bold text-dark"><?= htmlspecialchars($app['first_name'] . ' ' . $app['last_name']) ?></td>
                    <td>
                      <div><i class="bi bi-envelope me-1 text-muted"></i><?= htmlspecialchars($app['email']) ?></div>
                      <div><i class="bi bi-whatsapp me-1 text-success"></i><?= htmlspecialchars($app['whatsapp']) ?></div>
                    </td>
                    <td>
                      <div class="fw-semibold text-dark"><?= htmlspecialchars($app['college_name']) ?></div>
                      <div class="text-muted fs-8"><?= htmlspecialchars($app['city'] . ', ' . $app['state']) ?></div>
                    </td>
                    <td>
                      <div><?= htmlspecialchars($app['degree_stream']) ?></div>
                      <span class="badge bg-light text-dark border fs-8"><?= htmlspecialchars($app['year_of_study']) ?></span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-link text-decoration-none p-0 fw-semibold text-purple" data-bs-toggle="modal" data-bs-target="#reasonModal<?= $app['id'] ?>">
                        View Statement
                      </button>

                      <div class="modal fade" id="reasonModal<?= $app['id'] ?>" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content rounded-4 border-0 p-3">
                            <div class="modal-header border-0">
                              <h6 class="modal-title fw-bold"><?= htmlspecialchars($app['first_name']) ?>'s Statement</h6>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-secondary fs-7">
                              <?= nl2br(htmlspecialchars($app['reason'])) ?>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-muted fs-8"><?= date('M d, Y h:i A', strtotime($app['created_at'])) ?></td>
                  </tr>
                <?php endforeach; ?>
              <?php else: ?>
                <tr><td colspan="7" class="text-center py-4 text-muted">No applicants found.</td></tr>
              <?php endif; ?>
            </tbody>
          </table>
        </div>

        <?php if ($total_pages > 1): ?>
          <div class="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
            <span class="text-muted fs-8">Showing Page <?= $page ?> of <?= $total_pages ?></span>
            <ul class="pagination pagination-sm mb-0">
              <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <li class="page-item <?= $i == $page ? 'active' : '' ?>">
                  <a class="page-link" href="?section=director&page=<?= $i ?>&search=<?= urlencode($search) ?>"><?= $i ?></a>
                </li>
              <?php endfor; ?>
            </ul>
          </div>
        <?php endif; ?>
      </div>

    <?php else: ?>
      <!-- =================================================== -->
      <!-- SECTION 2: VENTURE SUBMISSIONS                     -->
      <!-- =================================================== -->
      
      <!-- METRICS -->
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
            <div class="text-muted fs-8 fw-bold text-uppercase">Total Ventures Submitted</div>
            <div class="display-6 fw-bold text-dark mb-0"><?= $total_ventures ?></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
            <div class="text-muted fs-8 fw-bold text-uppercase">Participating Colleges</div>
            <div class="display-6 fw-bold" style="color: #7e22ce;"><?= $venture_colleges ?></div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER -->
      <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <form method="GET" class="d-flex gap-2" style="max-width: 380px; width: 100%;">
            <input type="hidden" name="section" value="venture">
            <input type="text" name="search" class="form-control rounded-3 py-2 fs-7" placeholder="Search idea, problem, sector, or college..." value="<?= htmlspecialchars($search) ?>">
            <button type="submit" class="btn btn-dark rounded-3 px-3 fs-7">Search</button>
          </form>
          <a href="export_ventures_csv.php" class="btn btn-success rounded-pill px-4 fs-7 fw-bold">
            <i class="bi bi-file-earmark-excel me-1"></i> Export Ventures CSV
          </a>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light fs-8 text-uppercase text-muted">
              <tr>
                <th>ID</th>
                <th>Venture Idea</th>
                <th>Track & Sector</th>
                <th>College & Category</th>
                <th>Teammates</th>
                <th>Status</th>
                <th>Submitted Date</th>
              </tr>
            </thead>
            <tbody class="fs-7">
              <?php if (count($ventures) > 0): ?>
                <?php foreach ($ventures as $v): ?>
                  <?php $teammates = json_decode($v['teammates'], true) ?: []; ?>
                  <tr>
                    <td class="fw-bold">#<?= $v['id'] ?></td>
                    <td>
                      <div class="fw-bold text-dark mb-0"><?= htmlspecialchars($v['idea']) ?></div>
                      <button class="btn btn-sm btn-link text-decoration-none p-0 fs-8 fw-semibold text-purple" data-bs-toggle="modal" data-bs-target="#problemModal<?= $v['id'] ?>">
                        View Problem Statement
                      </button>

                      <div class="modal fade" id="problemModal<?= $v['id'] ?>" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content rounded-4 border-0 p-3">
                            <div class="modal-header border-0">
                              <h6 class="modal-title fw-bold"><?= htmlspecialchars($v['idea']) ?></h6>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-secondary fs-7">
                              <div class="fw-bold text-dark fs-8 text-uppercase mb-1">Problem Statement:</div>
                              <?= nl2br(htmlspecialchars($v['problem'])) ?>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="fw-semibold text-dark"><?= htmlspecialchars($v['track']) ?></div>
                      <span class="badge bg-purple-subtle border fs-8 rounded-pill"><?= htmlspecialchars($v['sector']) ?></span>
                    </td>
                    <td>
                      <div class="fw-semibold text-dark"><?= htmlspecialchars($v['college']) ?></div>
                      <span class="badge bg-light text-dark border fs-8"><?= htmlspecialchars($v['category']) ?></span>
                    </td>
                    <td>
                      <?php if (count($teammates) > 0): ?>
                        <span class="badge bg-secondary rounded-pill mb-1"><?= count($teammates) ?> Teammates</span>
                        <div class="fs-8 text-muted"><?= htmlspecialchars(implode(', ', $teammates)) ?></div>
                      <?php else: ?>
                        <span class="text-muted fs-8">Solo Founder</span>
                      <?php endif; ?>
                    </td>
                    <td>
                      <span class="badge bg-warning text-dark border rounded-pill fs-8">
                        <?= htmlspecialchars($v['status']) ?>
                      </span>
                    </td>
                    <td class="text-muted fs-8"><?= date('M d, Y h:i A', strtotime($v['created_at'])) ?></td>
                  </tr>
                <?php endforeach; ?>
              <?php else: ?>
                <tr><td colspan="7" class="text-center py-4 text-muted">No venture submissions found.</td></tr>
              <?php endif; ?>
            </tbody>
          </table>
        </div>

        <?php if ($total_pages > 1): ?>
          <div class="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
            <span class="text-muted fs-8">Showing Page <?= $page ?> of <?= $total_pages ?></span>
            <ul class="pagination pagination-sm mb-0">
              <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <li class="page-item <?= $i == $page ? 'active' : '' ?>">
                  <a class="page-link" href="?section=venture&page=<?= $i ?>&search=<?= urlencode($search) ?>"><?= $i ?></a>
                </li>
              <?php endfor; ?>
            </ul>
          </div>
        <?php endif; ?>
      </div>

    <?php endif; ?>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>