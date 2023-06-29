// Récupération de l'élément d'entrée de recherche du DOM
const searchInput = document.getElementById('search');

// Récupération de l'élément de résultats de recherche du DOM
const searchResults = document.getElementById('searchResults');

// Options de la requête HTTP pour la recherche de films et séries
let options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
  }
};

// Fonction pour afficher les résultats de recherche
function displayResults(results) {
  const ul = document.createElement('ul');
  results.forEach(result => {
    if (result.media_type === 'movie') {
      // Si le résultat est un film
      ul.innerHTML += 
        `<li><span class="infoName">Movie : </span>
            <a href="/cinetech/movie/${result.id}">
              ${result.title}
            </a>
        </li>`
      
    } else if (result.media_type === 'tv') {
      // Si le résultat est une série TV
      ul.innerHTML += 
        `<li><span class="infoName">Tvshow : </span> 
            <a href="/cinetech/tv/${result.id}">
              ${result.name}
            </a>
        </li>`
      
    } 
  })
  // Ajout de la liste des résultats à l'élément de résultats de recherche
  searchResults.appendChild(ul);
}

// Fonction de recherche
function search() {
  searchInput.addEventListener('input', async (e) => {
    const searchValue = e.target.value;
    searchResults.innerHTML = '';
    if (searchValue.length > 2) {
      try {
        let response = await fetch("https://api.themoviedb.org/3/search/multi?language=fr-FR&query=" + searchValue, options);
        let movies = await response.json();
        displayResults(movies.results);
      } catch (error) {
        console.error("An error occurred while retrieving movies.", error);
      }
    }
  });
}

// Lancement de la recherche
search();
