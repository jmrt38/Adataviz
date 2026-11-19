import { formaterDonnee } from "./utils.js";

const url = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records?order_by=reservations%20DESC&limit=100";
const conteneurCartes = document.querySelector(".conteneur-cartes");
const selectType = document.querySelector("#type-document");
const inputRecherche = document.querySelector("#recherche");
const selectTri = document.querySelector("#tri");

// 1. Déclaration des fonctions
const recupererTitres = async () => {
    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${reponse.status}`);
    }

    return await reponse.json();
};

const tableauExploitable = (liste) => {
    return liste.results.map(element => formaterDonnee(element));
};

const appliquerFiltres = () => {
    const typeSelectionne = selectType.value;
    const recherche = inputRecherche.value.toLowerCase();

    const titresFiltres = titresFormates.filter((element) => {
        const titre = element.titre.toLowerCase();
        const auteur = element.auteur.toLowerCase();

        const correspondRecherche =
            recherche === "" ||
            titre.includes(recherche) ||
            auteur.includes(recherche);

        const correspondType =
            typeSelectionne === "" ||
            element.type === typeSelectionne ||
            (typeSelectionne === "__sans_type__" && element.type === "");

        return correspondRecherche && correspondType;
    });

    afficherTitres(titresFiltres);
};

const determinerImage = (type, article) => {

    if (type.toLowerCase().includes("dvd")) {
        const imgDVD = document.createElement("img")
        imgDVD.classList.add("image-carte")
        imgDVD.src = "./images/dvd.png"
        imgDVD.alt = "Logo d'un document de type DVD"
        article.appendChild(imgDVD)

    } else if (type.toLowerCase().includes("bande dessinée")) {
        const imgBD = document.createElement("img")
        imgBD.classList.add("image-carte")
        imgBD.src = "./images/BD.png"
        imgBD.alt = "Logo d'un document de type bande dessinée"
        article.appendChild(imgBD)

    } else if (type.toLowerCase().includes("nouveauté")) {
        const imgNouveaute = document.createElement("img")
        imgNouveaute.classList.add("image-carte")    
        imgNouveaute.src = "./images/nouveauté.png"
        imgNouveaute.alt = "Logo d'une forme avec NEW inscrit à l'intérieur"
        article.appendChild(imgNouveaute)
    
    } else {
        const imgLivre = document.createElement("img")
        imgLivre.classList.add("image-carte")
        imgLivre.src = "./images/livre.png"
        imgLivre.alt = "Logo d'un document de type livre"
        article.appendChild(imgLivre)
    }
}

const creerCarte = (element) => {
    const article = document.createElement("article");
    article.classList.add("carte");

    const bioArticle = document.createElement("div")
    bioArticle.classList.add("présentation-titre")

    const type = element.type;
    determinerImage(type, article);

    const rangArticle = document.createElement("span");
    rangArticle.classList.add("rang");
    rangArticle.textContent = element.rang;
    article.appendChild(rangArticle)

    const titreArticle = document.createElement("h3");
    titreArticle.textContent = element.titre;
    bioArticle.appendChild(titreArticle);

    if (element.auteur) {
        const auteurArticle = document.createElement("p");
        auteurArticle.textContent = element.auteur;
        bioArticle.appendChild(auteurArticle);
    }

    if (element.type) {
        const typeArticle = document.createElement("span");
        typeArticle.classList.add("type-article");
        typeArticle.textContent = element.type;
        bioArticle.appendChild(typeArticle);
    }

    if (element.reservations > 0) {
        const reservationsArticle = document.createElement("p");
        reservationsArticle.textContent = `${element.reservations} réservations`;
        bioArticle.appendChild(reservationsArticle);
    }

    article.appendChild(bioArticle)
    conteneurCartes.appendChild(article);
};

const afficherTitres = (liste) => {
    conteneurCartes.innerHTML = "";
    liste.forEach(creerCarte);
};

// 2. Exécution principale

let titresFormates = [];

try {
    if (!conteneurCartes) {
        throw new Error("Élément .conteneur-cartes introuvable dans le DOM");
    }
    if (!selectType) {
    throw new Error("Élément #type-document introuvable dans le DOM");
    }
    if (!inputRecherche) {
    throw new Error("Élément #recherche introuvable dans le DOM");
    }

    const titres = await recupererTitres();
    titresFormates = tableauExploitable(titres);

    selectType.addEventListener("change", appliquerFiltres);
    inputRecherche.addEventListener("input", appliquerFiltres);

    afficherTitres(titresFormates)
} catch (erreur) {
    console.error("Oups, un problème est survenu :", erreur.message);
}