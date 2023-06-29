<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/style/style.css">
    <title>Admin</title>
</head>
<body>
    <?php require_once "./src/includes/header.php" ?>
    <?php if(isset($_SESSION["user"])): ?> 
        <?php if($_SESSION["user"]["login"] == "admin"): ?>
            <h1>Admin Panel</h1>
            <h2 id="editMsg"></h2>
            <div class="panelBtnDiv">
                <button id="usersPanel">Users</button>
                <button id="comsPanel">Comments</button>
                <button id="favsPanel">Favorite</button>
            </div>

            <div class="panelDisplayDiv" id="panelDisplayDiv">
                
            </div>
        <?php endif ?>
    <?php else: ?>
        <h1>Acces denied</h1>
    <?php endif ?>
</body>
<script src="./src/script/admin.js"></script>
</html>