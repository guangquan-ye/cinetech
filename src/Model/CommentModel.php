<?php
namespace App\Model;

use App\Model\Dbconnexion;


Class CommentModel{


    public function insert($commentId, $commentText, $userId)
    {
        $insert = "INSERT INTO comment (comment_id, content, id_user) VALUES (:comment_id, :content, :user_id)";
        $prepare = DbConnexion::getDb()->prepare($insert);
        $prepare->execute([
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