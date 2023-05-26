<nav>
        <div class="logoDiv">
        <a href="/cinetech"><img src="/cinetech/src/includes/Videoclub.png"></a>
        </div>
        <div class="link">
            <?php if(isset($_SESSION["user"])) : ?>
                <p>Bonjour <span class="infoName"><?= $_SESSION["user"]["login"] ?></span></p>
                <a href="/cinetech/logout">Logout</a>
            <?php else : ?>
                <button id="loginDisplayBtn">Login</button>
                <button id="regDisplayBtn">Register</button>
            <?php endif ?>
            <a href="/cinetech/movie">Movie</a>
            <a href="/cinetech/tv">TvShow</a>
            <div class="searchbar">
                <input type="text" id="search">
                <div id="searchResults"></div>
            </div> 
        </div>
    </nav>
    <div class="formDisplay" id="formDisplay"></div>
    