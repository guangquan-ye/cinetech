const myFavMovieDisplay = document.querySelector("#myFavMovieDisplay");
const myFavTvDisplay = document.querySelector("#myFavTvDisplay");

async function getFav() {
  let request = await fetch("/cinetech/myfavorite");
  let favorites = await request.json();

  console.log(favorites);

  for (let favorite of favorites) {

    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
      }
    };

    try {
      if (favorite.type === 'movie') {
        let responseMovie = await fetch(`https://api.themoviedb.org/3/movie/${favorite.id_type}?language=en-US`, options);
        let movie = await responseMovie.json();

        let movieDiv = document.createElement('div');
        movieDiv.className = 'moviephpDiv';

        let movieLink = document.createElement('a');
        movieLink.href = `/cinetech/movie/${favorite.id_type}`;

        let movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = `${movie.original_title} Poster`;

        let removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.id = favorite.type;
        removeButton.value = favorite.id_type;
        removeButton.textContent = 'X';
        movieDiv.appendChild(removeButton);

        removeButton.addEventListener('click', async () => {
          let data = new FormData();
          data.append('type', favorite.type);
          data.append('id_type', favorite.id_type);
          try {
            let removeResponse = await fetch('/cinetech/delfavorite', {
              method: 'POST',
              body: data
            });

            if (removeResponse.ok) {
              console.log('Favorite removed successfully');
              movieDiv.remove(); // Supprimer l'élément du DOM
            } else {
              console.log('Failed to remove favorite');
            }
          } catch (error) {
            console.error('Error removing favorite:', error);
          }
        });

        movieLink.appendChild(movieImage);
        movieDiv.appendChild(movieLink);
        movieDiv.appendChild(removeButton);

        myFavMovieDisplay.appendChild(movieDiv);
      } else if (favorite.type === 'tv') {
        let responseTvShow = await fetch(`https://api.themoviedb.org/3/tv/${favorite.id_type}?language=en-US`, options);
        let tvShow = await responseTvShow.json();

        let tvDiv = document.createElement('div');
        tvDiv.className = 'moviephpDiv';

        let tvLink = document.createElement('a');
        tvLink.href = `/cinetech/movie/${favorite.id_type}`;

        let tvImage = document.createElement('img');
        tvImage.src = `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`;
        tvImage.alt = `${tvShow.original_title} Poster`;

        let removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.id = favorite.type;
        removeButton.value = favorite.id_type;
        removeButton.textContent = 'X';
        console.log(removeButton);

        removeButton.addEventListener('click', async () => {
          let data = new FormData();
          data.append('type', favorite.type);
          data.append('id_type', favorite.id_type);
          try {
            let removeResponse = await fetch('/cinetech/delfavorite', {
              method: 'POST',
              body: data
            });

            if (removeResponse.ok) {
              console.log('Favorite removed successfully');
              tvDiv.remove(); // Supprimer l'élément du DOM
            } else {
              console.log('Failed to remove favorite');
            }
          } catch (error) {
            console.error('Error removing favorite:', error);
          }
        });

        tvLink.appendChild(tvImage);
        tvDiv.appendChild(tvLink);
        tvDiv.appendChild(removeButton);

        myFavTvDisplay.appendChild(tvDiv);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

getFav();
