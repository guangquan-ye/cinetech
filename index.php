<?php

require_once 'vendor/autoload.php';

use App\Controller\MovieController;
use App\Controller\TvshowController;
use App\Controller\UserController;

session_start();

$router = new AltoRouter();

// (Il faut redémarrer vscode si il ne reconnait pas AltoRouter)
$router->setBasePath('/cinetech');

$router->map('GET', '/', function () {
    require_once "home.php";
}, 'home');

$router->map('GET', '/movie', function () {

    $movie = new MovieController();
    $movie->getMovie();

}, 'movie');

$router->map('GET', '/tv', function(){

    $tvshow = new TvshowController();
    $tvshow->getTvshow();

},'tvshow');

$router->map('GET', '/movie/[i:id]', function($id){
    $movie = new MovieController();
    $movie->movieInfo($id);
}, 'movieInfo');

$router->map('GET', '/tv/[i:id]', function($id){
    $tvshow = new TvshowController();
    $tvshow->tvshowInfo($id);
}, 'tvshowinfo');

$router->map('GET', '/register', function(){
    $user = new UserController();
    $user->regFormDisplay();
}, 'regFormDisplay');

$router->map('POST', '/register', function(){
    if(isset($_POST["regBtn"])){
        $user = new UserController();
        $user->createUsers($_POST["regLogin"], $_POST["regPwd"], $_POST["regPwdConf"]);
    }
}, 'usersregister');

$router->map('GET', '/login', function(){
    $user = new UserController();
    $user->logFormDisplay();
}, 'logFormDisplay');

$router->map('POST', '/login' , function(){
    if(isset($_POST["logBtn"])){
    $user = new UserController();
    $user->connect($_POST["logLogin"], $_POST["logPwd"]);
    }
}, 'userslogin');

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

</body>

</html>