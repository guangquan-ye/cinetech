<nav>
    <div class="logoDiv">
        <a href="/cinetech"><img src="/cinetech/src/includes/Videoclub.png"></a>
    </div>
    <div class="link">
        <?php if (isset($_SESSION["user"])) : ?>
            <?php if ($_SESSION["user"]["login"] == "admin") : ?>
                <a href="/cinetech/admin">Panel</a>
            <?php endif ?>
            <div class="userdiv">
                <a href="/cinetech/favorite">
                    <p>Bonjour&ensp;<span class="infoName"><?= $_SESSION["user"]["login"] ?></span></p>
                </a>
            </div>
            <a href="/cinetech/logout">Logout</a>
        <?php else : ?>
            <button id="loginDisplayBtn" class="buttonone">Login</button>
            <button id="regDisplayBtn" class="buttonone">Register</button>
        <?php endif ?>
        <a href="/cinetech/movie">Movie</a>
        <a href="/cinetech/tv">TvShow</a>
    </div>
    <div class="searchbar">
        <input type="text" id="search" placeholder="Search...">
        <div id="searchResults"></div>
    </div>
</nav>
<div class="formDisplay" id="formDisplay"></div>