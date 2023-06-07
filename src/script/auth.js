const loginDisplayBtn = document.querySelector("#loginDisplayBtn");
const regDisplayBtn = document.querySelector("#regDisplayBtn");
const formDisplay = document.querySelector("#formDisplay");

regDisplayBtn?.addEventListener("click", async()=>{
    let request = await fetch("/cinetech/register");
    let regForm = await request.text();
    formDisplay.innerHTML = "";
    formDisplay.innerHTML = regForm;
    
})

loginDisplayBtn?.addEventListener("click", async()=>{
    let request = await fetch("/cinetech/login");
    let logForm = await request.text();
    formDisplay.innerHTML = "";
    formDisplay.innerHTML = logForm;
})
