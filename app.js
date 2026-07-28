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
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${comp.desc}</div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${trialsStr}</div>
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
                <div style="text-align: center; color: var(--text-muted); padding: 1rem 0;">
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
                        <h4>${rec.name} <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">(${rec.percentage}%)</span></h4>
                        <p style="margin-bottom: 0.25rem;">${rec.category} &bull; Kesesuaian: <strong>${rec.level}</strong></p>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3;">${rec.desc}</p>
                    </div>
                </div>
            `;
            sportsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Kemas kini Carta Radar
    renderRadarChart(radarLabels, radarData);

    switchTab('profile');
}

// Bina / Kemas kini Radar Chart Murid
function renderRadarChart(labels, data) {
    const ctx = document.getElementById('fitnessRadarChart').getContext('2d');
    
    if (charts.radar) {
        charts.radar.destroy();
    }

    charts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mata Prestasi (1-5)',
                data: data,
                backgroundColor: 'rgba(0, 242, 254, 0.2)',
                borderColor: 'rgba(0, 242, 254, 0.8)',
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 242, 254, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: '#9aa8e3',
                        font: { size: 11, family: 'Outfit' }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1,
                        min: 0,
                        max: 5
                    }
                }
            }
        }
    });
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
    // 1. Dapatkan semua kad peranan
    const roleCards = document.querySelectorAll('.role-card');
    const loginForm = document.getElementById('login-form');
    const hiddenRoleInput = document.getElementById('login-selected-role');
    const passcodeGroup = document.getElementById('login-passcode').parentElement;
    const errorMsg = document.getElementById('login-error-msg');

    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Bersihkan pilihan lama
            roleCards.forEach(c => c.classList.remove('selected'));
            errorMsg.style.display = 'none';
            document.getElementById('login-passcode').value = '';

            // Set kad dipilih
            card.classList.add('selected');
            const role = card.getAttribute('data-role');
            hiddenRoleInput.value = role;

            // Buka borang log masuk
            loginForm.style.display = 'block';

            passcodeGroup.style.display = 'block';
            document.getElementById('login-passcode').setAttribute('required', 'required');
            document.getElementById('passcode-label').innerText = `Kata Laluan ${role}`;
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
        });
    }

    // Submit form log masuk
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = hiddenRoleInput.value;
            const passcode = document.getElementById('login-passcode').value;

            let isCorrect = false;
            if (role === 'Admin' && passcode === 'admin123') {
                isCorrect = true;
            } else if (role === 'Cikgu' && passcode === 'cikgu123') {
                isCorrect = true;
            } else if (role === 'Anak Murid' && passcode === 'murid123') {
                isCorrect = true;
            }

            if (isCorrect) {
                errorMsg.style.display = 'none';
                loginUser(role);
            } else {
                errorMsg.style.display = 'block';
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
    document.body.classList.remove('logged-in', 'role-admin', 'role-cikgu', 'role-student', 'student-portal-active');
    
    // Reset paparan log masuk
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.style.display = 'none';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    const hiddenRoleInput = document.getElementById('login-selected-role');
    if (hiddenRoleInput) hiddenRoleInput.value = '';
    const passcodeField = document.getElementById('login-passcode');
    if (passcodeField) passcodeField.value = '';
    const errorMsg = document.getElementById('login-error-msg');
    if (errorMsg) errorMsg.style.display = 'none';
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

    const container = document.getElementById('student-portal-report-container');
    container.style.display = 'block';

    const bmiResult = calculateBMI(student.weight, student.height);
    
    // Lukis antaramuka profil secara dinamik
    container.innerHTML = `
        <div class="profile-grid" style="margin-top: 2rem;">
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
                
                <button class="btn btn-secondary" onclick="window.print()" style="margin-top: 1rem; width: 100%; justify-content: center;">
                    <i class="fa-solid fa-print"></i> Cetak Profil Saya
                </button>
            </div>

            <!-- Right Layout -->
            <div class="profile-main-layout">
                <!-- Visual Analysis Radar & Summary -->
                <div class="visuals-grid">
                    <!-- Radar Chart -->
                    <div class="card chart-card">
                        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-chart-radar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Profil Kecergasan Saya</h3>
                        <div class="chart-container">
                            <canvas id="studentPortalRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Sports Recommendation Card -->
                    <div class="card" style="display: flex; flex-direction: column;">
                        <h3><i class="fa-solid fa-trophy" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>Cadangan Bidang Sukan</h3>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Berdasarkan ujian kecergasan fizikal terbaik yang direkodkan:</p>
                        <div class="sports-container" id="student-portal-sports-list">
                            <!-- Dynamic sports loaded here -->
                        </div>
                    </div>
                </div>

                <!-- Score Breakdowns -->
                <div class="card">
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
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${comp.desc}</div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${trialsStr}</div>
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
                <div style="text-align: center; color: var(--text-muted); padding: 1rem 0;">
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
                        <h4>${rec.name} <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">(${rec.percentage}%)</span></h4>
                        <p style="margin-bottom: 0.25rem;">${rec.category} &bull; Kesesuaian: <strong>${rec.level}</strong></p>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3;">${rec.desc}</p>
                    </div>
                </div>
            `;
            sportsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // 3. Render radar chart portal murid
    setTimeout(() => {
        renderStudentPortalRadarChart(radarLabels, radarData);
    }, 100);
}

function renderStudentPortalRadarChart(labels, data) {
    const ctx = document.getElementById('studentPortalRadarChart');
    if (!ctx) return;
    
    if (charts.studentRadar) {
        charts.studentRadar.destroy();
    }

    charts.studentRadar = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mata Prestasi (1-5)',
                data: data,
                backgroundColor: 'rgba(0, 242, 254, 0.2)',
                borderColor: 'rgba(0, 242, 254, 0.8)',
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 242, 254, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: '#9aa8e3',
                        font: { size: 11, family: 'Outfit' }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b',
                        stepSize: 1,
                        min: 0,
                        max: 5
                    }
                }
            }
        }
    });
}
