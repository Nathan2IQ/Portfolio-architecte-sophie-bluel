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

//
// Fonction pour supprimer un projet
//
// Attacher un gestionnaire d'événements au parent
document.querySelector(".modal__works").addEventListener("click", async (e) => {
    // Vérifier si l'élément cliqué est une icône de suppression
    if (e.target.classList.contains("modal__works__delete")) {
        const workElement = e.target.closest("figure");
        const workId = workElement.dataset.id;

        const token = localStorage.getItem("token");

        try {
            // Appeler l'API pour supprimer l'élément
            const url = `http://localhost:5678/api/works/${workId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete the work");
            }

            // Supprimer l'élément du DOM
            workElement.remove();

            // Supprimer l'élément correspondant dans la galerie principale
            const galleryElement = document.querySelector(`.gallery figure[data-id="${workId}"]`);
            if (galleryElement) {
                galleryElement.remove();
            }

        } catch (error) {
            console.error(error.message);
        }
    }
});

document.querySelector(".modal__add__btn").addEventListener("click", (e) => {
    e.preventDefault();
    const modalAdd = document.getElementById("modal__add");
    modalAdd.classList.remove("display__none");
    modalAdd.classList.add("modal__container");
    const modalWorks = document.getElementById("modal__works");
    modalWorks.classList.add("display__none");
    modalWorks.classList.remove("modal__container");
});

const modalBackBtn = document.querySelector(".backBtn");
modalBackBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const modalAdd = document.getElementById("modal__add");
    modalAdd.classList.add("display__none");
    modalAdd.classList.remove("modal__container");
    const modalWorks = document.getElementById("modal__works");
    modalWorks.classList.remove("display__none");
    modalWorks.classList.add("modal__container");
});

const closeModalBtn = document.querySelector(".closerAddModal");
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

//
// Fonction pour ajouter un projet
//

//je recup les categories pour les afficher dans le select
async function getCategoryAdd() {
    const url = "http://localhost:5678/api/categories";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Cannot reach data");
        }

        const json = await response.json();
        const select = document.getElementById("category");

        json.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        })
    } catch (error) {
        console.error(error.message);
    }
}

getCategoryAdd();

// ce code est pour la prévisualisation de l'image avant de l'envoyer
document.getElementById("image").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const previewContainer = document.querySelector(".image__selector");

    const existingPreview = previewContainer.querySelector("img");
    if (existingPreview) {
        previewContainer.remove();
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.style.maxWidth = "100%";
            img.style.maxHeight = "100%";
            previewContainer.appendChild(img);

            document.getElementById("addImage").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

// Cette fonction est appelée lorsque le formulaire d'ajout de projet est soumis
import { generateWorks } from "./script.js";

document.getElementById("formAdd").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to add the work: ${response.status}`);
        }

        // Réinitialiser le formulaire
        form.reset();

        // Fermer la modale
        const modal = document.querySelector(".modal");
        modal.style.display = "none";

        // Mettre à jour la galerie principale et la modale
        document.querySelector(".gallery").innerHTML = ""; // Vider la galerie
        await generateWorks(); // Générer à nouveau les travaux
        document.querySelector(".modal__works").innerHTML = ""; // Vider la modale
        await generateModalWorks(); // Générer à nouveau les travaux dans la modale

    } catch (error) {
        console.error(error.message);
    }
});