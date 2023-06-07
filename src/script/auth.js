const regDisplayBtn = document.querySelector("#regDisplayBtn");
const logDisplayBtn = document.querySelector("#logDisplayBtn");

regDisplayBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const request = await fetch("/cinetech/register");
  const regForm = await request.text();
  formDisplay.innerHTML = "";
  formDisplay.innerHTML = regForm;

  const form = formDisplay.querySelector(".regForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });
      if (response.ok) {
       const message = await response.text();
       const regMsg = document.querySelector("#regMsg")
       regMsg.innerHTML = message;

       if(message == "Succesfully Submit"){
           setTimeout(()=>{
                window.location.href = "/cinetech";
           }, "1000");
       }
      }
    } catch (error) {
      console.log("Une erreur s'est produite :", error);
    }
  });
});

logDisplayBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const request = await fetch("/cinetech/login");
  const logForm = await request.text();
  formDisplay.innerHTML = "";
  formDisplay.innerHTML = logForm;

  const form = formDisplay.querySelector(".logForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        const message = await response.text();
        const logMsg = document.querySelector("#logMsg")
        logMsg.innerHTML = message;
        
        if(message == "Welcome"){
            window.location.href = "/cinetech";
        }
        
      } else {
        console.log("Erreur lors de la connexion.");
      }
    } catch (error) {
      console.log("Une erreur s'est produite :", error);
    }
  });
});

