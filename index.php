<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TID - Sistem Analisis Talent Identification Sekolah Rendah</title>
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- html2pdf.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <!-- Custom Style Sheet -->
    <link rel="stylesheet" href="style.css?v=<?= time() ?>">
</head>
<body>

    <!-- Halaman Log Masuk (Login Screen) -->
    <div id="login-screen">
        <div class="login-wrapper">
            <div class="login-header">
                <i class="fa-solid fa-medal login-logo"></i>
                <h1>Sistem TID Sekolah Rendah</h1>
                <p>Talent Identification & Fitness Analysis System</p>
            </div>
            
            <div class="login-card card">
                <h3 style="text-align: center; margin-bottom: 2rem; font-family: var(--font-outfit);">Pilih Peranan Anda</h3>
                
                <div class="role-cards-grid">
                    <!-- Admin Card -->
                    <div class="role-card" data-role="Admin">
                        <i class="fa-solid fa-user-shield role-card-icon" style="color: var(--accent-primary);"></i>
                        <h4>Administrator</h4>
                        <p>Akses Penuh</p>
                    </div>
                    <!-- Teacher Card -->
                    <div class="role-card" data-role="Cikgu">
                        <i class="fa-solid fa-user-tie role-card-icon" style="color: var(--accent-purple);"></i>
                        <h4>Guru / Jurulatih</h4>
                        <p>Daftar & Rekod Skor</p>
                    </div>
                    <!-- Student Card -->
                    <div class="role-card" data-role="Anak Murid">
                        <i class="fa-solid fa-graduation-cap role-card-icon" style="color: var(--accent-pink);"></i>
                        <h4>Anak Murid</h4>
                        <p>Lihat Laporan Saya</p>
                    </div>
                </div>

                <form id="login-form" style="display: none; margin-top: 2.5rem;">
                    <input type="hidden" id="login-selected-role">
                    
                    <!-- Username Field (Hidden by default, shown for Cikgu) -->
                    <div class="form-group" id="login-username-group" style="margin-bottom: 1.5rem; display: none;">
                        <label for="login-username" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">ID Pengguna / E-mel</label>
                        <input type="text" id="login-username" class="form-control" placeholder="Masukkan ID Pengguna...">
                    </div>
                    
                    <div class="form-group" id="login-passcode-group" style="margin-bottom: 1.5rem;">
                        <label for="login-passcode" id="passcode-label" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Kata Laluan</label>
                        <input type="password" id="login-passcode" class="form-control" placeholder="Masukkan kata laluan...">
                        <p id="login-error-msg" style="color: var(--color-danger); font-size: 0.8rem; margin-top: 0.5rem; display: none;">Kata laluan salah. Sila cuba lagi.</p>
                    </div>
                    
                    <!-- Register Link (Only shown for Cikgu role selection) -->
                    <div id="register-teacher-link-container" style="margin-bottom: 1.5rem; text-align: center; display: none;">
                        <a href="javascript:void(0)" id="btn-show-teacher-register" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--accent-purple); text-decoration: none; font-weight: 500;">
                            <i class="fa-solid fa-user-plus" style="margin-right: 0.25rem;"></i> Belum berdaftar? Daftar Akaun Cikgu Baharu
                        </a>
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" id="btn-login-back" style="flex: 1; justify-content: center;">Kembali</button>
                        <button type="submit" class="btn btn-primary" style="flex: 1; justify-content: center;"><i class="fa-solid fa-right-to-bracket"></i> Log Masuk</button>
                    </div>
                </form>

                <!-- Teacher Registration Form (Hidden by default) -->
                <form id="teacher-register-form" style="display: none; margin-top: 2.5rem;">
                    <h4 style="text-align: center; margin-bottom: 1.5rem; font-family: var(--font-outfit); color: var(--accent-purple); font-size: 1.2rem; font-weight: 600;">
                        <i class="fa-solid fa-user-tie"></i> Daftar Cikgu Baharu
                    </h4>
                    
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label for="reg-t-name" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Nama Penuh</label>
                        <input type="text" id="reg-t-name" class="form-control" placeholder="Contoh: Cikgu Rohana" required>
                    </div>
                    
                    <div class="form-grid" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="reg-t-username" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">ID Pengguna / E-mel</label>
                            <input type="text" id="reg-t-username" class="form-control" placeholder="Contoh: rohana123" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-t-phone" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Nombor Telefon</label>
                            <input type="text" id="reg-t-phone" class="form-control" placeholder="Contoh: 0123456789">
                        </div>
                    </div>
                    
                    <div class="form-grid" style="margin-bottom: 1.5rem;">
                        <div class="form-group">
                            <label for="reg-t-school" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Sekolah</label>
                            <input type="text" id="reg-t-school" class="form-control" value="SK Taman Tun Dr Ismail" placeholder="Nama sekolah...">
                        </div>
                        <div class="form-group">
                            <label for="reg-t-passcode" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Kata Laluan</label>
                            <input type="password" id="reg-t-passcode" class="form-control" placeholder="Masukkan kata laluan..." required>
                        </div>
                    </div>
                    
                    <p id="reg-t-error-msg" style="color: var(--color-danger); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;"></p>
                    <p id="reg-t-success-msg" style="color: var(--color-success); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;">Pendaftaran berjaya! Sila log masuk.</p>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" id="btn-reg-t-back" style="flex: 1; justify-content: center;">Kembali</button>
                        <button type="submit" class="btn btn-primary" style="flex: 1; justify-content: center; background: var(--accent-purple); border-color: var(--accent-purple); box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-user-plus"></i> Daftar Guru</button>
                    </div>
                </form>
            </div>
            
            <div class="login-footer">
                <p>SK Taman Tun Dr Ismail &bull; &copy; 2026 Penganalisis TID</p>
            </div>
        </div>
    </div>

    <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="brand">
                <i class="fa-solid fa-medal brand-icon"></i>
                <h2>TID Analyst</h2>
            </div>
            
            <ul class="menu-list">
                <li class="menu-item active" data-tab="dashboard">
                    <a href="javascript:void(0)"><i class="fa-solid fa-chart-pie"></i><span>Dashboard</span></a>
                </li>
                <li class="menu-item" data-tab="students">
                    <a href="javascript:void(0)"><i class="fa-solid fa-users"></i><span>Senarai Atlet</span></a>
                </li>
                <li class="menu-item" data-tab="register">
                    <a href="javascript:void(0)"><i class="fa-solid fa-user-plus"></i><span>Daftar Atlet</span></a>
                </li>
                <li class="menu-item" data-tab="record">
                    <a href="javascript:void(0)"><i class="fa-solid fa-file-signature"></i><span>Rekod Skor</span></a>
                </li>
                <li class="menu-item" data-tab="analytics">
                    <a href="javascript:void(0)"><i class="fa-solid fa-chart-line"></i><span>Analitis Kumpulan</span></a>
                </li>
                <li class="menu-item" data-tab="teachers">
                    <a href="javascript:void(0)"><i class="fa-solid fa-chalkboard-user"></i><span>Urus Cikgu</span></a>
                </li>
                <li class="menu-item" style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <a href="javascript:void(0)" onclick="handleLogout()" style="color: #f87171;"><i class="fa-solid fa-right-from-bracket" style="color: #f87171;"></i><span>Log Keluar</span></a>
                </li>
            </ul>
            
            <div class="sidebar-footer">
                <p>TID Sekolah Rendah v1.0</p>
                <p>&copy; 2026 Penganalisis TID</p>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- DASHBOARD TAB -->
            <section id="dashboard" class="tab-content active">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Papan Pemuka TID</h1>
                        <p>Analisis bakat dan kecergasan murid sekolah rendah secara keseluruhan.</p>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="stats-grid">
                    <div class="card stat-card">
                        <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-total-students">0</h3>
                            <p>Jumlah Murid</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #60a5fa;"><i class="fa-solid fa-mars"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-boys">0</h3>
                            <p>Murid Lelaki</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #f472b6;"><i class="fa-solid fa-venus"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-girls">0</h3>
                            <p>Murid Perempuan</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #34d399;"><i class="fa-solid fa-heart-pulse"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-avg-fitness">N/A</h3>
                            <p>Kecergasan Purata</p>
                        </div>
                    </div>
                </div>

                <!-- Dashboard Content Rows -->
                <div class="visuals-grid" style="margin-bottom: 2rem;">
                    <!-- Left: Latest students -->
                    <div class="card" style="padding: 1.5rem;">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Pendaftaran Terkini</h3>
                        <div class="table-responsive">
                            <table class="custom-table" id="dashboard-recent-table">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Kelas</th>
                                        <th>Jantina</th>
                                        <th>BMI</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5" style="text-align: center; color: var(--text-muted);">Tiada data atlet direkodkan.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- Right: Sports Breakdown -->
                    <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-trophy" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Agihan Bakat Utama</h3>
                        <div class="chart-container" style="min-height: 250px;">
                            <canvas id="dashboardBakatChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SENARAI ATLET TAB -->
            <section id="students" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Senarai Atlet</h1>
                        <p>Pengurusan data profil dan markah atlet TID.</p>
                    </div>
                </div>

                <div class="card table-card">
                    <div class="table-header-bar">
                        <div class="table-search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="search-student" placeholder="Cari nama atlet...">
                        </div>
                        <div>
                            <button class="btn btn-primary" onclick="switchTab('register')">
                                <i class="fa-solid fa-plus"></i>Tambah Atlet
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="custom-table" id="students-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Sekolah / Kelas</th>
                                    <th>Umur / Jantina</th>
                                    <th>BMI</th>
                                    <th>Kecergasan</th>
                                    <th>Bakat Utama</th>
                                    <th>Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                                        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; display: block; margin-bottom: 1rem;"></i>
                                        Memuatkan data murid...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- DAFTAR ATLET TAB -->
            <section id="register" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Daftar Murid Baharu</h1>
                        <p>Lengkapkan maklumat peribadi atlet bagi pendaftaran profil TID.</p>
                    </div>
                </div>

                <div class="card" style="max-width: 800px; margin: 0 auto;">
                    <form id="register-form">
                        <div class="form-grid">
                            <div class="form-group" style="grid-column: span 2;">
                                <label for="reg-name">Nama Penuh Murid</label>
                                <input type="text" id="reg-name" class="form-control" placeholder="Contoh: Muhammad Ali Bin Ahmad" required>
                            </div>
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="reg-gender">Jantina</label>
                                <select id="reg-gender" class="form-control" required>
                                    <option value="" disabled selected>Pilih Jantina</option>
                                    <option value="Lelaki">Lelaki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="reg-age">Umur (Tahun)</label>
                                <input type="number" id="reg-age" class="form-control" min="7" max="12" placeholder="Contoh: 10" required>
                            </div>
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="reg-school">Sekolah</label>
                                <input type="text" id="reg-school" class="form-control" placeholder="Contoh: SK Taman Tun Dr Ismail" value="SK Taman Tun Dr Ismail">
                            </div>
                            <div class="form-group">
                                <label for="reg-class">Tahun / Kelas</label>
                                <input type="text" id="reg-class" class="form-control" placeholder="Contoh: 4 Cerdik" required>
                            </div>
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="reg-height">Tinggi (cm)</label>
                                <input type="number" step="0.1" id="reg-height" class="form-control" placeholder="Contoh: 135.5" required>
                            </div>
                            <div class="form-group">
                                <label for="reg-weight">Berat (kg)</label>
                                <input type="number" step="0.1" id="reg-weight" class="form-control" placeholder="Contoh: 32.4" required>
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;">
                            <button type="button" class="btn btn-secondary" onclick="switchTab('students')">Batal</button>
                            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i>Daftar Murid</button>
                        </div>
                    </form>
                </div>
            </section>

            <!-- REKOD SKOR TAB -->
            <section id="record" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Merekod Skor Ujian TID</h1>
                        <p>Masukkan catatan bagi setiap percubaan komponen ujian fizikal murid.</p>
                    </div>
                </div>

                <!-- Athlete Selection Banner -->
                <div id="no-athlete-selected" class="card empty-state" style="margin-bottom: 2rem;">
                    <div class="empty-state-icon"><i class="fa-solid fa-user-check"></i></div>
                    <h3>Sila Pilih Atlet</h3>
                    <p>Sila pergi ke menu <strong>Senarai Atlet</strong> dan klik butang <strong>Masukkan Skor</strong> untuk mula memasukkan keputusan ujian murid.</p>
                    <button class="btn btn-primary" onclick="switchTab('students')">Pergi ke Senarai Atlet</button>
                </div>

                <div id="athlete-selected-area" style="display: none;">
                    <div class="athlete-selection-banner">
                        <div>
                            <span style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Merekodkan Skor Untuk:</span>
                            <h3 id="record-athlete-name" style="color: #fff; margin-top: 0.25rem;">-</h3>
                            <p id="record-athlete-meta" style="font-size: 0.9rem; color: var(--accent-primary);">-</p>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="switchTab('students')">
                            <i class="fa-solid fa-arrows-rotate"></i> Tukar Atlet
                        </button>
                    </div>

                    <form id="scores-form">
                        <input type="hidden" id="score-student-id">
                        
                        <div class="scores-section-grid">
                            <!-- Sit & Reach (3x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-child"></i>Sit & Reach</h4>
                                    <span class="badge badge-fitness">Kelenturan (cm)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="sr-t1">Cuba 1</label>
                                        <input type="number" step="0.1" id="sr-t1" class="form-control" placeholder="-">
                                    </div>
                                    <div class="trial-field">
                                        <label for="sr-t2">Cuba 2</label>
                                        <input type="number" step="0.1" id="sr-t2" class="form-control" placeholder="-">
                                    </div>
                                    <div class="trial-field">
                                        <label for="sr-t3">Cuba 3</label>
                                        <input type="number" step="0.1" id="sr-t3" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>

                            <!-- 30s Sit-up (2x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-person-running"></i>30s Sit-Up</h4>
                                    <span class="badge badge-fitness">Daya Tahan Otot (Kali)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="su-t1">Cuba 1</label>
                                        <input type="number" id="su-t1" class="form-control" placeholder="-">
                                    </div>
                                    <div class="trial-field">
                                        <label for="su-t2">Cuba 2</label>
                                        <input type="number" id="su-t2" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>

                            <!-- Standing Long Jump (2x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-arrow-up-right-dots"></i>Standing Long Jump</h4>
                                    <span class="badge badge-fitness">Kuasa Kaki (cm)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="lj-t1">Cuba 1</label>
                                        <input type="number" step="0.1" id="lj-t1" class="form-control" placeholder="-">
                                    </div>
                                    <div class="trial-field">
                                        <label for="lj-t2">Cuba 2</label>
                                        <input type="number" step="0.1" id="lj-t2" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>

                            <!-- 10m Sprint (1x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-stopwatch"></i>10m Sprint</h4>
                                    <span class="badge badge-fitness">Kelajuan (Saat)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="sp-t1">Cuba 1</label>
                                        <input type="number" step="0.01" id="sp-t1" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>

                            <!-- 10m Shuttle Run (2x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-shuffle"></i>10m Shuttle Run</h4>
                                    <span class="badge badge-fitness">Ketangkasan (Saat)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="sr-run-t1">Cuba 1</label>
                                        <input type="number" step="0.01" id="sr-run-t1" class="form-control" placeholder="-">
                                    </div>
                                    <div class="trial-field">
                                        <label for="sr-run-t2">Cuba 2</label>
                                        <input type="number" step="0.01" id="sr-run-t2" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>

                            <!-- Hand Eye Coordination (1x) -->
                            <div class="test-component-card">
                                <div class="test-header">
                                    <h4><i class="fa-solid fa-eye"></i>Hand-Eye Coordination</h4>
                                    <span class="badge badge-fitness">Koordinasi (Tangkapan/30s)</span>
                                </div>
                                <div class="trials-inputs">
                                    <div class="trial-field">
                                        <label for="he-t1">Tangkapan</label>
                                        <input type="number" id="he-t1" class="form-control" placeholder="-">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
                            <button type="button" class="btn btn-secondary" onclick="switchTab('students')">Batal</button>
                            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-check"></i>Simpan & Analisis</button>
                        </div>
                    </form>
                </div>
            </section>

            <!-- PROFIL INDIVIDU & LAPORAN (DYNAMIC VIEW) -->
            <section id="profile" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Laporan Profil & Analisis Murid</h1>
                        <p>Helaian keputusan ujian kecergasan dan cadangan bidang sukan murid.</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="switchTab('students')">
                            <i class="fa-solid fa-arrow-left"></i>Kembali
                        </button>
                        <button class="btn btn-secondary" id="btn-download-admin-pdf" onclick="downloadAdminPDF()">
                            <i class="fa-solid fa-file-pdf"></i> Muat Turun PDF
                        </button>
                        <button class="btn btn-primary" onclick="window.print()">
                            <i class="fa-solid fa-print"></i>Cetak Laporan
                        </button>
                    </div>
                </div>

                <div class="profile-grid" id="admin-profile-grid">
                    <!-- Left Sidebar Profile -->
                    <div class="card profile-sidebar-card">
                        <div class="avatar-container">
                            <div class="avatar-inner" id="prof-avatar-initial">A</div>
                        </div>
                        <div>
                            <h2 id="prof-name" style="margin-bottom: 0.25rem;">-</h2>
                            <span id="prof-badge-gender" class="badge badge-lelaki">-</span>
                        </div>

                        <ul class="profile-meta-list">
                            <li><span>Umur:</span><span id="prof-age">-</span></li>
                            <li><span>Sekolah:</span><span id="prof-school">-</span></li>
                            <li><span>Tahun/Kelas:</span><span id="prof-class">-</span></li>
                            <li><span>Tinggi:</span><span id="prof-height">-</span></li>
                            <li><span>Berat:</span><span id="prof-weight">-</span></li>
                            <li><span>BMI:</span><span id="prof-bmi">-</span></li>
                            <li><span>Status BMI:</span><span id="prof-bmi-status">-</span></li>
                        </ul>
                    </div>

                    <!-- Right Layout -->
                    <div class="profile-main-layout">
                        <!-- Visual Analysis Radar & Summary -->
                        <div class="visuals-grid">
                            <!-- Radar Chart -->
                            <div class="card chart-card">
                                <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-radar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Profil Kecergasan Atlet</h3>
                                <div class="chart-container">
                                    <canvas id="fitnessRadarChart"></canvas>
                                </div>
                            </div>
                            
                            <!-- Sports Recommendation Card -->
                            <div class="card" style="display: flex; flex-direction: column;">
                                <h3><i class="fa-solid fa-trophy" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Cadangan Bidang Sukan</h3>
                                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Berdasarkan ujian kecergasan fizikal terbaik yang direkodkan:</p>
                                <div class="sports-container" id="prof-sports-list">
                                    <div class="sport-card">
                                        <div style="text-align: center; width: 100%; color: var(--text-muted);">
                                            Sila masukkan skor ujian terlebih dahulu untuk menerima cadangan sukan.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Score Breakdowns -->
                        <div class="card">
                            <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-list-check" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Perincian Skor & Analisis Komponen</h3>
                            <div class="score-breakdown-list" id="prof-score-breakdown">
                                <!-- Dynamic Component items will load here -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ANALITIS KUMPULAN TAB -->
            <section id="analytics" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Analitis Kumpulan</h1>
                        <p>Kajian taburan bakat sukan dan purata prestasi kecergasan murid keseluruhan.</p>
                    </div>
                </div>

                <div class="visuals-grid" style="margin-bottom: 2rem;">
                    <!-- Purata Komponen Ujian -->
                    <div class="card chart-card">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-bar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Purata Skor Mengikut Jantina</h3>
                        <div class="chart-container">
                            <canvas id="groupPerformanceChart"></canvas>
                        </div>
                    </div>
                    <!-- Taburan Tahap Kecergasan Keseluruhan -->
                    <div class="card chart-card">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-pie" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Taburan Tahap Kecergasan Murid</h3>
                        <div class="chart-container">
                            <canvas id="groupFitnessDistChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- URUS GURU / TEACHERS TAB -->
            <section id="teachers" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Pengurusan Guru / Jurulatih</h1>
                        <p>Daftar akaun guru baharu dan urus akses sistem TID untuk staf sekolah.</p>
                    </div>
                </div>

                <div class="visuals-grid" style="margin-bottom: 2rem;">
                    <!-- Senarai Guru Card -->
                    <div class="card" style="padding: 1.5rem;">
                        <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-chalkboard-user" style="color: var(--accent-purple); margin-right: 0.5rem;"></i>Senarai Guru Berdaftar</h3>
                        <div class="table-responsive">
                            <table class="custom-table" id="teachers-table">
                                <thead>
                                    <tr>
                                        <th>Nama Penuh</th>
                                        <th>ID Pengguna</th>
                                        <th>Telefon</th>
                                        <th>Sekolah</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                                            <i class="fa-solid fa-user-tie" style="font-size: 2.5rem; display: block; margin-bottom: 1rem;"></i>
                                            Memuatkan data guru...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Borang Tambah Guru (Admin View) -->
                    <div class="card" style="padding: 1.5rem; height: fit-content;">
                        <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-user-plus" style="color: var(--accent-purple); margin-right: 0.5rem;"></i>Daftar Guru Baharu</h3>
                        
                        <form id="admin-teacher-register-form">
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="admin-t-name">Nama Penuh</label>
                                <input type="text" id="admin-t-name" class="form-control" placeholder="Nama penuh guru..." required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="admin-t-username">ID Pengguna / E-mel</label>
                                <input type="text" id="admin-t-username" class="form-control" placeholder="ID login..." required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="admin-t-phone">Nombor Telefon</label>
                                <input type="text" id="admin-t-phone" class="form-control" placeholder="Nombor telefon...">
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="admin-t-school">Sekolah</label>
                                <input type="text" id="admin-t-school" class="form-control" value="SK Taman Tun Dr Ismail" placeholder="Nama sekolah...">
                            </div>
                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label for="admin-t-passcode">Kata Laluan</label>
                                <input type="password" id="admin-t-passcode" class="form-control" placeholder="Kata laluan..." required>
                            </div>
                            
                            <p id="admin-t-error-msg" style="color: var(--color-danger); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;"></p>
                            <p id="admin-t-success-msg" style="color: var(--color-success); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;">Guru berjaya didaftarkan!</p>

                            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; background: var(--accent-purple); border-color: var(--accent-purple); box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);">
                                <i class="fa-solid fa-user-plus"></i> Daftar Guru
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <!-- PORTAL ANAK MURID TAB -->
            <section id="student-portal" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Portal Anak Murid</h1>
                        <p>Cari nama anda untuk melihat laporan prestasi, radar kecergasan, dan cadangan sukan anda.</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="handleLogout()" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
                            <i class="fa-solid fa-right-from-bracket"></i>Log Keluar
                        </button>
                    </div>
                </div>

                <div class="card" style="max-width: 600px; margin: 0 auto 2.5rem auto; padding: 2rem;">
                    <h3 style="margin-bottom: 1.5rem; text-align: center;"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Cari Laporan Kecergasan Saya</h3>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label for="student-select-portal">Pilih Nama Anda</label>
                        <select id="student-select-portal" class="form-control" style="background: rgba(0,0,0,0.3);">
                            <option value="" disabled selected>Pilih nama anda...</option>
                        </select>
                    </div>
                    
                    <button class="btn btn-primary" id="btn-view-student-report" style="width: 100%; justify-content: center;">
                        <i class="fa-solid fa-magnifying-glass-chart"></i> Papar Laporan Saya
                    </button>
                </div>

                <!-- Laporan Murid Read-only Container -->
                <div id="student-portal-report-container" style="display: none;">
                    <!-- Diisi secara dinamik dengan profil murid -->
                </div>
            </section>
        </main>
    </div>

    <!-- Custom App JavaScript -->
    <script src="app.js?v=<?= time() ?>"></script>
</body>
</html>
