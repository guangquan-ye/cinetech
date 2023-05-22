const searchInput = document.getElementById('search');
const searchResults = document.getElementById('searchResults');

let options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
  }
};

function displayResults(results) {
  const ul = document.createElement('ul');
  const maxResults = Math.min(results.length, 10); 

  for (let i = 0; i < maxResults; i++) {
    
    const result = results[i];
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = "/cinetech/movie/" + result.id;
    link.textContent = result.title;
    li.appendChild(link);
    ul.appendChild(li);
  }

  searchResults.appendChild(ul);
}

function search() {
  searchInput.addEventListener('input', async (e) => {
    const searchValue = e.target.value;
    searchResults.innerHTML = '';
    if (searchValue.length > 2) {
      try {
        let response = await fetch("https://api.themoviedb.org/3/search/movie?language=fr-FR&query=" + searchValue, options);
        let movies = await response.json();
        displayResults(movies.results);
      } catch (error) {
        cconsole.error("An error occurred while retrieving movies.", error);
      }
    }
  });
}

search();
