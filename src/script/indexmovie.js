const slider = document.querySelector('.movieGallery');
const filmWidth = slider.offsetWidth / 0;
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; 
  const maxScrollLeft = slider.scrollWidth - slider.offsetWidth; 
  const newScrollLeft = scrollLeft - walk;
  slider.scrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));
});

async function createCarousel() {
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };

  try {
    let response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options);
    let movies = await response.json();
    console.log(movies)

    let movieDisplayDiv = document.getElementById("movieDisplayDiv");

    let currentIndex = 0;

    function showMovies(index) {
      movieDisplayDiv.innerHTML = '';
      const endIndex = Math.min(index + 9, movies.results.length);
      for (let i = index; i < endIndex; i++) {
        const movie = movies.results[i];
        if (movie) {
          movieDisplayDiv.innerHTML += `
            <div class="movieDiv">
            <a href="/cinetech/movie/${movie.id}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster"></a>
            </div>`;
        }
      }
    }

    function updateCurrentIndex() {
      const scrollOffset = slider.scrollLeft;
      currentIndex = Math.floor(scrollOffset / filmWidth);
      showMovies(currentIndex);
    }

    slider.addEventListener('scroll', updateCurrentIndex);
    window.addEventListener('resize', updateCurrentIndex);

    updateCurrentIndex();
  } catch (error) {
    console.error("An error occurred while retrieving .", error);
  }
}
createCarousel();
