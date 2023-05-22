async function getGenres() {
    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
      }
    };
  
    try {
      let response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options);
      let data = await response.json();
      let genres = data.genres;
  
      const checkboxDiv = document.querySelector("#checkboxDiv");
  
      for (let genre of genres) {
        const onecheckbox = document.createElement("div");
        onecheckbox.classList.add("onecheckbox");
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = genre.id;
  
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            check(checkbox.value);
          } else {
            uncheck(checkbox.value);
          }
        });
  
        const label = document.createElement('label');
        label.textContent = genre.name;
  
        onecheckbox.appendChild(checkbox);
        onecheckbox.appendChild(label);
  
        checkboxDiv.appendChild(onecheckbox);
      }
  
    } catch (error) {
      console.error("An error occurred while retrieving movies.", error);
    }
};
  
const genreArray = [];

function composeArray(value) {
    genreArray.push(value);
    updateGenresString();
}

function decomposeArray(value) {
const index = genreArray.indexOf(value);
    if (index !== -1) {
        genreArray.splice(index, 1);
        updateGenresString();
    }
}
  
function arrayToString(array) {
return array.join(',');
}

function updateGenresString() {
const genresString = arrayToString(genreArray);

console.log(genresString);
    getMovieByGenre(genresString);
}

function check(value) {
    composeArray(value);
}

function uncheck(value) {
    decomposeArray(value);
}

async function getMovieByGenre(genresString) {
    const byGenre = genresString;
    console.log(genresString);
    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
      }
    };
  
    try {
      let response = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres=" + byGenre, options);
      let data = await response.json();
      console.log(data);
      let movieDisplay = document.querySelector("#movieDisplay");
        movieDisplay.innerHTML = ' ';

      for (let movie of data.results) {

        movieDisplay.innerHTML += `
          <div class="moviephpDiv">
            <a href="/cinetech/movie/${movie.id}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster"></a>
          </div>
        `;
      }
    } catch (error) {
      console.error("An error occurred while retrieving movies.", error);
    }
  }

getGenres();
getMovieByGenre();
  