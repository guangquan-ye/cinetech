<?php

namespace App\Model;

use App\Model\DbConnexion;

Class UserModel{

    public function verifyExist($login)
    {
        $select = "SELECT COUNT(login) FROM user WHERE login = :login";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute([
            "login" => $login
        ]);
        $result = $prepare->fetchColumn();
        
        return $result > 0;
    }

    public function ifLoginExist($login)
    {
        $select ="SELECT * FROM user WHERE login = :login";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute([
            "login" => $login
        ]);
        $result = $prepare->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }

    public function insert($login, $password){
        
        $insert = "INSERT INTO user (login, password) VALUES (:login, :password)";
        $prepare = DbConnexion::getDb()->prepare($insert);
        $prepare->execute([
            "login" => $login,
            "password" => $password,  
        ]);
    }
}
