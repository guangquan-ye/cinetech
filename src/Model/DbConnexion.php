<?php

namespace App\Model;

Class DbConnexion
{
    private static $servername = 'localhost';
    private static $username_b = 'root';
    private static $password_b = 'root';
    private static $database = 'cinetech';
    private static ?\PDO $_db = null;

    public static function getDb()
    {
        if (!self::$_db) {
            try {
                self::$_db = new \PDO('mysql:dbname=' . self::$database . ';host=' . self::$servername . ';charset=utf8mb4', self::$username_b, self::$password_b);

                self::$_db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
            }
            catch (\PDOException $e) {
                header("HTTP/1.1 403 Acces refused to the database");
                die();
            }
        }
    return self::$_db;
    }
}