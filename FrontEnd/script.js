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