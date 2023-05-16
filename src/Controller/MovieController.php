<?php
namespace App\Controller;

Class MovieController{

    public function getMovie()
    {
        require_once "./src/View/movie.php";
    }

    public function movieInfo($id)
    {
        require_once "./src/View/movieinfo.php";
    }
}
?>