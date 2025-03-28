//
// Fonction pour récupérer et generer les travaux dans la modale
//
async function generateModalWorks() {

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
        const divModal = document.querySelector(".modal__works");

        const workElement = document.createElement("figure");
        workElement.dataset.id = work.id;
        workElement.dataset.category = work.categoryId;

        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;

        const workDelete = document.createElement("i");
        workDelete.className = "fa-solid fa-trash-can";
        workDelete.classList.add("modal__works__delete");

        divModal.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(workDelete);
    });

    //si il y a une erreur, je l'affiche
    } catch(error) {
        console.error(error.message);
    }
}

// je lance la fonction
generateModalWorks();


//
//  Fonction pour ouvrir et fermer la modale
//
const toggleModal = () => {
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".closer");

    // Ouvrir la modale
    document.querySelectorAll(".modal__opener").forEach(opener => {
        opener.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    });

    // Fermer la modale
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fermer la modale en cliquant à l'extérieur de celle-ci
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Fermer la modale avec la touche "Echap"
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Esc") {
            e.preventDefault();
            modal.style.display = "none";
        }
    });
};

toggleModal();