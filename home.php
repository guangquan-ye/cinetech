<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/style/style.css">
    <title>Document</title>
</head>

<body>
    <?php require_once "./src/includes/header.php" ?>
    <div class="frontDisplay">
        <h1>Movie Trend</h1>
        <div class="movieContainer">
            <div class="movieGallery" id="movieDisplayDiv"></div>
        </div>
        <h1>TvShow Trend</h1>
        <div class="tvshowContainer">
            <div class="tvshowGallery" id="tvshowDisplayDiv"></div>
        </div>
    </div>

    <script src="./src/script/indexmovie.js"></script>
    <script src="./src/script/indextvshow.js"></script>


</body>

</html>