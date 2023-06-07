<?php
namespace App\Model;

use App\Model\DbConnexion;

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

    public function selectFav($userId){

        $select = "SELECT * FROM favorite WHERE id_user = :userId" ;
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute([
            "userId" => $userId
        ]);
        $result = $prepare->fetchAll(\PDO::FETCH_ASSOC);
        
        return $result;
    }

    public function delete($type, $id_type){
        $delete = "DELETE FROM favorite WHERE type = :type AND id_type = :id_type";
        $prepare = DbConnexion::getDb()->prepare($delete);
        $prepare->execute([
            "type" => $type,
            "id_type" => $id_type
        ]);
    }
}
?>