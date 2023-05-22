const tvSlider = document.querySelector('.tvshowGallery');
const tvWidth = tvSlider.offsetWidth / 0;
let tvIsDown = false;
let tvStartX;
let tvScrollLeft;

tvSlider.addEventListener('mousedown', e => {
  tvIsDown = true;
  tvStartX = e.pageX - tvSlider.offsetLeft;
  tvScrollLeft = tvSlider.scrollLeft;
});

tvSlider.addEventListener('mouseleave', _ => {
  tvIsDown = false;
});

tvSlider.addEventListener('mouseup', _ => {
  tvIsDown = false;
});

tvSlider.addEventListener('mousemove', e => {
  if (!tvIsDown) return;
  e.preventDefault();
  const tvX = e.pageX - tvSlider.offsetLeft;
  const tvWalk = (tvX - tvStartX) * 1.5;
  const tvMaxScrollLeft = tvSlider.scrollWidth - tvSlider.offsetWidth;
  const tvNewScrollLeft = tvScrollLeft - tvWalk;
  tvSlider.scrollLeft = Math.max(0, Math.min(tvMaxScrollLeft, tvNewScrollLeft)); 
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
    let response = await fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options);
    let tvshows = await response.json();

    let tvshowDisplayDiv = document.getElementById("tvshowDisplayDiv");

    let currentIndex = 0;

    function showTvShows(index) {
      tvshowDisplayDiv.innerHTML = '';
      const endIndex = Math.min(index + 9, tvshows.results.length);
      for (let i = index; i < endIndex; i++) {
        const tvshow = tvshows.results[i];
        if (tvshow) {
          tvshowDisplayDiv.innerHTML += `
            <div class="tvshowDiv">
            <a href="/cinetech/tvshow/${tvshow.id}"><img src="https://image.tmdb.org/t/p/w500/${tvshow.poster_path}" alt="${tvshow.original_title} Poster"></a>
            </div>`;
        }
      }
    }

    function updateCurrentIndex() {
      const tvScrollOffset = tvSlider.scrollLeft;
      currentIndex = Math.floor(tvScrollOffset / tvWidth);
      showTvShows(currentIndex);
    }

    tvSlider.addEventListener('scroll', updateCurrentIndex);
    window.addEventListener('resize', updateCurrentIndex);

    updateCurrentIndex();
  } catch (error) {
    console.error("An error occurred while retrieving the series.", error);
}
}
createCarousel();
