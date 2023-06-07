<?php
namespace App\Controller;

use App\Model\CommentModel;

Class CommentController{
    public $comment;

    public function __construct()
    {
        $this->comment = new CommentModel();
    }

    function replyComment($type, $type_id, $commentId, $commentText, $userLogin)
    {

        if(empty($commentText)){
            echo "Empty input";
        }
        else{
        htmlspecialchars($type);
        htmlspecialchars($type_id);
        htmlspecialchars($commentId);
        htmlspecialchars($commentText);
        htmlspecialchars($userLogin);

        $this->comment->insert($type, $type_id, $commentId, $commentText, $userLogin);

        }
    }

    function getReply($typeId){
        echo json_encode($this->comment->selectReply($typeId));
    }
}