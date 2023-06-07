<?php
namespace App\Model;

use App\Model\DbConnexion;


Class CommentModel{


    public function insert($type, $type_id, $commentId, $commentText, $userLogin)
    {
        $insert = "INSERT INTO comment (type, type_id, comment_id, content, user_login) VALUES (:type, :type_id, :comment_id, :content, :user_login)";
        $prepare = DbConnexion::getDb()->prepare($insert);
        $prepare->execute([
            "type" => $type,
            "type_id" => $type_id,
            "comment_id" => $commentId,
            "content" => $commentText,
            "user_login" => $userLogin
            
        ]);
    }

    public function selectReply($typeId)
    {   
        
        $select = "SELECT * FROM comment WHERE comment.type_id = :type_id";

        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute([
            "type_id" => $typeId,
            
        ]);
        $result = $prepare->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }
}