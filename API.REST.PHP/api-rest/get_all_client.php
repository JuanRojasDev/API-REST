<?php
require_once '../includes/Client.class.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header('Content-Type: application/json');
    try {
        $clients = Client::get_all_clients();
        echo json_encode(['clients' => $clients]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>