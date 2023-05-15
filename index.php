<?php
			require_once 'vendor/autoload.php';
			$router = new AltoRouter();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
			 require_once 'vendor/autoload.php';
			 $router = new AltoRouter();
				 // (Il faut redémarrer vscode si il ne reconnait pas AltoRouter)
			 $router->setBasePath('/cinetech');
			    $router->map('GET', '/', function () {
			    echo "OK";
			  }, 'home');
			 // match current request url
			  $match = $router->match();
			// call closure or throw 404 status
			  if( is_array($match) && is_callable( $match['target'] ) ) {
			  	call_user_func_array( $match['target'], $match['params'] ); 
			  } else {
			  	// no route was matched
			  	header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
			  }
?>
</body>
</html>