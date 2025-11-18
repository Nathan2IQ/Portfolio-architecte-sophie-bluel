// Fonction pour récupérer les données de l'API et générer la galerie de projets
export async function generatePortfolio() {
  try {
    // Récupère les données de l'API
    const response = await fetch("http://localhost:5678/api/works");

    // Vérifie si la réponse est valide
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convertit la réponse en JSON
    const data = await response.json();

    // Sélectionne l'élément contenant la galerie
    const divPortfolio = document.querySelector(".gallery");

    // Parcourt les travaux et les ajoute à la galerie
    data.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const caption = document.createElement("figcaption");

      figure.dataset.id = work.id; // Ajoute l'ID du travail
      figure.dataset.category = work.category.id; // Ajoute l'ID de la catégorie
      img.src = work.imageUrl; // Définit l'URL de l'image
      img.alt = work.title; // Définit le texte alternatif
      caption.textContent = work.title; // Ajoute le titre

      figure.appendChild(img);
      figure.appendChild(caption);
      divPortfolio.appendChild(figure);
    });
  } catch (error) {
    // Gère les erreurs
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Génère la galerie au chargement de la page
generatePortfolio();

// Fonction pour afficher les filtres
async function generateFilters() {
  try {
    // Récupère les données de l'API
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Parcourt les catégories pour créer les boutons de filtre
    data.forEach((category) => {
      const navFilter = document.querySelector(".filter"); // Sélectionne le conteneur des filtres
      const button = document.createElement("button"); // Crée un bouton
      button.classList.add("filter__btn"); // Ajoute une classe CSS
      button.textContent = category.name; // Définit le texte du bouton
      button.dataset.id = category.id; // Ajoute l'ID de la catégorie
      button.type = "button"; // Définit le type du bouton

      // Ajoute un événement pour filtrer les travaux
      button.addEventListener("click", () => {
        const figures = document.querySelectorAll(".gallery figure"); // Sélectionne toutes les figures
        figures.forEach((figure) => {
          if (figure.dataset.category != category.id) {
            figure.style.display = "none"; // Cache les figures non correspondantes
          } else {
            figure.style.display = "block"; // Affiche les figures correspondantes
          }
        });
      });

      navFilter.appendChild(button); // Ajoute le bouton au conteneur
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Génère un bouton pour afficher tous les projets
const navFilter = document.querySelector(".filter");
const allButton = document.createElement("button");
allButton.classList.add("filter__btn");
allButton.textContent = "Tous";
allButton.type = "button";

allButton.addEventListener("click", () => {
  const figures = document.querySelectorAll(".gallery figure");
  figures.forEach((figure) => {
    figure.style.display = "block";
  });
});

navFilter.appendChild(allButton);

generateFilters();
