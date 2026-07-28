<?php
header('Content-Type: application/json');

$dataPath = __DIR__ . '/data';
$dataFile = $dataPath . '/students.json';

// Cipta folder data jika belum wujud
if (!file_exists($dataPath)) {
    mkdir($dataPath, 0777, true);
}

// Cipta fail students.json jika belum wujud
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

// Membaca data murid dari fail JSON
function readData() {
    global $dataFile;
    $content = file_get_contents($dataFile);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

// Menyimpan data murid ke fail JSON
function writeData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$action = isset($_GET['action']) ? $_GET['action'] : '';
$method = $_SERVER['REQUEST_METHOD'];

switch ($action) {
    case 'list':
        if ($method === 'GET') {
            echo json_encode(readData());
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'register':
        if ($method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input) {
                // Cuba baca dari $_POST jika input json kosong
                $input = $_POST;
            }

            // Validasi data penting
            if (empty($input['name']) || empty($input['gender']) || empty($input['age'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Nama, jantina, dan umur adalah wajib diisi.']);
                exit;
            }

            $students = readData();

            $newStudent = [
                'id' => uniqid('std_', true),
                'name' => htmlspecialchars($input['name']),
                'gender' => htmlspecialchars($input['gender']),
                'age' => intval($input['age']),
                'height' => isset($input['height']) && $input['height'] !== '' ? floatval($input['height']) : null,
                'weight' => isset($input['weight']) && $input['weight'] !== '' ? floatval($input['weight']) : null,
                'school' => isset($input['school']) ? htmlspecialchars($input['school']) : '',
                'class' => isset($input['class']) ? htmlspecialchars($input['class']) : '',
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
            writeData($students);

            echo json_encode(['success' => true, 'student' => $newStudent]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Kaedah tidak dibenarkan']);
        }
        break;

    case 'save_scores':
        if ($method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input || empty($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID murid diperlukan']);
                exit;
            }

            $students = readData();
            $found = false;

            foreach ($students as &$student) {
                if ($student['id'] === $input['id']) {
                    $found = true;
                    
                    // Kemas kini skor
                    if (isset($input['scores'])) {
                        $newScores = $input['scores'];
                        
                        // Validasi dan simpan format skor yang betul
                        if (isset($newScores['sit_reach'])) {
                            $student['scores']['sit_reach'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? floatval($val) : null;
                            }, array_slice($newScores['sit_reach'], 0, 3));
                        }
                        if (isset($newScores['sit_up'])) {
                            $student['scores']['sit_up'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? intval($val) : null;
                            }, array_slice($newScores['sit_up'], 0, 2));
                        }
                        if (isset($newScores['long_jump'])) {
                            $student['scores']['long_jump'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? floatval($val) : null;
                            }, array_slice($newScores['long_jump'], 0, 2));
                        }
                        if (isset($newScores['sprint_10m'])) {
                            $student['scores']['sprint_10m'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? floatval($val) : null;
                            }, array_slice($newScores['sprint_10m'], 0, 1));
                        }
                        if (isset($newScores['shuttle_run'])) {
                            $student['scores']['shuttle_run'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? floatval($val) : null;
                            }, array_slice($newScores['shuttle_run'], 0, 2));
                        }
                        if (isset($newScores['hand_eye'])) {
                            $student['scores']['hand_eye'] = array_map(function($val) {
                                return $val !== null && $val !== '' ? intval($val) : null;
                            }, array_slice($newScores['hand_eye'], 0, 1));
                        }
                    }
                    break;
                }
            }

            if ($found) {
                writeData($students);
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
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input || empty($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID murid diperlukan']);
                exit;
            }

            // Semak peranan (Hanya Admin dibenarkan)
            $role = isset($input['role']) ? $input['role'] : '';
            if ($role !== 'Admin') {
                http_response_code(403);
                echo json_encode(['error' => 'Akses dinafikan. Hanya Admin dibenarkan memadam rekod murid.']);
                exit;
            }

            $students = readData();
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
                writeData($newStudents);
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

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Tindakan API tidak sah']);
        break;
}
?>
