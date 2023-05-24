const commentUri = window.location.pathname;
const commentParts = uri.split("/");
const commentId = parts[parts.length - 1];
const commentName = parts[parts.length - 2];

console.log(commentId)
console.log(commentName);

async function getComment(){
    let options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
        }
      };
    try {
        let response = await fetch("https://api.themoviedb.org/3/" + commentName + "/" + commentId + "/reviews", options);
        let comments = await response.json();
        let commentDisplay = document.querySelector("#commentDisplay");
        
        
        commentDisplay.innerHTML = ""; // Clear existing content

        for (let comment of comments.results) {

            let commentCreateDate = comment.created_at
            let commentEditDate = comment.updated_at
            const createDate = commentCreateDate.split("T")[0];
            const editDate = commentEditDate.split("T")[0];
            
            commentDisplay.innerHTML += `
              <div class="commentDiv">
                <div class="commentLeftDiv">
                <img src="https://image.tmdb.org/t/p/w200/${comment.author_details.avatar_path}" alt="Author Avatar">
                <p><span class="infoName">By : </span>${comment.author}</p>
                </div>
                <div class="commentRightDiv">
                    <p>${comment.content}</p>
                    <div class="dateDiv">
                        <p><span class="infoName">Posted : </span>${createDate}</p>
                        <p><span class="infoName">Edit : </span>${editDate}</p>
                        
                    </div>
                </div>
              </div>
            `;
          }
    } 
    catch (error) {
    console.error("An error occurred while retrieving .", error);
    }
}
getComment()