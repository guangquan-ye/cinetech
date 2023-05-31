<?php
namespace App\Controller;

use App\Model\CommentModel;

Class CommentController{
    public $comment;

    public function __construct()
    {
        $this->comment = new CommentModel();
    }

    function replyComment($commentId, $commentText, $userId)
    {
        htmlspecialchars($commentId);
        htmlspecialchars($commentText);
        htmlspecialchars($userId);

        $this->comment->insert($commentId, $commentText, $userId);

    }

    function getReply($commentId){
        echo json_encode($this->comment->selectReply($commentId));
    }
}