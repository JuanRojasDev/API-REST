<?php
require_once('../includes/Client.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) {
    try {
        Client::delete_client_by_id($_GET['id']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'ID no proporcionado o método no permitido']);
}
?>