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
        console.log(movie)

        let movieInfoDisplay = document.getElementById("movieInfoDisplay");

        movieInfoDisplay.innerHTML += `
            <div class="movieDiv">
            <h1>${movie.original_title}</h1>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster">
            </div>`;
    }
    catch (error) {
    console.error("Une erreur s'est produite lors de la récupération du film:", error);
    }
}


movieInfo();
