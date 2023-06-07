const slider = document.querySelector('.movieGallery');
// Sélectionne l'élément du DOM avec la classe 'movieGallery' et le stocke dans la variable 'slider'.

const filmWidth = slider.offsetWidth / 0;
// Calcule la largeur des films en divisant la largeur du slider par 0. Cette ligne pourrait générer une erreur car on ne peut pas diviser par zéro.

let isDown = false;
// Variable booléenne pour indiquer si le bouton de la souris est enfoncé ou non.

let startX;
// Variable pour stocker la position horizontale de la souris au moment où l'utilisateur commence à cliquer sur le slider.

let scrollLeft;
// Variable pour stocker la valeur de défilement horizontal du slider.

slider.addEventListener('mousedown', e => {
  // Ajoute un écouteur d'événements pour l'événement 'mousedown' (clic de la souris) sur le slider.
  isDown = true;
  // Définit la variable 'isDown' à true pour indiquer que le bouton de la souris est enfoncé.
  startX = e.pageX - slider.offsetLeft;
  // Stocke la position horizontale de la souris moins la position horizontale du slider.
  scrollLeft = slider.scrollLeft;
  // Stocke la valeur de défilement horizontal actuelle du slider.
});

slider.addEventListener('mouseleave', _ => {
  // Ajoute un écouteur d'événements pour l'événement 'mouseleave' (la souris quitte l'élément) sur le slider.
  isDown = false;
  // Définit la variable 'isDown' à false pour indiquer que le bouton de la souris n'est pas enfoncé.
});

slider.addEventListener('mouseup', _ => {
  // Ajoute un écouteur d'événements pour l'événement 'mouseup' (relâchement du bouton de la souris) sur le slider.
  isDown = false;
  // Définit la variable 'isDown' à false pour indiquer que le bouton de la souris n'est pas enfoncé.
});

slider.addEventListener('mousemove', e => {
  // Ajoute un écouteur d'événements pour l'événement 'mousemove' (mouvement de la souris) sur le slider.
  if (!isDown) return;
  // Si le bouton de la souris n'est pas enfoncé, retourne immédiatement.
  e.preventDefault();
  // Empêche le comportement par défaut du mouvement de la souris sur le slider.
  const x = e.pageX - slider.offsetLeft;
  // Calcule la position horizontale de la souris moins la position horizontale du slider.
  const walk = (x - startX) * 1.5;
  // Calcule la distance parcourue par la souris en multipliant la différence de position par 1.5.
  const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
  // Calcule la valeur maximale de défilement horizontal en soustrayant la largeur du slider de la largeur totale du contenu du slider.
  const newScrollLeft = scrollLeft - walk;
  // Calcule la nouvelle valeur de défilement horizontal en soustrayant la distance parcourue par la souris à la valeur de défilement précédente.
  slider.scrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));
  // Définit la valeur de défilement horizontal du slider en s'assurant qu'elle reste dans les limites acceptables (entre 0 et la valeur maximale de défilement).
});

async function createCarousel() {
  // Définition de la fonction asynchrone 'createCarousel' pour initialiser le carousel.
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };
  // Définit les options de la requête HTTP pour récupérer les films populaires.

  try {
    let response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options);
    // Effectue une requête HTTP GET asynchrone pour récupérer les films populaires depuis l'API TMDb.
    let movies = await response.json();
    // Transforme la réponse en JSON et stocke les données des films dans la variable 'movies'.

    let movieDisplayDiv = document.getElementById("movieDisplayDiv");
    // Sélectionne l'élément du DOM avec l'identifiant 'movieDisplayDiv' et le stocke dans la variable 'movieDisplayDiv'.

    let currentIndex = 0;
    // Variable pour stocker l'index actuel des films affichés.

    function showMovies(index) {
      // Définition de la fonction 'showMovies' pour afficher les films.
      movieDisplayDiv.innerHTML = '';
      // Efface le contenu précédent de 'movieDisplayDiv'.
      const endIndex = Math.min(index + 9, movies.results.length);
      // Calcule l'index de fin en prenant le minimum entre l'index actuel plus 9 et la longueur totale des films.
      for (let i = index; i < endIndex; i++) {
        // Boucle sur les films à afficher en commençant par l'index actuel et en s'arrêtant à l'index de fin.
        const movie = movies.results[i];
        // Sélectionne le film correspondant à l'index actuel.
        if (movie) {
          // Vérifie si le film existe.
          movieDisplayDiv.innerHTML += `
            <div class="movieDiv">
              <a href="/cinetech/movie/${movie.id}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title} Poster"></a>
            </div>`;
          // Ajoute le code HTML pour afficher l'image du film avec le lien correspondant.
        }
      }
    }

    function updateCurrentIndex() {
      // Définition de la fonction 'updateCurrentIndex' pour mettre à jour l'index actuel des films affichés.
      const scrollOffset = slider.scrollLeft;
      // Récupère la valeur de défilement horizontal du slider.
      currentIndex = Math.floor(scrollOffset / filmWidth);
      // Calcule l'index actuel en divisant la valeur de défilement par la largeur des films et en arrondissant à l'entier inférieur.
      showMovies(currentIndex);
      // Appelle la fonction 'showMovies' pour afficher les films correspondant à l'index actuel.
    }

    slider.addEventListener('scroll', updateCurrentIndex);
    // Ajoute un écouteur d'événements pour l'événement de défilement sur le slider, afin de mettre à jour l'index actuel lorsque le défilement se produit.
    window.addEventListener('resize', updateCurrentIndex);
    // Ajoute un écouteur d'événements pour l'événement de redimensionnement de la fenêtre, afin de mettre à jour l'index actuel lorsque la taille du slider change.

    updateCurrentIndex();
    // Appelle la fonction 'updateCurrentIndex' pour afficher les films initiaux.
  } catch (error) {
    console.error("An error occurred while retrieving .", error);
    // Affiche une erreur dans la console si une erreur se produit lors de la récupération des films.
  }
}

createCarousel();
// Appelle la fonction 'createCarousel' pour initialiser le carousel.
