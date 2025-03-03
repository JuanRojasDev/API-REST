<?php
require_once('../includes/Client.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' 
    && isset($_POST['email']) && isset($_POST['name']) && isset($_POST['city']) && isset($_POST['telephone'])) {
    try {
        Client::create_client($_POST['email'], $_POST['name'], $_POST['city'], $_POST['telephone']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos o método no permitido']);
}
?>