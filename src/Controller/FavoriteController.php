<?php
namespace App\Controller;

use App\Model\FavoriteModel;

Class FavoriteController{
    
    public $fav;

    public function __construct()
    {
        $this->fav = new FavoriteModel();
    }

    public function addFavorite($type, $typeId, $userId){
        $this->fav->insert($type, $typeId, $userId);
    }
}

?>