const uri = window.location.pathname;
const parts = uri.split("/");
const tvshowId = parts[parts.length - 1];
console.log(tvshowId);
async function tvshowInfo(){

    let options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
        }
      };
    
      try {
        let response = await fetch("https://api.themoviedb.org/3/tv/"+tvshowId+"?append_to_response=credits", options);
        let tvshow = await response.json();
        console.log(tvshow.credits);

        let casting = [];
        let limit = 6;
        let count = 0;
    
        for (let actor of tvshow.credits.cast) {
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

        for (let crewMember of tvshow.credits.crew) {
            if (crewMember.job === "Creator") {
                directorArray.push(crewMember.name);
            }
        }

    directorString = directorArray.join(", ");

        let tvshowInfoDisplay = document.getElementById("tvshowInfoDisplay");

        let genreId = tvshow.genres[0].id;
    
        let genres = [];
        for (let i = 0; i < tvshow.genres.length; i++) {
            genres.push(tvshow.genres[i].name);
        }
        let genresString = genres.join(', ');
          
        let companies = [];

        for (let i = 0; i < tvshow.production_companies.length; i++) {
            companies.push(tvshow.production_companies[i].name);
            
        }
        let companiesString = companies.join(', ');

        tvshowInfoDisplay.innerHTML += `
            <h1>${tvshow.original_name}</h1>
            <div class="infoDiv">
                <div class="leftPart">
                    <img src="https://image.tmdb.org/t/p/w500/${tvshow.poster_path}" alt="${tvshow.original_name} Poster">   
                </div>
                <div class="rightPart">
                    <p><span class="infoName">Synopsis : </span>${tvshow.overview}</p>
                    <p><span class="infoName">Creator : </span>${directorString}</p>
                    <p><span class="infoName">First Air Date : </span>${tvshow.first_air_date}</p>
                    <p><span class="infoName">Genre(s) : </span>${genresString}<p>
                    <p><span class="infoName">Popularity : </span>${tvshow.popularity}</p>
                    <p><span class="infoName">Average Vote : </span>${tvshow.vote_average}</p>
                    <p><span class="infoName">Production : </span>${companiesString}</p>
                </div>
            </div>`;

            relatedTvshow(genreId)
    }
    catch (error) {
    console.error("An error occurred while retrieving the TV show.", error);
    }
    
}

async function relatedTvshow(id){
    let genreId = id
    console.log(genreId)
    let options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
        }
      };
      try {
        let response = await fetch("https://api.themoviedb.org/3/tv/"+genreId+"/similar", options);
        let relateds = await response.json();
        let relatedTvshowDiv = document.getElementById("relatedTvshowDiv");
        let results = relateds.results.slice(0, 6);
        console.log(results);
        for (let related of results){
         
            relatedTvshowDiv.innerHTML+=`
            <a href ="/cinetech/tv/${related.id}"><img src="https://image.tmdb.org/t/p/w500/${related.poster_path}" alt="${related.original_name} Poster"></a>
            `;
        }
        

    }
    catch (error) {
        console.error("An error occurred while retrieving the related TV shows.", error);
    };
}
tvshowInfo();
