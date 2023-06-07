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

    public function myFavorite(){
        require_once "./src/View/favorite.php";
    }

    public function getFavorite($userId){

       return json_encode($this->fav->selectFav($userId));
       header('Content-Type: application/json');
       
    }

    public function delFavorite($type, $id_type){
        $this->fav->delete($type, $id_type);
    }
}

?>