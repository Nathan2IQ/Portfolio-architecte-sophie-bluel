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
        console.log(json);

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

//fonction pour generer les boutons de filtres
function generateBtnFilter() {

    //je recup le nav pour integrer les boutons
    const navFilter = document.querySelector(".filter");

    //je crée les boutons
    const tousBtn = document.createElement("button");
    tousBtn.classList.add("filter__btn");
    tousBtn.textContent = "Tous";
    //je leur ajoute un event pour filtrer les travaux
    tousBtn.addEventListener("click", () => {
        const works = document.querySelectorAll(".gallery figure");
        works.forEach(work => {
            work.style.display = "block";
        });
    });

    const objetBtn = document.createElement("button");
    objetBtn.classList.add("filter__btn");
    objetBtn.textContent = "Objets";
    objetBtn.addEventListener("click", () => {
        const works = document.querySelectorAll(".gallery figure");
        works.forEach(work => {
            if(work.dataset.category != 1) {
                work.style.display = "none";
            } else {
                work.style.display = "block";
            }
        });
    });

    const appartementBtn = document.createElement("button");
    appartementBtn.classList.add("filter__btn");
    appartementBtn.textContent = "Appartements";
    appartementBtn.addEventListener("click", () => {
        const works = document.querySelectorAll(".gallery figure");
        works.forEach(work => {
            if(work.dataset.category != 2) {
                work.style.display = "none";
            } else {
                work.style.display = "block";
            }
        });
    });

    const hotelBtn = document.createElement("button");
    hotelBtn.classList.add("filter__btn");
    hotelBtn.textContent = "Hotels & Restaurants";
    hotelBtn.addEventListener("click", () => {
        const works = document.querySelectorAll(".gallery figure");
        works.forEach(work => {
            if(work.dataset.category != 3) {
                work.style.display = "none";
            } else {
                work.style.display = "block";
            }
        });
    });

    //je les integre dans le nav
    navFilter.appendChild(tousBtn);
    tousBtn.focus();
    navFilter.appendChild(objetBtn);
    navFilter.appendChild(appartementBtn);
    navFilter.appendChild(hotelBtn);
}

//je lance la fonction
generateBtnFilter();
