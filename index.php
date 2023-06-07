<?php

require_once 'vendor/autoload.php';

use App\Controller\MovieController;
use App\Controller\TvshowController;
use App\Controller\UserController;
use App\Controller\CommentController;
use App\Controller\FavoriteController;

session_start();

$router = new AltoRouter();

// (Il faut redémarrer vscode si il ne reconnait pas AltoRouter)
$router->setBasePath('/cinetech');

$router->map('GET', '/', function () {
    require_once "home.php";
});



$router->map('GET', '/movie', function () {

    $movie = new MovieController();
    $movie->getMovie();

});

$router->map('GET', '/tv', function(){

    $tvshow = new TvshowController();
    $tvshow->getTvshow();

});

$router->map('GET', '/movie/[i:id]', function($id){
    $movie = new MovieController();
    $movie->movieInfo($id);
});

$router->map('GET', '/tv/[i:id]', function($id){
    $tvshow = new TvshowController();
    $tvshow->tvshowInfo($id);
});

$router->map('GET', '/register', function(){
    $user = new UserController();
    $user->regFormDisplay();
});

$router->map('POST', '/register', function(){
    if(isset($_POST)){
        $user = new UserController();
        $user->createUsers($_POST["regLogin"], $_POST["regPwd"], $_POST["regPwdConf"]);
        
    }
});

$router->map('POST', '/movie/register', function(){
    if(isset($_POST)){
        $user = new UserController();
        $user->createUsers($_POST["regLogin"], $_POST["regPwd"], $_POST["regPwdConf"]);
        
    }
});

$router->map('POST', '/tv/register', function(){
    if(isset($_POST)){
        $user = new UserController();
        $user->createUsers($_POST["regLogin"], $_POST["regPwd"], $_POST["regPwdConf"]);
        
    }
});

$router->map('GET', '/login', function(){
    $user = new UserController();
    $user->logFormDisplay();
});

$router->map('POST', '/login', function(){
    if(isset($_POST)){
    $user = new UserController();
    $user->connect($_POST["logLogin"], $_POST["logPwd"]);
   
    }
});

$router->map('POST', '/movie/login', function(){
    if(isset($_POST)){
    $user = new UserController();
    $user->connect($_POST["logLogin"], $_POST["logPwd"]);
   
    }
});

$router->map('POST', '/tv/login', function(){
    if(isset($_POST)){
    $user = new UserController();
    $user->connect($_POST["logLogin"], $_POST["logPwd"]);
   
    }
});

$router->map('GET', '/logout', function(){
    $user = new UserController();
    $user->logout();
}, 'logout');

$router->map('POST', '/comment', function(){
    if(isset($_POST["comment"])){
        $comment = new CommentController();
        
        $userLogin = isset($_SESSION["user"]["login"]) ? $_SESSION["user"]["login"] : "anonymous";
        
        $comment->replyComment($_POST["type"], $_POST["type_id"], $_POST["comment_id"], $_POST["commentText"], $userLogin);
    }
    
}, 'comment');


$router->map('GET', '/getreplies/[a:action]', function($action){
    $comment = new CommentController();
    $comment->getReply($action);
},'getReplies');



$router->map('POST', '/favorite', function(){
    if(isset($_POST["favorite"])){
        $fav = new FavoriteController();
        $fav->addFavorite($_POST["typeName"], $_POST["typeId"], $_SESSION["user"]["id"]);
    }
},'addFav');

$router->map('GET', '/favorite', function(){
    $fav = new FavoriteController();
    $fav->myFavorite();
}, 'favorite');

$router->map('GET', '/myfavorite', function(){
    $fav = new FavoriteController();
    echo $fav->getFavorite($_SESSION["user"]["id"]);

},'myFavorite'); 

$router->map('POST', '/delfavorite', function(){
    $fav = new FavoriteController();
    echo $fav->delFavorite($_POST["type"], $_POST["id_type"]);

},'delFavorite'); 

// match current request url
$match = $router->match();

// call closure or throw 404 status
if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    // no route was matched
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
?>
