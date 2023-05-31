const favUri = window.location.pathname;
const favParts = commentUri.split("/");
const favTypeId = commentParts[favParts.length - 1];
const favTypeName = commentParts[favParts.length - 2];

let addFavoriteBtn = document.querySelector("#addFavoriteBtn");

async function addFavorite(favTypeId, favTypeName){
    let formData = new FormData();
    formData.append("favorite", 'ok');
    formData.append("typeId", favTypeId);
    formData.append("typeName", favTypeName);

    fetch('/cinetech/favorite', {
        method: 'POST',
        body: formData,
    })
    .then((response) => response.text())
    .then((content) => {
        console.log(content);
       
    })
    .catch((error) => {
        console.error(error);
    });
}
addFavoriteBtn.addEventListener("click", function(e){
    e.preventDefault();
    addFavorite(favTypeId, favTypeName);
})