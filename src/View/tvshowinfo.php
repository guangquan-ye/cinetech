<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../src/style/style.css">
    <title>Details</title>
</head>

<body>
    <?php require_once "./src/includes/header.php" ?>

    <div class="info">
        <div class="infoDisplay" id="tvshowInfoDisplay"></div>
        <?php if (isset($_SESSION["user"])) : ?>
            <div class="addFavoriteBtnDiv">
                <button id="addFavoriteBtn" name="addFavoriteBtn" class="button-36">Add to favorite</button>
            </div>
        <?php endif ?>
        <div class="castPart"></div>
        <h1>Related Tvshow</h1>
        <div class="relatedDiv" id="relatedTvshowDiv"></div>
    </div>

    <div class="commentDisplay" id="commentDisplay">
    </div>

    <script src="../src/script/tvshowinfo.js"></script>
    <script src="../src/script/search.js"></script>
    <script src="../src/script/comment.js"></script>
    <script src="../src/script/auth.js"></script>
    <script src="../src/script/addfavorite.js"></script>
</body>

</html>