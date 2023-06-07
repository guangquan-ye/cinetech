<?php
namespace App\Model;

use App\Model\DbConnexion;


Class CommentModel{


    public function insert($type, $type_id, $commentId, $commentText, $userId)
    {
        $insert = "INSERT INTO comment (type, type_id, comment_id, content, id_user) VALUES (:type, :type_id, :comment_id, :content, :user_id)";
        $prepare = DbConnexion::getDb()->prepare($insert);
        $prepare->execute([
            "type" => $type,
            "type_id" => $type_id,
            "comment_id" => $commentId,
            "content" => $commentText,
            "user_id" => $userId
            
        ]);
    }

    public function selectReply($commentId)
    {   
        
        $select ="SELECT * FROM comment WHERE comment_id = :comment_id";
        $prepare = DbConnexion::getDb()->prepare($select);
        $prepare->execute([
            "comment_id" => $commentId
        ]);
        $result = $prepare->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }
}