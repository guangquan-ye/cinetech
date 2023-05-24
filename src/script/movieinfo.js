const uri = window.location.pathname;
const parts = uri.split("/");
const movieId = parts[parts.length - 1];

async function movieInfo() {
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };

  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`, options);
    let movie = await response.json();

    let casting = [];
    let limit = 6;
    let count = 0;

    for (let actor of movie.credits.cast) {
      casting.push(actor);
      count++;

      if (count >= limit) {
        break;
      }
    }

    casting.forEach((actor) => {
      let castPart = document.querySelector(".castPart");

      castPart.innerHTML +=`
        <div class="actorDiv">
            <img src="https://image.tmdb.org/t/p/w200/${actor.profile_path}">
            <p>${actor.name}</p> 
        </div>`
    });

    let directorArray = [];
    let directorString = "";

    for (let crewMember of movie.credits.crew) {
      if (crewMember.job === "Director") {
        directorArray.push(crewMember.name);
      }
    }

    directorString = directorArray.join(", ");

    let movieInfoDisplay = document.getElementById("movieInfoDisplay");
    let genres = movie.genres.map((genre) => genre.name).join(", ");
    let companies = movie.production_companies.map((company) => company.name).join(", ");

    movieInfoDisplay.innerHTML = `
      <h1>${movie.original_title}</h1>
      <div class="infoDiv">
        <div class="leftPart">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster">
         
        </div>
        <div class="rightPart">
          <p><span class="infoName">Synopsis : </span>${movie.overview}</p>
          <p><span class="infoName">Director : </span>${directorString}</p>
          <p><span class="infoName">Release : </span> ${movie.release_date}</p>
          <p><span class="infoName">Genre(s) : </span>${genres}</p>
          <p><span class="infoName">Popularity : </span>${movie.popularity}</p>
          <p><span class="infoName">Average Vote : </span>${movie.vote_average}</p>
          <p><span class="infoName">Production : </span>${companies}</p>
        </div>
      </div> 
    `;

    relatedMovie(movie.genres[0].id);
  } catch (error) {
    console.error("An error occurred while retrieving the movie.", error);
  }
}

async function relatedMovie(id) {
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };

  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options);
    let relateds = await response.json();
    let relatedMovieDiv = document.getElementById("relatedMovieDiv");
    let results = relateds.results.slice(0, 6);

    for (let related of results) {
      relatedMovieDiv.innerHTML += `
        <a href="/cinetech/movie/${related.id}"><img src="https://image.tmdb.org/t/p/w500/${related.poster_path}" alt="${related.original_title} Poster"></a>
      `;
    }
  } catch (error) {
    console.error("An error occurred while retrieving the related movies.", error);
  }
}

movieInfo();
