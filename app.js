// State Pengurusan Data
let students = [];
let selectedStudentId = null;
let charts = {}; // Menyimpan rujukan objek Chart.js

// Tunggu dokumen dimuatkan sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Inisialisasi Aplikasi
function initApp() {
    setupTabNavigation();
    setupForms();
    setupSearch();
    setupLoginSystem();
    setupAdminTeacherRegister();
    loadStudents();
}

// Pengurusan Tab
function setupTabNavigation() {
    const menuItems = document.querySelectorAll('.sidebar .menu-list .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Nyahaktifkan semua tab & menu
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebar .menu-list .menu-item').forEach(item => item.classList.remove('active'));
    
    // Aktifkan tab & menu yang dipilih
    const selectedTab = document.getElementById(tabId);
    const selectedMenu = document.querySelector(`.sidebar .menu-list .menu-item[data-tab="${tabId}"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedMenu) selectedMenu.classList.add('active');
    
    // Muat semula data khusus jika menukar ke tab tertentu
    if (tabId === 'dashboard') {
        renderDashboard();
    } else if (tabId === 'students') {
        renderStudentsTable();
    } else if (tabId === 'analytics') {
        renderAnalytics();
    } else if (tabId === 'teachers') {
        loadTeachers();
    }
}

// Memuat data atlet daripada backend API
async function loadStudents() {
    try {
        const response = await fetch('api.php?action=list');
        if (!response.ok) throw new Error('Gagal memuatkan data.');
        students = await response.json();
        
        // Render paparan semasa
        renderDashboard();
        renderStudentsTable();
    } catch (err) {
        console.error(err);
        alert('Ralat semasa menyambung ke API. Pastikan XAMPP sedang berjalan.');
    }
}

// Logik Pengurusan Carian
function setupSearch() {
    const searchInput = document.getElementById('search-student');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            renderStudentsTable(query);
        });
    }
}

// Logik Pendaftaran & Borang Skor
function setupForms() {
    // Pendaftaran Murid
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const gender = document.getElementById('reg-gender').value;
            const age = parseInt(document.getElementById('reg-age').value);
            const school = document.getElementById('reg-school').value.trim();
            const className = document.getElementById('reg-class').value.trim();
            const height = parseFloat(document.getElementById('reg-height').value);
            const weight = parseFloat(document.getElementById('reg-weight').value);
            
            const studentData = { name, gender, age, school, class: className, height, weight };
            
            try {
                const response = await fetch('api.php?action=register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(studentData)
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('Murid berjaya didaftarkan!');
                    registerForm.reset();
                    
                    // Set default sekolah semula
                    document.getElementById('reg-school').value = "SK Taman Tun Dr Ismail";
                    
                    // Muat semula data & buka senarai murid
                    await loadStudents();
                    switchTab('students');
                } else {
                    alert('Gagal mendaftar: ' + result.error);
                }
            } catch (err) {
                console.error(err);
                alert('Ralat menghantar data pendaftaran.');
            }
        });
    }

    // Perekodan Skor
    const scoresForm = document.getElementById('scores-form');
    if (scoresForm) {
        scoresForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('score-student-id').value;
            const scoresData = {
                id: id,
                scores: {
                    sit_reach: [
                        document.getElementById('sr-t1').value,
                        document.getElementById('sr-t2').value,
                        document.getElementById('sr-t3').value
                    ],
                    sit_up: [
                        document.getElementById('su-t1').value,
                        document.getElementById('su-t2').value
                    ],
                    long_jump: [
                        document.getElementById('lj-t1').value,
                        document.getElementById('lj-t2').value
                    ],
                    sprint_10m: [
                        document.getElementById('sp-t1').value
                    ],
                    shuttle_run: [
                        document.getElementById('sr-run-t1').value,
                        document.getElementById('sr-run-t2').value
                    ],
                    hand_eye: [
                        document.getElementById('he-t1').value
                    ]
                }
            };

            try {
                const response = await fetch('api.php?action=save_scores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scoresData)
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('Skor ujian fizikal murid berjaya disimpan!');
                    scoresForm.reset();
                    await loadStudents();
                    
                    // Terus ke profil murid tersebut untuk tunjuk hasil analisis
                    viewProfile(id);
                } else {
                    alert('Gagal menyimpan skor: ' + result.error);
                }
            } catch (err) {
                console.error(err);
                alert('Ralat menghantar data skor ujian.');
            }
        });
    }
}

// Menghapuskan Rekod Murid
async function deleteStudent(id) {
    if (confirm('Adakah anda pasti mahu memadam rekod atlet ini? Semua skor ujian juga akan dipadam.')) {
        const activeRole = localStorage.getItem('tid_current_role') || 'Admin';
        try {
            const response = await fetch('api.php?action=delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role: activeRole })
            });
            const result = await response.json();
            if (result.success) {
                alert('Rekod murid berjaya dipadam.');
                await loadStudents();
            } else {
                alert('Gagal memadam: ' + result.error);
            }
        } catch (err) {
            console.error(err);
            alert('Ralat semasa memadam data.');
        }
    }
}

// Buka Borang Rekod Skor untuk Murid Tertentu
function openRecordScores(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    selectedStudentId = id;
    document.getElementById('score-student-id').value = id;
    document.getElementById('record-athlete-name').innerText = student.name;
    document.getElementById('record-athlete-meta').innerText = `${student.gender} | ${student.age} Tahun | Kelas ${student.class}`;
    
    // Masukkan data skor sedia ada (jika ada) ke borang
    const sc = student.scores || {};
    
    document.getElementById('sr-t1').value = sc.sit_reach ? sc.sit_reach[0] || '' : '';
    document.getElementById('sr-t2').value = sc.sit_reach ? sc.sit_reach[1] || '' : '';
    document.getElementById('sr-t3').value = sc.sit_reach ? sc.sit_reach[2] || '' : '';
    
    document.getElementById('su-t1').value = sc.sit_up ? sc.sit_up[0] || '' : '';
    document.getElementById('su-t2').value = sc.sit_up ? sc.sit_up[1] || '' : '';
    
    document.getElementById('lj-t1').value = sc.long_jump ? sc.long_jump[0] || '' : '';
    document.getElementById('lj-t2').value = sc.long_jump ? sc.long_jump[1] || '' : '';
    
    document.getElementById('sp-t1').value = sc.sprint_10m ? sc.sprint_10m[0] || '' : '';
    
    document.getElementById('sr-run-t1').value = sc.shuttle_run ? sc.shuttle_run[0] || '' : '';
    document.getElementById('sr-run-t2').value = sc.shuttle_run ? sc.shuttle_run[1] || '' : '';
    
    document.getElementById('he-t1').value = sc.hand_eye ? sc.hand_eye[0] || '' : '';

    // Papar borang input skor
    document.getElementById('no-athlete-selected').style.display = 'none';
    document.getElementById('athlete-selected-area').style.display = 'block';
    
    switchTab('record');
}

// Mengira Skor Terbaik (Best Trial) daripada data ujian
function calculateBestScore(component, scoresArray) {
    if (!scoresArray || scoresArray.length === 0) return null;
    
    // Tapis keluar nilai null atau kosong
    const validScores = scoresArray
        .map(val => val !== null && val !== '' ? parseFloat(val) : null)
        .filter(val => val !== null && !isNaN(val));

    if (validScores.length === 0) return null;

    if (component === 'sprint_10m' || component === 'shuttle_run') {
        // Masa larian pecut dan shuttle run - paling rendah paling bagus
        return Math.min(...validScores);
    } else {
        // Ujian sit-up, long jump, sit-reach, hand-eye - paling tinggi paling bagus
        return Math.max(...validScores);
    }
}

// Kira BMI dan Tahap Status
function calculateBMI(weight, height) {
    if (!weight || !height) return { bmi: null, status: 'N/A', class: '' };
    
    const bmi = weight / Math.pow(height / 100, 2);
    let status = '';
    let statusClass = '';

    if (bmi < 14.5) {
        status = 'Kurang Berat Badan';
        statusClass = 'badge-fair';
    } else if (bmi >= 14.5 && bmi <= 19.5) {
        status = 'Berat Badan Ideal (Normal)';
        statusClass = 'badge-excellent';
    } else if (bmi > 19.5 && bmi <= 23.5) {
        status = 'Lebihan Berat Badan (Overweight)';
        statusClass = 'badge-average';
    } else {
        status = 'Obesiti';
        statusClass = 'badge-poor';
    }

    return {
        bmi: bmi.toFixed(1),
        status: status,
        class: statusClass
    };
}

// Penilaian Norma Kecergasan Murid Sekolah Rendah (KPM/SEGAK adaptif)
function evaluateFitnessComponent(component, bestValue, gender, age) {
    if (bestValue === null || bestValue === undefined) {
        return { score: 0, rating: 'Tiada Rekod', class: 'badge-fitness' };
    }

    let score = 1; // Skala mata 1 (Lemah) hingga 5 (Cemerlang)
    const isMale = gender === 'Lelaki';

    switch (component) {
        case 'sit_reach': // Kelenturan (cm)
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

        case 'sit_up': // 30 Saat Sit-up (kali)
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

        case 'long_jump': // Standing Long Jump (cm)
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

        case 'sprint_10m': // 10m Sprint (saat) - Lebih cepat lebih bagus
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

        case 'shuttle_run': // 10m Shuttle Run (saat) - Lebih cepat lebih bagus
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

        case 'hand_eye': // Hand-Eye Coordination (bilangan tangkapan)
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

// Mengira Purata Tahap Kecergasan Fizikal Murid (daripada 6 komponen)
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

// Enjin Cadangan Sukan berasaskan Markah 1-5 Ujian Fizikal Murid
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
            marks[comp] = 0; // Nilai default jika tiada rekod
        }
    });

    if (!hasData) return [];

    // Definisi Kriteria Sukan & Pemberat (Weights)
    const sportsList = [
        {
            name: 'Badminton / Ping Pong',
            icon: 'fa-solid fa-table-tennis-paddle-ball',
            category: 'Sukan Raket / Jaring',
            weights: { shuttle_run: 0.4, hand_eye: 0.4, sprint_10m: 0.2 },
            desc: 'Ketangkasan tinggi dalam Shuttle Run & Koordinasi Mata-Tangan yang cemerlang amat sesuai untuk permainan pantas.'
        },
        {
            name: 'Bola Sepak / Hoki / Bola Baling',
            icon: 'fa-solid fa-futbol',
            category: 'Sukan Serangan (Invasion)',
            weights: { sprint_10m: 0.35, shuttle_run: 0.35, long_jump: 0.15, sit_up: 0.15 },
            desc: 'Kombinasi pecutan larian 10m, ketangkasan mengelak, serta daya tahan otot perut bagi menyokong aksi sukan berpasukan.'
        },
        {
            name: 'Lari Pecut & Lompat Jauh',
            icon: 'fa-solid fa-person-running',
            category: 'Olahraga (Athletics)',
            weights: { sprint_10m: 0.5, long_jump: 0.4, sit_up: 0.1 },
            desc: 'Kuasa letupan kaki yang tinggi menerusi Standing Long Jump dan pecutan 10m yang sangat pantas.'
        },
        {
            name: 'Gimnastik & Terjun',
            icon: 'fa-solid fa-person-falling',
            category: 'Sukan Estetik',
            weights: { sit_reach: 0.6, long_jump: 0.25, sit_up: 0.15 },
            desc: 'Kelenturan tinggi menerusi ujian Sit & Reach amat kritikal untuk pergerakan artistik dan estetik gimnastik.'
        },
        {
            name: 'Memanah & Menembak',
            icon: 'fa-solid fa-bullseye',
            category: 'Sukan Sasaran',
            weights: { hand_eye: 0.8, sit_up: 0.2 },
            desc: 'Kejituan koordinasi mata-tangan yang stabil disokong oleh kekuatan otot teras bagi melepaskan tembakan sasaran.'
        }
    ];

    // Hitung peratusan kesesuaian bagi setiap bidang sukan
    const recommendations = sportsList.map(sport => {
        let scoreSum = 0;
        let weightSum = 0;

        for (const [comp, weight] of Object.entries(sport.weights)) {
            if (marks[comp] > 0) {
                // Skala markah (1-5), tukarkan kepada peratusan (markah/5 * 100)
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
        } else if (suitabilityPercentage < 45) {
            level = 'Kurang Sesuai';
            levelClass = '';
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

    // Susun mengikut peratusan kesesuaian tertinggi
    return recommendations
        .filter(rec => rec.percentage >= 45)
        .sort((a, b) => b.percentage - a.percentage);
}

// Papar Laporan Profil Murid Secara Terperinci
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
    document.getElementById('prof-school').innerText = student.school || 'SK Taman Tun Dr Ismail';
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
        { key: 'sit_up', name: '30s Sit-Up (Daya Tahan)', unit: 'kali', desc: 'Mengukur kekuatan dan daya tahan otot bahagian abdomen' },
        { key: 'long_jump', name: 'Standing Long Jump (Kuasa)', unit: 'cm', desc: 'Mengukur kuasa eksplosif otot-otot kaki' },
        { key: 'sprint_10m', name: '10m Sprint (Kelajuan)', unit: 'saat', desc: 'Mengukur kelajuan larian jarak dekat murid' },
        { key: 'shuttle_run', name: '10m Shuttle Run (Ketangkasan)', unit: 'saat', desc: 'Mengukur ketangkasan fizikal dan perubahan arah gerakan' },
        { key: 'hand_eye', name: 'Hand-Eye Coordination (Koordinasi)', unit: 'tangkapan', desc: 'Mengukur kebolehan koordinasi mata dan pergerakan tangan' }
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

        // Cetak rentetan teks percubaan
        let trialsStr = 'Tiada data';
        if (trials.length > 0) {
            trialsStr = trials
                .map((val, idx) => val !== null && val !== '' ? `C${idx+1}: ${val}${comp.unit}` : null)
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

    // Kemas kini Carta Radar selepas tab dipaparkan supaya kanvas mempunyai saiz tepat
    setTimeout(() => {
        renderRadarChart(radarLabels, radarData);
    }, 60);
}

// Bina / Kemas kini Radar Chart Murid
function renderRadarChart(labels, data) {
    const canvas = document.getElementById('fitnessRadarChart');
    if (!canvas) return;

    if (charts.radar) {
        try {
            charts.radar.destroy();
        } catch (e) {
            console.warn('Destroy chart error:', e);
        }
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
                backgroundColor: 'rgba(0, 242, 254, 0.22)',
                borderColor: 'rgba(0, 242, 254, 0.9)',
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: 'rgba(0, 242, 254, 1)',
                borderWidth: 2.5,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 400
            },
            layout: {
                padding: { top: 8, bottom: 8, left: 8, right: 8 }
            },
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.15)' },
                    grid: { color: 'rgba(255, 255, 255, 0.12)' },
                    pointLabels: {
                        color: '#9aa8e3',
                        font: { size: 10.5, family: 'Outfit', weight: '600' },
                        padding: 6
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1,
                        min: 0,
                        max: 5,
                        font: { size: 9 }
                    }
                }
            }
        }
    });

    charts.studentRadar = charts.radar;
}

// Render Jadual Utama Atlet
function renderStudentsTable(filterQuery = '') {
    const tbody = document.querySelector('#students-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const filtered = students.filter(s => s.name.toLowerCase().includes(filterQuery));

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                    Tiada rekod murid ditemui.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(s => {
        const bmiRes = calculateBMI(s.weight, s.height);
        const fitnessRes = calculateOverallFitness(s);
        
        // Dapatkan sukan terbaik murid
        const recs = getSportRecommendations(s);
        const bestSport = recs.length > 0 ? recs[0].name.split(' / ')[0] : 'Ujian Belum Lengkap';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600;">${s.name}</td>
            <td>
                <div>${s.school || 'SK Taman Tun Dr Ismail'}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${s.class}</div>
            </td>
            <td>
                <div>${s.age} Tahun</div>
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
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="viewProfile('${s.id}')">
                        <i class="fa-solid fa-eye"></i> Profil
                    </button>
                    <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="openRecordScores('${s.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Skor
                    </button>
                    <button class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="deleteStudent('${s.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render Dashboard
function renderDashboard() {
    // 1. Kemas kini stat kad
    const total = students.length;
    const boys = students.filter(s => s.gender === 'Lelaki').length;
    const girls = students.filter(s => s.gender === 'Perempuan').length;

    document.getElementById('stat-total-students').innerText = total;
    document.getElementById('stat-boys').innerText = boys;
    document.getElementById('stat-girls').innerText = girls;

    // Hitung purata tahap kecergasan
    let fitnessSum = 0;
    let fitnessCount = 0;
    students.forEach(s => {
        const fit = calculateOverallFitness(s);
        if (fit.rating !== 'Tiada Data') {
            fitnessSum += parseFloat(fit.avgScore);
            fitnessCount++;
        }
    });

    const avgFitnessVal = fitnessCount > 0 ? (fitnessSum / fitnessCount) : 0;
    let avgFitnessLabel = 'N/A';
    let avgFitnessClass = 'badge-fitness';

    if (avgFitnessVal > 0) {
        if (avgFitnessVal >= 4.5) {
            avgFitnessLabel = 'Cemerlang';
            avgFitnessClass = 'badge-excellent';
        } else if (avgFitnessVal >= 3.6) {
            avgFitnessLabel = 'Baik';
            avgFitnessClass = 'badge-good';
        } else if (avgFitnessVal >= 2.6) {
            avgFitnessLabel = 'Sederhana';
            avgFitnessClass = 'badge-average';
        } else if (avgFitnessVal >= 1.6) {
            avgFitnessLabel = 'Kurang Memuaskan';
            avgFitnessClass = 'badge-fair';
        } else {
            avgFitnessLabel = 'Lemah';
            avgFitnessClass = 'badge-poor';
        }
    }

    const avgFitnessEl = document.getElementById('stat-avg-fitness');
    avgFitnessEl.innerText = avgFitnessVal > 0 ? `${avgFitnessLabel} (${avgFitnessVal.toFixed(1)})` : 'N/A';
    avgFitnessEl.className = avgFitnessVal > 0 ? '' : 'text-muted';
    if (avgFitnessVal > 0) {
        avgFitnessEl.style.color = getStatusHexColor(avgFitnessLabel);
    }

    // 2. Render Jadual Terkini
    const recentTable = document.querySelector('#dashboard-recent-table tbody');
    if (recentTable) {
        recentTable.innerHTML = '';
        // Urutkan ikut tarikh daftar terbaru
        const sorted = [...students].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

        if (sorted.length === 0) {
            recentTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Tiada data atlet direkodkan.</td></tr>`;
        } else {
            sorted.forEach(s => {
                const bmiRes = calculateBMI(s.weight, s.height);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight:600;">${s.name}</td>
                    <td>${s.class}</td>
                    <td><span class="badge ${s.gender==='Lelaki'?'badge-lelaki':'badge-perempuan'}">${s.gender}</span></td>
                    <td>${bmiRes.bmi || '-'}</td>
                    <td>
                        <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;" onclick="viewProfile('${s.id}')">
                            <i class="fa-solid fa-eye"></i> Profil
                        </button>
                    </td>
                `;
                recentTable.appendChild(tr);
            });
        }
    }

    // 3. Render Dashboard Chart (Agihan Bakat)
    renderDashboardBakatChart();
}

function getStatusHexColor(rating) {
    switch (rating) {
        case 'Cemerlang': return '#34d399';
        case 'Baik': return '#60a5fa';
        case 'Sederhana': return '#fbbf24';
        case 'Kurang Memuaskan': return '#fca5a5';
        case 'Lemah': return '#f87171';
        default: return '#fff';
    }
}

// Carta Dashboard: Agihan Bakat Sukan Utama
function renderDashboardBakatChart() {
    const ctx = document.getElementById('dashboardBakatChart');
    if (!ctx) return;

    // Kira agihan bakat utama untuk semua murid yang mempunyai markah
    const sportCounts = {};
    students.forEach(s => {
        const recs = getSportRecommendations(s);
        if (recs.length > 0) {
            const bestSport = recs[0].name;
            sportCounts[bestSport] = (sportCounts[bestSport] || 0) + 1;
        }
    });

    const labels = Object.keys(sportCounts);
    const data = Object.values(sportCounts);

    if (charts.dashboardBakat) {
        charts.dashboardBakat.destroy();
    }

    if (labels.length === 0) {
        // Papar teks kosong jika tiada data
        return;
    }

    charts.dashboardBakat = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#00f2fe',
                    '#8b5cf6',
                    '#ec4899',
                    '#10b981',
                    '#f59e0b'
                ],
                borderColor: '#0f1530',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#9aa8e3', font: { family: 'Outfit', size: 10 } }
                }
            }
        }
    });
}

// Paparan Tab Analitis Kumpulan
function renderAnalytics() {
    // 1. Purata Skor Komponen Mengikut Jantina
    const components = ['sit_reach', 'sit_up', 'long_jump', 'sprint_10m', 'shuttle_run', 'hand_eye'];
    const compNames = ['Kelenturan', 'Sit-Up', 'Kuasa Kaki', 'Kelajuan', 'Ketangkasan', 'Koordinasi'];
    
    const maleScores = [0, 0, 0, 0, 0, 0];
    const maleCounts = [0, 0, 0, 0, 0, 0];
    const femaleScores = [0, 0, 0, 0, 0, 0];
    const femaleCounts = [0, 0, 0, 0, 0, 0];

    students.forEach(s => {
        const sc = s.scores || {};
        const isMale = s.gender === 'Lelaki';

        components.forEach((comp, idx) => {
            const best = calculateBestScore(comp, sc[comp]);
            if (best !== null) {
                const pt = evaluateFitnessComponent(comp, best, s.gender, s.age).score;
                if (isMale) {
                    maleScores[idx] += pt;
                    maleCounts[idx]++;
                } else {
                    femaleScores[idx] += pt;
                    femaleCounts[idx]++;
                }
            }
        });
    });

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
                    {
                        label: 'Lelaki',
                        data: maleAvg,
                        backgroundColor: 'rgba(96, 165, 250, 0.7)',
                        borderColor: '#60a5fa',
                        borderWidth: 1
                    },
                    {
                        label: 'Perempuan',
                        data: femaleAvg,
                        backgroundColor: 'rgba(244, 114, 182, 0.7)',
                        borderColor: '#f472b6',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 5,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#9aa8e3' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9aa8e3', font: { family: 'Outfit' } }
                    }
                },
                plugins: {
                    legend: { labels: { color: '#9aa8e3', font: { family: 'Outfit' } } }
                }
            }
        });
    }

    // 2. Taburan Kecergasan Murid
    const fitnessDistribution = {
        'Cemerlang': 0,
        'Baik': 0,
        'Sederhana': 0,
        'Kurang Memuaskan': 0,
        'Lemah': 0
    };

    let activeStudents = 0;
    students.forEach(s => {
        const fit = calculateOverallFitness(s);
        if (fit.rating !== 'Tiada Data') {
            fitnessDistribution[fit.rating]++;
            activeStudents++;
        }
    });

    const ctx2 = document.getElementById('groupFitnessDistChart');
    if (ctx2) {
        if (charts.groupDist) charts.groupDist.destroy();
        
        if (activeStudents === 0) return;

        charts.groupDist = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(fitnessDistribution),
                datasets: [{
                    data: Object.values(fitnessDistribution),
                    backgroundColor: [
                        '#34d399', // Cemerlang - Hijau
                        '#60a5fa', // Baik - Biru
                        '#fbbf24', // Sederhana - Kuning
                        '#fca5a5', // Kurang - Jingga cair
                        '#f87171'  // Lemah - Merah
                    ],
                    borderColor: '#0f1530',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9aa8e3', font: { family: 'Outfit', size: 11 } }
                    }
                }
            }
        });
    }
}

// ==========================================
// KAWALAN PERANAN & PORTAL MURID
// ==========================================

function setupLoginSystem() {
    const roleCards = document.querySelectorAll('.role-card');
    const loginForm = document.getElementById('login-form');
    const teacherRegisterForm = document.getElementById('teacher-register-form');
    const hiddenRoleInput = document.getElementById('login-selected-role');
    const usernameGroup = document.getElementById('login-username-group');
    const passcodeGroup = document.getElementById('login-passcode-group');
    const registerLinkContainer = document.getElementById('register-teacher-link-container');
    const errorMsg = document.getElementById('login-error-msg');

    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('selected'));
            errorMsg.style.display = 'none';
            document.getElementById('login-passcode').value = '';
            if (document.getElementById('login-username')) {
                document.getElementById('login-username').value = '';
            }

            card.classList.add('selected');
            const role = card.getAttribute('data-role');
            hiddenRoleInput.value = role;

            loginForm.style.display = 'block';
            teacherRegisterForm.style.display = 'none';

            if (role === 'Anak Murid') {
                passcodeGroup.style.display = 'none';
                document.getElementById('login-passcode').removeAttribute('required');
                usernameGroup.style.display = 'none';
                document.getElementById('login-username').removeAttribute('required');
                registerLinkContainer.style.display = 'none';
            } else if (role === 'Cikgu') {
                passcodeGroup.style.display = 'block';
                document.getElementById('login-passcode').setAttribute('required', 'required');
                document.getElementById('passcode-label').innerText = 'Kata Laluan';
                
                usernameGroup.style.display = 'block';
                document.getElementById('login-username').setAttribute('required', 'required');
                registerLinkContainer.style.display = 'block';
            } else {
                passcodeGroup.style.display = 'block';
                document.getElementById('login-passcode').setAttribute('required', 'required');
                document.getElementById('passcode-label').innerText = 'Kata Laluan Admin';
                
                usernameGroup.style.display = 'none';
                document.getElementById('login-username').removeAttribute('required');
                registerLinkContainer.style.display = 'none';
            }
        });
    });

    // Button kembali
    const backBtn = document.getElementById('btn-login-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            roleCards.forEach(c => c.classList.remove('selected'));
            hiddenRoleInput.value = '';
            errorMsg.style.display = 'none';
            usernameGroup.style.display = 'none';
            registerLinkContainer.style.display = 'none';
        });
    }

    // Toggle ke pendaftaran guru
    const showRegisterBtn = document.getElementById('btn-show-teacher-register');
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            teacherRegisterForm.style.display = 'block';
            
            document.getElementById('reg-t-name').value = '';
            document.getElementById('reg-t-username').value = '';
            document.getElementById('reg-t-phone').value = '';
            document.getElementById('reg-t-passcode').value = '';
            document.getElementById('reg-t-error-msg').style.display = 'none';
            document.getElementById('reg-t-success-msg').style.display = 'none';
        });
    }

    // Button kembali pendaftaran guru
    const regBackBtn = document.getElementById('btn-reg-t-back');
    if (regBackBtn) {
        regBackBtn.addEventListener('click', () => {
            teacherRegisterForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Submit pendaftaran guru awam
    if (teacherRegisterForm) {
        teacherRegisterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-t-name').value;
            const username = document.getElementById('reg-t-username').value;
            const phone = document.getElementById('reg-t-phone').value;
            const school = document.getElementById('reg-t-school').value;
            const passcode = document.getElementById('reg-t-passcode').value;

            const errorAlert = document.getElementById('reg-t-error-msg');
            const successAlert = document.getElementById('reg-t-success-msg');

            errorAlert.style.display = 'none';
            successAlert.style.display = 'none';

            try {
                const response = await fetch('api.php?action=register_teacher', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, username, phone, school, passcode })
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    successAlert.style.display = 'block';
                    setTimeout(() => {
                        teacherRegisterForm.style.display = 'none';
                        loginForm.style.display = 'block';
                        document.getElementById('login-username').value = username;
                        document.getElementById('login-passcode').focus();
                    }, 1500);
                } else {
                    errorAlert.innerText = result.error || 'Gagal mendaftar guru.';
                    errorAlert.style.display = 'block';
                }
            } catch (err) {
                errorAlert.innerText = 'Ralat rangkaian. Sila cuba lagi.';
                errorAlert.style.display = 'block';
            }
        });
    }

    // Submit form log masuk
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const role = hiddenRoleInput.value;
            const passcode = document.getElementById('login-passcode').value;
            const errorMsg = document.getElementById('login-error-msg');
            errorMsg.style.display = 'none';

            if (role === 'Anak Murid') {
                loginUser(role);
                return;
            }

            if (role === 'Admin') {
                if (passcode === 'admin123') {
                    loginUser(role);
                } else {
                    errorMsg.style.display = 'block';
                    errorMsg.innerText = 'Kata laluan salah. Sila cuba lagi.';
                }
                return;
            }

            if (role === 'Cikgu') {
                const username = document.getElementById('login-username').value;
                try {
                    const response = await fetch('api.php?action=login_teacher', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, passcode })
                    });
                    const result = await response.json();
                    if (response.ok && result.success) {
                        sessionStorage.setItem('tid_teacher_name', result.teacher.name);
                        loginUser(role);
                    } else {
                        errorMsg.innerText = result.error || 'Kata laluan atau ID salah.';
                        errorMsg.style.display = 'block';
                    }
                } catch (err) {
                    errorMsg.innerText = 'Ralat rangkaian. Sila cuba lagi.';
                    errorMsg.style.display = 'block';
                }
            }
        });
    }

    // Semak sesi sedia ada pada pembukaan halaman
    checkSession();

    // Bind klik pada butang lihat laporan portal murid
    const viewReportBtn = document.getElementById('btn-view-student-report');
    if (viewReportBtn) {
        viewReportBtn.addEventListener('click', () => {
            const studentSelect = document.getElementById('student-select-portal');
            const studentId = studentSelect.value;
            if (!studentId) {
                alert('Sila pilih nama anda terlebih dahulu.');
                return;
            }
            showStudentPortalReport(studentId);
        });
    }
}

function loginUser(role) {
    sessionStorage.setItem('tid_logged_in', 'true');
    sessionStorage.setItem('tid_current_role', role);
    document.body.classList.add('logged-in');
    setRole(role);
}

function handleLogout() {
    sessionStorage.removeItem('tid_logged_in');
    sessionStorage.removeItem('tid_current_role');
    sessionStorage.removeItem('tid_teacher_name');
    document.body.classList.remove('logged-in', 'role-admin', 'role-cikgu', 'role-student', 'student-portal-active');
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.style.display = 'none';
    const teacherRegisterForm = document.getElementById('teacher-register-form');
    if (teacherRegisterForm) teacherRegisterForm.style.display = 'none';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    const hiddenRoleInput = document.getElementById('login-selected-role');
    if (hiddenRoleInput) hiddenRoleInput.value = '';
    const usernameField = document.getElementById('login-username');
    if (usernameField) {
        usernameField.value = '';
        usernameField.parentElement.style.display = 'none';
    }
    const passcodeField = document.getElementById('login-passcode');
    if (passcodeField) passcodeField.value = '';
    const registerLinkContainer = document.getElementById('register-teacher-link-container');
    if (registerLinkContainer) registerLinkContainer.style.display = 'none';
    const errorMsg = document.getElementById('login-error-msg');
    if (errorMsg) {
        errorMsg.style.display = 'none';
        errorMsg.innerText = 'Kata laluan salah. Sila cuba lagi.';
    }
}

function checkSession() {
    const isLoggedIn = sessionStorage.getItem('tid_logged_in') === 'true';
    const role = sessionStorage.getItem('tid_current_role');

    if (isLoggedIn && role) {
        document.body.classList.add('logged-in');
        setRole(role);
    } else {
        handleLogout();
    }
}

function setRole(role) {
    sessionStorage.setItem('tid_current_role', role);

    // Set kelas pada body untuk penggayaan CSS dinamik
    document.body.classList.remove('role-admin', 'role-cikgu', 'role-student', 'student-portal-active');
    
    if (role === 'Admin') {
        document.body.classList.add('role-admin');
        switchTab('dashboard');
    } else if (role === 'Cikgu') {
        document.body.classList.add('role-cikgu');
        switchTab('dashboard');
    } else if (role === 'Anak Murid') {
        document.body.classList.add('role-student', 'student-portal-active');
        switchTab('student-portal');
        populateStudentPortalDropdown();
        // Kosongkan sebarang laporan yang dibuka sebelum ini
        const repArea = document.getElementById('student-portal-report-container');
        if (repArea) repArea.style.display = 'none';
    }

    // Muat semula jadual murid untuk melaraskan butang mengikut peranan
    renderStudentsTable();
}

function populateStudentPortalDropdown() {
    const dropdown = document.getElementById('student-select-portal');
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="" disabled selected>Pilih nama anda...</option>';
    
    // Susun nama secara abjad
    const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedStudents.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.innerText = `${s.name} (${s.class})`;
        dropdown.appendChild(option);
    });
}

function showStudentPortalReport(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    selectedStudentId = id;

    const container = document.getElementById('student-portal-report-container');
    container.style.display = 'block';

    const bmiResult = calculateBMI(student.weight, student.height);
    
    // Lukis antaramuka profil secara dinamik (Format Asal)
    container.innerHTML = `
        <div class="profile-grid" style="margin-top: 1.5rem;">
            <!-- Left Sidebar Profile -->
            <div class="card profile-sidebar-card">
                <div class="avatar-container">
                    <div class="avatar-inner">${student.name.charAt(0).toUpperCase()}</div>
                </div>
                <div>
                    <h2 style="margin-bottom: 0.25rem;">${student.name}</h2>
                    <span class="badge ${student.gender === 'Lelaki' ? 'badge-lelaki' : 'badge-perempuan'}">${student.gender}</span>
                </div>

                <ul class="profile-meta-list">
                    <li><span>Umur:</span><span>${student.age} Tahun</span></li>
                    <li><span>Sekolah:</span><span>${student.school || 'SK Taman Tun Dr Ismail'}</span></li>
                    <li><span>Tahun/Kelas:</span><span>${student.class}</span></li>
                    <li><span>Tinggi:</span><span>${student.height ? `${student.height} cm` : '-'}</span></li>
                    <li><span>Berat:</span><span>${student.weight ? `${student.weight} kg` : '-'}</span></li>
                    <li><span>BMI:</span><span>${bmiResult.bmi || '-'}</span></li>
                    <li><span>Status BMI:</span><span class="badge ${bmiResult.class}">${bmiResult.status}</span></li>
                </ul>
                
                <button class="btn btn-primary" id="btn-download-student-pdf" onclick="downloadStudentPDF()" style="margin-top: 1rem; width: 100%; justify-content: center;">
                    <i class="fa-solid fa-file-pdf"></i> Muat Turun PDF Laporan
                </button>
                <button class="btn btn-secondary" onclick="window.print()" style="margin-top: 0.5rem; width: 100%; justify-content: center;">
                    <i class="fa-solid fa-print"></i> Cetak Profil Saya
                </button>
            </div>

            <!-- Right Layout -->
            <div class="profile-main-layout">
                <!-- Visual Analysis Radar & Summary -->
                <div class="visuals-grid">
                    <!-- Radar Chart -->
                    <div class="card chart-card">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-radar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Profil Kecergasan Atlet</h3>
                        <div class="chart-container">
                            <canvas id="studentPortalRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Sports Recommendation Card -->
                    <div class="card sports-card-wrapper">
                        <h3><i class="fa-solid fa-trophy" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Cadangan Bidang Sukan</h3>
                        <p class="sports-subtitle">Berdasarkan ujian kecergasan fizikal terbaik yang direkodkan:</p>
                        <div class="sports-container" id="student-portal-sports-list">
                            <!-- Dynamic sports loaded here -->
                        </div>
                    </div>
                </div>

                <!-- Score Breakdowns -->
                <div class="card score-breakdown-card">
                    <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-list-check" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Perincian Skor & Analisis Komponen</h3>
                    <div class="score-breakdown-list" id="student-portal-score-breakdown">
                        <!-- Dynamic component details -->
                    </div>
                </div>
            </div>
        </div>
    `;

    // 1. Isikan perincian ujian
    const breakdownContainer = document.getElementById('student-portal-score-breakdown');
    const components = [
        { key: 'sit_reach', name: 'Sit & Reach (Kelenturan)', unit: 'cm', desc: 'Mengukur kebolehan kelenturan sendi belakang dan peha' },
        { key: 'sit_up', name: '30s Sit-Up (Daya Tahan)', unit: 'kali', desc: 'Mengukur kekuatan dan daya tahan otot bahagian abdomen' },
        { key: 'long_jump', name: 'Standing Long Jump (Kuasa)', unit: 'cm', desc: 'Mengukur kuasa eksplosif otot-otot kaki' },
        { key: 'sprint_10m', name: '10m Sprint (Kelajuan)', unit: 'saat', desc: 'Mengukur kelajuan larian jarak dekat murid' },
        { key: 'shuttle_run', name: '10m Shuttle Run (Ketangkasan)', unit: 'saat', desc: 'Mengukur ketangkasan fizikal dan perubahan arah gerakan' },
        { key: 'hand_eye', name: 'Hand-Eye Coordination (Koordinasi)', unit: 'tangkapan', desc: 'Mengukur kebolehan koordinasi mata dan pergerakan tangan' }
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
                .map((val, idx) => val !== null && val !== '' ? `C${idx+1}: ${val}${comp.unit}` : null)
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

    // 2. Isikan cadangan sukan
    const sportsContainer = document.getElementById('student-portal-sports-list');
    const recs = getSportRecommendations(student);
    
    if (recs.length === 0) {
        sportsContainer.innerHTML = `
            <div class="sport-card" style="justify-content: center;">
                <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">
                    Ujian kecergasan fizikal anda belum lengkap sepenuhnya. Sila hubungi cikgu.
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

    // 3. Render radar chart portal murid
    setTimeout(() => {
        renderStudentPortalRadarChart(radarLabels, radarData);
    }, 80);
}

function renderStudentPortalRadarChart(labels, data) {
    const canvas = document.getElementById('studentPortalRadarChart');
    if (!canvas) return;
    
    if (charts.studentRadar) {
        try {
            charts.studentRadar.destroy();
        } catch (e) {
            console.warn('Destroy student radar error:', e);
        }
        charts.studentRadar = null;
    }

    const ctx = canvas.getContext('2d');

    charts.studentRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mata Prestasi (1-5)',
                data: data,
                backgroundColor: 'rgba(0, 242, 254, 0.22)',
                borderColor: 'rgba(0, 242, 254, 0.9)',
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: 'rgba(0, 242, 254, 1)',
                borderWidth: 2.5,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 400
            },
            layout: {
                padding: { top: 8, bottom: 8, left: 8, right: 8 }
            },
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.15)' },
                    grid: { color: 'rgba(255, 255, 255, 0.12)' },
                    pointLabels: {
                        color: '#9aa8e3',
                        font: { size: 10.5, family: 'Outfit', weight: '600' },
                        padding: 6
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1,
                        min: 0,
                        max: 5,
                        font: { size: 9 }
                    }
                }
            }
        }
    });

    charts.radar = charts.studentRadar;
}

// --- FUNGSI MUAT TURUN PDF (TID ANALYST) - FORMAT TEPAT 2 MUKA SURAT ---
async function downloadPDF(elementId, studentName, buttonId, targetStudent) {
    const btn = document.getElementById(buttonId);
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menjana PDF 2 Muka Surat...';
    }

    if (typeof html2pdf === 'undefined') {
        alert('Pustaka html2pdf belum dimuatkan sepenuhnya. Sila semak sambungan internet anda atau gunakan butang "Cetak Laporan".');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
        return;
    }

    // Dapatkan data murid
    let student = targetStudent || students.find(s => s.id === selectedStudentId);
    if (!student && studentName) {
        student = students.find(s => s.name.trim().toLowerCase() === studentName.trim().toLowerCase());
    }
    if (!student && students.length > 0) {
        student = students[0];
    }

    if (!student) {
        alert('Data murid tidak ditemui untuk muat turun.');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
        return;
    }

    // Pengiraan data analisis
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
            .map((v, i) => v !== null && v !== '' ? `C${i+1}: ${v}${c.unit}` : null)
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

    // Dapatkan imej Carta Radar
    let chartDataUrl = '';
    if (charts.studentRadar && typeof charts.studentRadar.toBase64Image === 'function') {
        try {
            chartDataUrl = charts.studentRadar.toBase64Image();
        } catch (e) {
            console.warn('Gagal toBase64Image dari charts.studentRadar:', e);
        }
    }
    if (!chartDataUrl) {
        const originalElement = document.getElementById(elementId);
        let chartCanvas = originalElement ? originalElement.querySelector('canvas') : null;
        if (!chartCanvas) {
            chartCanvas = document.getElementById('fitnessRadarChart') || document.getElementById('studentPortalRadarChart');
        }
        if (chartCanvas && chartCanvas.width > 0 && chartCanvas.height > 0) {
            try {
                chartDataUrl = chartCanvas.toDataURL('image/png', 1.0);
            } catch (e) {
                console.warn('Gagal menukar canvas ke dataURL:', e);
            }
        }
    }

    // Penjana SVG Carta Radar Vektor jika imej bitmap canvas tiada
    function generateRadarSvgHtml() {
        const cx = 135, cy = 120, r = 75;
        const angles = [-Math.PI/2, -Math.PI/6, Math.PI/6, Math.PI/2, 5*Math.PI/6, -5*Math.PI/6];
        
        let gridLines = '';
        for (let lvl = 1; lvl <= 5; lvl++) {
            const lr = (lvl / 5) * r;
            const pts = angles.map(a => `${(cx + lr * Math.cos(a)).toFixed(1)},${(cy + lr * Math.sin(a)).toFixed(1)}`).join(' ');
            gridLines += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />`;
        }

        let axes = '';
        angles.forEach(a => {
            const x2 = (cx + r * Math.cos(a)).toFixed(1);
            const y2 = (cy + r * Math.sin(a)).toFixed(1);
            axes += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />`;
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
            const px = (cx + dr * Math.cos(angles[i])).toFixed(1);
            const py = (cy + dr * Math.sin(angles[i])).toFixed(1);
            ptsDots += `<circle cx="${px}" cy="${py}" r="3.5" fill="#8b5cf6" stroke="#ffffff" stroke-width="1.5" />`;
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
                ${gridLines}
                ${axes}
                <polygon points="${dataPts}" fill="rgba(0, 242, 254, 0.25)" stroke="#00f2fe" stroke-width="2" />
                ${ptsDots}
                ${labels}
            </svg>
        `;
    }

    const sportEmojis = {
        'Olahraga': '🏃',
        'Olahraga / Balapan': '🏃',
        'Olahraga (Balapan & Padang)': '🏃',
        'Bola Sepak': '⚽',
        'Sepak Takraw': '🏐',
        'Bola Jaring': '🏀',
        'Bola Tampar': '🏐',
        'Badminton': '🏸',
        'Gimnastik': '🤸',
        'Renang': '🏊',
        'Hoki': '🏑',
        'Skuasy': '🎾',
        'Tenis': '🎾',
        'Memanah': '🏹'
    };

    // Bina dokumen khas 2 muka surat dengan dimensi A4 piawai (794px x 1122px)
    // PENTING: Gunakan position: fixed; left: 0; top: 0; z-index: -99999;
    // Ini memastikan koordinat DOM berada tepat di dalam viewport tangkapan html2canvas
    // tanpa berada di luar skrin (-9999px) yang menyebabkan PDF menjadi kosong / tiada apa terpapar.
    const pdfWrapper = document.createElement('div');
    pdfWrapper.id = 'pdf-2pages-container';
    pdfWrapper.style.position = 'fixed';
    pdfWrapper.style.left = '0';
    pdfWrapper.style.top = '0';
    pdfWrapper.style.width = '794px';
    pdfWrapper.style.zIndex = '-99999';
    pdfWrapper.style.opacity = '1';
    pdfWrapper.style.pointerEvents = 'none';
    pdfWrapper.style.background = '#060919';
    pdfWrapper.style.color = '#ffffff';
    pdfWrapper.style.fontFamily = "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    pdfWrapper.style.boxSizing = 'border-box';
    pdfWrapper.style.overflow = 'visible';

    pdfWrapper.innerHTML = `
        <!-- ================= MUKA SURAT 1 ================= -->
        <div class="pdf-page-1" style="width: 794px; height: 1122px; box-sizing: border-box; padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; background: #060919;">
            <!-- Header Banner -->
            <div style="border-bottom: 2px solid rgba(0, 242, 254, 0.3); padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); display: flex; align-items: center; justify-content: center; color: #060919; font-size: 18px; font-weight: 900;">
                        TID
                    </div>
                    <div>
                        <h1 style="font-size: 17px; margin: 0; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">LAPORAN PROFIL PRESTASI & BAKAT SUKAN (TID)</h1>
                        <p style="font-size: 10px; color: #9aa8e3; margin: 2px 0 0 0;">Program Pembangunan Bakat Sukan Sekolah Rendah &bull; Kementerian Pendidikan Malaysia</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span style="color: #00f2fe; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">TID ANALYST</span>
                    <p style="color: #64748b; font-size: 9.5px; margin: 2px 0 0 0;">Tarikh: ${formattedDate}</p>
                </div>
            </div>

            <!-- Maklumat Atlet & Metrik Fizikal (Horizontal Banner Card) -->
            <div style="background: rgba(18, 26, 60, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; padding: 12px 16px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; align-items: center;">
                <!-- Kiri: Maklumat Peribadi -->
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
                        <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0;">${student.school || 'SK Taman Tun Dr Ismail'}</p>
                    </div>
                </div>
                <!-- Kanan: Metrik Kesihatan & Fizikal -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 8.5px; color: #9aa8e3; text-transform: uppercase;">Tinggi</div>
                        <div style="font-size: 12.5px; font-weight: 700; color: #fff; margin-top: 1px;">${student.height ? `${student.height} cm` : '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 8.5px; color: #9aa8e3; text-transform: uppercase;">Berat</div>
                        <div style="font-size: 12.5px; font-weight: 700; color: #fff; margin-top: 1px;">${student.weight ? `${student.weight} kg` : '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 8.5px; color: #9aa8e3; text-transform: uppercase;">BMI</div>
                        <div style="font-size: 12.5px; font-weight: 700; color: #00f2fe; margin-top: 1px;">${bmiResult.bmi || '-'}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 6px 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 8.5px; color: #9aa8e3; text-transform: uppercase;">Status</div>
                        <div style="font-size: 10px; font-weight: 700; color: #34d399; margin-top: 2px;">${bmiResult.status || 'Normal'}</div>
                    </div>
                </div>
            </div>

            <!-- Analisis Prestasi: Radar Chart (Kiri) & Cadangan Sukan (Kanan) -->
            <div style="display: grid; grid-template-columns: 1fr 1.08fr; gap: 14px;">
                <!-- Radar Chart -->
                <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                            <h3 style="font-size: 12px; font-weight: 700; color: #fff; margin: 0;">Profil Radar Kecergasan Atlet</h3>
                            <span style="font-size: 9px; color: #00f2fe; background: rgba(0,242,254,0.1); padding: 1px 6px; border-radius: 4px;">Skala 1 - 5</span>
                        </div>
                        <p style="font-size: 9px; color: #9aa8e3; margin: 0 0 4px 0;">Berasaskan 6 komponen ujian kecergasan fizikal bateri TID</p>
                    </div>
                    <div style="text-align: center; height: 245px; display: flex; align-items: center; justify-content: center;">
                        ${chartDataUrl 
                            ? `<img src="${chartDataUrl}" style="max-width: 100%; max-height: 240px; object-fit: contain;">` 
                            : generateRadarSvgHtml()
                        }
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 4px; font-size: 8.5px; color: #64748b; text-align: center;">
                        Mata 5 = Cemerlang | Mata 4 = Baik | Mata 3 = Sederhana | Mata 1-2 = Perlu Latihan
                    </div>
                </div>

                <!-- Cadangan Bidang Sukan -->
                <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                        <h3 style="font-size: 12px; font-weight: 700; color: #fff; margin: 0;">Cadangan 3 Bidang Sukan Terbaik</h3>
                        <span style="font-size: 9px; color: #34d399; background: rgba(16,185,129,0.1); padding: 1px 6px; border-radius: 4px;">Padanan Bakat</span>
                    </div>
                    <p style="font-size: 9px; color: #9aa8e3; margin: 0 0 8px 0;">Bidang sukan yang paling bersesuaian dengan keupayaan fisiologi murid:</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 7px; flex: 1;">
                        ${recs.slice(0, 3).map(rec => `
                            <div style="background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 7px 9px; display: flex; align-items: center; gap: 9px;">
                                <div style="width: 32px; height: 32px; border-radius: 7px; background: rgba(16, 185, 129, 0.15); color: #34d399; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0;">
                                    ${sportEmojis[rec.name] || '🏅'}
                                </div>
                                <div style="flex: 1; min-width: 0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <strong style="font-size: 11.5px; color: #ffffff;">${rec.name}</strong>
                                        <span style="font-size: 10px; font-weight: 700; color: #00f2fe; background: rgba(0, 242, 254, 0.1); padding: 1px 5px; border-radius: 4px;">${rec.percentage}%</span>
                                    </div>
                                    <div style="font-size: 9px; color: #9aa8e3; margin: 1px 0;">${rec.category} &bull; Kesesuaian: <strong style="color: #34d399;">${rec.level}</strong></div>
                                    <div style="font-size: 8.5px; color: #94a3b8; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${rec.desc}</div>
                                </div>
                            </div>
                        `).join('')}
                        ${recs.length === 0 ? `
                            <div style="text-align: center; color: #64748b; font-size: 11px; padding: 20px 0;">Sila masukkan skor ujian untuk menerima cadangan bidang sukan.</div>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- Ringkasan Prestasi Keseluruhan -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px; padding: 9px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <span style="font-size: 9.5px; color: #00f2fe; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Rumusan Analisis Bakat:</span>
                    <p style="font-size: 10.5px; color: #cbd5e1; margin: 2px 0 0 0;">${strengthsText}</p>
                </div>
                <div style="text-align: right; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 14px; flex-shrink: 0;">
                    <div style="font-size: 8.5px; color: #9aa8e3;">Tahap Purata Kecergasan</div>
                    <span style="display: inline-block; font-size: 10.5px; font-weight: 700; color: #34d399; background: rgba(16,185,129,0.15); padding: 1px 7px; border-radius: 4px; margin-top: 2px;">
                        ${overallFitness.rating} (${overallFitness.avgScore}/5.0)
                    </span>
                </div>
            </div>

            <!-- Footer Muka Surat 1 -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 9.5px; color: #64748b;">
                <span>Sistem Pengenalpastian Bakat Sukan (TID) Sekolah Rendah &bull; ${student.school || 'SK Taman Tun Dr Ismail'}</span>
                <span>Muka Surat <strong>1</strong> daripada <strong>2</strong></span>
            </div>
        </div>

        <!-- ================= PAGE BREAK UNTUK HTML2PDF ================= -->
        <div class="html2pdf__page-break" style="page-break-before: always; break-before: page; height: 0; margin: 0; padding: 0;"></div>

        <!-- ================= MUKA SURAT 2 ================= -->
        <div class="pdf-page-2" style="width: 794px; height: 1122px; box-sizing: border-box; padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; background: #060919;">
            <!-- Header Muka Surat 2 -->
            <div style="border-bottom: 2px solid rgba(0, 242, 254, 0.3); padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="font-size: 16px; margin: 0; font-weight: 700; color: #ffffff;">PERINCIAN SKOR UJIAN KECERGASAN FIZIKAL & PERAKUAN</h2>
                    <p style="font-size: 10.5px; color: #9aa8e3; margin: 2px 0 0 0;">Lembaran Rekod Bateri Ujian Talent Identification (TID)</p>
                </div>
                <div style="text-align: right; font-size: 10.5px; color: #cbd5e1;">
                    <div>Nama: <strong style="color: #fff;">${student.name}</strong></div>
                    <div style="color: #64748b; font-size: 9.5px; margin-top: 1px;">Kelas: ${student.class} &bull; Umur: ${student.age} Tahun</div>
                </div>
            </div>

            <!-- Jadual 6 Komponen Ujian TID -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px 14px;">
                <div style="font-size: 11.5px; font-weight: 700; color: #00f2fe; margin-bottom: 7px; display: flex; justify-content: space-between;">
                    <span>Jadual Keputusan 6 Bateri Ujian Fizikal TID</span>
                    <span style="color: #64748b; font-size: 9.5px; font-weight: normal;">*Skor terbaik diambil kira untuk penggredan</span>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1.5px solid rgba(0, 242, 254, 0.3); color: #9aa8e3; font-size: 9.5px; text-transform: uppercase;">
                            <th style="padding: 6px 8px; width: 30px;">Bil</th>
                            <th style="padding: 6px 8px;">Komponen Ujian & Sasaran Fisiologi</th>
                            <th style="padding: 6px 8px; width: 170px;">Rekod Percubaan</th>
                            <th style="padding: 6px 8px; width: 90px; text-align: center;">Skor Terbaik</th>
                            <th style="padding: 6px 8px; width: 110px; text-align: center;">Tahap / Gred</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${evaluatedComponents.map((c, idx) => `
                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: ${idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'};">
                                <td style="padding: 8px 8px; color: #64748b; font-weight: 600;">${idx + 1}</td>
                                <td style="padding: 8px 8px;">
                                    <div style="font-weight: 700; color: #ffffff; font-size: 11px;">${c.name}</div>
                                    <div style="font-size: 9px; color: #9aa8e3; margin-top: 1px;">${c.cat}</div>
                                </td>
                                <td style="padding: 8px 8px; color: #cbd5e1; font-family: monospace; font-size: 9.5px;">${c.trialsStr}</td>
                                <td style="padding: 8px 8px; text-align: center; font-weight: 700; color: #00f2fe; font-size: 11.5px;">
                                    ${c.best !== null ? `${c.best} ${c.unit}` : '-'}
                                </td>
                                <td style="padding: 8px 8px; text-align: center;">
                                    <span style="display: inline-block; font-size: 9.5px; font-weight: 600; padding: 2px 7px; border-radius: 4px; 
                                        ${c.evalRes.score >= 4 ? 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);' : 
                                          c.evalRes.score === 3 ? 'background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3);' : 
                                          'background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3);'}">
                                        ${c.evalRes.rating}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Panduan Skor & Ulasan Guru (Grid 2 Kolum) -->
            <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 14px;">
                <!-- Panduan Skala Skor TID -->
                <div style="background: rgba(18, 26, 60, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 12px;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #00f2fe; margin-bottom: 5px;">Petunjuk Skala Prestasi Bateri TID:</div>
                    <ul style="margin: 0; padding-left: 14px; font-size: 9.5px; color: #94a3b8; line-height: 1.45;">
                        <li><strong style="color: #34d399;">5 - Cemerlang:</strong> Berpotensi tinggi peringkat daerah/negeri.</li>
                        <li><strong style="color: #60a5fa;">4 - Baik:</strong> Melepasi purata norma kebangsaan.</li>
                        <li><strong style="color: #fbbf24;">3 - Sederhana:</strong> Memenuhi keperluan asas fizikal sukan.</li>
                        <li><strong style="color: #f87171;">1-2 - Perlu Latihan:</strong> Memerlukan program intervensi.</li>
                    </ul>
                </div>

                <!-- Kotak Ulasan Jurulatih -->
                <div style="background: rgba(18, 26, 60, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 12px;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #00f2fe; margin-bottom: 5px;">Ulasan & Cadangan Guru Penilai / Jurulatih:</div>
                    <div style="font-size: 10px; color: #cbd5e1; line-height: 1.4; background: rgba(0,0,0,0.2); padding: 7px 9px; border-radius: 6px; border: 1px dashed rgba(255,255,255,0.15);">
                        Murid ini menunjukkan kecergasan fizikal pada tahap ${overallFitness.rating.toLowerCase()}. Disyorkan menyertai klinik sukan berfokus dalam bidang <strong>${recs.length > 0 ? recs[0].name : 'olahraga'}</strong> untuk mengasah bakat ke peringkat pertandingan seterusnya.
                    </div>
                </div>
            </div>

            <!-- Ruang Perakuan & Tandatangan Rasmi -->
            <div style="background: rgba(18, 26, 60, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 14px 18px;">
                <div style="font-size: 10.5px; font-weight: 700; color: #9aa8e3; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Pengesahan & Perakuan Pegawai Penilai:
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px;">
                    <!-- Tandatangan Guru Penilai -->
                    <div>
                        <div style="font-size: 10px; color: #cbd5e1; margin-bottom: 38px;">Disediakan Oleh (Guru Penilai / Jurulatih TID):</div>
                        <div style="border-bottom: 1px dashed #64748b; margin-bottom: 5px;"></div>
                        <div style="font-size: 9.5px; color: #94a3b8;">Nama: _____________________________________</div>
                        <div style="font-size: 9.5px; color: #94a3b8; margin-top: 2px;">Tarikh: ____________________________________</div>
                    </div>
                    <!-- Tandatangan Guru Besar / GPK Kokurikulum -->
                    <div>
                        <div style="font-size: 10px; color: #cbd5e1; margin-bottom: 38px;">Disahkan Oleh (Guru Besar / GPK Kokurikulum):</div>
                        <div style="border-bottom: 1px dashed #64748b; margin-bottom: 5px;"></div>
                        <div style="font-size: 9.5px; color: #94a3b8;">Nama & Cop Rasmi: __________________________</div>
                        <div style="font-size: 9.5px; color: #94a3b8; margin-top: 2px;">Tarikh: ____________________________________</div>
                    </div>
                </div>
            </div>

            <!-- Footer Muka Surat 2 -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 9.5px; color: #64748b;">
                <span>Dokumen ini disahkan bagi tujuan rekod rasmi Kokurikulum &bull; Dicetak melalui Sistem TID Analyst</span>
                <span>Muka Surat <strong>2</strong> daripada <strong>2</strong></span>
            </div>
        </div>
    `;

    document.body.appendChild(pdfWrapper);

    // Beri masa sejenak untuk pelayar meletakkan elemen dan melukis imej/SVG
    await new Promise(resolve => setTimeout(resolve, 120));

    // Konfigurasi untuk html2pdf - Menjamin tepat 2 muka surat bersaiz A4
    const opt = {
        margin:       0,
        filename:     `Laporan_TID_${student.name.trim().replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: '#060919',
            logging: false,
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0,
            windowWidth: 794
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'], before: '.html2pdf__page-break' }
    };

    try {
        await html2pdf().set(opt).from(pdfWrapper).save();
    } catch (err) {
        console.error('PDF Generation Error:', err);
        alert('Ralat semasa menjana PDF. Anda juga boleh menggunakan butang "Cetak Laporan" di atas untuk mencetak atau menyimpan terus sebagai PDF.');
    } finally {
        if (pdfWrapper && pdfWrapper.parentNode) {
            pdfWrapper.parentNode.removeChild(pdfWrapper);
        }
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
}

function downloadStudentPDF() {
    const nameEl = document.querySelector('#student-portal-report-container h2');
    const studentName = nameEl ? nameEl.innerText : 'Laporan_Murid';
    const student = students.find(s => s.id === selectedStudentId) || students.find(s => s.name.trim().toLowerCase() === studentName.trim().toLowerCase()) || (students.length > 0 ? students[0] : null);
    downloadPDF('student-portal-report-container', studentName, 'btn-download-student-pdf', student);
}

function downloadAdminPDF() {
    const student = students.find(s => s.id === selectedStudentId) || (students.length > 0 ? students[0] : null);
    const studentName = student ? student.name : (document.getElementById('prof-name') ? document.getElementById('prof-name').innerText : 'Laporan_Atlet');
    downloadPDF('admin-profile-grid', studentName, 'btn-download-admin-pdf', student);
}

// ==========================================
// Logik Pengurusan Guru (Admin View)
// ==========================================
let teachers = [];

async function loadTeachers() {
    try {
        const response = await fetch('api.php?action=list_teachers');
        if (!response.ok) throw new Error('Gagal memuatkan data guru.');
        teachers = await response.json();
        renderTeachersTable();
    } catch (err) {
        console.error(err);
        const tbody = document.querySelector('#teachers-table tbody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-danger); padding: 2rem;">Ralat memuatkan data guru.</td></tr>`;
        }
    }
}

function renderTeachersTable() {
    const tbody = document.querySelector('#teachers-table tbody');
    if (!tbody) return;

    if (teachers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;"><i class="fa-solid fa-user-tie" style="font-size: 2.5rem; display: block; margin-bottom: 1rem;"></i>Tiada guru didaftarkan.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    teachers.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${t.name}</strong></td>
            <td><code>${t.username}</code></td>
            <td>${t.phone || '-'}</td>
            <td>${t.school || '-'}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="handleDeleteTeacher('${t.id}')" title="Padam Guru" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function setupAdminTeacherRegister() {
    const form = document.getElementById('admin-teacher-register-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('admin-t-name').value;
        const username = document.getElementById('admin-t-username').value;
        const phone = document.getElementById('admin-t-phone').value;
        const school = document.getElementById('admin-t-school').value;
        const passcode = document.getElementById('admin-t-passcode').value;

        const errorAlert = document.getElementById('admin-t-error-msg');
        const successAlert = document.getElementById('admin-t-success-msg');

        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';

        try {
            const response = await fetch('api.php?action=register_teacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, phone, school, passcode })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                successAlert.style.display = 'block';
                form.reset();
                document.getElementById('admin-t-school').value = 'SK Taman Tun Dr Ismail';
                loadTeachers();
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 3000);
            } else {
                errorAlert.innerText = result.error || 'Gagal mendaftar guru.';
                errorAlert.style.display = 'block';
            }
        } catch (err) {
            errorAlert.innerText = 'Ralat rangkaian. Sila cuba lagi.';
            errorAlert.style.display = 'block';
        }
    });
}

async function handleDeleteTeacher(id) {
    if (!confirm('Adakah anda pasti mahu memadam akaun guru ini?')) return;

    try {
        const response = await fetch('api.php?action=delete_teacher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, role: 'Admin' })
        });
        const result = await response.json();
        if (response.ok && result.success) {
            loadTeachers();
        } else {
            alert(result.error || 'Gagal memadam guru.');
        }
    } catch (err) {
        alert('Ralat rangkaian. Sila cuba lagi.');
    }
}
window.handleDeleteTeacher = handleDeleteTeacher;
window.loadTeachers = loadTeachers;
window.renderTeachersTable = renderTeachersTable;
window.setupAdminTeacherRegister = setupAdminTeacherRegister;
