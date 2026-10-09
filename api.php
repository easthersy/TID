<?php
header('Content-Type: application/json');

$dataPath = __DIR__ . '/data';
$dataFile = $dataPath . '/students.json';
$schoolFile = $dataPath . '/schools.json';
$adminFile = $dataPath . '/admins.json';
$testsFile = $dataPath . '/tests.json';

// Cipta folder data jika belum wujud
if (!file_exists($dataPath)) {
    mkdir($dataPath, 0777, true);
}

// Inisialisasi fail-fail JSON jika belum wujud
function initJsonFile($file, $defaultData) {
    if (!file_exists($file)) {
        file_put_contents($file, json_encode($defaultData, JSON_PRETTY_PRINT));
    }
    @chmod($file, 0777);
}

// Default data
initJsonFile($dataFile, []);

initJsonFile($schoolFile, [
    [
        'id' => 'sch_skttdi',
        'name' => 'SK Taman Tun Dr Ismail',
        'code' => 'SKTTDI2026',
        'password' => 'tid123',
        'created_at' => date('Y-m-d H:i:s')
    ]
]);

initJsonFile($adminFile, [
    [
        'id' => 'adm_default',
        'username' => 'admin',
        'password' => 'admin123',
        'name' => 'Pentadbir Utama',
        'created_at' => date('Y-m-d H:i:s')
    ]
]);

initJsonFile($testsFile, [
    'test1' => [
        'id' => 'test1',
        'title' => 'Ujian 1 (Bateri Asas TID)',
        'description' => '6 bateri ujian standard penilaian kecergasan dan pengenalpastian bakat sukan.',
        'components' => [
            [
                'key' => 'sit_reach',
                'name' => 'Sit & Reach (Kelenturan)',
                'unit' => 'cm',
                'desc' => 'Mengukur kelenturan bahagian belakang dan otot hamstring.',
                'metric_male' => ['cemerlang' => 30, 'baik' => 24, 'sederhana' => 17, 'kurang' => 11],
                'metric_female' => ['cemerlang' => 32, 'baik' => 26, 'sederhana' => 19, 'kurang' => 13]
            ],
            [
                'key' => 'sit_up',
                'name' => '30s Sit-Up (Daya Tahan)',
                'unit' => 'kali',
                'desc' => 'Mengukur kekuatan dan daya tahan otot abdomen.',
                'metric_male' => ['cemerlang' => 22, 'baik' => 18, 'sederhana' => 13, 'kurang' => 8],
                'metric_female' => ['cemerlang' => 19, 'baik' => 15, 'sederhana' => 11, 'kurang' => 6]
            ],
            [
                'key' => 'long_jump',
                'name' => 'Standing Long Jump (Kuasa)',
                'unit' => 'cm',
                'desc' => 'Mengukur kuasa letupan otot kaki.',
                'metric_male' => ['cemerlang' => 175, 'baik' => 150, 'sederhana' => 125, 'kurang' => 100],
                'metric_female' => ['cemerlang' => 160, 'baik' => 135, 'sederhana' => 110, 'kurang' => 85]
            ],
            [
                'key' => 'sprint_10m',
                'name' => '10m Sprint (Kelajuan)',
                'unit' => 'saat',
                'desc' => 'Mengukur kelajuan larian pecutan pantas.',
                'metric_male' => ['cemerlang' => 2.0, 'baik' => 2.3, 'sederhana' => 2.6, 'kurang' => 3.0],
                'metric_female' => ['cemerlang' => 2.2, 'baik' => 2.5, 'sederhana' => 2.8, 'kurang' => 3.2]
            ],
            [
                'key' => 'shuttle_run',
                'name' => '10m Shuttle Run (Ketangkasan)',
                'unit' => 'saat',
                'desc' => 'Mengukur ketangkasan dan koordinasi perubahan arah pantas.',
                'metric_male' => ['cemerlang' => 10.0, 'baik' => 11.2, 'sederhana' => 12.5, 'kurang' => 13.8],
                'metric_female' => ['cemerlang' => 10.5, 'baik' => 11.8, 'sederhana' => 13.0, 'kurang' => 14.5]
            ],
            [
                'key' => 'hand_eye',
                'name' => 'Hand-Eye Coordination (Koordinasi)',
                'unit' => 'tangkapan',
                'desc' => 'Mengukur koordinasi pergerakan motor mata dan tangan.',
                'metric_male' => ['cemerlang' => 18, 'baik' => 14, 'sederhana' => 10, 'kurang' => 6],
                'metric_female' => ['cemerlang' => 18, 'baik' => 14, 'sederhana' => 10, 'kurang' => 6]
            ]
        ]
    ],
    'test2' => [
        'id' => 'test2',
        'title' => 'Ujian 2 (Ujian Lanjutan & Kemajuan)',
        'description' => 'Penilaian fasa kedua dan komponen ujian lanjutan.',
        'components' => [
            [
                'key' => 'bleep_test',
                'name' => 'Bleep Test / 20m Shuttle Run (Aerobik)',
                'unit' => 'tahap',
                'desc' => 'Mengukur daya tahan kardiovaskular VO2 Max murid.',
                'metric_male' => ['cemerlang' => 8.0, 'baik' => 6.5, 'sederhana' => 4.5, 'kurang' => 3.0],
                'metric_female' => ['cemerlang' => 7.0, 'baik' => 5.5, 'sederhana' => 4.0, 'kurang' => 2.5]
            ],
            [
                'key' => 'vertical_jump',
                'name' => 'Vertical Jump (Lompat Menegak)',
                'unit' => 'cm',
                'desc' => 'Mengukur kuasa eksplosif menegak bahagian bawah badan.',
                'metric_male' => ['cemerlang' => 40, 'baik' => 34, 'sederhana' => 28, 'kurang' => 20],
                'metric_female' => ['cemerlang' => 36, 'baik' => 30, 'sederhana' => 24, 'kurang' => 18]
            ],
            [
                'key' => 'medicine_ball',
                'name' => 'Medicine Ball Throw (Kuasa Atas Badan)',
                'unit' => 'meter',
                'desc' => 'Mengukur kekuatan dan kuasa letupan bahu dan dada.',
                'metric_male' => ['cemerlang' => 5.5, 'baik' => 4.5, 'sederhana' => 3.5, 'kurang' => 2.5],
                'metric_female' => ['cemerlang' => 4.8, 'baik' => 3.8, 'sederhana' => 3.0, 'kurang' => 2.0]
            ]
        ]
    ]
]);

// Fungsi bantuan baca & tulis JSON
function readJson($file) {
    if (!file_exists($file)) return [];
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

function writeJson($file, $data) {
    $res = @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    if ($res !== false) {
        @chmod($file, 0777);
        return true;
    }
    return false;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';
$method = $_SERVER['REQUEST_METHOD'];

// Helper untuk baca input JSON atau POST
function getRequestData() {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true);
    if (!$input) {
        $input = $_POST;
    }
    return is_array($input) ? $input : [];
}

switch ($action) {

    // =====================================
    // 1. LOG MASUK (ADMIN & INDIVIDU)
    // =====================================
    case 'login_admin':
        if ($method === 'POST') {
            $input = getRequestData();
            $username = trim(isset($input['username']) ? $input['username'] : '');
            $password = trim(isset($input['password']) ? $input['password'] : '');

            if (empty($username) || empty($password)) {
                http_response_code(400);
                echo json_encode(['error' => 'ID Pengguna dan Kata Laluan diperlukan.']);
                exit;
            }

            $admins = readJson($adminFile);
            $found = null;

            foreach ($admins as $adm) {
                if (strtolower($adm['username']) === strtolower($username) && $adm['password'] === $password) {
                    $found = $adm;
                    break;
                }
            }

            if ($found) {
                unset($found['password']);
                echo json_encode(['success' => true, 'admin' => $found]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'ID Pengguna atau Kata Laluan Admin tidak sah.']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'login_individual':
        if ($method === 'POST') {
            $input = getRequestData();
            $code = strtoupper(trim(isset($input['school_code']) ? $input['school_code'] : ''));
            $password = trim(isset($input['password']) ? $input['password'] : '');

            if (empty($code) || empty($password)) {
                http_response_code(400);
                echo json_encode(['error' => 'Kod Sekolah dan Kata Laluan diperlukan.']);
                exit;
            }

            $schools = readJson($schoolFile);
            $foundSchool = null;

            foreach ($schools as $sch) {
                if (strtoupper($sch['code']) === $code && $sch['password'] === $password) {
                    $foundSchool = $sch;
                    break;
                }
            }

            if ($foundSchool) {
                unset($foundSchool['password']);
                echo json_encode(['success' => true, 'school' => $foundSchool]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Kod Sekolah atau Kata Laluan salah. Sila hubungi pentadbir sekolah/admin TID.']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    // =====================================
    // 2. PENGURUSAN SEKOLAH
    // =====================================
    case 'list_schools':
        if ($method === 'GET') {
            $schools = readJson($schoolFile);
            $students = readJson($dataFile);

            // Tambah pengiraan jumlah murid setiap sekolah
            $counts = [];
            foreach ($students as $std) {
                $sCode = isset($std['school_code']) ? $std['school_code'] : '';
                $sName = isset($std['school']) ? $std['school'] : '';
                if ($sCode) {
                    $counts[$sCode] = ($counts[$sCode] ?? 0) + 1;
                } elseif ($sName) {
                    $counts[$sName] = ($counts[$sName] ?? 0) + 1;
                }
            }

            foreach ($schools as &$sch) {
                $sch['student_count'] = $counts[$sch['code']] ?? ($counts[$sch['name']] ?? 0);
            }

            echo json_encode($schools);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'register_school':
        if ($method === 'POST') {
            $input = getRequestData();
            $name = trim(isset($input['name']) ? $input['name'] : '');
            $code = strtoupper(trim(isset($input['code']) ? $input['code'] : ''));
            $password = trim(isset($input['password']) ? $input['password'] : '');

            if (empty($name)) {
                http_response_code(400);
                echo json_encode(['error' => 'Nama sekolah adalah wajib.']);
                exit;
            }

            $schools = readJson($schoolFile);

            // Auto-generate code jika tiada
            if (empty($code)) {
                // Cipta singkatan dari nama sekolah + nombor rawak
                $words = explode(' ', preg_replace('/[^a-zA-Z0-9\s]/', '', $name));
                $acronym = '';
                foreach ($words as $w) {
                    if (!empty($w)) $acronym .= strtoupper($w[0]);
                }
                if (strlen($acronym) < 2) $acronym = 'SCH';
                $code = substr($acronym, 0, 5) . rand(100, 999);
            }

            // Auto-generate password jika tiada
            if (empty($password)) {
                $password = 'tid' . rand(1000, 9999);
            }

            // Semak jika kod telah wujud
            foreach ($schools as $sch) {
                if (strtoupper($sch['code']) === $code) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Kod sekolah "' . $code . '" telah didaftarkan. Sila guna kod lain.']);
                    exit;
                }
            }

            $newSchool = [
                'id' => uniqid('sch_', true),
                'name' => htmlspecialchars($name),
                'code' => $code,
                'password' => $password,
                'created_at' => date('Y-m-d H:i:s')
            ];

            $schools[] = $newSchool;
            writeJson($schoolFile, $schools);

            echo json_encode(['success' => true, 'school' => $newSchool]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'delete_school':
        if ($method === 'POST') {
            $input = getRequestData();
            $id = isset($input['id']) ? $input['id'] : '';
            if (empty($id)) {
                http_response_code(400);
                echo json_encode(['error' => 'ID sekolah diperlukan']);
                exit;
            }

            $schools = readJson($schoolFile);
            $newSchools = [];
            $deleted = false;

            foreach ($schools as $s) {
                if ($s['id'] === $id) {
                    $deleted = true;
                    continue;
                }
                $newSchools[] = $s;
            }

            if ($deleted) {
                writeJson($schoolFile, $newSchools);
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Sekolah tidak ditemui']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    // =====================================
    // 3. PENGURUSAN AKAUN ADMIN
    // =====================================
    case 'list_admins':
        if ($method === 'GET') {
            $admins = readJson($adminFile);
            // Sembunyikan kata laluan penuh untuk keselamatan paparan jika diperlukan, tapi admin boleh urus
            echo json_encode($admins);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'register_admin':
        if ($method === 'POST') {
            $input = getRequestData();
            $username = strtolower(trim(isset($input['username']) ? $input['username'] : ''));
            $password = trim(isset($input['password']) ? $input['password'] : '');
            $name = trim(isset($input['name']) ? $input['name'] : 'Pentadbir');

            if (empty($username) || empty($password)) {
                http_response_code(400);
                echo json_encode(['error' => 'ID Pengguna dan Kata Laluan wajib diisi.']);
                exit;
            }

            $admins = readJson($adminFile);
            foreach ($admins as $adm) {
                if (strtolower($adm['username']) === $username) {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID Pengguna admin ini telah wujud.']);
                    exit;
                }
            }

            $newAdmin = [
                'id' => uniqid('adm_', true),
                'username' => htmlspecialchars($username),
                'password' => $password,
                'name' => htmlspecialchars($name),
                'created_at' => date('Y-m-d H:i:s')
            ];

            $admins[] = $newAdmin;
            writeJson($adminFile, $admins);

            echo json_encode(['success' => true, 'admin' => $newAdmin]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'delete_admin':
        if ($method === 'POST') {
            $input = getRequestData();
            $id = isset($input['id']) ? $input['id'] : '';

            $admins = readJson($adminFile);
            if (count($admins) <= 1) {
                http_response_code(400);
                echo json_encode(['error' => 'Tidak boleh memadam satu-satunya akaun admin.']);
                exit;
            }

            $newAdmins = [];
            $deleted = false;
            foreach ($admins as $adm) {
                if ($adm['id'] === $id) {
                    $deleted = true;
                    continue;
                }
                $newAdmins[] = $adm;
            }

            if ($deleted) {
                writeJson($adminFile, $newAdmins);
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Admin tidak ditemui.']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    // =====================================
    // 4. PENGURUSAN ATLET (MURID)
    // =====================================
    case 'list':
        if ($method === 'GET') {
            $students = readJson($dataFile);
            $schoolFilter = isset($_GET['school_code']) ? strtoupper(trim($_GET['school_code'])) : '';
            if (!empty($schoolFilter)) {
                $students = array_values(array_filter($students, function($std) use ($schoolFilter) {
                    return (isset($std['school_code']) && strtoupper($std['school_code']) === $schoolFilter) ||
                           (isset($std['school']) && strtoupper($std['school']) === $schoolFilter);
                }));
            }
            echo json_encode($students);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'register':
        if ($method === 'POST') {
            $input = getRequestData();

            if (empty($input['name']) || empty($input['gender']) || empty($input['age'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Nama, jantina, dan umur adalah wajib diisi.']);
                exit;
            }

            $height = isset($input['height']) && $input['height'] !== '' ? floatval($input['height']) : null;
            $weight = isset($input['weight']) && $input['weight'] !== '' ? floatval($input['weight']) : null;

            // Cari nama sekolah daripada kod atau sebaliknya
            $schoolCode = isset($input['school_code']) ? strtoupper(trim($input['school_code'])) : '';
            $schoolName = isset($input['school']) ? trim($input['school']) : '';

            if (!empty($schoolCode) && empty($schoolName)) {
                $schools = readJson($schoolFile);
                foreach ($schools as $sch) {
                    if (strtoupper($sch['code']) === $schoolCode) {
                        $schoolName = $sch['name'];
                        break;
                    }
                }
            }

            $students = readJson($dataFile);

            $newStudent = [
                'id' => uniqid('std_', true),
                'name' => htmlspecialchars(trim($input['name'])),
                'gender' => htmlspecialchars($input['gender']),
                'age' => intval($input['age']),
                'height' => $height,
                'weight' => $weight,
                'school' => htmlspecialchars($schoolName),
                'school_code' => $schoolCode,
                'class' => isset($input['class']) ? htmlspecialchars(trim($input['class'])) : '',
                'created_at' => date('Y-m-d H:i:s'),
                'scores' => [
                    'sit_reach' => [null, null, null],
                    'sit_up' => [null, null],
                    'long_jump' => [null, null],
                    'sprint_10m' => [null],
                    'shuttle_run' => [null, null],
                    'hand_eye' => [null]
                ]
            ];

            $students[] = $newStudent;
            writeJson($dataFile, $students);

            echo json_encode(['success' => true, 'student' => $newStudent]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'batch_register':
        if ($method === 'POST') {
            $input = getRequestData();
            $athletes = isset($input['athletes']) && is_array($input['athletes']) ? $input['athletes'] : [];
            $schoolCode = isset($input['school_code']) ? strtoupper(trim($input['school_code'])) : '';
            $schoolName = isset($input['school_name']) ? trim($input['school_name']) : '';

            if (empty($athletes)) {
                http_response_code(400);
                echo json_encode(['error' => 'Tiada data atlet untuk didaftarkan.']);
                exit;
            }

            // Dapatkan nama sekolah jika hanya kod diberikan
            if (!empty($schoolCode) && empty($schoolName)) {
                $schools = readJson($schoolFile);
                foreach ($schools as $sch) {
                    if (strtoupper($sch['code']) === $schoolCode) {
                        $schoolName = $sch['name'];
                        break;
                    }
                }
            }

            $students = readJson($dataFile);
            $addedList = [];

            foreach ($athletes as $item) {
                if (empty($item['name'])) continue;

                $gender = isset($item['gender']) ? trim($item['gender']) : 'Lelaki';
                if (stripos($gender, 'p') === 0 || stripos($gender, 'f') === 0) {
                    $gender = 'Perempuan';
                } else {
                    $gender = 'Lelaki';
                }

                $age = isset($item['age']) ? intval($item['age']) : 10;
                if ($age < 6 || $age > 18) $age = 10;

                $height = isset($item['height']) && $item['height'] !== '' ? floatval($item['height']) : null;
                $weight = isset($item['weight']) && $item['weight'] !== '' ? floatval($item['weight']) : null;
                $class = isset($item['class']) ? htmlspecialchars(trim($item['class'])) : 'Umum';

                $newStudent = [
                    'id' => uniqid('std_', true),
                    'name' => htmlspecialchars(trim($item['name'])),
                    'gender' => $gender,
                    'age' => $age,
                    'height' => $height,
                    'weight' => $weight,
                    'school' => htmlspecialchars($schoolName),
                    'school_code' => $schoolCode,
                    'class' => $class,
                    'created_at' => date('Y-m-d H:i:s'),
                    'scores' => [
                        'sit_reach' => [null, null, null],
                        'sit_up' => [null, null],
                        'long_jump' => [null, null],
                        'sprint_10m' => [null],
                        'shuttle_run' => [null, null],
                        'hand_eye' => [null]
                    ]
                ];

                $students[] = $newStudent;
                $addedList[] = $newStudent;
            }

            writeJson($dataFile, $students);
            echo json_encode(['success' => true, 'count' => count($addedList), 'students' => $addedList]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'save_scores':
        if ($method === 'POST') {
            $input = getRequestData();
            if (empty($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID murid diperlukan']);
                exit;
            }

            $students = readJson($dataFile);
            $found = false;

            foreach ($students as &$student) {
                if ($student['id'] === $input['id']) {
                    $found = true;
                    if (isset($input['scores'])) {
                        $student['scores'] = $input['scores'];
                    }
                    if (isset($input['test2_scores'])) {
                        $student['test2_scores'] = $input['test2_scores'];
                    }
                    break;
                }
            }

            if ($found) {
                writeJson($dataFile, $students);
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Murid tidak ditemui']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'delete':
        if ($method === 'POST') {
            $input = getRequestData();
            if (empty($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID murid diperlukan']);
                exit;
            }

            $students = readJson($dataFile);
            $newStudents = [];
            $deleted = false;

            foreach ($students as $student) {
                if ($student['id'] === $input['id']) {
                    $deleted = true;
                    continue;
                }
                $newStudents[] = $student;
            }

            if ($deleted) {
                writeJson($dataFile, $newStudents);
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Murid tidak ditemui']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    // =====================================
    // 5. PENGURUSAN UJIAN & METRIK
    // =====================================
    case 'get_tests':
        if ($method === 'GET') {
            $tests = readJson($testsFile);
            echo json_encode($tests);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'save_tests':
        if ($method === 'POST') {
            $input = getRequestData();
            if (!is_array($input) || empty($input)) {
                http_response_code(400);
                echo json_encode(['error' => 'Data konfigurasi ujian tidak sah.']);
                exit;
            }
            writeJson($testsFile, $input);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Tindakan API tidak sah']);
        break;
}
?>
