<?php
require_once '../includes/Client.class.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header('Content-Type: application/json');
    $clients = Client::get_all_clients();
    echo json_encode(['clients' => $clients]);
}
?>