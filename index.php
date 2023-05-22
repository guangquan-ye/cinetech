<?php

require_once 'vendor/autoload.php';

use App\Controller\MovieController;
use App\Controller\TvshowController;

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

$router->map('GET', '/tvshow', function(){

    $tvshow = new TvshowController();
    $tvshow->getTvshow();

},'tvshow');

$router->map('GET', '/movie/[i:id]', function($id){
    $movie = new MovieController();
    $movie->movieInfo($id);
}, 'movieInfo');

$router->map('GET', '/tvshow/[i:id]', function($id){
    $tvshow = new TvshowController();
    $tvshow->tvshowInfo($id);
}, 'tvshowinfo');

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