//
// Fonction pour récupérer et generer les travaux
//
async function generateWorks() {

    //je recup l'url de l'api
    const url = "http://localhost:5678/api/works";

    //je recup ses données
    try {
        const response = await fetch(url);

        //si la reponse n'est pas ok, je renvoie une erreur
        if(!response.ok) {
            throw new Error("Cannot reach data");
        }

        //je recup les données en json
        const json = await response.json();

    //je parcours les données pour les afficher et crée les elements
    json.forEach(work => {
        const divPortfolio = document.querySelector(".gallery");

        const workElement = document.createElement("figure");
        workElement.dataset.id = work.id;
        workElement.dataset.category = work.categoryId;

        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;

        const workTitle = document.createElement("figcaption");
        workTitle.textContent = work.title;

        divPortfolio.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(workTitle);
    });

    //si il y a une erreur, je l'affiche
    } catch(error) {
        console.error(error.message);
    }
}

//je lance la fonction
generateWorks();



//
// je fais une fonction pour generer les boutons de filtres
//
async function generateBtnFilter() {

    const url = "http://localhost:5678/api/categories";

    //je recup les données de l'api pour les category
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Cannot reach data");
        }
        const json = await response.json();
    
        //je crée les boutons de filtres
        json.forEach(category => {
            const navFilter = document.querySelector(".filter");
            const categoryBtn = document.createElement("button");
            categoryBtn.classList.add("filter__btn");
            categoryBtn.textContent = category.name;
            categoryBtn.dataset.id = category.id;
            categoryBtn.addEventListener("click", () => {
                const works = document.querySelectorAll(".gallery figure");
                works.forEach(work => {
                    if(work.dataset.category != category.id) {
                        work.classList.add("display__none");
                    } else {
                        work.classList.remove("display__none");
                    }
                });
            });
            navFilter.appendChild(categoryBtn);
        });
    
    //si il y a une erreur, je l'affiche
    } catch(error) {
        console.error(error.message);
    }
}

//je crée un bouton pour afficher tous les travaux
const navFilter = document.querySelector(".filter");
const tousBtn = document.createElement("button");
tousBtn.classList.add("filter__btn");
tousBtn.textContent = "Tous";
tousBtn.addEventListener("click", () => {
    const works = document.querySelectorAll(".gallery figure");
    works.forEach(work => {
        work.classList.remove("display__none");
    });
});
navFilter.appendChild(tousBtn);

//je lance la fonction
generateBtnFilter();

//
// je fais une fonction pour le login et verifier les infos
//
function loginAuthentification() {
    const loginForm = document.querySelector(".login__form");
    
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const url = "http://localhost:5678/api/users/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            })
            if(!response.ok) {
                throw new Error("Cannot reach data");
            }

            const json = await response.json();
            const token = json.token;
            console.log(token);

            localStorage.setItem("token", token);

            window.location.href = "index.html";

        } catch (error) {
            console.error(error.message);
        }
    });
}

loginAuthentification();