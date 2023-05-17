const uri = window.location.pathname;
const parts = uri.split("/");
const movieId = parts[parts.length - 1];
console.log(movieId);


async function movieInfo(){

    let options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
        }
      };
    
      try {
        let response = await fetch("https://api.themoviedb.org/3/movie/"+movieId, options);
        let movie = await response.json();
        console.log(movie.production_companies)

        let movieInfoDisplay = document.getElementById("movieInfoDisplay");

        let genres = [];
        for (let i = 0; i < movie.genres.length; i++) {
            genres.push(movie.genres[i].name);
        }
        let genresString = genres.join(' ');
          
        let companies = [];

        for (let i = 0; i < movie.production_companies.length; i++) {
            companies.push(movie.production_companies[i].name);
            
            console.log(companies);
        }
        let companiesString = companies.join(' ');

        movieInfoDisplay.innerHTML += `
            <h1>${movie.original_title}</h1>
            <div class="movieDiv">
                <div class="leftPart">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster">   
                </div>
                <div class="rightPart">
                    <p><span class="infoName">Synopsis</span> : ${movie.overview}</p>
                    <p><span class="infoName">Release</span> : ${movie.release_date}</p>
                    <p><span class="infoName">Genre(s)</span> : ${genresString}<p>
                    <p><span class="infoName">Popularity</span> : ${movie.popularity}</p>
                    <p><span class="infoName">Average Vote</span> : ${movie.vote_average}</p>
                    <p><span class="infoName">Production</span> : ${companiesString}</p>
                </div>
            </div>`;
    }
    catch (error) {
    console.error("Une erreur s'est produite lors de la récupération du film:", error);
    }
}

movieInfo();
