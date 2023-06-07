<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/style/style.css">
    <title>My favorite</title>
</head>

<body>
    <?php require_once "./src/includes/header.php" ?>
    <h2 class="favTitle">My Movie</h2>
    <div class="myFavMovieDisplay" id="myFavMovieDisplay"></div>
    <h2 class="favTitle">My Tvshow</h2>
    <div class="myFavTvDisplay" id="myFavTvDisplay"></div>

    <script src="./src/script/getfavorite.js"></script>

</body>

</html>