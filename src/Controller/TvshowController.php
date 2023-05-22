<?php

namespace App\Controller;

Class TvshowController{

    public function getTvshow()
    {
        require_once "./src/View/tvshow.php";
    }

    public function tvshowInfo($id)
    {
        require_once "./src/View/tvshowinfo.php";
    }
}
?>