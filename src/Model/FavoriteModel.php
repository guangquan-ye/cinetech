<?php
namespace App\Model;

use App\Model\Dbconnexion;

Class FavoriteModel{


    public function insert($type, $typeId, $userId){

        $insert = "INSERT INTO favorite (type, id_type, id_user) VALUES (:type, :id_type, :id_user)";
        $prepare = DbConnexion::getDb()->prepare($insert);
        $prepare->execute([
            "type" => $type,
            "id_type" => $typeId,
            "id_user" => $userId
        ]);
    }
}
?>