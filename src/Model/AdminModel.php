<?php
namespace App\Model;
use App\Model\DbConnexion;

Class AdminModel{

    public function ifAdmin($userId){
        $select = "SELECT id FROM user WHERE id = :id";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->bindValue(":id", $userId);
        $prepare->execute();
        $result = $prepare->fetch(\PDO::FETCH_ASSOC);
        if($result["id"] == "4"){
            return true;
        }else{
            return false;
        }
    }

    public function selectUsers(){

        $select = "SELECT * FROM user WHERE login <> 'admin'";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute();
        $result = $prepare->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    public function editLogin($userId, $login){
            
        $update = "UPDATE user SET login = :login WHERE id = :id";
        $prepare = DbConnexion::getDb()->prepare($update);
        $prepare->bindValue(":id", $userId);
        $prepare->bindValue(":login", $login);
        
        if ($prepare->execute()) {
            return "Login has been updated";
        } else {
            return "Error";
        }
    }

    public function editPassword($userId, $password){
                
        $update = "UPDATE user SET password = :password WHERE id = :id";
        $prepare = DbConnexion::getDb()->prepare($update);
        $prepare->bindValue(":id", $userId);
        $prepare->bindValue(":password", $password);
        
        if ($prepare->execute()) {
            return "Password has been updated";
        } else {
            return "Error";
        }
    }
    public function deleteUser($userId){
                
        $delete = "DELETE FROM user WHERE id = :id";
        $prepare = DbConnexion::getDb()->prepare($delete);
        $prepare->bindValue(":id", $userId);
        
        if ($prepare->execute()) {
            return "User has been deleted";
        } else {
            return "Error";
        }
    }

    public function selectComs(){

        $select = "SELECT * FROM comment";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute();
        $result = $prepare->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }
}
?>