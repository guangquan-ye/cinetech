const commentUri = window.location.pathname;
const commentParts = commentUri.split("/");
const typeId = commentParts[commentParts.length - 1];
const typeName = commentParts[commentParts.length - 2];


async function getComment() {
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWRlNjFjMzk3YzEwZTA4YTI5M2UyOTgyYmYzNzdmNCIsInN1YiI6IjY0NjFlZDgzZGJiYjQyMDE1MzA2YmQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt5c8JdoJm2dmE-y7Xkt7-8PoRXsZ8qx60YIx5YyJGU'
    }
  };

  try {
    let response = await fetch("https://api.themoviedb.org/3/" + typeName + "/" + typeId + "/reviews", options);
    let comments = await response.json();
    let commentDisplay = document.querySelector("#commentDisplay");

    commentDisplay.innerHTML = "";

    for (let comment of comments.results) {
      
      
      let commentDiv = document.createElement("div");
      commentDiv.classList.add("commentDiv");

      let commentLeftDiv = document.createElement("div");
      commentLeftDiv.classList.add("commentLeftDiv");

      let authorName = document.createElement("p");
      authorName.innerHTML = "<span class='infoName'>By: </span>" + comment.author;
      commentLeftDiv.appendChild(authorName);
      
      let authorRating = document.createElement("p");
      authorRating.innerHTML="<span class='infoName'>Rating: </span>" + comment.author_details.rating;
      commentLeftDiv.appendChild(authorRating);

      commentDiv.appendChild(commentLeftDiv);

      let commentRightDiv = document.createElement("div");
      commentRightDiv.classList.add("commentRightDiv");

      let commentContent = document.createElement("p");
      commentContent.textContent = comment.content;
      commentRightDiv.appendChild(commentContent);

      let dateDiv = document.createElement("div");
      dateDiv.classList.add("dateDiv");

      let createDate = document.createElement("p");
      createDate.innerHTML = "<span class='infoName'>Posted: </span>" + comment.created_at.split("T")[0];
      dateDiv.appendChild(createDate);

      let editDate = document.createElement("p");
      editDate.innerHTML = "<span class='infoName'>Edit: </span>" + comment.updated_at.split("T")[0];
      dateDiv.appendChild(editDate);

      let commentBtn = document.createElement("button");
      commentBtn.id = comment.id;
      commentBtn.classList.add("commentBtn");
      commentBtn.textContent = "Comment";
      dateDiv.appendChild(commentBtn);

      let commentReplyDiv = document.createElement("div");
      let commentSubmit = document.querySelector("#commentSubmit");
      commentRightDiv.appendChild(dateDiv);
      commentDiv.appendChild(commentRightDiv);

      commentDisplay.appendChild(commentDiv);
      commentDisplay.appendChild(commentReplyDiv);

      commentBtn?.addEventListener("click", function (e) {
        e.preventDefault()
        displayReplyInput(commentReplyDiv, commentBtn.id);
      });

      // getReply(typeId, commentDiv, commentBtn);

      commentSubmit?.addEventListener("click", function(e){
        e.preventDefault();
        let commentForm = document.querySelector("#commentForm");
        let data = new FormData(commentForm);

        data.append("comment", "ok");
        fetch("/src/Controller/userController.php", {
          method: "POST",
          body: data,
        })
        .then((response) => {
          return response.text();
        })
        .then((content) => {
          formDisplay.textContent = content;
          
        });
      })
      
    }
  } catch (error) {
    console.error(error);
  }
}

async function displayReplyInput(commentReplyDiv, commentBtn) {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let button = document.createElement('button');

  input.type = 'text';
  button.type = 'submit';
  button.textContent = 'Submit';
  button.value = commentBtn;

  form.appendChild(input);
  form.appendChild(button);
  commentReplyDiv.appendChild(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    let formData = new FormData(form);
    formData.append('comment', 'ok');
    formData.append("type", typeName);
    formData.append("type_id", typeId);
    formData.append('comment_id', commentBtn);
    formData.append("commentText", input.value);

    fetch('/cinetech/comment', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((content) => {
        getComment()
        getReply(commentBtn, commentDiv);
       
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
// async function getReply(typeId, commentDiv, commentBtn) {
  
//   const promise = await fetch('/cinetech/getreplies/' + typeId);

//   const replies = await promise.json();
//   for (let reply of replies.results) {
//     if (reply.type == typeName && reply.comment_id === commentBtn) {
//       let replyContent = document.createElement("p");
//       replyContent.textContent = reply.content;
//       commentDisplay.appendChild(replyContent);
//     }
//   }
//   console.log(replies);
// }


getComment();
// getReply(typeId, commentDiv);

