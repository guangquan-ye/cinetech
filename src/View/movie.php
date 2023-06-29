<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/style/style.css">
    <title>Movie</title>
</head>
<body>
<?php require_once "./src/includes/header.php" ?>
    
    <div class="movieMain">
        <h1>Movie</h1>
        <div class="checkboxDiv" id="checkboxDiv"></div>
        <div class="paginationDiv"></div>
        <div class="movieDisplay" id="movieDisplay"></div>
        <div class="paginationDiv"></div>
    </div>
    

    <script src="./src/script/movie.js"></script>
    <script src="./src/script/search.js"></script>
    <script src="./src/script/auth.js"></script>
</body>
</html>