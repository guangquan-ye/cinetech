const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search_results');

function displayResults(results) {
  const ul = document.createElement('ul');
  results.forEach(result => {
    ul.innerHTML += (
      `<li>
          <a href="/cinetech/movies/${result.id}">${result.title}</a>
      </li>`
    )
  })
  searchResults.appendChild(ul);
}

function search() {
  searchInput.addEventListener('input', async (e) => {
    const searchValue = e.target.value;
    searchResults.innerHTML = '';
    if (searchValue.length > 2) {
      const movies = await getData("https://api.themoviedb.org/3/search/movie?language=fr-FR&query=" + searchValue);
      displayResults(movies.results);
    }
  })
}

search();