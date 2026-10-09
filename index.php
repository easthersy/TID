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
    <!-- SheetJS (xlsx) for Excel Import -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <!-- Custom Style Sheet -->
    <link rel="stylesheet" href="style.css?v=<?= time() ?>">
</head>
<body>

    <!-- ======================================================== -->
    <!-- HALAMAN LOG MASUK (2 PILIHAN: INDIVIDU & SEKOLAH) -->
    <!-- ======================================================== -->
    <div id="login-screen">
        <div class="login-wrapper">
            <div class="login-header">
                <i class="fa-solid fa-medal login-logo"></i>
                <h1>TIDPutra</h1>
                <p>Talent Identification & Fitness Analysis System</p>
            </div>
            
            <div class="login-card card">
                <h3 style="text-align: center; margin-bottom: 1.75rem; font-family: var(--font-outfit);">Pilih Peranan Log Masuk</h3>
                
                <div class="role-cards-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 440px; margin: 0 auto;">
                    <!-- Individu Card -->
                    <div class="role-card" data-role="Admin" id="card-role-admin">
                        <i class="fa-solid fa-user-gear role-card-icon" style="color: var(--accent-primary);"></i>
                        <h4>Individu</h4>
                        <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Pentadbir & Laporan</span>
                    </div>
                    <!-- Sekolah Card -->
                    <div class="role-card" data-role="Individu" id="card-role-individual">
                        <i class="fa-solid fa-school role-card-icon" style="color: var(--accent-primary);"></i>
                        <h4>Sekolah</h4>
                        <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Portal Guru Sekolah</span>
                    </div>
                </div>

                <!-- 1. Borang Log Masuk Individu (Admin) -->
                <form id="form-login-admin" style="display: none; margin-top: 1.75rem; text-align: left;">
                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="admin-login-username" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
                            <i class="fa-solid fa-user" style="margin-right: 0.35rem; color: var(--accent-primary);"></i>ID Pengguna Individu
                        </label>
                        <input type="text" id="admin-login-username" class="form-control" placeholder="Contoh: admin" required autocomplete="username">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="admin-login-password" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
                            <i class="fa-solid fa-lock" style="margin-right: 0.35rem; color: var(--accent-primary);"></i>Kata Laluan
                        </label>
                        <input type="password" id="admin-login-password" class="form-control" placeholder="Masukkan kata laluan..." required autocomplete="current-password">
                    </div>

                    <p id="admin-login-error" style="color: var(--color-danger); font-size: 0.82rem; margin-top: 0.25rem; margin-bottom: 0.75rem; display: none;"></p>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 0.85rem; margin-bottom: 1.25rem; font-size: 0.78rem; color: #475569;">
                        <i class="fa-solid fa-circle-info" style="color: var(--accent-primary); margin-right: 0.3rem;"></i> <strong>Maklumat Lalai:</strong> ID: <code>admin</code> | Kata Laluan: <code>admin123</code>
                    </div>

                    <div style="display: flex; gap: 0.75rem;">
                        <button type="button" class="btn btn-secondary btn-login-back" style="flex: 1; justify-content: center;">Kembali</button>
                        <button type="submit" class="btn btn-primary" style="flex: 2; justify-content: center;">
                            <i class="fa-solid fa-right-to-bracket"></i> Log Masuk Individu
                        </button>
                    </div>
                </form>

                <!-- 2. Borang Log Masuk Sekolah -->
                <form id="form-login-school" style="display: none; margin-top: 1.75rem; text-align: left;">
                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="school-login-select" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
                            <i class="fa-solid fa-school" style="margin-right: 0.35rem; color: var(--accent-primary);"></i>Pilih Sekolah Anda
                        </label>
                        <select id="school-login-select" class="form-control" style="font-size: 0.92rem;">
                            <option value="" disabled selected>Pilih Sekolah Berdaftar...</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="school-login-code" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
                            <i class="fa-solid fa-key" style="margin-right: 0.35rem; color: var(--accent-primary);"></i>Kod Sekolah
                        </label>
                        <input type="text" id="school-login-code" class="form-control" placeholder="Contoh: SKTTDI2026" style="text-transform: uppercase; font-weight: 600; letter-spacing: 1px;" required>
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="school-login-password" style="font-family: var(--font-outfit); font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
                            <i class="fa-solid fa-lock" style="margin-right: 0.35rem; color: var(--accent-primary);"></i>Kata Laluan Sekolah
                        </label>
                        <input type="password" id="school-login-password" class="form-control" placeholder="Masukkan kata laluan sekolah..." required>
                    </div>

                    <p id="school-login-error" style="color: var(--color-danger); font-size: 0.82rem; margin-top: 0.25rem; margin-bottom: 0.75rem; display: none;"></p>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 0.85rem; margin-bottom: 1.25rem; font-size: 0.78rem; color: #475569;">
                        <i class="fa-solid fa-circle-info" style="color: var(--accent-primary); margin-right: 0.3rem;"></i> <strong>Maklumat Lalai:</strong> Kod: <code>SKTTDI2026</code> | Kata Laluan: <code>tid123</code>
                    </div>

                    <div style="display: flex; gap: 0.75rem;">
                        <button type="button" class="btn btn-secondary btn-login-back" style="flex: 1; justify-content: center;">Kembali</button>
                        <button type="submit" class="btn btn-primary" style="flex: 2; justify-content: center;">
                            <i class="fa-solid fa-right-to-bracket"></i> Log Masuk Sekolah
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="login-footer">
                <p>Sistem Analisis Talent Identification (TID) Sekolah Rendah &bull; &copy; 2026</p>
            </div>
        </div>
    </div>

    <!-- ======================================================== -->
    <!-- APP CONTAINER (SIDEBAR & MAIN CONTENT) -->
    <!-- ======================================================== -->
    <div class="app-container">
        <!-- Sidebar Navigation (Untuk Admin & Navigasi Utama) -->
        <aside class="sidebar">
            <div class="brand">
                <i class="fa-solid fa-medal brand-icon"></i>
                <div>
                    <h2>TIDPutra</h2>
                    <span id="sidebar-role-badge" class="badge badge-fitness" style="font-size: 0.7rem; padding: 0.1rem 0.5rem;">Individu</span>
                </div>
            </div>
            
            <ul class="menu-list">
                <!-- Admin Only Menus -->
                <li class="menu-item active admin-only" data-tab="dashboard">
                    <a href="javascript:void(0)"><i class="fa-solid fa-chart-pie"></i><span>Papan Pemuka</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="schools">
                    <a href="javascript:void(0)"><i class="fa-solid fa-school"></i><span>Daftar Sekolah</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="register">
                    <a href="javascript:void(0)"><i class="fa-solid fa-user-plus"></i><span>Daftar Atlet</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="students">
                    <a href="javascript:void(0)"><i class="fa-solid fa-users"></i><span>Senarai Atlet</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="tests-mgmt">
                    <a href="javascript:void(0)"><i class="fa-solid fa-list-check"></i><span>Ujian TID</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="accounts">
                    <a href="javascript:void(0)"><i class="fa-solid fa-users-gear"></i><span>Pengurusan Akaun</span></a>
                </li>
                <li class="menu-item admin-only" data-tab="analytics">
                    <a href="javascript:void(0)"><i class="fa-solid fa-chart-line"></i><span>Analisis Kumpulan</span></a>
                </li>

                <!-- Individual / School Only Menus -->
                <li class="menu-item individual-only" data-tab="individual-portal">
                    <a href="javascript:void(0)"><i class="fa-solid fa-graduation-cap"></i><span>Portal Sekolah</span></a>
                </li>

                <!-- Logout Menu -->
                <li class="menu-item" style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <a href="javascript:void(0)" onclick="handleLogout()" style="color: #f87171;">
                        <i class="fa-solid fa-right-from-bracket" style="color: #f87171;"></i><span>Log Keluar</span>
                    </a>
                </li>
            </ul>
            
            <div class="sidebar-footer">
                <p id="sidebar-school-info" style="font-size: 0.8rem; color: var(--accent-primary); margin-bottom: 0.25rem;">TID Sekolah Rendah</p>
                <p>&copy; 2026 Sistem Analisis TID</p>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">

            <!-- ======================================================== -->
            <!-- 1. DASHBOARD TAB (ADMIN) -->
            <!-- ======================================================== -->
            <section id="dashboard" class="tab-content active admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Papan Pemuka TID</h1>
                        <p>Pusat kawalan analisis bakat dan kecergasan atlet sekolah rendah secara keseluruhan.</p>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="stats-grid">
                    <div class="card stat-card">
                        <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-total-students">0</h3>
                            <p>Jumlah Atlet</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #a855f7;"><i class="fa-solid fa-school"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-total-schools">0</h3>
                            <p>Sekolah Berdaftar</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #60a5fa;"><i class="fa-solid fa-mars"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-boys">0</h3>
                            <p>Atlet Lelaki</p>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-icon" style="color: #f472b6;"><i class="fa-solid fa-venus"></i></div>
                        <div class="stat-info">
                            <h3 id="stat-girls">0</h3>
                            <p>Atlet Perempuan</p>
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
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="margin: 0;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Pendaftaran Atlet Terkini</h3>
                            <button class="btn btn-secondary btn-sm" onclick="switchTab('students')">Lihat Semua</button>
                        </div>
                        <div class="table-responsive">
                            <table class="custom-table" id="dashboard-recent-table">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Sekolah</th>
                                        <th>Kelas</th>
                                        <th>Jantina</th>
                                        <th>BMI</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="6" style="text-align: center; color: var(--text-muted);">Tiada data atlet direkodkan.</td>
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

            <!-- ======================================================== -->
            <!-- 2. PENDAFTARAN SEKOLAH TAB (ADMIN) -->
            <!-- ======================================================== -->
            <section id="schools" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Pendaftaran & Pengurusan Sekolah</h1>
                        <p>Daftar sekolah baharu, jana Kod Sekolah secara automatik dan tetapkan kata laluan untuk akaun Individu.</p>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem;">
                    <!-- Borang Daftar Sekolah (Bahagian Atas) -->
                    <div class="card" style="padding: 2rem;">
                        <h3 style="margin-bottom: 1.25rem; color: #000000; font-family: var(--font-outfit);">
                            <i class="fa-solid fa-school-flag" style="margin-right: 0.5rem; color: var(--accent-primary);"></i>Daftar Sekolah Baharu
                        </h3>
                        
                        <form id="register-school-form" style="max-width: 680px;">
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="school-name-input" style="font-weight: 700; color: #000000;">Nama Sekolah</label>
                                <input type="text" id="school-name-input" class="form-control" placeholder="Contoh: SK TAMAN TUN DR ISMAIL" style="text-transform: uppercase; font-weight: 600;" oninput="this.value = this.value.toUpperCase()" required>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                    <label for="school-code-input" style="margin-bottom: 0; font-weight: 700; color: #000000;">Kod Sekolah (Auto-Generated)</label>
                                    <button type="button" class="btn btn-secondary btn-sm" id="btn-generate-school-code" style="padding: 0.25rem 0.75rem; font-size: 0.78rem;">
                                        <i class="fa-solid fa-arrows-rotate" style="color: var(--accent-primary);"></i> Jana Kod
                                    </button>
                                </div>
                                <input type="text" id="school-code-input" class="form-control" placeholder="Contoh: SKTTDI2026" style="text-transform: uppercase; font-weight: 700; letter-spacing: 1px; color: var(--accent-primary);" required>
                                <small style="color: var(--text-muted); font-size: 0.78rem;">Kod ini digunakan oleh murid/guru untuk log masuk akaun Sekolah.</small>
                            </div>

                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                    <label for="school-password-input" style="margin-bottom: 0; font-weight: 700; color: #000000;">Kata Laluan Sekolah</label>
                                    <button type="button" class="btn btn-secondary btn-sm" id="btn-generate-school-pwd" style="padding: 0.25rem 0.75rem; font-size: 0.78rem;">
                                        <i class="fa-solid fa-arrows-rotate" style="color: var(--accent-primary);"></i> Jana Kata Laluan
                                    </button>
                                </div>
                                <input type="text" id="school-password-input" class="form-control" placeholder="Contoh: tid4821" style="font-weight: 600;" required>
                            </div>

                            <p id="school-form-error" style="color: var(--color-danger); font-size: 0.85rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;"></p>
                            <p id="school-form-success" style="color: var(--color-success); font-size: 0.85rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;">Sekolah berjaya didaftarkan!</p>

                            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-weight: 700;">
                                <i class="fa-solid fa-plus"></i> Simpan & Daftar Sekolah
                            </button>
                        </form>
                    </div>

                    <!-- Senarai Sekolah Berdaftar (Bahagian Bawah Di Bawah Daftar Sekolah) -->
                    <div class="card" style="padding: 2rem;">
                        <div class="table-header-bar" style="margin-bottom: 1.25rem;">
                            <h3 style="margin: 0; color: #000000; font-family: var(--font-outfit);">
                                <i class="fa-solid fa-list-ul" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Senarai Sekolah & Akses Individu
                            </h3>
                        </div>
                        <div class="table-responsive">
                            <table class="custom-table" id="schools-table">
                                <thead>
                                    <tr>
                                        <th>Nama Sekolah</th>
                                        <th>Kod Sekolah</th>
                                        <th>Kata Laluan</th>
                                        <th>Jumlah Atlet</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2.5rem;">
                                            Memuatkan data sekolah...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 3. PENDAFTARAN ATLET TAB (ADMIN) - 3 DALAM 1 -->
            <!-- ======================================================== -->
            <section id="register" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Pendaftaran Atlet TID</h1>
                        <p>Pilih sekolah dan daftarkan atlet menggunakan <strong>Excel (.xlsx)</strong>, <strong>Copy-Paste Jadual</strong>, atau <strong>Auto Key-in Manual</strong>.</p>
                    </div>
                </div>

                <div class="card" style="max-width: 900px; margin: 0 auto 2rem auto; padding: 1.5rem;">
                    <!-- Pemilihan Sekolah Wajib -->
                    <div class="form-group" style="margin-bottom: 1.5rem; background: rgba(0, 242, 254, 0.05); padding: 1rem; border-radius: 10px; border: 1px solid rgba(0, 242, 254, 0.2);">
                        <label for="reg-select-school" style="font-weight: 700; color: var(--accent-primary); font-size: 0.95rem; text-transform: uppercase;">
                            <i class="fa-solid fa-school" style="margin-right: 0.4rem;"></i>1. Pilih Sekolah Bagi Pendaftaran Atlet:
                        </label>
                        <select id="reg-select-school" class="form-control" style="margin-top: 0.5rem; font-size: 1rem; font-weight: 600;" required>
                            <option value="" disabled selected>Pilih Sekolah Berdaftar...</option>
                        </select>
                    </div>

                    <!-- 3 Pilihan Kaedah Pendaftaran Tab Switcher -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                        <button type="button" class="btn btn-primary method-tab-btn active" id="btn-method-auto" onclick="switchRegMethod('auto')">
                            <i class="fa-solid fa-keyboard"></i> Auto Key-In Manual
                        </button>
                        <button type="button" class="btn btn-secondary method-tab-btn" id="btn-method-excel" onclick="switchRegMethod('excel')">
                            <i class="fa-solid fa-file-excel"></i> Masukkan Fail Excel
                        </button>
                        <button type="button" class="btn btn-secondary method-tab-btn" id="btn-method-paste" onclick="switchRegMethod('paste')">
                            <i class="fa-solid fa-paste"></i> Copy & Paste
                        </button>
                    </div>

                    <!-- KAEDAH A: AUTO KEY-IN BORANG MANUAL -->
                    <div id="reg-method-auto-area">
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
                                    <input type="number" id="reg-age" class="form-control" min="6" max="18" placeholder="Contoh: 10" required>
                                </div>
                            </div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="reg-class">Kelas / Tingkatan</label>
                                    <input type="text" id="reg-class" class="form-control" placeholder="Contoh: 4 Cerdik" required>
                                </div>
                                <div class="form-group">
                                    <label for="reg-height">Tinggi (cm)</label>
                                    <input type="number" step="0.1" id="reg-height" class="form-control" placeholder="Contoh: 135.5" required oninput="calculateLiveBMI()">
                                </div>
                            </div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="reg-weight">Berat (kg)</label>
                                    <input type="number" step="0.1" id="reg-weight" class="form-control" placeholder="Contoh: 32.4" required oninput="calculateLiveBMI()">
                                </div>
                                <div class="form-group">
                                    <label>BMI (Auto-Calculated)</label>
                                    <div id="reg-live-bmi" class="form-control" style="background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: var(--accent-primary);">
                                        <span>-</span>
                                        <span class="badge badge-fitness" style="font-size: 0.75rem;">Sedia</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
                                <button type="button" class="btn btn-secondary" onclick="switchTab('students')">Batal</button>
                                <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Simpan Murid</button>
                            </div>
                        </form>
                    </div>

                    <!-- KAEDAH B: IMPORT FAIL EXCEL (.XLSX / .CSV) -->
                    <div id="reg-method-excel-area" style="display: none;">
                        <div style="border: 2px dashed rgba(0, 242, 254, 0.4); border-radius: 12px; padding: 2.5rem 1.5rem; text-align: center; background: rgba(0, 242, 254, 0.02); margin-bottom: 1.5rem;">
                            <i class="fa-solid fa-file-excel" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                            <h3 style="margin-bottom: 0.5rem;">Muat Naik Fail Excel / Spreadsheet (.xlsx, .xls, .csv)</h3>
                            <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 500px; margin: 0 auto 1.5rem auto;">
                                Susunan lajur fail yang disokong: <strong>Nama | Jantina (L/P) | Umur | Kelas | Tinggi (cm) | Berat (kg)</strong>
                            </p>
                            <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv" style="display: none;" onchange="handleExcelUpload(event)">
                            <button type="button" class="btn btn-primary" onclick="document.getElementById('excel-file-input').click()">
                                <i class="fa-solid fa-upload"></i> Pilih Fail Dari Komputer
                            </button>
                        </div>

                        <!-- Preview Excel Data Table -->
                        <div id="excel-preview-container" style="display: none;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                <h4 id="excel-preview-count" style="color: var(--accent-primary); margin: 0;">0 Atlet Dikesan</h4>
                                <button type="button" class="btn btn-primary" id="btn-save-excel-athletes" onclick="saveBatchAthletes('excel')">
                                    <i class="fa-solid fa-check-double"></i> Sahkan & Simpan Semua Atlet
                                </button>
                            </div>
                            <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                <table class="custom-table" id="excel-preview-table">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Jantina</th>
                                            <th>Umur</th>
                                            <th>Kelas</th>
                                            <th>Tinggi</th>
                                            <th>Berat</th>
                                            <th>BMI</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- KAEDAH C: COPY & PASTE DARI SPREADSHEET / TABLE -->
                    <div id="reg-method-paste-area" style="display: none;">
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                            Salin (Copy) sel dari <strong>Microsoft Excel</strong> atau <strong>Google Sheets</strong> dan tampal (Paste) ke dalam kotak teks di bawah.
                            Format lajur: <code>Nama Penuh [Tab/Koma] Jantina [Tab] Umur [Tab] Kelas [Tab] Tinggi [Tab] Berat</code>
                        </p>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <textarea id="paste-data-input" class="form-control" rows="8" placeholder="Contoh:
Muhammad Ali Bin Ahmad	Lelaki	10	4 Cerdik	135.5	32.4
Nur Farah Hanim	Perempuan	10	4 Cerdik	130.0	29.5
Tan Wei Lun	Lelaki	11	5 Bestari	140.2	35.0" style="font-family: monospace; font-size: 0.85rem;"></textarea>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <button type="button" class="btn btn-secondary" onclick="parsePastedData()">
                                <i class="fa-solid fa-magnifying-glass"></i> Pratonton Data Tampalan
                            </button>
                            <button type="button" class="btn btn-primary" id="btn-save-pasted-athletes" style="display: none;" onclick="saveBatchAthletes('paste')">
                                <i class="fa-solid fa-check-double"></i> Sahkan & Simpan Atlet
                            </button>
                        </div>

                        <!-- Preview Pasted Data Table -->
                        <div id="paste-preview-container" style="display: none;">
                            <h4 id="paste-preview-count" style="color: var(--accent-primary); margin-bottom: 0.75rem;">0 Atlet Dikesan</h4>
                            <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                <table class="custom-table" id="paste-preview-table">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Jantina</th>
                                            <th>Umur</th>
                                            <th>Kelas</th>
                                            <th>Tinggi</th>
                                            <th>Berat</th>
                                            <th>BMI</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 4. SENARAI ATLET TAB (ADMIN) -->
            <!-- ======================================================== -->
            <section id="students" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Senarai Atlet TID</h1>
                        <p>Pengurusan data profil, rekod markah, dan analisis bagi semua atlet berdaftar mengikut sekolah.</p>
                    </div>
                    <div>
                        <button class="btn btn-primary" onclick="switchTab('register')">
                            <i class="fa-solid fa-plus"></i> Tambah Atlet
                        </button>
                    </div>
                </div>

                <div class="card table-card">
                    <div class="table-header-bar" style="flex-wrap: wrap; gap: 1rem;">
                        <!-- Filter Sekolah -->
                        <div style="display: flex; gap: 0.75rem; align-items: center; flex: 1; min-width: 250px;">
                            <select id="filter-admin-school" class="form-control" style="width: auto; max-width: 260px;" onchange="filterAdminStudents()">
                                <option value="">Semua Sekolah</option>
                            </select>
                            <select id="filter-admin-class" class="form-control" style="width: auto; max-width: 180px;" onchange="filterAdminStudents()">
                                <option value="">Semua Kelas</option>
                            </select>
                        </div>
                        <!-- Search Box -->
                        <div class="table-search" style="min-width: 240px;">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="search-student" placeholder="Cari nama atlet...">
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="custom-table" id="students-table">
                            <thead>
                                <tr>
                                    <th>Nama Atlet</th>
                                    <th>Sekolah / Kod</th>
                                    <th>Kelas / Umur</th>
                                    <th>Jantina</th>
                                    <th>BMI</th>
                                    <th>Kecergasan</th>
                                    <th>Bakat Utama</th>
                                    <th>Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                                        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; display: block; margin-bottom: 1rem;"></i>
                                        Memuatkan data murid...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 5. UJIAN TID (PILIHAN UJIAN & PENGURUSAN METRIK) (ADMIN) -->
            <!-- ======================================================== -->
            <section id="tests-mgmt" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Ujian TID & Pengurusan Metrik</h1>
                        <p>Kemasukan skor ujian atlet mengikut pilihan ujian (Ujian 1 & 2) serta pengurusan metrik penilaian bagi Lelaki dan Perempuan.</p>
                    </div>
                </div>

                <!-- Sub-navigasi Ujian TID: 1) Perekodan Skor, 2) Pengurusan Metrik, 3) Cetak Borang Manual -->
                <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                    <button class="btn btn-primary tid-test-tab-btn active" id="btn-tid-record-mode" onclick="switchTidTestMode('record')">
                        <i class="fa-solid fa-pen-to-square"></i> 1) Pilihan Ujian & Merekod Skor
                    </button>
                    <button class="btn btn-secondary tid-test-tab-btn" id="btn-tid-metric-mode" onclick="switchTidTestMode('metric')">
                        <i class="fa-solid fa-sliders"></i> 2) Tambah Ujian & Pengurusan Metrik
                    </button>
                    <button class="btn btn-secondary tid-test-tab-btn" id="btn-tid-print-mode" onclick="switchTidTestMode('print')">
                        <i class="fa-solid fa-print"></i> 3) Cetak Borang Ujian Manual
                    </button>
                </div>

                <!-- BAHAGIAN 1: PILIHAN UJIAN & REKOD SKOR ATLET -->
                <div id="tid-record-mode-area">
                    <!-- Athlete Selection Banner -->
                    <div id="no-athlete-selected" class="card empty-state" style="margin-bottom: 2rem;">
                        <div class="empty-state-icon"><i class="fa-solid fa-user-check"></i></div>
                        <h3>Sila Pilih Atlet Untuk Merekod Skor</h3>
                        <p>Pilih nama murid di bawah atau pergi ke menu <strong>Senarai Atlet</strong> dan klik butang <strong>Skor</strong>.</p>
                        <div style="max-width: 400px; margin: 1rem auto 0 auto;">
                            <select id="quick-select-athlete" class="form-control" onchange="handleQuickSelectAthlete(this.value)">
                                <option value="" disabled selected>Pilih atlet dari senarai...</option>
                            </select>
                        </div>
                    </div>

                    <div id="athlete-selected-area" style="display: none;">
                        <div class="athlete-selection-banner" style="margin-bottom: 1.5rem;">
                            <div>
                                <span style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Merekodkan Skor Untuk Atlet:</span>
                                <h3 id="record-athlete-name" style="color: #fff; margin-top: 0.25rem;">-</h3>
                                <p id="record-athlete-meta" style="font-size: 0.9rem; color: var(--accent-primary);">-</p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <!-- Pilihan Ujian 1 vs Ujian 2 -->
                                <button type="button" class="btn btn-primary test-battery-btn active" id="btn-battery-1" onclick="switchTestBattery(1)">
                                    <i class="fa-solid fa-1"></i> Ujian 1 (Bateri Asas)
                                </button>
                                <button type="button" class="btn btn-secondary test-battery-btn" id="btn-battery-2" onclick="switchTestBattery(2)">
                                    <i class="fa-solid fa-2"></i> Ujian 2 (Lanjutan)
                                </button>
                            </div>
                        </div>

                        <form id="scores-form">
                            <input type="hidden" id="score-student-id">
                            
                            <!-- Bateri Ujian 1 (6 Komponen Asas) -->
                            <div id="battery-1-inputs" class="scores-section-grid">
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
                                        <span class="badge badge-fitness">Daya Tahan (Kali)</span>
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

                            <!-- Bateri Ujian 2 (Lanjutan) -->
                            <div id="battery-2-inputs" class="scores-section-grid" style="display: none;">
                                <div class="test-component-card">
                                    <div class="test-header">
                                        <h4><i class="fa-solid fa-lungs"></i>Bleep Test / Shuttle Run</h4>
                                        <span class="badge badge-fitness">VO2 Max (Tahap.Shuttle)</span>
                                    </div>
                                    <div class="trials-inputs">
                                        <div class="trial-field">
                                            <label for="bleep-t1">Catatan Tahap</label>
                                            <input type="number" step="0.1" id="bleep-t1" class="form-control" placeholder="Contoh: 6.2">
                                        </div>
                                    </div>
                                </div>
                                <div class="test-component-card">
                                    <div class="test-header">
                                        <h4><i class="fa-solid fa-arrows-up-down"></i>Vertical Jump</h4>
                                        <span class="badge badge-fitness">Kuasa Menegak (cm)</span>
                                    </div>
                                    <div class="trials-inputs">
                                        <div class="trial-field">
                                            <label for="vj-t1">Lompatan (cm)</label>
                                            <input type="number" step="0.5" id="vj-t1" class="form-control" placeholder="Contoh: 32.5">
                                        </div>
                                    </div>
                                </div>
                                <div class="test-component-card">
                                    <div class="test-header">
                                        <h4><i class="fa-solid fa-baseball"></i>Medicine Ball Throw</h4>
                                        <span class="badge badge-fitness">Kuasa Lontaran (Meter)</span>
                                    </div>
                                    <div class="trials-inputs">
                                        <div class="trial-field">
                                            <label for="mb-t1">Jarak (Meter)</label>
                                            <input type="number" step="0.1" id="mb-t1" class="form-control" placeholder="Contoh: 4.8">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-secondary" onclick="switchTab('students')">Batal</button>
                                <button type="submit" class="btn btn-primary"><i class="fa-solid fa-check"></i> Simpan & Analisis Ujian</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- BAHAGIAN 2: PENGURUSAN METRIK LELAKI & PEREMPUAN -->
                <div id="tid-metric-mode-area" style="display: none;">
                    <div class="card" style="padding: 1.5rem; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem; color: var(--accent-primary);">
                            <i class="fa-solid fa-scale-balanced" style="margin-right: 0.5rem;"></i>Penetapan Metrik & Norma Penggredan Ujian
                        </h3>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1.5rem;">
                            Pengurusan nilai ambang norma (benchmark metrics) bagi kategori <strong>Lelaki</strong> dan <strong>Perempuan</strong> untuk penentuan skor mata 1 (Lemah) hingga 5 (Cemerlang).
                        </p>

                        <div id="metrics-config-container">
                            <!-- Diisi secara dinamik dengan senarai komponen & nilai metrik -->
                        </div>

                        <div style="margin-top: 1.5rem; text-align: right;">
                            <button type="button" class="btn btn-primary" onclick="saveCustomMetrics()">
                                <i class="fa-solid fa-floppy-disk"></i> Simpan Konfigurasi Metrik
                            </button>
                        </div>
                    </div>
                </div>

                <!-- BAHAGIAN 3: CETAK BORANG UJIAN TID MANUAL -->
                <div id="tid-print-mode-area" style="display: none;">
                    <div class="card" style="padding: 1.75rem; margin-bottom: 1.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
                            <div>
                                <h3 style="margin: 0 0 0.25rem 0; color: #000000; font-family: var(--font-outfit);">
                                    <i class="fa-solid fa-print" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Penjana Borang Cetakan Ujian Lapangan Manual
                                </h3>
                                <p style="margin: 0; color: #4b5563; font-size: 0.9rem;">Cetak borang penilaian fizikal mengikut ujian yang telah disetup bagi pengisian catatan manual di padang sekolah.</p>
                            </div>
                            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                                <button type="button" class="btn btn-primary" onclick="printManualTestForm()" style="padding: 0.7rem 1.35rem; font-weight: 700;">
                                    <i class="fa-solid fa-print"></i> Cetak Borang Murid (A4 Landskap - 2 Orang)
                                </button>
                                <button type="button" class="btn btn-secondary" onclick="printClassRosterForm()" style="padding: 0.7rem 1.35rem; font-weight: 700; border-color: #d1d5db; color: #111827;">
                                    <i class="fa-solid fa-table-list"></i> Cetak Jadual Skor Berkelompok (Kelas)
                                </button>
                            </div>
                        </div>

                        <!-- Bar Tetapan Borang -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label for="print-manual-school" style="font-weight: 700; font-size: 0.85rem; color: #000000; margin-bottom: 0.35rem;">
                                    <i class="fa-solid fa-school" style="color: var(--accent-primary); margin-right: 0.3rem;"></i>1. Sekolah:
                                </label>
                                <select id="print-manual-school" class="form-control" onchange="handlePrintSchoolChange()">
                                    <option value="">Semua Sekolah / Pilihan Sekolah</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label for="print-manual-battery" style="font-weight: 700; font-size: 0.85rem; color: #000000; margin-bottom: 0.35rem;">
                                    <i class="fa-solid fa-layer-group" style="color: var(--accent-primary); margin-right: 0.3rem;"></i>2. Bateri Ujian:
                                </label>
                                <select id="print-manual-battery" class="form-control" onchange="renderManualPrintPreview()">
                                    <option value="1">Ujian 1 (Bateri Asas 6 Komponen)</option>
                                    <option value="2">Ujian 2 (Bateri Lanjutan)</option>
                                    <option value="all">Semua Bateri Ujian (Ujian 1 & 2)</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label for="print-manual-student" style="font-weight: 700; font-size: 0.85rem; color: #000000; margin-bottom: 0.35rem;">
                                    <i class="fa-solid fa-user" style="color: var(--accent-primary); margin-right: 0.3rem;"></i>3. Murid 1 (Sebelah Kiri):
                                </label>
                                <select id="print-manual-student" class="form-control" onchange="renderManualPrintPreview()">
                                    <option value="blank">-- Borang Kosong (Manual 1) --</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label for="print-manual-student-2" style="font-weight: 700; font-size: 0.85rem; color: #000000; margin-bottom: 0.35rem;">
                                    <i class="fa-solid fa-user" style="color: var(--accent-primary); margin-right: 0.3rem;"></i>4. Murid 2 (Sebelah Kanan):
                                </label>
                                <select id="print-manual-student-2" class="form-control" onchange="renderManualPrintPreview()">
                                    <option value="blank">-- Borang Kosong (Manual 2) --</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Pratonton Lembaran Cetakan (Print Preview Container) -->
                    <div id="manual-print-preview-wrapper" style="overflow-x: auto; padding-bottom: 2rem;">
                        <div id="manual-print-preview-sheet" class="print-sheet-paper" style="max-width: 1100px; padding: 1.5rem;">
                            <!-- Dynamic Printable Sheet rendered by JS -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 6. PENGURUSAN AKAUN (ADMIN & INDIVIDU) (ADMIN) -->
            <!-- ======================================================== -->
            <section id="accounts" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Pengurusan Akaun</h1>
                        <p>Urus akses Administrator tambahan (ID & Kata Laluan) dan semak kredensial akses akaun Individu.</p>
                    </div>
                </div>

                <div class="visuals-grid" style="margin-bottom: 2rem;">
                    <!-- Akses Admin: Borang Tambah Admin -->
                    <div class="card" style="padding: 1.5rem; height: fit-content;">
                        <h3 style="margin-bottom: 1.25rem; color: var(--accent-primary);">
                            <i class="fa-solid fa-user-shield" style="margin-right: 0.5rem;"></i>Tambah Akses Admin
                        </h3>
                        
                        <form id="add-admin-form">
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="adm-name">Nama Pegawai Admin</label>
                                <input type="text" id="adm-name" class="form-control" placeholder="Contoh: En. Azman" required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="adm-username">ID Pengguna (Username)</label>
                                <input type="text" id="adm-username" class="form-control" placeholder="Contoh: admin2" required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label for="adm-password">Kata Laluan (Password)</label>
                                <input type="password" id="adm-password" class="form-control" placeholder="Masukkan kata laluan..." required>
                            </div>
                            
                            <p id="adm-error-msg" style="color: var(--color-danger); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;"></p>
                            <p id="adm-success-msg" style="color: var(--color-success); font-size: 0.8rem; margin-top: -0.5rem; margin-bottom: 1rem; display: none;">Admin berjaya ditambah!</p>

                            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                                <i class="fa-solid fa-user-plus"></i> Tambah Akaun Admin
                            </button>
                        </form>
                    </div>

                    <!-- Senarai Admin Berdaftar -->
                    <div class="card" style="padding: 1.5rem;">
                        <h3 style="margin-bottom: 1.25rem;">
                            <i class="fa-solid fa-users" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Senarai Pentadbir (Admin)
                        </h3>
                        <div class="table-responsive">
                            <table class="custom-table" id="admins-table">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>ID Pengguna</th>
                                        <th>Kata Laluan</th>
                                        <th>Tarikh Cipta</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                                            Memuatkan data admin...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 7. PROFIL INDIVIDU & LAPORAN ANALISIS (SPIDERWEB & SPORT) -->
            <!-- ======================================================== -->
            <section id="profile" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Laporan Profil & Analisis Bakat Murid</h1>
                        <p>Keputusan ujian kecergasan, carta radar spiderweb, dan cadangan sukan murid.</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" id="btn-profile-back" onclick="handleProfileBack()">
                            <i class="fa-solid fa-arrow-left"></i> Kembali
                        </button>
                        <button class="btn btn-secondary" id="btn-download-admin-pdf" onclick="downloadAdminPDF()">
                            <i class="fa-solid fa-file-pdf"></i> Muat Turun PDF 2 Muka Surat
                        </button>
                        <button class="btn btn-primary" onclick="window.print()">
                            <i class="fa-solid fa-print"></i> Cetak Laporan
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
                            <!-- Radar / Spiderweb Chart -->
                            <div class="card chart-card">
                                <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-radar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Analisis Spiderweb Kecergasan</h3>
                                <div class="chart-container">
                                    <canvas id="fitnessRadarChart"></canvas>
                                </div>
                            </div>
                            
                            <!-- Sports Recommendation Card -->
                            <div class="card" style="display: flex; flex-direction: column;">
                                <h3><i class="fa-solid fa-trophy" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Cadangan Bidang Sukan</h3>
                                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Berdasarkan profil kecergasan dan metrik ujian murid:</p>
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

            <!-- ======================================================== -->
            <!-- 8. ANALISIS KUMPULAN TAB (ADMIN) -->
            <!-- ======================================================== -->
            <section id="analytics" class="tab-content admin-tab">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Analisis Kumpulan</h1>
                        <p>Pusat kajian komprehensif bagi taburan bakat sukan dan perbandingan prestasi kecergasan murid.</p>
                    </div>
                </div>

                <!-- Bar Penapis: Pilih Sekolah & Butang Pecahan Analisis -->
                <div class="card" style="margin-bottom: 2rem; padding: 1.5rem;">
                    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                        <!-- Baris 1: Dropdown Pilih Sekolah -->
                        <div style="display: flex; align-items: center; gap: 1rem; max-width: 520px; width: 100%;">
                            <label for="analytics-school-filter" style="font-size: 0.9rem; font-weight: 700; color: #000000; white-space: nowrap;">
                                <i class="fa-solid fa-school" style="color: var(--accent-primary); margin-right: 0.4rem;"></i>Pilih Sekolah:
                            </label>
                            <select id="analytics-school-filter" class="form-control" onchange="renderAnalytics()" style="flex: 1; padding: 0.65rem 1rem;">
                                <option value="">Semua Sekolah (Keseluruhan)</option>
                            </select>
                        </div>

                        <!-- Baris 2 (Di Bawah Pilih Sekolah): Butang Navigasi Pecahan Analisis -->
                        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                            <button type="button" class="btn btn-primary analytics-tab-btn active" id="btn-analytics-school" onclick="switchAnalyticsSubTab('school')">
                                <i class="fa-solid fa-building-columns"></i> Analisis Keseluruhan Sekolah
                            </button>
                            <button type="button" class="btn btn-secondary analytics-tab-btn" id="btn-analytics-class" onclick="switchAnalyticsSubTab('class')">
                                <i class="fa-solid fa-chalkboard-user"></i> Analisis Mengikut Kelas
                            </button>
                            <button type="button" class="btn btn-secondary analytics-tab-btn" id="btn-analytics-age" onclick="switchAnalyticsSubTab('age')">
                                <i class="fa-solid fa-cake-candles"></i> Analisis Mengikut Umur
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 1. BAHAGIAN 1: ANALISIS KESELURUHAN SEKOLAH -->
                <div id="analytics-subtab-school" class="analytics-subtab-content">
                    <!-- Stat Summary Cards for Analytics -->
                    <div class="stats-grid" style="margin-bottom: 1.75rem;">
                        <div class="card stat-card">
                            <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                            <div class="stat-info">
                                <h3 id="analytics-stat-total-students">0</h3>
                                <p>Jumlah Atlet</p>
                            </div>
                        </div>
                        <div class="card stat-card">
                            <div class="stat-icon"><i class="fa-solid fa-star"></i></div>
                            <div class="stat-info">
                                <h3 id="analytics-stat-avg-score">0.0</h3>
                                <p>Purata Skor Keseluruhan</p>
                            </div>
                        </div>
                        <div class="card stat-card">
                            <div class="stat-icon"><i class="fa-solid fa-medal"></i></div>
                            <div class="stat-info">
                                <h3 id="analytics-stat-best-comp" style="font-size: 1.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">-</h3>
                                <p>Komponen Terbaik</p>
                            </div>
                        </div>
                        <div class="card stat-card">
                            <div class="stat-icon"><i class="fa-solid fa-trophy"></i></div>
                            <div class="stat-info">
                                <h3 id="analytics-stat-top-sport" style="font-size: 1.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">-</h3>
                                <p>Sukan Dominan</p>
                            </div>
                        </div>
                    </div>

                    <div class="visuals-grid" style="margin-bottom: 1.75rem;">
                        <!-- Purata Komponen Ujian Lelaki vs Perempuan -->
                        <div class="card chart-card">
                            <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-bar" style="margin-right: 0.5rem;"></i>Purata Skor Mengikut Jantina (1 - 5)</h3>
                            <div class="chart-container">
                                <canvas id="groupPerformanceChart"></canvas>
                            </div>
                        </div>
                        <!-- Taburan Tahap Kecergasan Keseluruhan -->
                        <div class="card chart-card">
                            <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-pie" style="margin-right: 0.5rem;"></i>Taburan Tahap Kecergasan Murid</h3>
                            <div class="chart-container">
                                <canvas id="groupFitnessDistChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Taburan Potensi Sukan Teratas -->
                    <div class="card chart-card" style="min-height: 350px;">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-shapes" style="margin-right: 0.5rem;"></i>Taburan Potensi Sukan Bakat Atlet</h3>
                        <div class="chart-container">
                            <canvas id="groupSportsDistChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- 2. BAHAGIAN 2: ANALISIS KESELURUHAN MENGIKUT KELAS -->
                <div id="analytics-subtab-class" class="analytics-subtab-content" style="display: none;">
                    <div class="card chart-card" style="margin-bottom: 1.75rem; min-height: 350px;">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-simple" style="margin-right: 0.5rem;"></i>Perbandingan Purata Skor Kecergasan Mengikut Kelas</h3>
                        <div class="chart-container">
                            <canvas id="classPerformanceChart"></canvas>
                        </div>
                    </div>

                    <div class="card table-card">
                        <div class="table-header-bar">
                            <h3 style="margin: 0;"><i class="fa-solid fa-table-list" style="margin-right: 0.5rem;"></i>Perincian Prestasi Keseluruhan Mengikut Kelas</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="custom-table" id="analytics-class-table">
                                <thead>
                                    <tr>
                                        <th>Kelas</th>
                                        <th>Jumlah Atlet</th>
                                        <th>Purata Skor (1-5)</th>
                                        <th>Gred Purata</th>
                                        <th>Komponen Unggul</th>
                                        <th>Sukan Dominan</th>
                                    </tr>
                                </thead>
                                <tbody id="analytics-class-tbody">
                                    <!-- Dynamic content -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 3. BAHAGIAN 3: ANALISIS KESELURUHAN MENGIKUT UMUR -->
                <div id="analytics-subtab-age" class="analytics-subtab-content" style="display: none;">
                    <div class="visuals-grid" style="margin-bottom: 1.75rem;">
                        <!-- Skor Bateri Ujian Mengikut Umur -->
                        <div class="card chart-card">
                            <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-column" style="margin-right: 0.5rem;"></i>Perbandingan Prestasi 6 Ujian Mengikut Umur</h3>
                            <div class="chart-container">
                                <canvas id="agePerformanceChart"></canvas>
                            </div>
                        </div>
                        <!-- Taburan Bilangan Atlet Mengikut Umur -->
                        <div class="card chart-card">
                            <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-pie" style="margin-right: 0.5rem;"></i>Peratusan Bilangan Atlet Mengikut Umur</h3>
                            <div class="chart-container">
                                <canvas id="ageDistributionChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="card table-card">
                        <div class="table-header-bar">
                            <h3 style="margin: 0;"><i class="fa-solid fa-table-list" style="margin-right: 0.5rem;"></i>Perincian Prestasi & Kecergasan Mengikut Kumpulan Umur</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="custom-table" id="analytics-age-table">
                                <thead>
                                    <tr>
                                        <th>Kumpulan Umur</th>
                                        <th>Jumlah Atlet</th>
                                        <th>Purata Skor (1-5)</th>
                                        <th>Gred Purata</th>
                                        <th>Komponen Tertinggi</th>
                                        <th>Komponen Perlu Latihan</th>
                                    </tr>
                                </thead>
                                <tbody id="analytics-age-tbody">
                                    <!-- Dynamic content -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 9. PORTAL SEKOLAH (AKSES KOD SEKOLAH & KELAS/NAMA) -->
            <!-- ======================================================== -->
            <section id="individual-portal" class="tab-content">
                <div class="page-header">
                    <div class="page-title">
                        <h1 id="ind-school-title">Portal Sekolah</h1>
                        <p id="ind-school-subtitle">Akses data atlet mengikut <strong>Kelas</strong> atau <strong>Nama</strong> untuk melihat analisis spiderweb dan cadangan sukan.</p>
                    </div>
                    <div class="header-actions" style="display: flex; gap: 0.75rem; align-items: center;">
                        <button class="btn btn-primary" id="ind-btn-quick-register" onclick="switchIndividuView('register')">
                            <i class="fa-solid fa-user-plus"></i> Daftar Atlet
                        </button>
                        <button class="btn btn-secondary" onclick="handleLogout()" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
                            <i class="fa-solid fa-right-from-bracket"></i> Log Keluar
                        </button>
                    </div>
                </div>

                <!-- Sub-Navigation Bar Portal Individu: [ Senarai & Analisis ] vs [ + Daftar Atlet Baharu ] -->
                <div class="card" style="margin-bottom: 1.5rem; padding: 0.85rem 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <button type="button" class="btn btn-primary ind-view-tab-btn active" id="btn-ind-view-list" onclick="switchIndividuView('list')">
                                <i class="fa-solid fa-list-check"></i> Senarai & Analisis Atlet
                            </button>
                            <button type="button" class="btn btn-secondary ind-view-tab-btn" id="btn-ind-view-register" onclick="switchIndividuView('register')">
                                <i class="fa-solid fa-user-plus"></i> + Daftar Atlet Baharu
                            </button>
                        </div>
                        
                        <div id="ind-school-badge-info" class="badge badge-fitness" style="font-size: 0.85rem; padding: 0.4rem 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                            <i class="fa-solid fa-school"></i> <span id="ind-school-badge-name">Sekolah Berdaftar</span>
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- VIEW 1: SENARAI ATLET & ANALISIS SPIDERWEB     -->
                <!-- ============================================== -->
                <div id="ind-view-list-container">
                    <!-- Pilihan Mod Akses Individu: Mengikut NAMA vs Mengikut KELAS -->
                    <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                            <div style="display: flex; gap: 0.5rem;">
                                <button type="button" class="btn btn-primary ind-mode-btn active" id="btn-ind-mode-name" onclick="switchIndividuMode('name')">
                                    <i class="fa-solid fa-user"></i> Akses Mengikut Nama (Senarai Atlet)
                                </button>
                                <button type="button" class="btn btn-secondary ind-mode-btn" id="btn-ind-mode-class" onclick="switchIndividuMode('class')">
                                    <i class="fa-solid fa-users-rectangle"></i> Akses Mengikut Kelas
                                </button>
                            </div>
                            
                            <!-- Search Box for Individual -->
                            <div class="table-search" style="min-width: 250px;">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" id="ind-search-student" placeholder="Cari nama atlet..." oninput="renderIndividuList()">
                            </div>
                        </div>
                    </div>

                    <!-- PAPARAN MOD KELAS: PILIHAN KELAS DI SEKOLAH -->
                    <div id="ind-class-selector-area" style="display: none; margin-bottom: 1.5rem;">
                        <div class="card" style="padding: 1.25rem;">
                            <h4 style="margin-bottom: 0.75rem; color: var(--accent-purple);">
                                <i class="fa-solid fa-chalkboard-user" style="margin-right: 0.4rem;"></i>Pilih Kelas Untuk Papar Semua Murid:
                            </h4>
                            <div id="ind-classes-pills" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <!-- Pill kelas dinamik -->
                            </div>
                        </div>
                    </div>

                    <!-- JADUAL SENARAI ATLET BAGI AKAUN INDIVIDU -->
                    <div class="card table-card" style="margin-bottom: 2rem;">
                        <div class="table-header-bar">
                            <h4 id="ind-table-title" style="margin: 0; color: var(--accent-primary);">Senarai Atlet Sekolah</h4>
                            <span id="ind-count-badge" class="badge badge-fitness">0 Atlet</span>
                        </div>
                        <div class="table-responsive">
                            <table class="custom-table" id="ind-students-table">
                                <thead>
                                    <tr>
                                        <th>Nama Penuh Atlet</th>
                                        <th>Kelas</th>
                                        <th>Umur</th>
                                        <th>Jantina</th>
                                        <th>BMI</th>
                                        <th>Status Ujian</th>
                                        <th>Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                                            Memuatkan senarai atlet...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ============================================== -->
                <!-- VIEW 2: PENDAFTARAN ATLET BAHARU (INDIVIDU)    -->
                <!-- ============================================== -->
                <div id="ind-view-register-container" style="display: none;">
                    <!-- Banner Info Sekolah Aktif -->
                    <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <h4 style="margin: 0 0 0.35rem 0; color: var(--accent-primary); font-size: 1.05rem;">
                                <i class="fa-solid fa-school-circle-check" style="margin-right: 0.5rem;"></i>Pendaftaran Atlet: <span id="ind-reg-school-name" style="color: #fff;">-</span>
                            </h4>
                            <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary);">
                                Kod Sekolah: <strong id="ind-reg-school-code" style="color: var(--accent-primary);">-</strong> &bull; Semua atlet akan didaftarkan secara automatik di bawah sekolah ini.
                            </p>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="switchIndividuView('list')">
                            <i class="fa-solid fa-arrow-left"></i> Kembali ke Senarai Atlet
                        </button>
                    </div>

                    <div class="card" style="max-width: 900px; margin: 0 auto 2rem auto; padding: 1.5rem;">
                        <!-- 3 Pilihan Kaedah Pendaftaran Tab Switcher -->
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap;">
                            <button type="button" class="btn btn-primary ind-method-tab-btn active" id="btn-ind-method-auto" onclick="switchIndRegMethod('auto')">
                                <i class="fa-solid fa-keyboard"></i> Auto Key-In Manual
                            </button>
                            <button type="button" class="btn btn-secondary ind-method-tab-btn" id="btn-ind-method-excel" onclick="switchIndRegMethod('excel')">
                                <i class="fa-solid fa-file-excel"></i> Masukkan Fail Excel
                            </button>
                            <button type="button" class="btn btn-secondary ind-method-tab-btn" id="btn-ind-method-paste" onclick="switchIndRegMethod('paste')">
                                <i class="fa-solid fa-paste"></i> Copy & Paste
                            </button>
                        </div>

                        <!-- KAEDAH A: AUTO KEY-IN BORANG MANUAL (INDIVIDU) -->
                        <div id="ind-reg-method-auto-area">
                            <form id="ind-register-form">
                                <div class="form-grid">
                                    <div class="form-group" style="grid-column: span 2;">
                                        <label for="ind-reg-name">Nama Penuh Murid</label>
                                        <input type="text" id="ind-reg-name" class="form-control" placeholder="Contoh: Muhammad Ali Bin Ahmad" required>
                                    </div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="ind-reg-gender">Jantina</label>
                                        <select id="ind-reg-gender" class="form-control" required>
                                            <option value="" disabled selected>Pilih Jantina</option>
                                            <option value="Lelaki">Lelaki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="ind-reg-age">Umur (Tahun)</label>
                                        <input type="number" id="ind-reg-age" class="form-control" min="6" max="18" placeholder="Contoh: 10" required>
                                    </div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="ind-reg-class">Kelas / Tingkatan</label>
                                        <input type="text" id="ind-reg-class" class="form-control" placeholder="Contoh: 4 Cerdik" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="ind-reg-height">Tinggi (cm)</label>
                                        <input type="number" step="0.1" id="ind-reg-height" class="form-control" placeholder="Contoh: 135.5" required oninput="calculateIndLiveBMI()">
                                    </div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="ind-reg-weight">Berat (kg)</label>
                                        <input type="number" step="0.1" id="ind-reg-weight" class="form-control" placeholder="Contoh: 32.4" required oninput="calculateIndLiveBMI()">
                                    </div>
                                    <div class="form-group">
                                        <label>BMI (Auto-Calculated)</label>
                                        <div id="ind-reg-live-bmi" class="form-control" style="background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: var(--accent-primary);">
                                            <span>-</span>
                                            <span class="badge badge-fitness" style="font-size: 0.75rem;">Sedia</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
                                    <button type="button" class="btn btn-secondary" onclick="switchIndividuView('list')">Batal</button>
                                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Simpan Murid</button>
                                </div>
                            </form>
                        </div>

                        <!-- KAEDAH B: IMPORT FAIL EXCEL (.XLSX / .CSV) (INDIVIDU) -->
                        <div id="ind-reg-method-excel-area" style="display: none;">
                            <div style="border: 2px dashed rgba(0, 242, 254, 0.4); border-radius: 12px; padding: 2.5rem 1.5rem; text-align: center; background: rgba(0, 242, 254, 0.02); margin-bottom: 1.5rem;">
                                <i class="fa-solid fa-file-excel" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                                <h3 style="margin-bottom: 0.5rem;">Muat Naik Fail Excel / Spreadsheet (.xlsx, .xls, .csv)</h3>
                                <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 500px; margin: 0 auto 1.5rem auto;">
                                    Susunan lajur fail yang disokong: <strong>Nama | Jantina (L/P) | Umur | Kelas | Tinggi (cm) | Berat (kg)</strong>
                                </p>
                                <input type="file" id="ind-excel-file-input" accept=".xlsx, .xls, .csv" style="display: none;" onchange="handleIndExcelUpload(event)">
                                <button type="button" class="btn btn-primary" onclick="document.getElementById('ind-excel-file-input').click()">
                                    <i class="fa-solid fa-upload"></i> Pilih Fail Dari Komputer
                                </button>
                            </div>

                            <!-- Preview Excel Data Table -->
                            <div id="ind-excel-preview-container" style="display: none;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                                    <h4 id="ind-excel-preview-count" style="color: var(--accent-primary); margin: 0;">0 Atlet Dikesan</h4>
                                    <button type="button" class="btn btn-primary" id="ind-btn-save-excel-athletes" onclick="saveIndBatchAthletes('excel')">
                                        <i class="fa-solid fa-check-double"></i> Sahkan & Simpan Semua Atlet
                                    </button>
                                </div>
                                <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                    <table class="custom-table" id="ind-excel-preview-table">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Jantina</th>
                                                <th>Umur</th>
                                                <th>Kelas</th>
                                                <th>Tinggi</th>
                                                <th>Berat</th>
                                                <th>BMI</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- KAEDAH C: COPY & PASTE DARI SPREADSHEET / TABLE (INDIVIDU) -->
                        <div id="ind-reg-method-paste-area" style="display: none;">
                            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                                Salin (Copy) sel dari <strong>Microsoft Excel</strong> atau <strong>Google Sheets</strong> dan tampal (Paste) ke dalam kotak teks di bawah.
                                Format lajur: <code>Nama Penuh [Tab/Koma] Jantina [Tab] Umur [Tab] Kelas [Tab] Tinggi [Tab] Berat</code>
                            </p>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <textarea id="ind-paste-data-input" class="form-control" rows="8" placeholder="Contoh:
Muhammad Ali Bin Ahmad	Lelaki	10	4 Cerdik	135.5	32.4
Nur Farah Hanim	Perempuan	10	4 Cerdik	130.0	29.5
Tan Wei Lun	Lelaki	11	5 Bestari	140.2	35.0" style="font-family: monospace; font-size: 0.85rem;"></textarea>
                            </div>

                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
                                <button type="button" class="btn btn-secondary" onclick="parseIndPastedData()">
                                    <i class="fa-solid fa-magnifying-glass"></i> Pratonton Data Tampalan
                                </button>
                                <button type="button" class="btn btn-primary" id="ind-btn-save-pasted-athletes" style="display: none;" onclick="saveIndBatchAthletes('paste')">
                                    <i class="fa-solid fa-check-double"></i> Sahkan & Simpan Atlet
                                </button>
                            </div>

                            <!-- Preview Pasted Data Table -->
                            <div id="ind-paste-preview-container" style="display: none;">
                                <h4 id="ind-paste-preview-count" style="color: var(--accent-primary); margin-bottom: 0.75rem;">0 Atlet Dikesan</h4>
                                <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                    <table class="custom-table" id="ind-paste-preview-table">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Jantina</th>
                                                <th>Umur</th>
                                                <th>Kelas</th>
                                                <th>Tinggi</th>
                                                <th>Berat</th>
                                                <th>BMI</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Laporan Murid Read-only Container (Apabila Atlet Dipilih) -->
                <div id="student-portal-report-container" style="display: none;">
                    <!-- Diisi secara dinamik dengan profil murid, spiderweb & PDF export -->
                </div>
            </section>
        </main>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL PENGESAHAN PADAM (CONFIRMATION POPUP) -->
    <!-- ======================================================== -->
    <div id="confirm-modal-overlay" class="modal-overlay" style="display: none;">
        <div class="modal-card">
            <div class="modal-icon-wrapper">
                <i class="fa-solid fa-trash-can" style="color: #c41230; font-size: 2rem;"></i>
            </div>
            <div class="modal-body-content" style="margin-bottom: 1.5rem; width: 100%;">
                <h3 id="confirm-modal-title" style="margin: 0 0 0.5rem 0; color: #000000; font-size: 1.35rem; font-weight: 700; font-family: var(--font-outfit);">Pengesahan Padam</h3>
                <p id="confirm-modal-message" style="color: #4b5563; font-size: 0.95rem; line-height: 1.5; margin: 0;">Adakah anda pasti mahu memadam rekod ini? Tindakan ini tidak boleh diundur.</p>
            </div>
            <div class="modal-actions" style="display: flex; gap: 0.85rem; width: 100%;">
                <button type="button" class="btn btn-secondary" id="confirm-modal-cancel-btn" style="flex: 1; padding: 0.75rem 1rem; border: 1px solid #d1d5db; color: #374151; font-weight: 600; border-radius: 8px;">
                    <i class="fa-solid fa-xmark" style="margin-right: 0.35rem;"></i> Batal
                </button>
                <button type="button" class="btn btn-danger" id="confirm-modal-confirm-btn" style="flex: 1; padding: 0.75rem 1rem; background: #c41230; border-color: #c41230; color: #ffffff; font-weight: 700; border-radius: 8px;">
                    <i class="fa-solid fa-trash-can" style="margin-right: 0.35rem;"></i> Ya, Padam
                </button>
            </div>
        </div>
    </div>

    <!-- Custom App JavaScript -->
    <script src="app.js?v=<?= time() ?>"></script>
</body>
</html>
