const favUri = window.location.pathname;
const favParts = favUri.split("/");
const favTypeId = favParts[favParts.length - 1];
const favTypeName = favParts[favParts.length - 2];

let addFavoriteBtn = document.querySelector("#addFavoriteBtn");

async function addFavorite(favTypeId, favTypeName) {
  let formData = new FormData();
  formData.append("favorite", 'ok');
  formData.append("typeId", favTypeId);
  formData.append("typeName", favTypeName);

  addFavoriteBtn.disabled = true;

  fetch('/cinetech/favorite', {
      method: 'POST',
      body: formData,
  })
  .then((response) => response.text())
  .then((content) => {
      console.log(content);
      addFavoriteBtn.textContent = "Added";
  })
  .catch((error) => {
      console.error(error);
      addFavoriteBtn.disabled = false;
  });
}

addFavoriteBtn?.addEventListener("click", function(e) {
  e.preventDefault();
  addFavorite(favTypeId, favTypeName);
});
