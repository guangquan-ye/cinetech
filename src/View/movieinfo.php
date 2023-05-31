<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../src/style/style.css">

    <title>Document</title>
</head>

<body>
    <?php require_once "./src/includes/header.php" ?>
    <div class="info">
    <div class="infoDisplay" id="movieInfoDisplay"></div>
        <button id="addFavoriteBtn" name="addFavoriteBtn">Add to favorite</button>
    <div class="castPart"></div>
    
    <h1>Related Movie</h1>
    <div class="relatedDiv" id="relatedMovieDiv"></div>
    
    </div>
    <div class="commentDisplay" id="commentDisplay">
    <div id="commentReplyDiv"></div>
    </div>

    <script src="../src/script/movieinfo.js"></script>
    <script src="../src/script/search.js"></script>
    <script src="../src/script/comment.js"></script>
    <script src="../src/script/auth.js"></script>
    <script src="../src/script/addfavorite.js"></script>

</body>

</html>