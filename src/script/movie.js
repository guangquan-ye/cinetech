let currentPage = 1;
// Variable pour stocker la page actuelle de films affichée.
const moviesPerPage = 20;
// Constante pour définir le nombre de films affichés par page.

async function getGenres() {
  // Fonction asynchrone pour récupérer les genres de films.
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };
  // Options de la requête HTTP pour récupérer les genres de films.

  try {
    let response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options);
    // Requête HTTP GET asynchrone pour récupérer les genres de films depuis l'API TMDb.
    let data = await response.json();
    // Transformation de la réponse en JSON et stockage des données des genres de films dans la variable 'data'.
    let genres = data.genres;
    // Extraction des genres de films à partir des données.

    const checkboxDiv = document.querySelector("#checkboxDiv");
    // Sélection de l'élément du DOM avec l'ID 'checkboxDiv' et stockage dans la variable 'checkboxDiv'.

    for (let genre of genres) {
      // Boucle sur les genres de films.
      const onecheckbox = document.createElement("div");
      onecheckbox.classList.add("onecheckbox");
      // Création d'un élément 'div' pour chaque genre de film et ajout de la classe 'onecheckbox'.

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = genre.id;
      // Création d'une case à cocher pour le genre de film et définition de sa valeur.

      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          check(checkbox.value);
        } else {
          uncheck(checkbox.value);
        }
      });
      // Ajout d'un écouteur d'événements pour l'événement de changement d'état de la case à cocher, afin d'appeler les fonctions 'check' ou 'uncheck' en fonction de l'état de la case à cocher.

      const label = document.createElement('label');
      label.textContent = genre.name;
      // Création d'une étiquette pour afficher le nom du genre de film.

      onecheckbox.appendChild(checkbox);
      onecheckbox.appendChild(label);
      // Ajout de la case à cocher et de l'étiquette à l'élément 'onecheckbox'.

      checkboxDiv.appendChild(onecheckbox);
      // Ajout de l'élément 'onecheckbox' à l'élément 'checkboxDiv'.
    }

    updateGenresString();
    // Appel de la fonction 'updateGenresString' pour mettre à jour la chaîne de genres sélectionnés.

  } catch (error) {
    console.error("An error occurred while retrieving movies.", error);
    // Affichage d'une erreur dans la console en cas d'erreur lors de la récupération des genres de films.
  }
}

const genreArray = [];
// Tableau pour stocker les genres sélectionnés.

function composeArray(value) {
  genreArray.push(value);
  currentPage = 1;
  updateGenresString();
  // Fonction pour ajouter un genre au tableau 'genreArray', réinitialiser la page actuelle et mettre à jour la chaîne de genres sélectionnés.
}

function decomposeArray(value) {
  const index = genreArray.indexOf(value);
  if (index !== -1) {
    genreArray.splice(index, 1);
    currentPage = 1;
    updateGenresString();
    // Fonction pour supprimer un genre du tableau 'genreArray', réinitialiser la page actuelle et mettre à jour la chaîne de genres sélectionnés.
  }
}

function arrayToString(array) {
  return array.join(',');
  // Fonction pour convertir un tableau en une chaîne de caractères séparée par des virgules.
}

function updateGenresString() {
  const genresString = arrayToString(genreArray);
  console.log(genresString);
  getMovieByGenre(genresString, currentPage, moviesPerPage);
  // Fonction pour mettre à jour la chaîne de genres sélectionnés, afficher les films correspondant aux genres sélectionnés et paginer les résultats.
}

function check(value) {
  composeArray(value);
  // Fonction pour ajouter un genre au tableau 'genreArray' lorsqu'une case à cocher est cochée.
}

function uncheck(value) {
  decomposeArray(value);
  // Fonction pour supprimer un genre du tableau 'genreArray' lorsqu'une case à cocher est décochée.
}

async function getMovieByGenre(genresString, page, perPage) {
  const byGenre = genresString;
  console.log(genresString);
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };
  // Options de la requête HTTP pour récupérer les films par genre.

  try {
    let response = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres=" + byGenre + "&page=" + page + "&per_page=" + perPage, options);
    // Requête HTTP GET asynchrone pour récupérer les films correspondant aux genres sélectionnés depuis l'API TMDb.
    let data = await response.json();
    // Transformation de la réponse en JSON et stockage des données des films dans la variable 'data'.
    console.log(data);
    let movieDisplay = document.querySelector("#movieDisplay");
    movieDisplay.innerHTML = '';
    // Sélection de l'élément du DOM avec l'ID 'movieDisplay' et réinitialisation de son contenu HTML.

    for (let i = 0; i < data.results.length; i++) {
      if (i < perPage) {
        let movie = data.results[i];
        // Boucle sur les résultats des films et création d'une carte pour chaque film.

        movieDisplay.innerHTML += `
          <div class="moviephpDiv">
            <a href="/cinetech/movie/${movie.id}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster"></a>
          </div>
        `;
        // Ajout de la carte du film à l'élément 'movieDisplay'.
      }
    }

    const paginationDivs = document.querySelectorAll(".paginationDiv");
    paginationDivs.forEach((paginationDiv)=>{
      paginationDiv.innerHTML = '';

      const previousButton = document.createElement("button");
      previousButton.id = "previousButton";
      previousButton.textContent = "Previous";
      previousButton.addEventListener('click', previousPage);
      const nbPage = document.createElement("p");
      nbPage.textContent = data.page+"/"+data.total_pages;
      const nextButton = document.createElement("button");
      nextButton.id = "nextButton";
      nextButton.textContent = "Next";
      nextButton.addEventListener('click', nextPage);

      paginationDiv.appendChild(previousButton);
      paginationDiv.appendChild(nbPage);
      paginationDiv.appendChild(nextButton);
    })
    // Création des éléments de pagination : bouton précédent, numéro de page et bouton suivant.

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = data.results.length < perPage;
    // Désactivation du bouton précédent si on est sur la première page, et désactivation du bouton suivant si le nombre de résultats est inférieur au nombre de films par page.

  } catch (error) {
    console.error("An error occurred while retrieving movies.", error);
    // Affichage d'une erreur dans la console en cas d'erreur lors de la récupération des films par genre.
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updateGenresString();
    // Fonction pour passer à la page précédente des films et mettre à jour la liste des films affichés.
  } previousPage.style.visibility = "hidden";
}

function nextPage() {
  currentPage++;
  updateGenresString();
  // Fonction pour passer à la page suivante des films et mettre à jour la liste des films affichés.
}

document.addEventListener('DOMContentLoaded', getGenres);
// Écouteur d'événements pour appeler la fonction 'getGenres' lorsque le contenu de la page est chargé.
