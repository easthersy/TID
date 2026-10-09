// ==========================================
// TID ANALYST - JAVASCRIPT UTAMA
// Sistem Analisis Talent Identification Sekolah Rendah
// ==========================================

// Sample Fallback Mock Data for instant visualization
const initialMockSchools = [
    { id: "sch_skttdi", name: "SK Taman Tun Dr Ismail", code: "SKTTDI2026", password: "tid123", created_at: "2026-10-01 04:58:47" },
    { id: "sch_skss", name: "SK Seri Serdang", code: "SKSS2026", password: "tid123", created_at: "2026-10-05 08:30:00" },
    { id: "sch_skpp9", name: "SK Putrajaya Presint 9(1)", code: "SKPP9", password: "tid123", created_at: "2026-10-06 09:15:00" }
];

const initialMockStudents = [
    { id: "std_001", name: "Muhammad Farhan Bin Roslan", gender: "Lelaki", age: 10, height: 138.2, weight: 31.5, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "4 Cerdik", created_at: "2026-09-10 09:00:00", scores: { sit_reach: [24, 25, 26], sit_up: [22, 24], long_jump: [165, 170], sprint_10m: [2.05], shuttle_run: [9.8, 9.6], hand_eye: [16] } },
    { id: "std_002", name: "Aishah Humaira Binti Mohd Yazid", gender: "Perempuan", age: 11, height: 142.0, weight: 34.0, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "5 Bestari", created_at: "2026-09-10 09:15:00", scores: { sit_reach: [32, 34, 35], sit_up: [18, 20], long_jump: [140, 145], sprint_10m: [2.35], shuttle_run: [11.2, 10.9], hand_eye: [19] } },
    { id: "std_003", name: "Chong Wei Jie", gender: "Lelaki", age: 10, height: 135.0, weight: 30.0, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "4 Cerdik", created_at: "2026-09-10 09:30:00", scores: { sit_reach: [18, 19, 20], sit_up: [15, 17], long_jump: [135, 140], sprint_10m: [2.45], shuttle_run: [11.8, 11.5], hand_eye: [14] } },
    { id: "std_004", name: "Nur Damia Izzati Binti Kamarul", gender: "Perempuan", age: 10, height: 136.5, weight: 29.8, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "4 Gemilang", created_at: "2026-09-10 09:45:00", scores: { sit_reach: [28, 29, 30], sit_up: [16, 18], long_jump: [130, 138], sprint_10m: [2.40], shuttle_run: [11.4, 11.1], hand_eye: [17] } },
    { id: "std_005", name: "Haris Danial Bin Syahrul", gender: "Lelaki", age: 11, height: 145.0, weight: 37.2, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "5 Bestari", created_at: "2026-09-11 10:00:00", scores: { sit_reach: [20, 22, 22], sit_up: [26, 28], long_jump: [175, 180], sprint_10m: [1.95], shuttle_run: [9.4, 9.2], hand_eye: [18] } },
    { id: "std_006", name: "Sarah Batrisyia Binti Azman", gender: "Perempuan", age: 11, height: 140.0, weight: 33.5, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "5 Amanah", created_at: "2026-09-11 10:15:00", scores: { sit_reach: [26, 27, 28], sit_up: [19, 21], long_jump: [148, 152], sprint_10m: [2.25], shuttle_run: [10.6, 10.4], hand_eye: [15] } },
    { id: "std_007", name: "Adam Harith Bin Zulkifli", gender: "Lelaki", age: 12, height: 152.0, weight: 42.0, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "6 Dinamik", created_at: "2026-09-12 11:00:00", scores: { sit_reach: [25, 27, 28], sit_up: [30, 32], long_jump: [190, 195], sprint_10m: [1.88], shuttle_run: [8.9, 8.7], hand_eye: [20] } },
    { id: "std_008", name: "Puteri Qistina Binti Ridzuan", gender: "Perempuan", age: 12, height: 149.0, weight: 38.5, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "6 Dinamik", created_at: "2026-09-12 11:15:00", scores: { sit_reach: [35, 36, 38], sit_up: [24, 25], long_jump: [160, 165], sprint_10m: [2.15], shuttle_run: [10.0, 9.8], hand_eye: [18] } },
    { id: "std_009", name: "Kavinesh a/l Murugan", gender: "Lelaki", age: 12, height: 150.5, weight: 40.2, school: "SK Taman Tun Dr Ismail", school_code: "SKTTDI2026", class: "6 Kreatif", created_at: "2026-09-12 11:30:00", scores: { sit_reach: [21, 23, 24], sit_up: [22, 23], long_jump: [170, 174], sprint_10m: [2.10], shuttle_run: [9.9, 9.7], hand_eye: [16] } },
    { id: "std_010", name: "Danish Hakimi Bin Faizal", gender: "Lelaki", age: 10, height: 137.0, weight: 32.0, school: "SK Seri Serdang", school_code: "SKSS2026", class: "4 Cerdik", created_at: "2026-09-15 08:30:00", scores: { sit_reach: [21, 22, 23], sit_up: [20, 22], long_jump: [155, 160], sprint_10m: [2.18], shuttle_run: [10.2, 10.0], hand_eye: [15] } },
    { id: "std_011", name: "Nurul Iman Binti Syafiq", gender: "Perempuan", age: 10, height: 134.0, weight: 28.5, school: "SK Seri Serdang", school_code: "SKSS2026", class: "4 Gemilang", created_at: "2026-09-15 08:45:00", scores: { sit_reach: [30, 31, 33], sit_up: [17, 19], long_jump: [135, 142], sprint_10m: [2.30], shuttle_run: [11.0, 10.8], hand_eye: [17] } },
    { id: "std_012", name: "Luqman Hakim Bin Johari", gender: "Lelaki", age: 11, height: 144.0, weight: 36.0, school: "SK Seri Serdang", school_code: "SKSS2026", class: "5 Bestari", created_at: "2026-09-15 09:00:00", scores: { sit_reach: [23, 25, 26], sit_up: [25, 27], long_jump: [172, 178], sprint_10m: [2.00], shuttle_run: [9.5, 9.3], hand_eye: [19] } },
    { id: "std_013", name: "Hannah Maisarah Binti Taufik", gender: "Perempuan", age: 11, height: 141.5, weight: 35.0, school: "SK Seri Serdang", school_code: "SKSS2026", class: "5 Amanah", created_at: "2026-09-15 09:15:00", scores: { sit_reach: [29, 30, 32], sit_up: [21, 23], long_jump: [145, 150], sprint_10m: [2.20], shuttle_run: [10.5, 10.3], hand_eye: [16] } },
    { id: "std_014", name: "Muhammad Rayyan Bin Haziq", gender: "Lelaki", age: 12, height: 153.5, weight: 44.0, school: "SK Seri Serdang", school_code: "SKSS2026", class: "6 Dinamik", created_at: "2026-09-16 10:00:00", scores: { sit_reach: [27, 28, 30], sit_up: [29, 31], long_jump: [185, 192], sprint_10m: [1.90], shuttle_run: [9.0, 8.8], hand_eye: [19] } },
    { id: "std_015", name: "Tan Mei Ling", gender: "Perempuan", age: 12, height: 148.0, weight: 37.0, school: "SK Seri Serdang", school_code: "SKSS2026", class: "6 Kreatif", created_at: "2026-09-16 10:15:00", scores: { sit_reach: [36, 37, 39], sit_up: [23, 24], long_jump: [158, 162], sprint_10m: [2.12], shuttle_run: [10.1, 9.9], hand_eye: [18] } },
    { id: "std_016", name: "Ahmad Irfan Bin Khairul", gender: "Lelaki", age: 10, height: 139.0, weight: 33.0, school: "SK Putrajaya Presint 9(1)", school_code: "SKPP9", class: "4 Cerdik", created_at: "2026-09-18 08:30:00", scores: { sit_reach: [25, 26, 28], sit_up: [21, 23], long_jump: [162, 168], sprint_10m: [2.10], shuttle_run: [9.9, 9.7], hand_eye: [17] } },
    { id: "std_017", name: "Zara Sophia Binti Nabil", gender: "Perempuan", age: 10, height: 135.0, weight: 30.5, school: "SK Putrajaya Presint 9(1)", school_code: "SKPP9", class: "4 Gemilang", created_at: "2026-09-18 08:45:00", scores: { sit_reach: [31, 33, 34], sit_up: [18, 20], long_jump: [138, 144], sprint_10m: [2.28], shuttle_run: [10.9, 10.7], hand_eye: [18] } },
    { id: "std_018", name: "Thivagar a/l Selvan", gender: "Lelaki", age: 11, height: 146.0, weight: 38.0, school: "SK Putrajaya Presint 9(1)", school_code: "SKPP9", class: "5 Bestari", created_at: "2026-09-18 09:00:00", scores: { sit_reach: [22, 24, 25], sit_up: [27, 29], long_jump: [178, 183], sprint_10m: [1.98], shuttle_run: [9.3, 9.1], hand_eye: [18] } },
    { id: "std_019", name: "Nur Aina Mardhiah Binti Zaki", gender: "Perempuan", age: 11, height: 142.5, weight: 36.0, school: "SK Putrajaya Presint 9(1)", school_code: "SKPP9", class: "5 Amanah", created_at: "2026-09-18 09:15:00", scores: { sit_reach: [28, 30, 31], sit_up: [20, 22], long_jump: [146, 151], sprint_10m: [2.22], shuttle_run: [10.7, 10.5], hand_eye: [16] } },
    { id: "std_020", name: "Izz Zafran Bin Shahrizal", gender: "Lelaki", age: 12, height: 154.0, weight: 43.5, school: "SK Putrajaya Presint 9(1)", school_code: "SKPP9", class: "6 Dinamik", created_at: "2026-09-19 10:00:00", scores: { sit_reach: [29, 31, 32], sit_up: [31, 33], long_jump: [192, 198], sprint_10m: [1.85], shuttle_run: [8.8, 8.6], hand_eye: [20] } }
];

// Global App State
let students = [...initialMockStudents];
let schools = [...initialMockSchools];
let admins = [];
let testsConfig = {};
let selectedStudentId = null;
let currentRole = null; // 'Admin' atau 'Individu'
let currentSchool = null; // Data sekolah bagi sesi Individu
let charts = {}; // Menyimpan objek Chart.js
let individualMode = 'name'; // 'name' atau 'class'
let individualSelectedClass = null;
let currentTestBattery = 1; // 1 = Bateri Asas, 2 = Lanjutan
let excelParsedAthletes = [];
let pastedParsedAthletes = [];

// Tunggu dokumen dimuatkan sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Inisialisasi Aplikasi
async function initApp() {
    setupTabNavigation();
    setupLoginSystem();
    setupSchoolForms();
    setupAdminRegisterForms();
    setupAthleteRegistration();
    setupIndividuAthleteRegistration();
    setupSearch();
    await loadInitialData();
    checkSession();
}

// ==========================================
// 1. PENGURUSAN TAB & SESI LOG MASUK
// ==========================================

function setupTabNavigation() {
    const menuItems = document.querySelectorAll('.sidebar .menu-list .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Sembunyikan semua tab & nyahaktifkan menu
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebar .menu-list .menu-item').forEach(item => item.classList.remove('active'));

    const selectedTab = document.getElementById(tabId);
    const selectedMenu = document.querySelector(`.sidebar .menu-list .menu-item[data-tab="${tabId}"]`);

    if (selectedTab) selectedTab.classList.add('active');
    if (selectedMenu) selectedMenu.classList.add('active');

    // Refresh data bersesuaian
    if (tabId === 'dashboard') {
        renderDashboard();
    } else if (tabId === 'schools') {
        loadSchools();
    } else if (tabId === 'students') {
        renderStudentsTable();
    } else if (tabId === 'register') {
        populateSchoolDropdowns();
    } else if (tabId === 'tests-mgmt') {
        loadTestsConfig();
        populateQuickSelectAthlete();
    } else if (tabId === 'accounts') {
        loadAdmins();
        loadSchools();
    } else if (tabId === 'analytics') {
        renderAnalytics();
    } else if (tabId === 'individual-portal') {
        renderIndividuPortal();
    }
}

function setupLoginSystem() {
    const cardAdmin = document.getElementById('card-role-admin');
    const cardIndividu = document.getElementById('card-role-individual');
    const schoolContainer = document.getElementById('school-select-container');
    const schoolSelect = document.getElementById('login-school-select');
    const btnSchoolEnter = document.getElementById('btn-school-enter');
    const btnSchoolBack = document.getElementById('btn-school-back');

    // 1. Klik Individu -> Akses Terus Penuh
    if (cardAdmin) {
        cardAdmin.addEventListener('click', () => {
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
            cardAdmin.classList.add('selected');
            loginUser('Admin', {
                id: 'adm_default',
                username: 'admin',
                name: 'Pengguna Individu'
            });
        });
    }

    // 2. Klik Sekolah -> Papar Pemilihan Sekolah
    if (cardIndividu) {
        cardIndividu.addEventListener('click', () => {
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
            cardIndividu.classList.add('selected');
            if (schoolContainer) schoolContainer.style.display = 'block';
            populateSchoolDropdowns();
        });
    }

    // 3. Masuk Portal Sekolah
    if (btnSchoolEnter) {
        btnSchoolEnter.addEventListener('click', () => {
            const code = schoolSelect ? schoolSelect.value : '';
            if (!code) {
                alert('Sila pilih sekolah anda terlebih dahulu daripada menu pilihan.');
                return;
            }
            const foundSchool = schools.find(s => s.code === code);
            if (foundSchool) {
                loginUser('Individu', foundSchool);
            } else {
                alert('Sekolah tidak dijumpai dalam pangkalan data.');
            }
        });
    }

    // 4. Butang Kembali
    if (btnSchoolBack) {
        btnSchoolBack.addEventListener('click', () => {
            if (schoolContainer) schoolContainer.style.display = 'none';
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
        });
    }
}

function loginUser(role, data) {
    sessionStorage.setItem('tid_logged_in', 'true');
    sessionStorage.setItem('tid_current_role', role);
    if (role === 'Individu' && data) {
        sessionStorage.setItem('tid_school_data', JSON.stringify(data));
        currentSchool = data;
    } else if (role === 'Admin' && data) {
        sessionStorage.setItem('tid_admin_data', JSON.stringify(data));
    }
    setRole(role, data);
}

function handleLogout() {
    sessionStorage.removeItem('tid_logged_in');
    sessionStorage.removeItem('tid_current_role');
    sessionStorage.removeItem('tid_school_data');
    sessionStorage.removeItem('tid_admin_data');

    currentRole = null;
    currentSchool = null;
    selectedStudentId = null;

    document.body.classList.remove('logged-in', 'role-admin', 'role-individual');

    const schoolContainer = document.getElementById('school-select-container');
    if (schoolContainer) schoolContainer.style.display = 'none';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
}

function checkSession() {
    const isLoggedIn = sessionStorage.getItem('tid_logged_in') === 'true';
    const role = sessionStorage.getItem('tid_current_role');

    if (isLoggedIn && role) {
        if (role === 'Individu') {
            const rawSchool = sessionStorage.getItem('tid_school_data');
            currentSchool = rawSchool ? JSON.parse(rawSchool) : null;
        }
        setRole(role, currentSchool);
    } else {
        handleLogout();
    }
}

function setRole(role, data) {
    currentRole = role;
    document.body.classList.add('logged-in');
    document.body.classList.remove('role-admin', 'role-individual');

    const roleBadge = document.getElementById('sidebar-role-badge');
    const schoolInfo = document.getElementById('sidebar-school-info');

    if (role === 'Admin') {
        document.body.classList.add('role-admin');
        if (roleBadge) roleBadge.innerText = 'Individu';
        if (schoolInfo) schoolInfo.innerText = 'Akses Individu (Penuh)';
        switchTab('dashboard');
    } else if (role === 'Individu') {
        document.body.classList.add('role-individual');
        if (roleBadge) roleBadge.innerText = 'Sekolah';
        if (schoolInfo) schoolInfo.innerText = (currentSchool && currentSchool.name) ? currentSchool.name : 'Portal Sekolah';
        switchTab('individual-portal');
        renderIndividuPortal();
    }
}

// ==========================================
// 2. PEMUATAN DATA AWAL
// ==========================================

async function loadInitialData() {
    try {
        await Promise.all([
            loadStudents(),
            loadSchools(),
            loadTestsConfig()
        ]);
        populateSchoolDropdowns();
        renderAnalytics();
    } catch (e) {
        console.warn('Initial load error:', e);
    }
}

async function loadStudents() {
    try {
        const res = await fetch('api.php?action=list');
        if (res.ok) {
            students = await res.json();
            renderDashboard();
            renderStudentsTable();
            populateQuickSelectAthlete();
            renderAnalytics();
            if (currentRole === 'Individu') {
                renderIndividuPortal();
            }
        }
    } catch (e) {
        console.error('Gagal memuatkan data atlet:', e);
    }
}

async function loadSchools() {
    try {
        const res = await fetch('api.php?action=list_schools');
        if (res.ok) {
            schools = await res.json();
            renderSchoolsTable();
            populateSchoolDropdowns();
            renderAnalytics();
            const countEl = document.getElementById('stat-total-schools');
            if (countEl) countEl.innerText = schools.length;
        }
    } catch (e) {
        console.error('Gagal memuatkan data sekolah:', e);
    }
}

async function loadAdmins() {
    try {
        const res = await fetch('api.php?action=list_admins');
        if (res.ok) {
            admins = await res.json();
            renderAdminsTable();
        }
    } catch (e) {
        console.error('Gagal memuatkan data admin:', e);
    }
}

async function loadTestsConfig() {
    try {
        const res = await fetch('api.php?action=get_tests');
        if (res.ok) {
            testsConfig = await res.json();
            renderMetricsConfig();
        }
    } catch (e) {
        console.error('Gagal memuatkan konfigurasi ujian:', e);
    }
}

// ==========================================
// 3. PENGURUSAN SEKOLAH (ADMIN)
// ==========================================

function setupSchoolForms() {
    const form = document.getElementById('register-school-form');
    const nameInput = document.getElementById('school-name-input');
    const codeInput = document.getElementById('school-code-input');
    const pwdInput = document.getElementById('school-password-input');
    const btnGenCode = document.getElementById('btn-generate-school-code');
    const btnGenPwd = document.getElementById('btn-generate-school-pwd');

    function autoGenCode() {
        const name = nameInput.value.trim();
        let acronym = '';
        if (name) {
            const words = name.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
            words.forEach(w => { if (w.length > 0) acronym += w[0].toUpperCase(); });
        }
        if (acronym.length < 2) acronym = 'SK';
        const rand = Math.floor(100 + Math.random() * 900);
        codeInput.value = (acronym.substring(0, 5) + rand).toUpperCase();
    }

    function autoGenPwd() {
        const rand = Math.floor(1000 + Math.random() * 9000);
        pwdInput.value = 'tid' + rand;
    }

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            nameInput.value = nameInput.value.toUpperCase();
            if (!codeInput.value) autoGenCode();
            if (!pwdInput.value) autoGenPwd();
        });
    }

    if (btnGenCode) btnGenCode.addEventListener('click', autoGenCode);
    if (btnGenPwd) btnGenPwd.addEventListener('click', autoGenPwd);

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = nameInput.value.trim().toUpperCase();
            const code = codeInput.value.trim().toUpperCase();
            const password = pwdInput.value.trim();
            const errEl = document.getElementById('school-form-error');
            const succEl = document.getElementById('school-form-success');

            errEl.style.display = 'none';
            succEl.style.display = 'none';

            try {
                const res = await fetch('api.php?action=register_school', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, code, password })
                });
                const result = await res.json();
                if (res.ok && result.success) {
                    succEl.style.display = 'block';
                    form.reset();
                    await loadSchools();
                    setTimeout(() => succEl.style.display = 'none', 3000);
                } else {
                    errEl.innerText = result.error || 'Gagal mendaftarkan sekolah.';
                    errEl.style.display = 'block';
                }
            } catch (err) {
                errEl.innerText = 'Ralat menyambung ke pelayan.';
                errEl.style.display = 'block';
            }
        });
    }
}

function renderSchoolsTable() {
    const tbody = document.querySelector('#schools-table tbody');
    if (!tbody) return;

    if (schools.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">Tiada sekolah berdaftar. Sila daftar sekolah pertama.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    schools.forEach(sch => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${sch.name}</strong></td>
            <td>
                <span class="school-code-badge">
                    ${sch.code}
                    <i class="fa-solid fa-copy" style="cursor: pointer; opacity: 0.7;" title="Salin Kod" onclick="copyTextToClipboard('${sch.code}')"></i>
                </span>
            </td>
            <td><code>${sch.password}</code></td>
            <td><span class="badge badge-fitness">${sch.student_count || 0} Atlet</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteSchool('${sch.id}')" title="Padam Sekolah">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================
// PENGESAHAN PADAM (CONFIRMATION MODAL HELPER)
// ==========================================
function openConfirmModal({ title = 'Pengesahan Padam', message = 'Adakah anda pasti?', confirmText = 'Ya, Padam', cancelText = 'Batal' }) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('confirm-modal-overlay');
        const titleEl = document.getElementById('confirm-modal-title');
        const msgEl = document.getElementById('confirm-modal-message');
        const cancelBtn = document.getElementById('confirm-modal-cancel-btn');
        const confirmBtn = document.getElementById('confirm-modal-confirm-btn');

        if (!overlay || !titleEl || !msgEl || !cancelBtn || !confirmBtn) {
            resolve(window.confirm(message));
            return;
        }

        titleEl.innerText = title;
        msgEl.innerText = message;
        confirmBtn.innerHTML = `<i class="fa-solid fa-trash-can" style="margin-right: 0.35rem;"></i> ${confirmText}`;
        cancelBtn.innerHTML = `<i class="fa-solid fa-xmark" style="margin-right: 0.35rem;"></i> ${cancelText}`;

        overlay.style.display = 'flex';

        function cleanup(result) {
            overlay.style.display = 'none';
            cancelBtn.removeEventListener('click', onCancel);
            confirmBtn.removeEventListener('click', onConfirm);
            overlay.removeEventListener('click', onOverlayClick);
            resolve(result);
        }

        function onCancel() { cleanup(false); }
        function onConfirm() { cleanup(true); }
        function onOverlayClick(e) {
            if (e.target === overlay) cleanup(false);
        }

        cancelBtn.addEventListener('click', onCancel);
        confirmBtn.addEventListener('click', onConfirm);
        overlay.addEventListener('click', onOverlayClick);
    });
}

async function deleteSchool(id) {
    const confirmed = await openConfirmModal({
        title: 'Padam Data Sekolah',
        message: 'Adakah anda pasti mahu memadam sekolah ini? Rekod atlet berdaftar di bawah sekolah ini mungkin terjejas.',
        confirmText: 'Ya, Padam Sekolah'
    });
    if (!confirmed) return;

    try {
        const res = await fetch('api.php?action=delete_school', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            schools = schools.filter(s => s.id !== id);
            await loadSchools();
        } else {
            alert(result.error || 'Gagal memadam sekolah.');
        }
    } catch (e) {
        schools = schools.filter(s => s.id !== id);
        renderSchoolsTable();
        populateSchoolDropdowns();
    }
}

function populateSchoolDropdowns() {
    const regSelect = document.getElementById('reg-select-school');
    const filterSelect = document.getElementById('filter-admin-school');

    if (regSelect) {
        const currentVal = regSelect.value;
        regSelect.innerHTML = '<option value="" disabled selected>Pilih Sekolah Berdaftar...</option>';
        schools.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code;
            opt.setAttribute('data-name', s.name);
            opt.innerText = `${s.name} (${s.code})`;
            regSelect.appendChild(opt);
        });
        if (currentVal) regSelect.value = currentVal;
    }

    if (filterSelect) {
        const currentVal = filterSelect.value;
        filterSelect.innerHTML = '<option value="">Semua Sekolah</option>';
        schools.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code;
            opt.innerText = `${s.name} (${s.code})`;
            filterSelect.appendChild(opt);
        });
        if (currentVal) filterSelect.value = currentVal;
    }

    const analyticsSchoolSelect = document.getElementById('analytics-school-filter');
    if (analyticsSchoolSelect) {
        const currentVal = analyticsSchoolSelect.value;
        analyticsSchoolSelect.innerHTML = '<option value="">Semua Sekolah (Keseluruhan)</option>';
        schools.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.name;
            opt.innerText = `${s.name} (${s.code})`;
            analyticsSchoolSelect.appendChild(opt);
        });
        if (currentVal) analyticsSchoolSelect.value = currentVal;
    }

    const loginSchoolSelect = document.getElementById('login-school-select');
    if (loginSchoolSelect) {
        const currentVal = loginSchoolSelect.value;
        loginSchoolSelect.innerHTML = '<option value="" disabled selected>Pilih Sekolah Berdaftar...</option>';
        schools.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code;
            opt.setAttribute('data-name', s.name);
            opt.innerText = `${s.name} (${s.code})`;
            loginSchoolSelect.appendChild(opt);
        });
        if (currentVal) loginSchoolSelect.value = currentVal;
    }
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Kod "${text}" berjaya disalin ke papan keratan (clipboard)!`);
    }).catch(() => {
        prompt("Salin kod sekolah:", text);
    });
}

// ==========================================
// 4. PENDAFTARAN ATLET (3 DALAM 1: AUTO, EXCEL, PASTE)
// ==========================================

function switchRegMethod(method) {
    document.querySelectorAll('.method-tab-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    document.querySelectorAll('.method-tab-btn').forEach(b => b.classList.add('btn-secondary'));

    const activeBtn = document.getElementById(`btn-method-${method}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('btn-secondary');
    }

    document.getElementById('reg-method-auto-area').style.display = method === 'auto' ? 'block' : 'none';
    document.getElementById('reg-method-excel-area').style.display = method === 'excel' ? 'block' : 'none';
    document.getElementById('reg-method-paste-area').style.display = method === 'paste' ? 'block' : 'none';
}

function calculateLiveBMI() {
    const height = parseFloat(document.getElementById('reg-height').value);
    const weight = parseFloat(document.getElementById('reg-weight').value);
    const bmiEl = document.getElementById('reg-live-bmi');

    if (height > 0 && weight > 0) {
        const res = calculateBMI(weight, height);
        bmiEl.innerHTML = `<span>${res.bmi}</span> <span class="badge ${res.class}">${res.status}</span>`;
    } else {
        bmiEl.innerHTML = `<span>-</span> <span class="badge badge-fitness">Sedia</span>`;
    }
}

function setupAthleteRegistration() {
    // 1. Borang Auto Key-In Manual
    const autoForm = document.getElementById('register-form');
    if (autoForm) {
        autoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const schoolSelect = document.getElementById('reg-select-school');
            const school_code = schoolSelect ? schoolSelect.value : '';
            const selectedOpt = schoolSelect ? schoolSelect.options[schoolSelect.selectedIndex] : null;
            const school_name = selectedOpt ? selectedOpt.getAttribute('data-name') : '';

            if (!school_code) {
                alert('Sila pilih sekolah terlebih dahulu di bahagian atas.');
                schoolSelect.focus();
                return;
            }

            const name = document.getElementById('reg-name').value.trim();
            const gender = document.getElementById('reg-gender').value;
            const age = parseInt(document.getElementById('reg-age').value);
            const className = document.getElementById('reg-class').value.trim();
            const height = parseFloat(document.getElementById('reg-height').value);
            const weight = parseFloat(document.getElementById('reg-weight').value);

            const payload = {
                name, gender, age, class: className, height, weight,
                school: school_name,
                school_code: school_code
            };

            try {
                const res = await fetch('api.php?action=register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (res.ok && result.success) {
                    alert('Atlet berjaya didaftarkan ke dalam sistem TID!');
                    autoForm.reset();
                    calculateLiveBMI();
                    await loadStudents();
                    switchTab('students');
                } else {
                    alert(result.error || 'Gagal mendaftar atlet.');
                }
            } catch (err) {
                alert('Ralat menyambung ke pelayan.');
            }
        });
    }
}

// Handler Muat Naik Fail Excel (SheetJS)
function handleExcelUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const schoolSelect = document.getElementById('reg-select-school');
    if (!schoolSelect || !schoolSelect.value) {
        alert('Sila pilih sekolah terlebih dahulu sebelum memuat naik fail.');
        schoolSelect.focus();
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonRows.length <= 1) {
                alert('Fail Excel kosong atau tiada data atlet dikesan.');
                return;
            }

            excelParsedAthletes = [];
            // Parse baris (langkau baris tajuk jika ada)
            const startIndex = isNaN(jsonRows[0][2]) ? 1 : 0;

            for (let i = startIndex; i < jsonRows.length; i++) {
                const row = jsonRows[i];
                if (!row || row.length === 0 || !row[0]) continue;

                const name = String(row[0]).trim();
                const gender = String(row[1] || 'Lelaki').trim();
                const age = parseInt(row[2]) || 10;
                const className = String(row[3] || 'Umum').trim();
                const height = parseFloat(row[4]) || null;
                const weight = parseFloat(row[5]) || null;

                const bmiRes = calculateBMI(weight, height);

                excelParsedAthletes.push({
                    name, gender, age, class: className, height, weight, bmi: bmiRes.bmi, bmiStatus: bmiRes.status
                });
            }

            renderExcelPreview();
        } catch (err) {
            console.error(err);
            alert('Ralat membaca fail Excel. Pastikan format fail betul (.xlsx, .xls, .csv).');
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderExcelPreview() {
    const container = document.getElementById('excel-preview-container');
    const tbody = document.querySelector('#excel-preview-table tbody');
    const countEl = document.getElementById('excel-preview-count');

    if (!container || !tbody) return;

    tbody.innerHTML = '';
    countEl.innerText = `${excelParsedAthletes.length} Atlet Dikesan`;

    excelParsedAthletes.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge ${item.gender === 'Perempuan' ? 'badge-perempuan' : 'badge-lelaki'}">${item.gender}</span></td>
            <td>${item.age} Tahun</td>
            <td>${item.class}</td>
            <td>${item.height ? `${item.height} cm` : '-'}</td>
            <td>${item.weight ? `${item.weight} kg` : '-'}</td>
            <td>${item.bmi ? `${item.bmi} (${item.bmiStatus})` : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    container.style.display = 'block';
}

// Handler Copy Paste Dari Spreadsheet
function parsePastedData() {
    const text = document.getElementById('paste-data-input').value.trim();
    if (!text) {
        alert('Sila tampal data terlebih dahulu ke dalam kotak teks.');
        return;
    }

    const schoolSelect = document.getElementById('reg-select-school');
    if (!schoolSelect || !schoolSelect.value) {
        alert('Sila pilih sekolah terlebih dahulu di bahagian atas.');
        schoolSelect.focus();
        return;
    }

    const lines = text.split(/\r?\n/);
    pastedParsedAthletes = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Split by tab atau koma
        const cols = trimmed.includes('\t') ? trimmed.split('\t') : trimmed.split(/,\s*/);
        if (cols.length === 0 || !cols[0]) return;

        const name = cols[0].trim();
        const gender = cols[1] ? cols[1].trim() : 'Lelaki';
        const age = cols[2] ? parseInt(cols[2]) : 10;
        const className = cols[3] ? cols[3].trim() : 'Umum';
        const height = cols[4] ? parseFloat(cols[4]) : null;
        const weight = cols[5] ? parseFloat(cols[5]) : null;

        const bmiRes = calculateBMI(weight, height);

        pastedParsedAthletes.push({
            name, gender, age, class: className, height, weight, bmi: bmiRes.bmi, bmiStatus: bmiRes.status
        });
    });

    renderPastePreview();
}

function renderPastePreview() {
    const container = document.getElementById('paste-preview-container');
    const tbody = document.querySelector('#paste-preview-table tbody');
    const countEl = document.getElementById('paste-preview-count');
    const saveBtn = document.getElementById('btn-save-pasted-athletes');

    if (!container || !tbody) return;

    tbody.innerHTML = '';
    countEl.innerText = `${pastedParsedAthletes.length} Atlet Dikesan`;

    pastedParsedAthletes.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge ${item.gender === 'Perempuan' ? 'badge-perempuan' : 'badge-lelaki'}">${item.gender}</span></td>
            <td>${item.age} Tahun</td>
            <td>${item.class}</td>
            <td>${item.height ? `${item.height} cm` : '-'}</td>
            <td>${item.weight ? `${item.weight} kg` : '-'}</td>
            <td>${item.bmi ? `${item.bmi} (${item.bmiStatus})` : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    container.style.display = 'block';
    if (saveBtn) saveBtn.style.display = 'inline-flex';
}

// Simpan Batch Atlet (Excel atau Paste)
async function saveBatchAthletes(sourceType) {
    const list = sourceType === 'excel' ? excelParsedAthletes : pastedParsedAthletes;
    if (!list || list.length === 0) {
        alert('Tiada data atlet untuk disimpan.');
        return;
    }

    const schoolSelect = document.getElementById('reg-select-school');
    const school_code = schoolSelect ? schoolSelect.value : '';
    const selectedOpt = schoolSelect ? schoolSelect.options[schoolSelect.selectedIndex] : null;
    const school_name = selectedOpt ? selectedOpt.getAttribute('data-name') : '';

    if (!school_code) {
        alert('Sila pilih sekolah terlebih dahulu.');
        return;
    }

    try {
        const res = await fetch('api.php?action=batch_register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                school_code,
                school_name,
                athletes: list
            })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            alert(`Berjaya mendaftarkan ${result.count} atlet ke dalam sistem TID!`);
            excelParsedAthletes = [];
            pastedParsedAthletes = [];
            document.getElementById('excel-preview-container').style.display = 'none';
            document.getElementById('paste-preview-container').style.display = 'none';
            document.getElementById('paste-data-input').value = '';
            document.getElementById('excel-file-input').value = '';
            await loadStudents();
            switchTab('students');
        } else {
            alert(result.error || 'Gagal mendaftar kumpulan atlet.');
        }
    } catch (e) {
        alert('Ralat menyambung ke pelayan.');
    }
}

// ==========================================
// 5. SENARAI ATLET & CARIAN (ADMIN)
// ==========================================

function setupSearch() {
    const searchAdmin = document.getElementById('search-student');
    if (searchAdmin) {
        searchAdmin.addEventListener('input', () => renderStudentsTable());
    }
}

function filterAdminStudents() {
    renderStudentsTable();
}

function renderStudentsTable() {
    const tbody = document.querySelector('#students-table tbody');
    if (!tbody) return;

    const schoolFilter = document.getElementById('filter-admin-school') ? document.getElementById('filter-admin-school').value : '';
    const classFilter = document.getElementById('filter-admin-class') ? document.getElementById('filter-admin-class').value : '';
    const query = document.getElementById('search-student') ? document.getElementById('search-student').value.toLowerCase().trim() : '';

    // Kemas kini pilihan dropdown kelas mengikut sekolah yang dipilih
    updateAdminClassFilterDropdown(schoolFilter);

    let filtered = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(query);
        const matchSchool = !schoolFilter || (s.school_code === schoolFilter || s.school === schoolFilter);
        const matchClass = !classFilter || (s.class === classFilter);
        return matchName && matchSchool && matchClass;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 3rem;">Tiada rekod atlet ditemui.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    filtered.forEach(s => {
        const bmiRes = calculateBMI(s.weight, s.height);
        const fitnessRes = calculateOverallFitness(s);
        const recs = getSportRecommendations(s);
        const bestSport = recs.length > 0 ? recs[0].name.split(' / ')[0] : 'Ujian Belum Lengkap';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600;">${s.name}</td>
            <td>
                <div>${s.school || 'SK Pilihan'}</div>
                <span style="font-size: 0.72rem; color: var(--accent-primary); font-family: monospace;">${s.school_code || '-'}</span>
            </td>
            <td>
                <div>${s.class}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${s.age} Tahun</div>
            </td>
            <td>
                <span class="badge ${s.gender === 'Lelaki' ? 'badge-lelaki' : 'badge-perempuan'}">${s.gender}</span>
            </td>
            <td>
                <div>${bmiRes.bmi || '-'}</div>
                <span class="badge ${bmiRes.class}" style="font-size: 0.7rem; padding: 0.1rem 0.4rem;">${bmiRes.status}</span>
            </td>
            <td>
                <span class="badge ${fitnessRes.class}">${fitnessRes.rating}</span>
            </td>
            <td style="font-weight: 500; color: var(--accent-primary);">
                <i class="fa-solid fa-star" style="font-size: 0.8rem; margin-right: 0.25rem;"></i>${bestSport}
            </td>
            <td>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.78rem;" onclick="viewProfile('${s.id}')">
                        <i class="fa-solid fa-eye"></i> Profil
                    </button>
                    <button class="btn btn-primary" style="padding: 0.35rem 0.7rem; font-size: 0.78rem;" onclick="openRecordScores('${s.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Skor
                    </button>
                    <button class="btn btn-danger" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" onclick="deleteStudent('${s.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateAdminClassFilterDropdown(schoolFilter) {
    const classSelect = document.getElementById('filter-admin-class');
    if (!classSelect) return;

    const currentVal = classSelect.value;
    const relevantStudents = schoolFilter ? students.filter(s => s.school_code === schoolFilter || s.school === schoolFilter) : students;
    const uniqueClasses = [...new Set(relevantStudents.map(s => s.class).filter(Boolean))].sort();

    classSelect.innerHTML = '<option value="">Semua Kelas</option>';
    uniqueClasses.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.innerText = c;
        classSelect.appendChild(opt);
    });

    if (uniqueClasses.includes(currentVal)) {
        classSelect.value = currentVal;
    }
}

async function deleteStudent(id) {
    const confirmed = await openConfirmModal({
        title: 'Padam Rekod Atlet',
        message: 'Adakah anda pasti mahu memadam rekod atlet ini? Semua data ujian kecergasan dan pengenalpastian bakat berkaitan atlet ini akan dipadamkan.',
        confirmText: 'Ya, Padam Atlet'
    });
    if (!confirmed) return;

    try {
        const res = await fetch('api.php?action=delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            students = students.filter(s => s.id !== id);
            await loadStudents();
        } else {
            alert(result.error || 'Gagal memadam rekod.');
        }
    } catch (e) {
        students = students.filter(s => s.id !== id);
        renderStudentsTable();
        renderAnalytics();
    }
}

// ==========================================
// 6. UJIAN TID & PENGURUSAN METRIK (ADMIN)
// ==========================================

function switchTidTestMode(mode) {
    document.querySelectorAll('.tid-test-tab-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    document.querySelectorAll('.tid-test-tab-btn').forEach(b => b.classList.add('btn-secondary'));

    const btn = document.getElementById(`btn-tid-${mode}-mode`);
    if (btn) {
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-secondary');
    }

    const recArea = document.getElementById('tid-record-mode-area');
    const metArea = document.getElementById('tid-metric-mode-area');
    const prtArea = document.getElementById('tid-print-mode-area');

    if (recArea) recArea.style.display = mode === 'record' ? 'block' : 'none';
    if (metArea) metArea.style.display = mode === 'metric' ? 'block' : 'none';
    if (prtArea) {
        prtArea.style.display = mode === 'print' ? 'block' : 'none';
        if (mode === 'print') {
            populatePrintFormDropdowns();
            renderManualPrintPreview();
        }
    }
}

function populatePrintFormDropdowns() {
    const schoolSelect = document.getElementById('print-manual-school');
    const studentSelect = document.getElementById('print-manual-student');

    if (schoolSelect) {
        const curSchool = schoolSelect.value;
        schoolSelect.innerHTML = '<option value="">Semua Sekolah / Pilihan Sekolah</option>';
        (schools || []).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code;
            opt.setAttribute('data-name', s.name);
            opt.innerText = `${s.name} (${s.code})`;
            schoolSelect.appendChild(opt);
        });
        if (curSchool) schoolSelect.value = curSchool;
    }

    handlePrintSchoolChange();
}

function handlePrintSchoolChange() {
    const schoolSelect = document.getElementById('print-manual-school');
function handlePrintSchoolChange() {
    const schoolSelect = document.getElementById('print-manual-school');
    const studentSelect = document.getElementById('print-manual-student');
    const studentSelect2 = document.getElementById('print-manual-student-2');
    const selectedSchool = schoolSelect ? schoolSelect.value : '';

    let filteredStudents = students || [];
    if (selectedSchool) {
        const sf = selectedSchool.toLowerCase();
        filteredStudents = filteredStudents.filter(s => {
            const sc = (s.school_code || '').toLowerCase();
            const sn = (s.school || '').toLowerCase();
            return sc === sf || sn.includes(sf) || sf.includes(sc);
        });
    }

    const sorted = [...filteredStudents].sort((a,b) => a.name.localeCompare(b.name));

    if (studentSelect) {
        const curVal = studentSelect.value;
        studentSelect.innerHTML = '<option value="blank">-- Borang Kosong (Manual 1) --</option>';
        sorted.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.innerText = `${s.name} (${s.class || 'Tiada Kelas'})`;
            studentSelect.appendChild(opt);
        });
        if (curVal && sorted.some(s => s.id === curVal)) studentSelect.value = curVal;
    }

    if (studentSelect2) {
        const curVal2 = studentSelect2.value;
        studentSelect2.innerHTML = '<option value="blank">-- Borang Kosong (Manual 2) --</option>';
        sorted.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.innerText = `${s.name} (${s.class || 'Tiada Kelas'})`;
            studentSelect2.appendChild(opt);
        });
        if (curVal2 && sorted.some(s => s.id === curVal2)) studentSelect2.value = curVal2;
    }

    renderManualPrintPreview();
}

function buildSingleStudentHalfHtml(studentObj, schoolName, schoolCodeStr, batteryVal, halfIndex) {
    let sName = '_____________________________________';
    let sClass = '____________';
    let sAge = '____ Thn';
    let sGender = '[ ] L  [ ] P';
    let sWeight = '_______ kg';
    let sHeight = '_______ cm';
    let sBMI = '_______ kg/m²';
    let sBMICat = '[ ] Kurang  [ ] Normal  [ ] Lebih  [ ] Obesiti';

    if (studentObj && studentObj.id && studentObj.id !== 'blank') {
        sName = `<strong style="color: #000; font-size: 0.95rem;">${studentObj.name}</strong>`;
        sClass = `<strong>${studentObj.class || '-'}</strong>`;
        sAge = `<strong>${studentObj.age || '-'} Thn</strong>`;
        sGender = `<strong>${studentObj.gender === 'Lelaki' ? 'Lelaki' : 'Perempuan'}</strong>`;
        sWeight = `<strong>${studentObj.weight ? studentObj.weight + ' kg' : '-'}</strong>`;
        sHeight = `<strong>${studentObj.height ? studentObj.height + ' cm' : '-'}</strong>`;
        
        if (studentObj.weight && studentObj.height) {
            const bmi = calculateBMI(studentObj.weight, studentObj.height);
            sBMI = `<strong>${bmi.bmi} kg/m²</strong>`;
            sBMICat = `<span class="badge ${bmi.class}" style="font-size: 0.72rem; padding: 0.15rem 0.45rem;">${bmi.category}</span>`;
        }
    }

    let testList = [];
    if (batteryVal === '1' || batteryVal === 'all') {
        testList.push(
            { no: 1, name: 'Sit & Reach', desc: 'Kelenturan (cm)', maxT: 3 },
            { no: 2, name: '30s Sit-Up', desc: 'Daya Tahan (kali)', maxT: 2 },
            { no: 3, name: 'Long Jump', desc: 'Kuasa Kaki (cm)', maxT: 2 },
            { no: 4, name: '10m Sprint', desc: 'Kelajuan (saat)', maxT: 1 },
            { no: 5, name: '10m Shuttle Run', desc: 'Ketangkasan (saat)', maxT: 2 },
            { no: 6, name: 'Hand-Eye Coord.', desc: 'Koordinasi (tangkapan)', maxT: 1 }
        );
    }
    if (batteryVal === '2' || batteryVal === 'all') {
        const startNo = testList.length + 1;
        testList.push(
            { no: startNo, name: 'Bleep Test', desc: 'VO2 Max (tahap)', maxT: 1 },
            { no: startNo + 1, name: 'Vertical Jump', desc: 'Kuasa Menegak (cm)', maxT: 2 },
            { no: startNo + 2, name: 'Medicine Ball', desc: 'Kuasa Tangan (meter)', maxT: 2 }
        );
    }

    let rowsHtml = '';
    testList.forEach(t => {
        rowsHtml += `
            <tr style="height: 24px;">
                <td style="text-align: center; font-weight: 700; padding: 2px;">${t.no}</td>
                <td style="padding: 2px 4px;">
                    <strong style="color: #000; font-size: 0.8rem;">${t.name}</strong>
                    <span style="font-size: 0.68rem; color: #4b5563;">(${t.desc})</span>
                </td>
                <td style="text-align: center; padding: 2px;">${t.maxT >= 1 ? '' : '-'}</td>
                <td style="text-align: center; padding: 2px;">${t.maxT >= 2 ? '' : '-'}</td>
                <td style="text-align: center; padding: 2px;">${t.maxT >= 3 ? '' : '-'}</td>
                <td style="text-align: center; padding: 2px; background: #fafafa;"></td>
                <td style="padding: 2px;"></td>
            </tr>
        `;
    });

    return `
        <div style="font-size: 0.78rem;">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-medal" style="color: #c41230; font-size: 1.4rem;"></i>
                    <div>
                        <div style="font-weight: 800; font-size: 0.88rem; color: #000; line-height: 1.1;">TIDPutra • BORANG PENILAIAN LAPANGAN</div>
                        <div style="font-size: 0.68rem; color: #374151;">Program Talent Identification Sekolah Rendah</div>
                    </div>
                </div>
                <div style="text-align: right; line-height: 1.1;">
                    <div style="font-weight: 800; font-size: 0.78rem; color: #000;">${schoolName.toUpperCase()}</div>
                    <div style="font-size: 0.68rem; font-weight: 700; color: #c41230;">KOD: ${schoolCodeStr.toUpperCase()}</div>
                </div>
            </div>

            <!-- Maklumat Murid -->
            <div style="margin-bottom: 6px;">
                <div style="font-weight: 800; font-size: 0.72rem; text-transform: uppercase; color: #000; margin-bottom: 3px;">
                    <i class="fa-solid fa-id-card" style="color: #c41230;"></i> A: MAKLUMAT MURID & UKURAN FIZIKAL
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.72rem; margin-bottom: 4px;">
                    <tr>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700; width: 22%;">Nama Murid:</td>
                        <td colspan="3" style="padding: 2px 4px; border: 1px solid #666;">${sName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700;">Kelas:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">${sClass}</td>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700; width: 22%;">Umur / Jantina:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">${sAge} | ${sGender}</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700;">Berat / Tinggi:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">${sWeight} | ${sHeight}</td>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700;">Kiraan BMI:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">${sBMI} (${sBMICat})</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700;">Tarikh Ujian:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">____ / ____ / 2026</td>
                        <td style="padding: 2px 4px; border: 1px solid #666; background: #f3f4f6; font-weight: 700;">Guru Penguji:</td>
                        <td style="padding: 2px 4px; border: 1px solid #666;">______________________</td>
                    </tr>
                </table>
            </div>

            <!-- Jadual Bateri Ujian -->
            <div style="margin-bottom: 6px;">
                <div style="font-weight: 800; font-size: 0.72rem; text-transform: uppercase; color: #000; margin-bottom: 3px;">
                    <i class="fa-solid fa-stopwatch" style="color: #c41230;"></i> B: KEPUTUSAN BATERI UJIAN FIZIKAL
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.72rem;">
                    <thead>
                        <tr style="background: #f3f4f6;">
                            <th style="width: 5%; border: 1px solid #333; padding: 2px; text-align: center;">Bil</th>
                            <th style="width: 41%; border: 1px solid #333; padding: 2px 4px; text-align: left;">Komponen Ujian</th>
                            <th style="width: 11%; border: 1px solid #333; padding: 2px; text-align: center;">C1</th>
                            <th style="width: 11%; border: 1px solid #333; padding: 2px; text-align: center;">C2</th>
                            <th style="width: 11%; border: 1px solid #333; padding: 2px; text-align: center;">C3</th>
                            <th style="width: 10%; border: 1px solid #333; padding: 2px; text-align: center;">Terbaik</th>
                            <th style="width: 11%; border: 1px solid #333; padding: 2px; text-align: center;">Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>

            <!-- Tandatangan Pengesahan -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
                <div style="border: 1px dashed #666; padding: 4px 6px; border-radius: 4px; font-size: 0.68rem;">
                    <div style="font-weight: 800; color: #000;">PENGESAHAN PENGUJI:</div>
                    <div style="margin-top: 14px; border-top: 1px solid #444; padding-top: 2px;">T/Tangan & Tarikh: ___________</div>
                </div>
                <div style="border: 1px dashed #666; padding: 4px 6px; border-radius: 4px; font-size: 0.68rem;">
                    <div style="font-weight: 800; color: #000;">KETUA PANITIA PJK:</div>
                    <div style="margin-top: 14px; border-top: 1px solid #444; padding-top: 2px;">T/Tangan & Cop: ____________</div>
                </div>
            </div>
        </div>
    `;
}

function renderManualPrintPreview() {
    const container = document.getElementById('manual-print-preview-sheet');
    if (!container) return;

    const schoolSelect = document.getElementById('print-manual-school');
    const batterySelect = document.getElementById('print-manual-battery');
    const studentSelect = document.getElementById('print-manual-student');
    const studentSelect2 = document.getElementById('print-manual-student-2');

    const schoolCode = schoolSelect ? schoolSelect.value : '';
    const batteryVal = batterySelect ? batterySelect.value : '1';
    const studentId1 = studentSelect ? studentSelect.value : 'blank';
    const studentId2 = studentSelect2 ? studentSelect2.value : 'blank';

    let schoolObj = (schools || []).find(s => s.code === schoolCode);
    let studentObj1 = (students || []).find(s => s.id === studentId1);
    let studentObj2 = (students || []).find(s => s.id === studentId2);

    let schoolName = schoolObj ? schoolObj.name : (studentObj1 ? studentObj1.school : 'SK TAMAN TUN DR ISMAIL');
    let schoolCodeStr = schoolObj ? schoolObj.code : (studentObj1 ? studentObj1.school_code : 'SKTTDI2026');

    const leftHalf = buildSingleStudentHalfHtml(studentObj1, schoolName, schoolCodeStr, batteryVal, 1);
    const rightHalf = buildSingleStudentHalfHtml(studentObj2, schoolName, schoolCodeStr, batteryVal, 2);

    const html = `
        <div style="text-align: center; margin-bottom: 0.75rem; font-size: 0.8rem; color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.4rem;">
            <i class="fa-solid fa-scissors" style="color: #c41230; margin-right: 0.3rem;"></i> <strong>Format Cetakan Landskap (2 Orang Murid Dalam 1 Lembaran A4)</strong>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; width: 100%; position: relative;">
            <div style="padding-right: 12px; border-right: 1.5px dashed #9ca3af;">
                ${leftHalf}
            </div>
            <div style="padding-left: 12px;">
                ${rightHalf}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function printManualTestForm() {
    renderManualPrintPreview();
    const sheetEl = document.getElementById('manual-print-preview-sheet');
    if (!sheetEl) return;
    const sheetContent = sheetEl.innerHTML;

    const printWin = window.open('', '_blank', 'width=1150,height=800');
    if (!printWin) {
        window.print();
        return;
    }

    printWin.document.open();
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Borang Ujian TID Murid (2 Dalam 1 A4 Landskap) - TIDPutra</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                @page { 
                    size: A4 landscape; 
                    margin: 8mm 6mm; 
                }
                * { box-sizing: border-box; }
                body {
                    font-family: 'Outfit', -apple-system, sans-serif;
                    background: #fff;
                    color: #000;
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .badge { padding: 1px 4px; border-radius: 3px; font-weight: 700; font-size: 0.68rem; border: 1px solid #000; }
                .badge-excellent { background: #10b981; color: #fff; }
                .badge-good { background: #3b82f6; color: #fff; }
                .badge-average { background: #f59e0b; color: #fff; }
                .badge-fair { background: #f97316; color: #fff; }
                .badge-poor { background: #ef4444; color: #fff; }
            </style>
        </head>
        <body>
            ${sheetContent}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
}

function printClassRosterForm() {
    const schoolSelect = document.getElementById('print-manual-school');
    const selectedSchool = schoolSelect ? schoolSelect.value : '';
    let schoolObj = (schools || []).find(s => s.code === selectedSchool);
    let schoolName = schoolObj ? schoolObj.name : 'SK TAMAN TUN DR ISMAIL';
    let schoolCodeStr = schoolObj ? schoolObj.code : 'SKTTDI2026';

    let filteredStudents = students || [];
    if (selectedSchool) {
        const sf = selectedSchool.toLowerCase();
        filteredStudents = filteredStudents.filter(s => {
            const sc = (s.school_code || '').toLowerCase();
            const sn = (s.school || '').toLowerCase();
            return sc === sf || sn.includes(sf) || sf.includes(sc);
        });
    }

    let rowsHtml = '';
    const maxRows = Math.max(filteredStudents.length, 15);
    for (let i = 0; i < maxRows; i++) {
        const st = filteredStudents[i];
        let bmiText = '';
        if (st && st.weight && st.height) {
            bmiText = calculateBMI(st.weight, st.height).bmi;
        }

        rowsHtml += `
            <tr style="height: 28px;">
                <td style="text-align: center; font-weight: 600;">${i + 1}</td>
                <td><strong>${st ? st.name : ''}</strong></td>
                <td style="text-align: center;">${st ? (st.class || '') : ''}</td>
                <td style="text-align: center;">${st ? st.age : ''}</td>
                <td style="text-align: center;">${st ? (st.gender === 'Lelaki' ? 'L' : 'P') : ''}</td>
                <td style="text-align: center;">${st && st.weight ? st.weight : ''}</td>
                <td style="text-align: center;">${st && st.height ? st.height : ''}</td>
                <td style="text-align: center; font-weight: 700;">${bmiText}</td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
            </tr>
        `;
    }

    const printWin = window.open('', '_blank', 'width=1100,height=800');
    if (!printWin) { window.print(); return; }

    printWin.document.open();
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jadual Skor Lapangan Berkelompok TID - TIDPutra</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
            <style>
                @page { size: A4 landscape; margin: 8mm; }
                body { font-family: 'Outfit', sans-serif; background: #fff; color: #000; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .roster-header { border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
                table { width: 100%; border-collapse: collapse; font-size: 0.74rem; }
                th { background: #f0f0f0; border: 1.5px solid #222; padding: 4px 2px; text-align: center; font-weight: 800; }
                td { border: 1px solid #444; padding: 3px 2px; }
            </style>
        </head>
        <body>
            <div class="roster-header">
                <div>
                    <h2 style="margin: 0; font-size: 1.05rem; color: #c41230;">TIDPutra • BORANG REKOD SKOR UJIAN LAPANGAN BERKELOMPOK</h2>
                    <div style="font-size: 0.78rem; color: #333;">Program Pengenalpastian Bakat Sukan Murid Sekolah Rendah (TID)</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 800; font-size: 0.9rem;">${schoolName.toUpperCase()} (${schoolCodeStr.toUpperCase()})</div>
                    <div style="font-size: 0.72rem; color: #555;">Tarikh: ____ / ____ / 2026 | Guru Penilai: ________________________</div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 3%;">Bil</th>
                        <th style="width: 21%;">Nama Penuh Murid</th>
                        <th style="width: 6%;">Kelas</th>
                        <th style="width: 4%;">Umur</th>
                        <th style="width: 3%;">J</th>
                        <th style="width: 5%;">Berat</th>
                        <th style="width: 5%;">Tinggi</th>
                        <th style="width: 5%;">BMI</th>
                        <th style="width: 8%;">1. Sit&Reach</th>
                        <th style="width: 8%;">2. Sit-Up</th>
                        <th style="width: 8%;">3. Long Jump</th>
                        <th style="width: 8%;">4. 10m Sprint</th>
                        <th style="width: 8%;">5. Shuttle Run</th>
                        <th style="width: 8%;">6. Hand-Eye</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.72rem;">
                <div>Tandatangan Guru Penguji: ___________________________</div>
                <div>Tandatangan Ketua Panitia PJK: ___________________________</div>
                <div>Tarikh Pengesahan: ___________________________</div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
}

function switchTestBattery(batteryNum) {
    currentTestBattery = batteryNum;
    document.querySelectorAll('.test-battery-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    document.querySelectorAll('.test-battery-btn').forEach(b => b.classList.add('btn-secondary'));

    const activeBtn = document.getElementById(`btn-battery-${batteryNum}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('btn-secondary');
    }

    document.getElementById('battery-1-inputs').style.display = batteryNum === 1 ? 'grid' : 'none';
    document.getElementById('battery-2-inputs').style.display = batteryNum === 2 ? 'grid' : 'none';
}

function populateQuickSelectAthlete() {
    const select = document.getElementById('quick-select-athlete');
    if (!select) return;

    select.innerHTML = '<option value="" disabled selected>Pilih atlet dari senarai...</option>';
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.innerText = `${s.name} (${s.school || 'SK'}, ${s.class})`;
        select.appendChild(opt);
    });
}

function handleQuickSelectAthlete(id) {
    if (id) openRecordScores(id);
}

function openRecordScores(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    selectedStudentId = id;
    switchTab('tests-mgmt');
    switchTidTestMode('record');

    document.getElementById('no-athlete-selected').style.display = 'none';
    document.getElementById('athlete-selected-area').style.display = 'block';

    document.getElementById('score-student-id').value = student.id;
    document.getElementById('record-athlete-name').innerText = student.name;
    document.getElementById('record-athlete-meta').innerText = `${student.school || 'Sekolah'} &bull; ${student.class} &bull; ${student.gender} &bull; ${student.age} Tahun`;

    // Isikan nilai Bateri 1 sedia ada
    const sc = student.scores || {};
    const sr = sc.sit_reach || [];
    document.getElementById('sr-t1').value = sr[0] !== undefined && sr[0] !== null ? sr[0] : '';
    document.getElementById('sr-t2').value = sr[1] !== undefined && sr[1] !== null ? sr[1] : '';
    document.getElementById('sr-t3').value = sr[2] !== undefined && sr[2] !== null ? sr[2] : '';

    const su = sc.sit_up || [];
    document.getElementById('su-t1').value = su[0] !== undefined && su[0] !== null ? su[0] : '';
    document.getElementById('su-t2').value = su[1] !== undefined && su[1] !== null ? su[1] : '';

    const lj = sc.long_jump || [];
    document.getElementById('lj-t1').value = lj[0] !== undefined && lj[0] !== null ? lj[0] : '';
    document.getElementById('lj-t2').value = lj[1] !== undefined && lj[1] !== null ? lj[1] : '';

    const sp = sc.sprint_10m || [];
    document.getElementById('sp-t1').value = sp[0] !== undefined && sp[0] !== null ? sp[0] : '';

    const shut = sc.shuttle_run || [];
    document.getElementById('sr-run-t1').value = shut[0] !== undefined && shut[0] !== null ? shut[0] : '';
    document.getElementById('sr-run-t2').value = shut[1] !== undefined && shut[1] !== null ? shut[1] : '';

    const he = sc.hand_eye || [];
    document.getElementById('he-t1').value = he[0] !== undefined && he[0] !== null ? he[0] : '';

    // Isikan nilai Bateri 2 jika ada
    const sc2 = student.test2_scores || {};
    document.getElementById('bleep-t1').value = sc2.bleep_test ? sc2.bleep_test[0] : '';
    document.getElementById('vj-t1').value = sc2.vertical_jump ? sc2.vertical_jump[0] : '';
    document.getElementById('mb-t1').value = sc2.medicine_ball ? sc2.medicine_ball[0] : '';
}

// Submit Skor Ujian
const scoresForm = document.getElementById('scores-form');
if (scoresForm) {
    scoresForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('score-student-id').value;
        if (!id) return;

        const parseVal = (val, isFloat = true) => (val !== '' && val !== null && !isNaN(val)) ? (isFloat ? parseFloat(val) : parseInt(val)) : null;

        const scoresPayload = {
            id: id,
            scores: {
                sit_reach: [
                    parseVal(document.getElementById('sr-t1').value),
                    parseVal(document.getElementById('sr-t2').value),
                    parseVal(document.getElementById('sr-t3').value)
                ],
                sit_up: [
                    parseVal(document.getElementById('su-t1').value, false),
                    parseVal(document.getElementById('su-t2').value, false)
                ],
                long_jump: [
                    parseVal(document.getElementById('lj-t1').value),
                    parseVal(document.getElementById('lj-t2').value)
                ],
                sprint_10m: [
                    parseVal(document.getElementById('sp-t1').value)
                ],
                shuttle_run: [
                    parseVal(document.getElementById('sr-run-t1').value),
                    parseVal(document.getElementById('sr-run-t2').value)
                ],
                hand_eye: [
                    parseVal(document.getElementById('he-t1').value, false)
                ]
            },
            test2_scores: {
                bleep_test: [parseVal(document.getElementById('bleep-t1').value)],
                vertical_jump: [parseVal(document.getElementById('vj-t1').value)],
                medicine_ball: [parseVal(document.getElementById('mb-t1').value)]
            }
        };

        try {
            const res = await fetch('api.php?action=save_scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoresPayload)
            });
            const result = await res.json();
            if (res.ok && result.success) {
                alert('Skor ujian berjaya disimpan dan dianalisis!');
                await loadStudents();
                viewProfile(id);
            } else {
                alert(result.error || 'Gagal menyimpan skor.');
            }
        } catch (err) {
            alert('Ralat menyambung ke pelayan.');
        }
    });
}

// Render Editor Metrik
function renderMetricsConfig() {
    const container = document.getElementById('metrics-config-container');
    if (!container || !testsConfig || !testsConfig.test1) return;

    const components = testsConfig.test1.components || [];
    let html = '';

    components.forEach((comp, idx) => {
        const mm = comp.metric_male || {};
        const mf = comp.metric_female || {};

        html += `
            <div class="card" style="margin-bottom: 1rem; padding: 1rem; background: rgba(0,0,0,0.25);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <div>
                        <strong style="font-size: 0.95rem; color: #fff;">${comp.name}</strong>
                        <span class="badge badge-fitness" style="margin-left: 0.5rem;">Unit: ${comp.unit}</span>
                    </div>
                    <small style="color: var(--text-muted);">${comp.desc}</small>
                </div>
                
                <div class="table-responsive">
                    <table class="custom-table metric-table" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th style="color: #34d399;">Cemerlang (5)</th>
                                <th style="color: #60a5fa;">Baik (4)</th>
                                <th style="color: #fbbf24;">Sederhana (3)</th>
                                <th style="color: #f87171;">Kurang / Lemah (1-2)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align: left; font-weight: 600; color: #60a5fa;"><i class="fa-solid fa-mars"></i> Lelaki</td>
                                <td><input type="number" step="0.1" id="m-male-cem-${comp.key}" value="${mm.cemerlang ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-male-baik-${comp.key}" value="${mm.baik ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-male-sed-${comp.key}" value="${mm.sederhana ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-male-kur-${comp.key}" value="${mm.kurang ?? ''}"></td>
                            </tr>
                            <tr>
                                <td style="text-align: left; font-weight: 600; color: #f472b6;"><i class="fa-solid fa-venus"></i> Perempuan</td>
                                <td><input type="number" step="0.1" id="m-fem-cem-${comp.key}" value="${mf.cemerlang ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-fem-baik-${comp.key}" value="${mf.baik ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-fem-sed-${comp.key}" value="${mf.sederhana ?? ''}"></td>
                                <td><input type="number" step="0.1" id="m-fem-kur-${comp.key}" value="${mf.kurang ?? ''}"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function saveCustomMetrics() {
    if (!testsConfig || !testsConfig.test1) return;

    const components = testsConfig.test1.components || [];
    components.forEach(comp => {
        const parseF = id => {
            const el = document.getElementById(id);
            return el && el.value !== '' ? parseFloat(el.value) : null;
        };

        comp.metric_male = {
            cemerlang: parseF(`m-male-cem-${comp.key}`),
            baik: parseF(`m-male-baik-${comp.key}`),
            sederhana: parseF(`m-male-sed-${comp.key}`),
            kurang: parseF(`m-male-kur-${comp.key}`)
        };

        comp.metric_female = {
            cemerlang: parseF(`m-fem-cem-${comp.key}`),
            baik: parseF(`m-fem-baik-${comp.key}`),
            sederhana: parseF(`m-fem-sed-${comp.key}`),
            kurang: parseF(`m-fem-kur-${comp.key}`)
        };
    });

    try {
        const res = await fetch('api.php?action=save_tests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testsConfig)
        });
        const result = await res.json();
        if (res.ok && result.success) {
            alert('Konfigurasi metrik berjaya disimpan!');
        } else {
            alert('Gagal menyimpan konfigurasi metrik.');
        }
    } catch (e) {
        alert('Ralat menyambung ke pelayan.');
    }
}

// ==========================================
// 7. PENGURUSAN AKAUN ADMIN (ADMIN)
// ==========================================

function setupAdminRegisterForms() {
    const form = document.getElementById('add-admin-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('adm-name').value.trim();
        const username = document.getElementById('adm-username').value.trim();
        const password = document.getElementById('adm-password').value.trim();
        const err = document.getElementById('adm-error-msg');
        const succ = document.getElementById('adm-success-msg');

        err.style.display = 'none';
        succ.style.display = 'none';

        try {
            const res = await fetch('api.php?action=register_admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password })
            });
            const result = await res.json();
            if (res.ok && result.success) {
                succ.style.display = 'block';
                form.reset();
                await loadAdmins();
                setTimeout(() => succ.style.display = 'none', 3000);
            } else {
                err.innerText = result.error || 'Gagal menambah admin.';
                err.style.display = 'block';
            }
        } catch (e) {
            err.innerText = 'Ralat menyambung ke pelayan.';
            err.style.display = 'block';
        }
    });
}

function renderAdminsTable() {
    const tbody = document.querySelector('#admins-table tbody');
    if (!tbody) return;

    if (admins.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">Tiada rekod admin.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    admins.forEach(adm => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${adm.name}</strong></td>
            <td><code>${adm.username}</code></td>
            <td><code>${adm.password ? '••••••••' : '-'}</code></td>
            <td>${adm.created_at || '-'}</td>
            <td>
                ${admins.length > 1 ? `
                    <button class="btn btn-danger btn-sm" onclick="deleteAdmin('${adm.id}')" title="Padam Admin">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                ` : '<span style="font-size: 0.75rem; color: var(--text-muted);">Admin Utama</span>'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function deleteAdmin(id) {
    const confirmed = await openConfirmModal({
        title: 'Padam Akaun Individu',
        message: 'Adakah anda pasti mahu memadam akaun individu/admin ini?',
        confirmText: 'Ya, Padam Akaun'
    });
    if (!confirmed) return;

    try {
        const res = await fetch('api.php?action=delete_admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            admins = admins.filter(a => a.id !== id);
            await loadAdmins();
        } else {
            alert(result.error || 'Gagal memadam akaun.');
        }
    } catch (e) {
        admins = admins.filter(a => a.id !== id);
        renderAdminsTable();
    }
}

// ==========================================
// 8. PORTAL INDIVIDU (AKSES KOD SEKOLAH & KELAS/NAMA)
// ==========================================

function switchIndividuMode(mode) {
    individualMode = mode;
    document.querySelectorAll('.ind-mode-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
    document.querySelectorAll('.ind-mode-btn').forEach(b => b.classList.add('btn-secondary'));

    const activeBtn = document.getElementById(mode === 'name' ? 'btn-ind-mode-name' : 'btn-ind-mode-class');
    if (activeBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('btn-secondary');
    }

    const classSelector = document.getElementById('ind-class-selector-area');
    if (classSelector) {
        classSelector.style.display = mode === 'class' ? 'block' : 'none';
    }

    if (mode === 'name') {
        individualSelectedClass = null;
    }

    renderIndividuList();
}

// Global Parsed Arrays Bagi Portal Individu
let indExcelParsedAthletes = [];
let indPastedParsedAthletes = [];

function switchIndividuView(view) {
    const listBtn = document.getElementById('btn-ind-view-list');
    const regBtn = document.getElementById('btn-ind-view-register');
    const listContainer = document.getElementById('ind-view-list-container');
    const regContainer = document.getElementById('ind-view-register-container');
    const reportContainer = document.getElementById('student-portal-report-container');

    if (reportContainer) reportContainer.style.display = 'none';

    if (view === 'register') {
        if (listBtn) { listBtn.classList.remove('active', 'btn-primary'); listBtn.classList.add('btn-secondary'); }
        if (regBtn) { regBtn.classList.add('active', 'btn-primary'); regBtn.classList.remove('btn-secondary'); }
        if (listContainer) listContainer.style.display = 'none';
        if (regContainer) regContainer.style.display = 'block';

        if (currentSchool) {
            const schNameEl = document.getElementById('ind-reg-school-name');
            const schCodeEl = document.getElementById('ind-reg-school-code');
            if (schNameEl) schNameEl.innerText = currentSchool.name;
            if (schCodeEl) schCodeEl.innerText = currentSchool.code;
        }
    } else {
        if (listBtn) { listBtn.classList.add('active', 'btn-primary'); listBtn.classList.remove('btn-secondary'); }
        if (regBtn) { regBtn.classList.remove('active', 'btn-primary'); regBtn.classList.add('btn-secondary'); }
        if (listContainer) listContainer.style.display = 'block';
        if (regContainer) regContainer.style.display = 'none';
        renderIndividuList();
    }
}

function switchIndRegMethod(method) {
    document.querySelectorAll('.ind-method-tab-btn').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-secondary');
    });

    const activeBtn = document.getElementById(`btn-ind-method-${method}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('btn-secondary');
    }

    document.getElementById('ind-reg-method-auto-area').style.display = method === 'auto' ? 'block' : 'none';
    document.getElementById('ind-reg-method-excel-area').style.display = method === 'excel' ? 'block' : 'none';
    document.getElementById('ind-reg-method-paste-area').style.display = method === 'paste' ? 'block' : 'none';
}

function calculateIndLiveBMI() {
    const height = parseFloat(document.getElementById('ind-reg-height').value);
    const weight = parseFloat(document.getElementById('ind-reg-weight').value);
    const bmiEl = document.getElementById('ind-reg-live-bmi');

    if (height > 0 && weight > 0) {
        const res = calculateBMI(weight, height);
        bmiEl.innerHTML = `<span>${res.bmi}</span> <span class="badge ${res.class}">${res.status}</span>`;
    } else {
        bmiEl.innerHTML = `<span>-</span> <span class="badge badge-fitness">Sedia</span>`;
    }
}

function setupIndividuAthleteRegistration() {
    // 1. Borang Auto Key-In Manual (Portal Individu)
    const autoForm = document.getElementById('ind-register-form');
    if (autoForm) {
        autoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!currentSchool || !currentSchool.code) {
                alert('Sesi sekolah tidak sah. Sila log masuk semula.');
                return;
            }

            const name = document.getElementById('ind-reg-name').value.trim();
            const gender = document.getElementById('ind-reg-gender').value;
            const age = parseInt(document.getElementById('ind-reg-age').value);
            const className = document.getElementById('ind-reg-class').value.trim();
            const height = parseFloat(document.getElementById('ind-reg-height').value);
            const weight = parseFloat(document.getElementById('ind-reg-weight').value);

            const payload = {
                name, gender, age, class: className, height, weight,
                school: currentSchool.name,
                school_code: currentSchool.code
            };

            try {
                const res = await fetch('api.php?action=register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (res.ok && result.success) {
                    alert(`Atlet "${name}" berjaya didaftarkan ke dalam sistem TID!`);
                    autoForm.reset();
                    calculateIndLiveBMI();
                    await loadStudents();
                    renderIndividuPortal();
                    switchIndividuView('list');
                } else {
                    alert(result.error || 'Gagal mendaftar atlet.');
                }
            } catch (err) {
                alert('Ralat menyambung ke pelayan.');
            }
        });
    }
}

// Handler Muat Naik Fail Excel (Portal Individu)
function handleIndExcelUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!currentSchool || !currentSchool.code) {
        alert('Sesi sekolah tidak sah. Sila log masuk semula.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonRows.length <= 1) {
                alert('Fail Excel kosong atau tiada data atlet dikesan.');
                return;
            }

            indExcelParsedAthletes = [];
            const startIndex = isNaN(jsonRows[0][2]) ? 1 : 0;

            for (let i = startIndex; i < jsonRows.length; i++) {
                const row = jsonRows[i];
                if (!row || row.length === 0 || !row[0]) continue;

                const name = String(row[0]).trim();
                const gender = String(row[1] || 'Lelaki').trim();
                const age = parseInt(row[2]) || 10;
                const className = String(row[3] || 'Umum').trim();
                const height = parseFloat(row[4]) || null;
                const weight = parseFloat(row[5]) || null;

                const bmiRes = calculateBMI(weight, height);

                indExcelParsedAthletes.push({
                    name, gender, age, class: className, height, weight, bmi: bmiRes.bmi, bmiStatus: bmiRes.status
                });
            }

            renderIndExcelPreview();
        } catch (err) {
            console.error(err);
            alert('Ralat membaca fail Excel. Pastikan format fail betul (.xlsx, .xls, .csv).');
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderIndExcelPreview() {
    const container = document.getElementById('ind-excel-preview-container');
    const tbody = document.querySelector('#ind-excel-preview-table tbody');
    const countEl = document.getElementById('ind-excel-preview-count');

    if (!container || !tbody) return;

    tbody.innerHTML = '';
    countEl.innerText = `${indExcelParsedAthletes.length} Atlet Dikesan`;

    indExcelParsedAthletes.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge ${item.gender === 'Perempuan' ? 'badge-perempuan' : 'badge-lelaki'}">${item.gender}</span></td>
            <td>${item.age} Tahun</td>
            <td>${item.class}</td>
            <td>${item.height ? `${item.height} cm` : '-'}</td>
            <td>${item.weight ? `${item.weight} kg` : '-'}</td>
            <td>${item.bmi ? `${item.bmi} (${item.bmiStatus})` : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    container.style.display = 'block';
}

// Handler Copy Paste (Portal Individu)
function parseIndPastedData() {
    const text = document.getElementById('ind-paste-data-input').value.trim();
    if (!text) {
        alert('Sila tampal data terlebih dahulu ke dalam kotak teks.');
        return;
    }

    if (!currentSchool || !currentSchool.code) {
        alert('Sesi sekolah tidak sah. Sila log masuk semula.');
        return;
    }

    const lines = text.split(/\r?\n/);
    indPastedParsedAthletes = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const cols = trimmed.includes('\t') ? trimmed.split('\t') : trimmed.split(/,\s*/);
        if (cols.length === 0 || !cols[0]) return;

        const name = cols[0].trim();
        const gender = cols[1] ? cols[1].trim() : 'Lelaki';
        const age = cols[2] ? parseInt(cols[2]) : 10;
        const className = cols[3] ? cols[3].trim() : 'Umum';
        const height = cols[4] ? parseFloat(cols[4]) : null;
        const weight = cols[5] ? parseFloat(cols[5]) : null;

        const bmiRes = calculateBMI(weight, height);

        indPastedParsedAthletes.push({
            name, gender, age, class: className, height, weight, bmi: bmiRes.bmi, bmiStatus: bmiRes.status
        });
    });

    renderIndPastePreview();
}

function renderIndPastePreview() {
    const container = document.getElementById('ind-paste-preview-container');
    const tbody = document.querySelector('#ind-paste-preview-table tbody');
    const countEl = document.getElementById('ind-paste-preview-count');
    const saveBtn = document.getElementById('ind-btn-save-pasted-athletes');

    if (!container || !tbody) return;

    tbody.innerHTML = '';
    countEl.innerText = `${indPastedParsedAthletes.length} Atlet Dikesan`;

    indPastedParsedAthletes.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge ${item.gender === 'Perempuan' ? 'badge-perempuan' : 'badge-lelaki'}">${item.gender}</span></td>
            <td>${item.age} Tahun</td>
            <td>${item.class}</td>
            <td>${item.height ? `${item.height} cm` : '-'}</td>
            <td>${item.weight ? `${item.weight} kg` : '-'}</td>
            <td>${item.bmi ? `${item.bmi} (${item.bmiStatus})` : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    container.style.display = 'block';
    if (saveBtn) saveBtn.style.display = 'inline-flex';
}

// Simpan Batch Atlet (Portal Individu)
async function saveIndBatchAthletes(sourceType) {
    const list = sourceType === 'excel' ? indExcelParsedAthletes : indPastedParsedAthletes;
    if (!list || list.length === 0) {
        alert('Tiada data atlet untuk disimpan.');
        return;
    }

    if (!currentSchool || !currentSchool.code) {
        alert('Sesi sekolah tidak sah. Sila log masuk semula.');
        return;
    }

    try {
        const res = await fetch('api.php?action=batch_register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                school_code: currentSchool.code,
                school_name: currentSchool.name,
                athletes: list
            })
        });
        const result = await res.json();
        if (res.ok && result.success) {
            alert(`Berjaya mendaftarkan ${result.count} atlet ke dalam sistem TID untuk ${currentSchool.name}!`);
            indExcelParsedAthletes = [];
            indPastedParsedAthletes = [];
            document.getElementById('ind-excel-preview-container').style.display = 'none';
            document.getElementById('ind-paste-preview-container').style.display = 'none';
            const excelInput = document.getElementById('ind-excel-file-input');
            if (excelInput) excelInput.value = '';
            const pasteInput = document.getElementById('ind-paste-data-input');
            if (pasteInput) pasteInput.value = '';

            await loadStudents();
            renderIndividuPortal();
            switchIndividuView('list');
        } else {
            alert(result.error || 'Gagal menyimpan atlet.');
        }
    } catch (err) {
        alert('Ralat menyambung ke pelayan.');
    }
}

function renderIndividuPortal() {
    if (!currentSchool) return;

    // Tajuk Portal
    const titleEl = document.getElementById('ind-school-title');
    const subEl = document.getElementById('ind-school-subtitle');
    const badgeNameEl = document.getElementById('ind-school-badge-name');
    const regSchName = document.getElementById('ind-reg-school-name');
    const regSchCode = document.getElementById('ind-reg-school-code');

    if (titleEl) titleEl.innerText = `Portal TID - ${currentSchool.name}`;
    if (subEl) subEl.innerHTML = `Kod Sekolah: <strong style="color: var(--accent-primary);">${currentSchool.code}</strong> &bull; Akses senarai atlet atau daftar atlet baharu.`;
    if (badgeNameEl) badgeNameEl.innerText = currentSchool.name;
    if (regSchName) regSchName.innerText = currentSchool.name;
    if (regSchCode) regSchCode.innerText = currentSchool.code;

    // Render Pills Kelas
    renderIndividuClassPills();

    // Render Jadual Murid
    renderIndividuList();
}

function renderIndividuClassPills() {
    const pillsContainer = document.getElementById('ind-classes-pills');
    if (!pillsContainer || !currentSchool) return;

    const schoolStudents = students.filter(s => s.school_code === currentSchool.code || s.school === currentSchool.name);
    const classes = [...new Set(schoolStudents.map(s => s.class).filter(Boolean))].sort();

    if (classes.length === 0) {
        pillsContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">Tiada kelas didaftarkan lagi.</span>';
        return;
    }

    let pillsHtml = `
        <button type="button" class="ind-class-pill ${!individualSelectedClass ? 'active' : ''}" onclick="selectIndividuClass(null)">
            <i class="fa-solid fa-layer-group"></i> Semua Kelas (${schoolStudents.length})
        </button>
    `;

    classes.forEach(c => {
        const count = schoolStudents.filter(s => s.class === c).length;
        const isActive = individualSelectedClass === c;
        pillsHtml += `
            <button type="button" class="ind-class-pill ${isActive ? 'active' : ''}" onclick="selectIndividuClass('${c}')">
                <i class="fa-solid fa-chalkboard-user"></i> ${c} (${count})
            </button>
        `;
    });

    pillsContainer.innerHTML = pillsHtml;
}

function selectIndividuClass(className) {
    individualSelectedClass = className;
    renderIndividuClassPills();
    renderIndividuList();
}

function renderIndividuList() {
    const tbody = document.querySelector('#ind-students-table tbody');
    const countBadge = document.getElementById('ind-count-badge');
    const tableTitle = document.getElementById('ind-table-title');
    if (!tbody || !currentSchool) return;

    const query = document.getElementById('ind-search-student') ? document.getElementById('ind-search-student').value.toLowerCase().trim() : '';

    let schoolStudents = students.filter(s => s.school_code === currentSchool.code || s.school === currentSchool.name);

    if (individualSelectedClass) {
        schoolStudents = schoolStudents.filter(s => s.class === individualSelectedClass);
        if (tableTitle) tableTitle.innerText = `Senarai Murid Dalam Kelas: ${individualSelectedClass}`;
    } else {
        if (tableTitle) tableTitle.innerText = `Senarai Semua Atlet Sekolah (${currentSchool.name})`;
    }

    if (query) {
        schoolStudents = schoolStudents.filter(s => s.name.toLowerCase().includes(query));
    }

    if (countBadge) countBadge.innerText = `${schoolStudents.length} Atlet`;

    if (schoolStudents.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2.5rem;">Tiada murid ditemui dalam senarai ini.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    schoolStudents.forEach(s => {
        const bmiRes = calculateBMI(s.weight, s.height);
        const fitnessRes = calculateOverallFitness(s);

        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => viewProfile(s.id);

        tr.innerHTML = `
            <td>
                <strong style="color: #fff; font-size: 0.95rem;">${s.name}</strong>
                <div style="font-size: 0.72rem; color: var(--accent-primary);">Klik untuk lihat spiderweb & analisis</div>
            </td>
            <td><span class="badge badge-fitness">${s.class}</span></td>
            <td>${s.age} Tahun</td>
            <td><span class="badge ${s.gender === 'Perempuan' ? 'badge-perempuan' : 'badge-lelaki'}">${s.gender}</span></td>
            <td>${bmiRes.bmi ? `${bmiRes.bmi} (${bmiRes.status})` : '-'}</td>
            <td><span class="badge ${fitnessRes.class}">${fitnessRes.rating}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); viewProfile('${s.id}')">
                    <i class="fa-solid fa-chart-radar"></i> Lihat Analisis
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================
// 9. PROFIL INDIVIDU, SPIDERWEB, SUKAN & PDF
// ==========================================

function handleProfileBack() {
    if (currentRole === 'Individu') {
        switchTab('individual-portal');
    } else {
        switchTab('students');
    }
}

function calculateBMI(weight, height) {
    if (!weight || !height || height <= 0) return { bmi: null, status: 'Tiada Data', class: 'badge-fitness' };
    const hInMeter = height / 100;
    const bmiVal = (weight / (hInMeter * hInMeter)).toFixed(1);

    let status = 'Normal';
    let badgeClass = 'badge-good';

    if (bmiVal < 14.5) {
        status = 'Kurang Berat';
        badgeClass = 'badge-fair';
    } else if (bmiVal >= 14.5 && bmiVal <= 19.5) {
        status = 'Normal';
        badgeClass = 'badge-excellent';
    } else if (bmiVal > 19.5 && bmiVal <= 22.5) {
        status = 'Berlebihan';
        badgeClass = 'badge-average';
    } else {
        status = 'Obesiti';
        badgeClass = 'badge-poor';
    }

    return { bmi: bmiVal, status, class: badgeClass };
}

function calculateBestScore(compKey, trials) {
    if (!trials || !Array.isArray(trials) || trials.length === 0) return null;
    const valid = trials.filter(v => v !== null && v !== '' && !isNaN(v)).map(Number);
    if (valid.length === 0) return null;

    // Bagi larian pecut dan shuttle run, nilai lebih KECIL (masa lebih singkat) adalah lebih baik
    if (compKey === 'sprint_10m' || compKey === 'shuttle_run') {
        return Math.min(...valid);
    }
    // Komponen lain: nilai lebih TINGGI adalah lebih baik
    return Math.max(...valid);
}

function evaluateFitnessComponent(component, bestValue, gender, age) {
    if (bestValue === null || bestValue === undefined) {
        return { score: 0, rating: 'Tiada Rekod', class: 'badge-fitness' };
    }

    let score = 1;
    const isMale = gender === 'Lelaki';

    switch (component) {
        case 'sit_reach':
            if (isMale) {
                if (bestValue >= 30) score = 5;
                else if (bestValue >= 24) score = 4;
                else if (bestValue >= 17) score = 3;
                else if (bestValue >= 11) score = 2;
                else score = 1;
            } else {
                if (bestValue >= 32) score = 5;
                else if (bestValue >= 26) score = 4;
                else if (bestValue >= 19) score = 3;
                else if (bestValue >= 13) score = 2;
                else score = 1;
            }
            break;

        case 'sit_up':
            if (isMale) {
                if (bestValue >= 22) score = 5;
                else if (bestValue >= 18) score = 4;
                else if (bestValue >= 13) score = 3;
                else if (bestValue >= 8) score = 2;
                else score = 1;
            } else {
                if (bestValue >= 19) score = 5;
                else if (bestValue >= 15) score = 4;
                else if (bestValue >= 11) score = 3;
                else if (bestValue >= 6) score = 2;
                else score = 1;
            }
            break;

        case 'long_jump':
            if (isMale) {
                if (bestValue >= 175) score = 5;
                else if (bestValue >= 150) score = 4;
                else if (bestValue >= 125) score = 3;
                else if (bestValue >= 100) score = 2;
                else score = 1;
            } else {
                if (bestValue >= 160) score = 5;
                else if (bestValue >= 135) score = 4;
                else if (bestValue >= 110) score = 3;
                else if (bestValue >= 85) score = 2;
                else score = 1;
            }
            break;

        case 'sprint_10m':
            if (isMale) {
                if (bestValue <= 2.0) score = 5;
                else if (bestValue <= 2.3) score = 4;
                else if (bestValue <= 2.6) score = 3;
                else if (bestValue <= 3.0) score = 2;
                else score = 1;
            } else {
                if (bestValue <= 2.2) score = 5;
                else if (bestValue <= 2.5) score = 4;
                else if (bestValue <= 2.8) score = 3;
                else if (bestValue <= 3.2) score = 2;
                else score = 1;
            }
            break;

        case 'shuttle_run':
            if (isMale) {
                if (bestValue <= 10.0) score = 5;
                else if (bestValue <= 11.2) score = 4;
                else if (bestValue <= 12.5) score = 3;
                else if (bestValue <= 13.8) score = 2;
                else score = 1;
            } else {
                if (bestValue <= 10.5) score = 5;
                else if (bestValue <= 11.8) score = 4;
                else if (bestValue <= 13.0) score = 3;
                else if (bestValue <= 14.5) score = 2;
                else score = 1;
            }
            break;

        case 'hand_eye':
            if (bestValue >= 18) score = 5;
            else if (bestValue >= 14) score = 4;
            else if (bestValue >= 10) score = 3;
            else if (bestValue >= 6) score = 2;
            else score = 1;
            break;
    }

    const ratingMap = {
        5: { rating: 'Cemerlang', class: 'badge-excellent' },
        4: { rating: 'Baik', class: 'badge-good' },
        3: { rating: 'Sederhana', class: 'badge-average' },
        2: { rating: 'Kurang Memuaskan', class: 'badge-fair' },
        1: { rating: 'Lemah', class: 'badge-poor' }
    };

    return {
        score: score,
        rating: ratingMap[score].rating,
        class: ratingMap[score].class
    };
}

function calculateOverallFitness(student) {
    const sc = student.scores || {};
    const components = ['sit_reach', 'sit_up', 'long_jump', 'sprint_10m', 'shuttle_run', 'hand_eye'];
    let totalScore = 0;
    let counted = 0;

    components.forEach(comp => {
        const bestVal = calculateBestScore(comp, sc[comp]);
        if (bestVal !== null) {
            const evalResult = evaluateFitnessComponent(comp, bestVal, student.gender, student.age);
            totalScore += evalResult.score;
            counted++;
        }
    });

    if (counted === 0) return { avgScore: 0, rating: 'Tiada Data', class: 'badge-fitness' };

    const avg = totalScore / counted;
    let rating = '';
    let ratingClass = '';

    if (avg >= 4.5) {
        rating = 'Cemerlang';
        ratingClass = 'badge-excellent';
    } else if (avg >= 3.6) {
        rating = 'Baik';
        ratingClass = 'badge-good';
    } else if (avg >= 2.6) {
        rating = 'Sederhana';
        ratingClass = 'badge-average';
    } else if (avg >= 1.6) {
        rating = 'Kurang Memuaskan';
        ratingClass = 'badge-fair';
    } else {
        rating = 'Lemah';
        ratingClass = 'badge-poor';
    }

    return {
        avgScore: avg.toFixed(1),
        rating: rating,
        class: ratingClass
    };
}

function getSportRecommendations(student) {
    const sc = student.scores || {};
    const marks = {};
    let hasData = false;

    const components = ['sit_reach', 'sit_up', 'long_jump', 'sprint_10m', 'shuttle_run', 'hand_eye'];
    components.forEach(comp => {
        const best = calculateBestScore(comp, sc[comp]);
        if (best !== null) {
            marks[comp] = evaluateFitnessComponent(comp, best, student.gender, student.age).score;
            hasData = true;
        } else {
            marks[comp] = 0;
        }
    });

    if (!hasData) return [];

    const sportsList = [
        {
            name: 'Badminton / Ping Pong',
            icon: 'fa-solid fa-table-tennis-paddle-ball',
            category: 'Sukan Raket / Jaring',
            weights: { shuttle_run: 0.4, hand_eye: 0.4, sprint_10m: 0.2 },
            desc: 'Ketangkasan pantas dalam pergerakan kaki (Shuttle Run) & koordinasi mata-tangan yang jitu.'
        },
        {
            name: 'Bola Sepak / Hoki / Futsal',
            icon: 'fa-solid fa-futbol',
            category: 'Sukan Serangan (Invasion)',
            weights: { sprint_10m: 0.35, shuttle_run: 0.35, long_jump: 0.15, sit_up: 0.15 },
            desc: 'Kombinasi pecutan larian 10m, ketangkasan mengelak pertahanan, serta daya tahan otot yang mantap.'
        },
        {
            name: 'Olahraga (Pecut & Lompatan)',
            icon: 'fa-solid fa-person-running',
            category: 'Olahraga (Athletics)',
            weights: { sprint_10m: 0.5, long_jump: 0.4, sit_up: 0.1 },
            desc: 'Kuasa letupan kaki yang tinggi menerusi Standing Long Jump dan kelajuan pecutan 10m yang luar biasa.'
        },
        {
            name: 'Gimnastik & Terjun',
            icon: 'fa-solid fa-person-falling',
            category: 'Sukan Estetik & Fleksibiliti',
            weights: { sit_reach: 0.6, long_jump: 0.25, sit_up: 0.15 },
            desc: 'Kelenturan sendi yang luar biasa menerusi ujian Sit & Reach amat penting untuk form artistik.'
        },
        {
            name: 'Memanah & Menembak',
            icon: 'fa-solid fa-bullseye',
            category: 'Sukan Sasaran & Fokus',
            weights: { hand_eye: 0.8, sit_up: 0.2 },
            desc: 'Kejituan koordinasi motor mata-tangan disokong oleh kestabilan otot teras.'
        },
        {
            name: 'Bola Jaring / Bola Tampar',
            icon: 'fa-solid fa-volleyball',
            category: 'Sukan Pasukan Jaring',
            weights: { long_jump: 0.35, hand_eye: 0.35, shuttle_run: 0.3 },
            desc: 'Ketinggian lompatan dan daya tangkapan bola yang kemas dalam posisi bersedia.'
        }
    ];

    const recommendations = sportsList.map(sport => {
        let scoreSum = 0;
        let weightSum = 0;

        for (const [comp, weight] of Object.entries(sport.weights)) {
            if (marks[comp] > 0) {
                scoreSum += (marks[comp] / 5) * weight * 100;
                weightSum += weight;
            }
        }

        const suitabilityPercentage = weightSum > 0 ? Math.round(scoreSum / weightSum) : 0;
        let level = 'Sederhana';
        let levelClass = 'sport-suitability-medium';
        if (suitabilityPercentage >= 75) {
            level = 'Sangat Tinggi';
            levelClass = 'sport-suitability-high';
        }

        return {
            name: sport.name,
            icon: sport.icon,
            category: sport.category,
            percentage: suitabilityPercentage,
            level: level,
            levelClass: levelClass,
            desc: sport.desc
        };
    });

    return recommendations
        .filter(rec => rec.percentage >= 45)
        .sort((a, b) => b.percentage - a.percentage);
}

function viewProfile(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    selectedStudentId = id;

    // Set Maklumat Peribadi
    document.getElementById('prof-avatar-initial').innerText = student.name.charAt(0).toUpperCase();
    document.getElementById('prof-name').innerText = student.name;

    const genderBadge = document.getElementById('prof-badge-gender');
    genderBadge.innerText = student.gender;
    genderBadge.className = 'badge ' + (student.gender === 'Lelaki' ? 'badge-lelaki' : 'badge-perempuan');

    document.getElementById('prof-age').innerText = `${student.age} Tahun`;
    document.getElementById('prof-school').innerText = student.school || 'Sekolah';
    document.getElementById('prof-class').innerText = student.class;
    document.getElementById('prof-height').innerText = student.height ? `${student.height} cm` : '-';
    document.getElementById('prof-weight').innerText = student.weight ? `${student.weight} kg` : '-';

    const bmiResult = calculateBMI(student.weight, student.height);
    document.getElementById('prof-bmi').innerText = bmiResult.bmi || '-';

    const bmiStatusEl = document.getElementById('prof-bmi-status');
    bmiStatusEl.innerText = bmiResult.status;
    bmiStatusEl.className = 'badge ' + bmiResult.class;

    // Render Ujian & Skor Perincian
    const breakdownContainer = document.getElementById('prof-score-breakdown');
    breakdownContainer.innerHTML = '';

    const components = [
        { key: 'sit_reach', name: 'Sit & Reach (Kelenturan)', unit: 'cm', desc: 'Mengukur kebolehan kelenturan sendi belakang dan peha' },
        { key: 'sit_up', name: '30s Sit-Up (Daya Tahan)', unit: 'kali', desc: 'Mengukur kekuatan dan daya tahan otot abdomen' },
        { key: 'long_jump', name: 'Standing Long Jump (Kuasa)', unit: 'cm', desc: 'Mengukur kuasa eksplosif otot-otot kaki' },
        { key: 'sprint_10m', name: '10m Sprint (Kelajuan)', unit: 'saat', desc: 'Mengukur kelajuan pecutan jarak dekat murid' },
        { key: 'shuttle_run', name: '10m Shuttle Run (Ketangkasan)', unit: 'saat', desc: 'Mengukur ketangkasan fizikal dan perubahan arah pantas' },
        { key: 'hand_eye', name: 'Hand-Eye Coordination (Koordinasi)', unit: 'tangkapan', desc: 'Mengukur kebolehan koordinasi mata dan tangan' }
    ];

    const radarLabels = [];
    const radarData = [];
    const sc = student.scores || {};

    components.forEach(comp => {
        const trials = sc[comp.key] || [];
        const bestVal = calculateBestScore(comp.key, trials);
        const evalRes = evaluateFitnessComponent(comp.key, bestVal, student.gender, student.age);

        radarLabels.push(comp.name.split(' (')[0]);
        radarData.push(bestVal !== null ? evalRes.score : 0);

        let trialsStr = 'Tiada data';
        if (trials.length > 0) {
            trialsStr = trials
                .map((val, idx) => val !== null && val !== '' ? `C${idx + 1}: ${val}${comp.unit}` : null)
                .filter(v => v !== null)
                .join(', ');
            if (trialsStr === '') trialsStr = 'Tiada data';
        }

        const itemHTML = `
            <div class="score-breakdown-item">
                <div>
                    <div class="score-breakdown-name">${comp.name}</div>
                    <div class="score-breakdown-sub">${comp.desc}</div>
                </div>
                <div class="score-breakdown-trials">${trialsStr}</div>
                <div class="score-breakdown-val">${bestVal !== null ? `${bestVal} ${comp.unit}` : '-'}</div>
                <div><span class="badge ${evalRes.class}">${evalRes.rating}</span></div>
            </div>
        `;
        breakdownContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Render Sukan Cadangan
    const sportsContainer = document.getElementById('prof-sports-list');
    sportsContainer.innerHTML = '';
    const recs = getSportRecommendations(student);

    if (recs.length === 0) {
        sportsContainer.innerHTML = `
            <div class="sport-card" style="justify-content: center;">
                <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">
                    Sila rekodkan sekurang-kurangnya satu skor ujian fizikal untuk menerima cadangan bidang sukan.
                </div>
            </div>
        `;
    } else {
        recs.forEach(rec => {
            const cardHTML = `
                <div class="sport-card">
                    <div class="sport-suitability-indicator ${rec.levelClass}">
                        <i class="${rec.icon}"></i>
                    </div>
                    <div class="sport-info">
                        <div class="sport-info-top">
                            <h4>${rec.name}</h4>
                            <span class="sport-match-badge">${rec.percentage}%</span>
                        </div>
                        <p class="sport-meta">${rec.category} &bull; Kesesuaian: <strong>${rec.level}</strong></p>
                        <p class="sport-desc">${rec.desc}</p>
                    </div>
                </div>
            `;
            sportsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    switchTab('profile');

    setTimeout(() => {
        renderRadarChart(radarLabels, radarData);
    }, 60);
}

function renderRadarChart(labels, data) {
    const canvas = document.getElementById('fitnessRadarChart');
    if (!canvas) return;

    if (charts.radar) {
        try { charts.radar.destroy(); } catch (e) { }
        charts.radar = null;
    }

    const ctx = canvas.getContext('2d');
    charts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mata Prestasi (1-5)',
                data: data,
                backgroundColor: 'rgba(196, 18, 48, 0.22)',
                borderColor: '#c41230',
                pointBackgroundColor: '#c41230',
                pointBorderColor: '#ffffff',
                borderWidth: 2.5,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(0, 0, 0, 0.08)' },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' },
                    pointLabels: {
                        color: '#334155',
                        font: { size: 10.5, family: 'Outfit', weight: '600' }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1,
                        min: 0,
                        max: 5
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    charts.studentRadar = charts.radar;
}

// --- FUNGSI MUAT TURUN PDF (2 MUKA SURAT A4 RASMI) ---
async function downloadAdminPDF() {
    const student = students.find(s => s.id === selectedStudentId) || (students.length > 0 ? students[0] : null);
    if (!student) {
        alert('Sila pilih atlet terlebih dahulu.');
        return;
    }
    await generateOfficialPDF(student, 'btn-download-admin-pdf');
}

async function generateOfficialPDF(student, buttonId) {
    const btn = document.getElementById(buttonId);
    const origText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menjana PDF 2 Muka Surat...';
    }

    if (typeof html2pdf === 'undefined') {
        alert('Pustaka html2pdf belum dimuatkan sepenuhnya.');
        if (btn) { btn.disabled = false; btn.innerHTML = origText; }
        return;
    }

    const bmiResult = calculateBMI(student.weight, student.height);
    const overallFitness = calculateOverallFitness(student);
    const recs = getSportRecommendations(student);
    const sc = student.scores || {};

    const components = [
        { key: 'sit_reach', name: 'Sit & Reach (Kelenturan)', short: 'Sit & Reach', cat: 'Kelenturan Sendi Belakang & Peha', unit: 'cm' },
        { key: 'sit_up', name: '30s Sit-Up (Daya Tahan)', short: 'Sit-Up', cat: 'Kekuatan Otot Teras Abdomen', unit: 'kali' },
        { key: 'long_jump', name: 'Standing Long Jump (Kuasa)', short: 'Long Jump', cat: 'Kuasa Letupan Otot Kaki', unit: 'cm' },
        { key: 'sprint_10m', name: '10m Sprint (Kelajuan)', short: '10m Sprint', cat: 'Kelajuan Pecutan Jarak Dekat', unit: 'saat' },
        { key: 'shuttle_run', name: '10m Shuttle Run (Ketangkasan)', short: 'Shuttle Run', cat: 'Ketangkasan & Kecekapan Arah', unit: 'saat' },
        { key: 'hand_eye', name: 'Hand-Eye Coordination (Koordinasi)', short: 'Hand-Eye', cat: 'Koordinasi Motor Mata-Tangan', unit: 'tangkapan' }
    ];

    const evaluatedComponents = components.map(c => {
        const trials = sc[c.key] || [];
        const best = calculateBestScore(c.key, trials);
        const evalRes = evaluateFitnessComponent(c.key, best, student.gender, student.age);
        let trialsStr = trials
            .map((v, i) => v !== null && v !== '' ? `C${i + 1}: ${v}${c.unit}` : null)
            .filter(v => v !== null)
            .join(', ');
        if (!trialsStr) trialsStr = 'Tiada data';
        return { ...c, trialsStr, best, evalRes };
    });

    const bestComponents = evaluatedComponents
        .filter(c => c.best !== null && c.evalRes.score >= 4)
        .map(c => c.name.split(' (')[0]);
    const strengthsText = bestComponents.length > 0
        ? `Komponen kekuatan utama murid dikenal pasti dalam <strong>${bestComponents.join(', ')}</strong>.`
        : 'Prestasi kecergasan murid berada pada tahap yang seimbang merentasi ujian asas.';

    const formattedDate = new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });

    // Radar SVG Generator
    function generateRadarSvg() {
        const cx = 135, cy = 120, r = 75;
        const angles = [-Math.PI / 2, -Math.PI / 6, Math.PI / 6, Math.PI / 2, 5 * Math.PI / 6, -5 * Math.PI / 6];

        let grid = '';
        for (let lvl = 1; lvl <= 5; lvl++) {
            const lr = (lvl / 5) * r;
            const pts = angles.map(a => `${(cx + lr * Math.cos(a)).toFixed(1)},${(cy + lr * Math.sin(a)).toFixed(1)}`).join(' ');
            grid += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />`;
        }

        let axes = '';
        angles.forEach(a => {
            axes += `<line x1="${cx}" y1="${cy}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy + r * Math.sin(a)).toFixed(1)}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />`;
        });

        const dataPts = evaluatedComponents.map((c, i) => {
            const score = c.evalRes && c.evalRes.score ? Math.max(1, Math.min(5, c.evalRes.score)) : 2;
            const dr = (score / 5) * r;
            return `${(cx + dr * Math.cos(angles[i])).toFixed(1)},${(cy + dr * Math.sin(angles[i])).toFixed(1)}`;
        }).join(' ');

        let ptsDots = '';
        evaluatedComponents.forEach((c, i) => {
            const score = c.evalRes && c.evalRes.score ? Math.max(1, Math.min(5, c.evalRes.score)) : 2;
            const dr = (score / 5) * r;
            ptsDots += `<circle cx="${(cx + dr * Math.cos(angles[i])).toFixed(1)}" cy="${(cy + dr * Math.sin(angles[i])).toFixed(1)}" r="3.5" fill="#8b5cf6" stroke="#ffffff" stroke-width="1.5" />`;
        });

        let labels = '';
        angles.forEach((a, i) => {
            const lr = r + 18;
            const lx = (cx + lr * Math.cos(a)).toFixed(1);
            const ly = (cy + lr * Math.sin(a) + 3).toFixed(1);
            const align = Math.abs(Math.cos(a)) < 0.25 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
            labels += `<text x="${lx}" y="${ly}" fill="#9aa8e3" font-size="8" font-family="'Outfit', sans-serif" text-anchor="${align}">${components[i].short}</text>`;
        });

        return `
            <svg width="270" height="240" viewBox="0 0 270 240" style="display: block; margin: 0 auto;">
                ${grid}
                ${axes}
                <polygon points="${dataPts}" fill="rgba(0, 242, 254, 0.25)" stroke="#00f2fe" stroke-width="2" />
                ${ptsDots}
                ${labels}
            </svg>
        `;
    }

    const pdfWrapper = document.createElement('div');
    pdfWrapper.id = 'pdf-2pages-container';
    pdfWrapper.style.position = 'fixed';
    pdfWrapper.style.left = '0';
    pdfWrapper.style.top = '0';
    pdfWrapper.style.width = '794px';
    pdfWrapper.style.zIndex = '-99999';
    pdfWrapper.style.background = '#060919';
    pdfWrapper.style.color = '#ffffff';
    pdfWrapper.style.fontFamily = "'Outfit', sans-serif";

    pdfWrapper.innerHTML = `
        <!-- MUKA SURAT 1 -->
        <div style="width: 794px; height: 1122px; box-sizing: border-box; padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between; background: #060919;">
            <!-- Header -->
            <div style="border-bottom: 2px solid rgba(0, 242, 254, 0.3); padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #00f2fe, #4facfe); display: flex; align-items: center; justify-content: center; color: #060919; font-size: 18px; font-weight: 900;">
                        TID
                    </div>
                    <div>
                        <h1 style="font-size: 16px; margin: 0; font-weight: 700; color: #ffffff;">LAPORAN PROFIL PRESTASI & BAKAT SUKAN (TID)</h1>
                        <p style="font-size: 10px; color: #9aa8e3; margin: 2px 0 0 0;">Program Pembangunan Bakat Sukan Sekolah Rendah &bull; Kementerian Pendidikan Malaysia</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span style="color: #00f2fe; font-weight: 700; font-size: 14px;">TID ANALYST</span>
                    <p style="color: #64748b; font-size: 9.5px; margin: 2px 0 0 0;">Tarikh: ${formattedDate}</p>
                </div>
            </div>

            <!-- Info Atlet Card -->
            <div style="background: rgba(18, 26, 60, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; padding: 12px 16px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #00f2fe, #8b5cf6); padding: 2px; flex-shrink: 0;">
                        <div style="width: 100%; height: 100%; border-radius: 50%; background: #060919; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #fff;">
                            ${student.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <h2 style="font-size: 15px; font-weight: 700; color: #ffffff; margin: 0 0 3px 0;">${student.name}</h2>
                        <div style="font-size: 10.5px; color: #9aa8e3; display: flex; align-items: center; gap: 6px;">
                            <span style="background: ${student.gender === 'Lelaki' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(236, 72, 153, 0.2)'}; color: ${student.gender === 'Lelaki' ? '#60a5fa' : '#f472b6'}; padding: 1px 6px; border-radius: 4px; font-weight: 600;">${student.gender}</span>
                            <span>&bull; ${student.age} Tahun</span>
                            <span>&bull; Kelas: ${student.class}</span>
                        </div>
                        <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0;">${student.school || 'SK Pilihan'} (${student.school_code || '-'})</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px;">
                        <div style="font-size: 8.5px; color: #9aa8e3;">TINGGI</div>
                        <div style="font-size: 12px; font-weight: 700; color: #fff;">${student.height ? `${student.height} cm` : '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px;">
                        <div style="font-size: 8.5px; color: #9aa8e3;">BERAT</div>
                        <div style="font-size: 12px; font-weight: 700; color: #fff;">${student.weight ? `${student.weight} kg` : '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px;">
                        <div style="font-size: 8.5px; color: #9aa8e3;">BMI</div>
                        <div style="font-size: 12px; font-weight: 700; color: #00f2fe;">${bmiResult.bmi || '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px;">
                        <div style="font-size: 8.5px; color: #9aa8e3;">STATUS</div>
                        <div style="font-size: 9.5px; font-weight: 700; color: #34d399;">${bmiResult.status}</div>
                    </div>
                </div>
            </div>

            <!-- Radar & Cadangan Sukan -->
            <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 14px;">
                <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="font-size: 12px; font-weight: 700; color: #fff; margin: 0;">Profil Radar Kecergasan</h3>
                            <span style="font-size: 9px; color: #00f2fe;">Skala 1 - 5</span>
                        </div>
                        <p style="font-size: 9px; color: #9aa8e3; margin: 2px 0 0 0;">Berasaskan 6 bateri ujian TID</p>
                    </div>
                    <div style="text-align: center; height: 240px; display: flex; align-items: center; justify-content: center;">
                        ${generateRadarSvg()}
                    </div>
                    <div style="font-size: 8.5px; color: #64748b; text-align: center;">
                        Mata 5 = Cemerlang | Mata 4 = Baik | Mata 3 = Sederhana | Mata 1-2 = Perlu Latihan
                    </div>
                </div>

                <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px; display: flex; flex-direction: column;">
                    <h3 style="font-size: 12px; font-weight: 700; color: #fff; margin: 0 0 2px 0;">Cadangan 3 Bidang Sukan Utama</h3>
                    <p style="font-size: 9px; color: #9aa8e3; margin: 0 0 8px 0;">Padanan bakat berasaskan keupayaan fisiologi:</p>
                    <div style="display: flex; flex-direction: column; gap: 7px; flex: 1;">
                        ${recs.slice(0, 3).map(rec => `
                            <div style="background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 7px 9px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <strong style="font-size: 11px; color: #ffffff;">${rec.name}</strong>
                                    <span style="font-size: 9.5px; font-weight: 700; color: #00f2fe;">${rec.percentage}%</span>
                                </div>
                                <div style="font-size: 8.5px; color: #9aa8e3; margin: 1px 0;">${rec.category} &bull; Kesesuaian: <strong style="color: #34d399;">${rec.level}</strong></div>
                                <div style="font-size: 8px; color: #94a3b8;">${rec.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Rumusan -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px; padding: 9px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <span style="font-size: 9.5px; color: #00f2fe; text-transform: uppercase; font-weight: 700;">Rumusan Analisis Bakat:</span>
                    <p style="font-size: 10px; color: #cbd5e1; margin: 2px 0 0 0;">${strengthsText}</p>
                </div>
                <div style="text-align: right; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 14px; flex-shrink: 0;">
                    <div style="font-size: 8.5px; color: #9aa8e3;">Purata Kecergasan</div>
                    <span style="font-size: 10px; font-weight: 700; color: #34d399;">${overallFitness.rating} (${overallFitness.avgScore}/5.0)</span>
                </div>
            </div>

            <!-- Footer 1 -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px; display: flex; justify-content: space-between; font-size: 9.5px; color: #64748b;">
                <span>TIDPutra &bull; ${student.school || 'SK'}</span>
                <span>Muka Surat <strong>1</strong> daripada <strong>2</strong></span>
            </div>
        </div>

        <div class="html2pdf__page-break" style="page-break-before: always; break-before: page; height: 0;"></div>

        <!-- MUKA SURAT 2 -->
        <div style="width: 794px; height: 1122px; box-sizing: border-box; padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between; background: #060919;">
            <div style="border-bottom: 2px solid rgba(0, 242, 254, 0.3); padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="font-size: 15px; margin: 0; font-weight: 700; color: #ffffff;">PERINCIAN SKOR UJIAN KECERGASAN FIZIKAL & PENGESAHAN</h2>
                    <p style="font-size: 10px; color: #9aa8e3; margin: 2px 0 0 0;">Lembaran Rekod Bateri Ujian Talent Identification (TID)</p>
                </div>
                <div style="text-align: right; font-size: 10px; color: #cbd5e1;">
                    <div>Atlet: <strong style="color: #fff;">${student.name}</strong></div>
                    <div style="color: #64748b; font-size: 9px;">Kelas: ${student.class} &bull; ${student.age} Tahun</div>
                </div>
            </div>

            <!-- Jadual Keputusan -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px 14px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1.5px solid rgba(0, 242, 254, 0.3); color: #9aa8e3; font-size: 9px; text-transform: uppercase;">
                            <th style="padding: 6px 8px; width: 30px;">Bil</th>
                            <th style="padding: 6px 8px;">Komponen Ujian</th>
                            <th style="padding: 6px 8px; width: 170px;">Rekod Percubaan</th>
                            <th style="padding: 6px 8px; width: 90px; text-align: center;">Skor Terbaik</th>
                            <th style="padding: 6px 8px; width: 100px; text-align: center;">Tahap</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluatedComponents.map((c, idx) => `
                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: ${idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'};">
                                <td style="padding: 8px 8px; color: #64748b;">${idx + 1}</td>
                                <td style="padding: 8px 8px;">
                                    <div style="font-weight: 700; color: #ffffff; font-size: 10.5px;">${c.name}</div>
                                    <div style="font-size: 8.5px; color: #9aa8e3;">${c.cat}</div>
                                </td>
                                <td style="padding: 8px 8px; color: #cbd5e1; font-family: monospace; font-size: 9px;">${c.trialsStr}</td>
                                <td style="padding: 8px 8px; text-align: center; font-weight: 700; color: #00f2fe; font-size: 11px;">
                                    ${c.best !== null ? `${c.best} ${c.unit}` : '-'}
                                </td>
                                <td style="padding: 8px 8px; text-align: center;">
                                    <span style="display: inline-block; font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 4px; background: rgba(0,242,254,0.1); color: #00f2fe;">
                                        ${c.evalRes.rating}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Ulasan Jurulatih -->
            <div style="background: rgba(18, 26, 60, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 14px;">
                <div style="font-size: 10px; font-weight: 700; color: #00f2fe; margin-bottom: 4px;">Ulasan Jurulatih / Guru Penilai:</div>
                <div style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
                    Prestasi kecergasan fizikal berada pada tahap <strong>${overallFitness.rating.toLowerCase()}</strong>. Murid ini amat berpotensi untuk menyertai program latihan sukan <strong>${recs.length > 0 ? recs[0].name : 'olahraga'}</strong>.
                </div>
            </div>

            <!-- Pengesahan & Tandatangan -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 14px 18px;">
                <div style="font-size: 10px; font-weight: 700; color: #9aa8e3; margin-bottom: 12px; text-transform: uppercase;">
                    Pengesahan & Perakuan Pegawai Penilai:
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px;">
                    <div>
                        <div style="font-size: 9.5px; color: #cbd5e1; margin-bottom: 35px;">Disediakan Oleh (Guru Penilai / Jurulatih TID):</div>
                        <div style="border-bottom: 1px dashed #64748b; margin-bottom: 4px;"></div>
                        <div style="font-size: 9px; color: #94a3b8;">Nama: _____________________________________</div>
                        <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">Tarikh: ____________________________________</div>
                    </div>
                    <div>
                        <div style="font-size: 9.5px; color: #cbd5e1; margin-bottom: 35px;">Disahkan Oleh (Guru Besar / GPK Kokurikulum):</div>
                        <div style="border-bottom: 1px dashed #64748b; margin-bottom: 4px;"></div>
                        <div style="font-size: 9px; color: #94a3b8;">Nama & Cop Rasmi: __________________________</div>
                        <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">Tarikh: ____________________________________</div>
                    </div>
                </div>
            </div>

            <!-- Footer 2 -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px; display: flex; justify-content: space-between; font-size: 9.5px; color: #64748b;">
                <span>Dokumen Sah Pengenalpastian Bakat Sukan (TID) &bull; Dicetak melalui Sistem TID Analyst</span>
                <span>Muka Surat <strong>2</strong> daripada <strong>2</strong></span>
            </div>
        </div>
    `;

    document.body.appendChild(pdfWrapper);
    await new Promise(res => setTimeout(res, 100));

    const opt = {
        margin: 0,
        filename: `Laporan_TID_${student.name.trim().replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#060919', logging: false, windowWidth: 794 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], before: '.html2pdf__page-break' }
    };

    try {
        await html2pdf().set(opt).from(pdfWrapper).save();
    } catch (err) {
        console.error('PDF Error:', err);
        alert('Ralat menjana PDF. Anda boleh menggunakan butang Cetak Laporan.');
    } finally {
        if (pdfWrapper && pdfWrapper.parentNode) {
            pdfWrapper.parentNode.removeChild(pdfWrapper);
        }
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = origText;
        }
    }
}

// ==========================================
// 10. PAPAN PEMUKA & ANALITIS KUMPULAN (ADMIN)
// ==========================================

function renderDashboard() {
    const total = students.length;
    const boys = students.filter(s => s.gender === 'Lelaki').length;
    const girls = students.filter(s => s.gender === 'Perempuan').length;

    document.getElementById('stat-total-students').innerText = total;
    document.getElementById('stat-boys').innerText = boys;
    document.getElementById('stat-girls').innerText = girls;

    let fitnessSum = 0, fitnessCount = 0;
    students.forEach(s => {
        const fit = calculateOverallFitness(s);
        if (fit.rating !== 'Tiada Data') {
            fitnessSum += parseFloat(fit.avgScore);
            fitnessCount++;
        }
    });

    const avgFitnessVal = fitnessCount > 0 ? (fitnessSum / fitnessCount) : 0;
    const avgFitnessEl = document.getElementById('stat-avg-fitness');
    if (avgFitnessEl) {
        avgFitnessEl.innerText = avgFitnessVal > 0 ? `${avgFitnessVal.toFixed(1)}/5.0` : 'N/A';
    }

    // Recent Table
    const recentTable = document.querySelector('#dashboard-recent-table tbody');
    if (recentTable) {
        recentTable.innerHTML = '';
        const sorted = [...students].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 5);

        if (sorted.length === 0) {
            recentTable.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Tiada data atlet direkodkan.</td></tr>`;
        } else {
            sorted.forEach(s => {
                const bmiRes = calculateBMI(s.weight, s.height);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight:600;">${s.name}</td>
                    <td>${s.school || 'SK'}</td>
                    <td>${s.class}</td>
                    <td><span class="badge ${s.gender === 'Lelaki' ? 'badge-lelaki' : 'badge-perempuan'}">${s.gender}</span></td>
                    <td>${bmiRes.bmi || '-'}</td>
                    <td>
                        <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="viewProfile('${s.id}')">
                            <i class="fa-solid fa-eye"></i> Profil
                        </button>
                    </td>
                `;
                recentTable.appendChild(tr);
            });
        }
    }

    renderDashboardBakatChart();
}

function renderDashboardBakatChart() {
    const ctx = document.getElementById('dashboardBakatChart');
    if (!ctx) return;

    const sportCounts = {};
    students.forEach(s => {
        const recs = getSportRecommendations(s);
        if (recs.length > 0) {
            const bestSport = recs[0].name.split(' / ')[0];
            sportCounts[bestSport] = (sportCounts[bestSport] || 0) + 1;
        }
    });

    const labels = Object.keys(sportCounts);
    const data = Object.values(sportCounts);

    if (charts.dashboardBakat) {
        charts.dashboardBakat.destroy();
    }

    if (labels.length === 0) return;

    charts.dashboardBakat = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#c41230', '#f43f5e', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#334155', font: { family: 'Outfit', size: 10 } } }
            }
        }
    });
}

let currentAnalyticsSubTab = 'school';

function switchAnalyticsSubTab(tab) {
    currentAnalyticsSubTab = tab;
    document.querySelectorAll('.analytics-tab-btn').forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-secondary');
    });
    const activeBtn = document.getElementById(`btn-analytics-${tab}`);
    if (activeBtn) {
        activeBtn.classList.remove('btn-secondary');
        activeBtn.classList.add('btn-primary', 'active');
    }

    document.querySelectorAll('.analytics-subtab-content').forEach(el => el.style.display = 'none');
    const targetContent = document.getElementById(`analytics-subtab-${tab}`);
    if (targetContent) {
        targetContent.style.display = 'block';
    }
    renderAnalytics();
}

function renderAnalytics() {
    const components = ['sit_reach', 'sit_up', 'long_jump', 'sprint_10m', 'shuttle_run', 'hand_eye'];
    const compNames = ['Kelenturan', 'Sit-Up', 'Kuasa Kaki', 'Kelajuan', 'Ketangkasan', 'Koordinasi'];

    const schoolFilterEl = document.getElementById('analytics-school-filter');
    const schoolFilter = schoolFilterEl ? schoolFilterEl.value.trim() : '';

    let dataset = (students && students.length > 0) ? students : initialMockStudents;
    if (schoolFilter && schoolFilter !== '' && !schoolFilter.toLowerCase().includes('semua')) {
        const sf = schoolFilter.toLowerCase();
        dataset = dataset.filter(s => {
            const scName = (s.school || '').toLowerCase();
            const scCode = (s.school_code || '').toLowerCase();
            return scCode === sf || 
                   scName === sf || 
                   (scCode && sf.includes(scCode)) ||
                   (scName && sf.includes(scName)) ||
                   (scCode && scCode.includes(sf)) ||
                   (scName && scName.includes(sf));
        });
    }

    if (dataset.length === 0) {
        dataset = initialMockStudents;
    }

    // ==========================================
    // 1. BAHAGIAN 1: KESELURUHAN SEKOLAH
    // ==========================================
    let totalScoreSum = 0;
    let totalScoreCount = 0;
    const compScoreSums = [0, 0, 0, 0, 0, 0];
    const compScoreCounts = [0, 0, 0, 0, 0, 0];
    const maleScores = [0, 0, 0, 0, 0, 0], maleCounts = [0, 0, 0, 0, 0, 0];
    const femaleScores = [0, 0, 0, 0, 0, 0], femaleCounts = [0, 0, 0, 0, 0, 0];
    const fitnessDistribution = { 'Cemerlang': 0, 'Baik': 0, 'Sederhana': 0, 'Kurang Memuaskan': 0, 'Lemah': 0 };
    const sportsCounts = {};

    dataset.forEach(s => {
        const sc = s.scores || {};
        const isMale = s.gender === 'Lelaki';

        components.forEach((comp, idx) => {
            const best = calculateBestScore(comp, sc[comp]);
            if (best !== null) {
                const pt = evaluateFitnessComponent(comp, best, s.gender, s.age).score;
                compScoreSums[idx] += pt;
                compScoreCounts[idx]++;
                totalScoreSum += pt;
                totalScoreCount++;

                if (isMale) {
                    maleScores[idx] += pt; maleCounts[idx]++;
                } else {
                    femaleScores[idx] += pt; femaleCounts[idx]++;
                }
            }
        });

        const fit = calculateOverallFitness(s);
        if (fit.rating !== 'Tiada Data' && fitnessDistribution[fit.rating] !== undefined) {
            fitnessDistribution[fit.rating]++;
        }

        const recs = getSportRecommendations(s);
        if (recs && recs.length > 0 && recs[0].suitability !== 'Rendah') {
            sportsCounts[recs[0].sport.name] = (sportsCounts[recs[0].sport.name] || 0) + 1;
        }
    });

    // Stat Summary Cards Update
    const statTotal = document.getElementById('analytics-stat-total-students');
    const statAvg = document.getElementById('analytics-stat-avg-score');
    const statBest = document.getElementById('analytics-stat-best-comp');
    const statTopSport = document.getElementById('analytics-stat-top-sport');

    if (statTotal) statTotal.innerText = dataset.length;
    if (statAvg) {
        const overallAvg = totalScoreCount > 0 ? (totalScoreSum / totalScoreCount).toFixed(1) : '0.0';
        statAvg.innerText = `${overallAvg} / 5.0`;
    }
    if (statBest) {
        let bestCompIdx = 0, bestCompVal = 0;
        compScoreSums.forEach((sum, idx) => {
            const avg = compScoreCounts[idx] > 0 ? sum / compScoreCounts[idx] : 0;
            if (avg > bestCompVal) {
                bestCompVal = avg;
                bestCompIdx = idx;
            }
        });
        statBest.innerText = bestCompVal > 0 ? `${compNames[bestCompIdx]} (${bestCompVal.toFixed(1)})` : '-';
    }
    if (statTopSport) {
        let topSportName = '-', maxCount = 0;
        Object.entries(sportsCounts).forEach(([sp, cnt]) => {
            if (cnt > maxCount) {
                maxCount = cnt;
                topSportName = `${sp} (${cnt} atlet)`;
            }
        });
        statTopSport.innerText = topSportName;
    }

    // Chart 1: Male vs Female Bar Chart
    const maleAvg = maleScores.map((sum, idx) => maleCounts[idx] > 0 ? (sum / maleCounts[idx]).toFixed(1) : 0);
    const femaleAvg = femaleScores.map((sum, idx) => femaleCounts[idx] > 0 ? (sum / femaleCounts[idx]).toFixed(1) : 0);

    const ctx1 = document.getElementById('groupPerformanceChart');
    if (ctx1) {
        if (charts.groupPerf) charts.groupPerf.destroy();
        charts.groupPerf = new Chart(ctx1.getContext('2d'), {
            type: 'bar',
            data: {
                labels: compNames,
                datasets: [
                    { label: 'Lelaki', data: maleAvg, backgroundColor: '#3b82f6', borderColor: '#2563eb', borderWidth: 1, borderRadius: 6 },
                    { label: 'Perempuan', data: femaleAvg, backgroundColor: '#ec4899', borderColor: '#db2777', borderWidth: 1, borderRadius: 6 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 5, grid: { color: 'rgba(0, 0, 0, 0.06)' }, ticks: { color: '#000000', font: { weight: '600' } } },
                    x: { grid: { display: false }, ticks: { color: '#000000', font: { family: 'Outfit', weight: '600' } } }
                },
                plugins: { legend: { labels: { color: '#000000', font: { family: 'Outfit', weight: '600' } } } }
            }
        });
    }

    // Chart 2: Fitness Distribution
    const ctx2 = document.getElementById('groupFitnessDistChart');
    if (ctx2) {
        if (charts.groupDist) charts.groupDist.destroy();
        charts.groupDist = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(fitnessDistribution),
                datasets: [{
                    data: Object.values(fitnessDistribution),
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#000000', font: { family: 'Outfit', size: 11, weight: '600' } } }
                }
            }
        });
    }

    // Chart 3: Top Sports Talent Distribution
    const ctx3 = document.getElementById('groupSportsDistChart');
    if (ctx3) {
        if (charts.groupSports) charts.groupSports.destroy();
        const sportLabels = Object.keys(sportsCounts);
        const sportValues = Object.values(sportsCounts);

        charts.groupSports = new Chart(ctx3.getContext('2d'), {
            type: 'bar',
            data: {
                labels: sportLabels.length > 0 ? sportLabels : ['Tiada Data Sukan'],
                datasets: [{
                    label: 'Bilangan Atlet Berbakat',
                    data: sportValues.length > 0 ? sportValues : [0],
                    backgroundColor: '#c41230',
                    borderColor: '#990000',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { precision: 0, color: '#000000' } },
                    x: { grid: { display: false }, ticks: { color: '#000000', font: { family: 'Outfit', weight: '600' } } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // ==========================================
    // 2. BAHAGIAN 2: ANALISIS MENGIKUT KELAS
    // ==========================================
    const classGroups = {};
    dataset.forEach(s => {
        const cls = s.class || 'Tiada Kelas';
        if (!classGroups[cls]) {
            classGroups[cls] = {
                className: cls,
                students: [],
                scoreSums: [0, 0, 0, 0, 0, 0],
                scoreCounts: [0, 0, 0, 0, 0, 0],
                totalPoints: 0,
                totalCount: 0,
                sports: {}
            };
        }
        const g = classGroups[cls];
        g.students.push(s);

        const sc = s.scores || {};
        components.forEach((comp, idx) => {
            const best = calculateBestScore(comp, sc[comp]);
            if (best !== null) {
                const pt = evaluateFitnessComponent(comp, best, s.gender, s.age).score;
                g.scoreSums[idx] += pt;
                g.scoreCounts[idx]++;
                g.totalPoints += pt;
                g.totalCount++;
            }
        });

        const recs = getSportRecommendations(s);
        if (recs && recs.length > 0 && recs[0].suitability !== 'Rendah') {
            g.sports[recs[0].sport.name] = (g.sports[recs[0].sport.name] || 0) + 1;
        }
    });

    const classKeys = Object.keys(classGroups).sort();
    const classAverages = classKeys.map(k => {
        const g = classGroups[k];
        return g.totalCount > 0 ? (g.totalPoints / g.totalCount).toFixed(2) : 0;
    });

    const ctxClass = document.getElementById('classPerformanceChart');
    if (ctxClass) {
        if (charts.classPerf) charts.classPerf.destroy();
        charts.classPerf = new Chart(ctxClass.getContext('2d'), {
            type: 'bar',
            data: {
                labels: classKeys.length > 0 ? classKeys : ['Tiada Data'],
                datasets: [{
                    label: 'Purata Skor Kelas (1 - 5)',
                    data: classAverages.length > 0 ? classAverages : [0],
                    backgroundColor: '#e11d48',
                    borderColor: '#c41230',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 5, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#000000', font: { weight: '600' } } },
                    x: { grid: { display: false }, ticks: { color: '#000000', font: { family: 'Outfit', weight: '600' } } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    const classTbody = document.getElementById('analytics-class-tbody');
    if (classTbody) {
        if (classKeys.length === 0) {
            classTbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 2rem;">Tiada data kelas ditemui.</td></tr>';
        } else {
            let html = '';
            classKeys.forEach(k => {
                const g = classGroups[k];
                const avg = g.totalCount > 0 ? (g.totalPoints / g.totalCount).toFixed(2) : '0.00';

                let rating = 'Tiada Data';
                let ratingBadge = 'badge-fitness';
                if (avg >= 4.2) { rating = 'Cemerlang'; ratingBadge = 'badge-excellent'; }
                else if (avg >= 3.4) { rating = 'Baik'; ratingBadge = 'badge-good'; }
                else if (avg >= 2.6) { rating = 'Sederhana'; ratingBadge = 'badge-average'; }
                else if (avg >= 1.8) { rating = 'Kurang Memuaskan'; ratingBadge = 'badge-fair'; }
                else if (avg > 0) { rating = 'Lemah'; ratingBadge = 'badge-poor'; }

                let bestComp = '-';
                let maxCVal = 0;
                g.scoreSums.forEach((s, idx) => {
                    const cAvg = g.scoreCounts[idx] > 0 ? s / g.scoreCounts[idx] : 0;
                    if (cAvg > maxCVal) {
                        maxCVal = cAvg;
                        bestComp = `${compNames[idx]} (${cAvg.toFixed(1)})`;
                    }
                });

                let topSp = '-';
                let maxSpC = 0;
                Object.entries(g.sports).forEach(([sp, cnt]) => {
                    if (cnt > maxSpC) {
                        maxSpC = cnt;
                        topSp = `${sp} (${cnt})`;
                    }
                });

                html += `
                    <tr>
                        <td><strong style="color: #000000; font-family: var(--font-outfit);">${g.className}</strong></td>
                        <td><strong>${g.students.length}</strong> orang</td>
                        <td><span style="font-weight: 700; color: var(--accent-primary);">${avg}</span> / 5.0</td>
                        <td><span class="badge ${ratingBadge}">${rating}</span></td>
                        <td>${bestComp}</td>
                        <td><span style="font-weight: 600; color: #000000;">${topSp}</span></td>
                    </tr>
                `;
            });
            classTbody.innerHTML = html;
        }
    }

    // ==========================================
    // 3. BAHAGIAN 3: ANALISIS MENGIKUT UMUR
    // ==========================================
    const ageGroups = {};
    dataset.forEach(s => {
        const age = s.age || 10;
        const ageKey = `${age} Tahun`;
        if (!ageGroups[ageKey]) {
            ageGroups[ageKey] = {
                ageKey: ageKey,
                ageNum: age,
                students: [],
                compSums: [0, 0, 0, 0, 0, 0],
                compCounts: [0, 0, 0, 0, 0, 0],
                totalPoints: 0,
                totalCount: 0
            };
        }
        const ag = ageGroups[ageKey];
        ag.students.push(s);

        const sc = s.scores || {};
        components.forEach((comp, idx) => {
            const best = calculateBestScore(comp, sc[comp]);
            if (best !== null) {
                const pt = evaluateFitnessComponent(comp, best, s.gender, s.age).score;
                ag.compSums[idx] += pt;
                ag.compCounts[idx]++;
                ag.totalPoints += pt;
                ag.totalCount++;
            }
        });
    });

    const ageKeys = Object.keys(ageGroups).sort((a, b) => ageGroups[a].ageNum - ageGroups[b].ageNum);
    const ageColors = ['#c41230', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    const ageDatasets = ageKeys.map((k, idx) => {
        const ag = ageGroups[k];
        const dataArr = components.map((_, cIdx) => ag.compCounts[cIdx] > 0 ? (ag.compSums[cIdx] / ag.compCounts[cIdx]).toFixed(1) : 0);
        return {
            label: k,
            data: dataArr,
            backgroundColor: ageColors[idx % ageColors.length],
            borderColor: ageColors[idx % ageColors.length],
            borderWidth: 1,
            borderRadius: 4
        };
    });

    const ctxAge = document.getElementById('agePerformanceChart');
    if (ctxAge) {
        if (charts.agePerf) charts.agePerf.destroy();
        charts.agePerf = new Chart(ctxAge.getContext('2d'), {
            type: 'bar',
            data: {
                labels: compNames,
                datasets: ageDatasets.length > 0 ? ageDatasets : [{ label: 'Tiada Data', data: [0, 0, 0, 0, 0, 0], backgroundColor: '#c41230' }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 5, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#000000', font: { weight: '600' } } },
                    x: { grid: { display: false }, ticks: { color: '#000000', font: { family: 'Outfit', weight: '600' } } }
                },
                plugins: { legend: { position: 'top', labels: { color: '#000000', font: { family: 'Outfit', weight: '600' } } } }
            }
        });
    }

    const ctxAgeDist = document.getElementById('ageDistributionChart');
    if (ctxAgeDist) {
        if (charts.ageDist) charts.ageDist.destroy();
        const ageStudentCounts = ageKeys.map(k => ageGroups[k].students.length);
        charts.ageDist = new Chart(ctxAgeDist.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ageKeys.length > 0 ? ageKeys : ['Tiada Data'],
                datasets: [{
                    data: ageStudentCounts.length > 0 ? ageStudentCounts : [0],
                    backgroundColor: ageColors.slice(0, ageKeys.length),
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#000000', font: { family: 'Outfit', weight: '600', size: 11 } } }
                }
            }
        });
    }

    const ageTbody = document.getElementById('analytics-age-tbody');
    if (ageTbody) {
        if (ageKeys.length === 0) {
            ageTbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 2rem;">Tiada data kumpulan umur ditemui.</td></tr>';
        } else {
            let html = '';
            ageKeys.forEach(k => {
                const ag = ageGroups[k];
                const avg = ag.totalCount > 0 ? (ag.totalPoints / ag.totalCount).toFixed(2) : '0.00';

                let rating = 'Tiada Data';
                let ratingBadge = 'badge-fitness';
                if (avg >= 4.2) { rating = 'Cemerlang'; ratingBadge = 'badge-excellent'; }
                else if (avg >= 3.4) { rating = 'Baik'; ratingBadge = 'badge-good'; }
                else if (avg >= 2.6) { rating = 'Sederhana'; ratingBadge = 'badge-average'; }
                else if (avg >= 1.8) { rating = 'Kurang Memuaskan'; ratingBadge = 'badge-fair'; }
                else if (avg > 0) { rating = 'Lemah'; ratingBadge = 'badge-poor'; }

                let highestComp = '-', lowestComp = '-';
                let maxVal = -1, minVal = 999;
                ag.compSums.forEach((s, idx) => {
                    const cAvg = ag.compCounts[idx] > 0 ? s / ag.compCounts[idx] : 0;
                    if (cAvg > maxVal) {
                        maxVal = cAvg;
                        highestComp = `${compNames[idx]} (${cAvg.toFixed(1)})`;
                    }
                    if (cAvg < minVal && cAvg > 0) {
                        minVal = cAvg;
                        lowestComp = `${compNames[idx]} (${cAvg.toFixed(1)})`;
                    }
                });

                html += `
                    <tr>
                        <td><strong style="color: #000000; font-family: var(--font-outfit);">${ag.ageKey}</strong></td>
                        <td><strong>${ag.students.length}</strong> orang</td>
                        <td><span style="font-weight: 700; color: var(--accent-primary);">${avg}</span> / 5.0</td>
                        <td><span class="badge ${ratingBadge}">${rating}</span></td>
                        <td><span style="color: #10b981; font-weight: 600;">${highestComp}</span></td>
                        <td><span style="color: #ef4444; font-weight: 600;">${lowestComp !== '-' ? lowestComp : 'Tiada'}</span></td>
                    </tr>
                `;
            });
            ageTbody.innerHTML = html;
        }
    }
}

// Window Global Exports
window.switchTab = switchTab;
window.handleLogout = handleLogout;
window.switchRegMethod = switchRegMethod;
window.calculateLiveBMI = calculateLiveBMI;
window.handleExcelUpload = handleExcelUpload;
window.parsePastedData = parsePastedData;
window.saveBatchAthletes = saveBatchAthletes;
window.filterAdminStudents = filterAdminStudents;
window.deleteStudent = deleteStudent;
window.deleteSchool = deleteSchool;
window.deleteAdmin = deleteAdmin;
window.switchTidTestMode = switchTidTestMode;
window.switchTestBattery = switchTestBattery;
window.handleQuickSelectAthlete = handleQuickSelectAthlete;
window.openRecordScores = openRecordScores;
window.saveCustomMetrics = saveCustomMetrics;
window.switchIndividuMode = switchIndividuMode;
window.selectIndividuClass = selectIndividuClass;
window.renderIndividuList = renderIndividuList;
window.viewProfile = viewProfile;
window.handleProfileBack = handleProfileBack;
window.downloadAdminPDF = downloadAdminPDF;
window.copyTextToClipboard = copyTextToClipboard;
window.switchAnalyticsSubTab = switchAnalyticsSubTab;
window.renderAnalytics = renderAnalytics;
window.printManualTestForm = printManualTestForm;
window.printClassRosterForm = printClassRosterForm;
window.handlePrintSchoolChange = handlePrintSchoolChange;
window.renderManualPrintPreview = renderManualPrintPreview;

