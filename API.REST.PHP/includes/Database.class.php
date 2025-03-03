<?php
    class Database{
        private $host = 'shuttle.proxy.rlwy.net:42627'; 
        private $user = 'root'; 
        private $password; 
        private $database = 'code_pills'; 

        public function __construct() {
            $this->password = getenv('DB_PASSWORD');
        }

        public function getConnection(){
            $dsn = "mysql:host=".$this->host.";dbname=".$this->database;

            try{
                $connection = new PDO($dsn, $this->user, $this->password);
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $connection;
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();
            }
        }
    }
?>