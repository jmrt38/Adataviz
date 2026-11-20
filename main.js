import { formaterDonnee } from "./utils.js";

const url = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records";
const conteneurCartes = document.querySelector(".conteneur-cartes");
const selectType = document.querySelector("#type-document");
const inputRecherche = document.querySelector("#recherche");
const selectTri = document.querySelector("#tri");

const ELEMENTS_PAR_PAGE = 20;
let pageActuelle = 1;
let derniersTitresAffiches = [];

// 1. Déclaration des fonctions
const recupererTitres = async () => {
    const tousLesTitres = [];

    for (let offset = 0; offset < 1000; offset += 100) {
        const urlComplete = `${url}?order_by=reservations%20DESC&limit=100&offset=${offset}`;

        const toutesLesReponses = await fetch(urlComplete);

        if (!toutesLesReponses.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${toutesLesReponses.status}`);
        }

        const donnees = await toutesLesReponses.json();
        tousLesTitres.push(...donnees.results);
    }
    tousLesTitres.sort((a, b) => a.rang - b.rang);
    return tousLesTitres;
};

const tableauExploitable = (liste) => {
    return liste.map(element => formaterDonnee(element));
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

    const triSelectionne = selectTri.value;
    const titresTries = [...titresFiltres];

    if (triSelectionne === "reservations-croissant") {
        titresTries.sort((a, b) => a.reservations - b.reservations);
    }
    else if (triSelectionne === "reservations-decroissant") {
        titresTries.sort((a, b) => b.reservations - a.reservations);
    }
    else if (triSelectionne === "titre-croissant") {
        titresTries.sort((a, b) => a.titre.localeCompare(b.titre, "fr"));
    }
    else if (triSelectionne === "titre-decroissant") {
        titresTries.sort((a, b) => b.titre.localeCompare(a.titre, "fr"));
    }

    pageActuelle = 1;
    afficherTitres(titresTries);
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

const formaterAuteur = (auteur) => {
    const parties = auteur.split(", ");

    if (parties.length !== 2) {
        return auteur;
    }

    return `${parties[1]} ${parties[0]}`;
};

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
        auteurArticle.textContent = formaterAuteur(element.auteur);
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

const paginerTitres = (liste, page = 1) => {
    const indexDebut = (page - 1) * ELEMENTS_PAR_PAGE;
    const indexFin = indexDebut + ELEMENTS_PAR_PAGE;
    return liste.slice(indexDebut, indexFin);
};

const afficherPagination = (totalElements) => {
    let conteneurPagination = document.querySelector(".pagination");

    if (!conteneurPagination) {
        conteneurPagination = document.createElement("nav");
        conteneurPagination.classList.add("pagination");
        conteneurCartes.insertAdjacentElement("afterend", conteneurPagination);
    }

    conteneurPagination.innerHTML = "";

    const nombrePages = Math.ceil(totalElements / ELEMENTS_PAR_PAGE);
    if (nombrePages <= 1) {
        return;
    }

    const ajouterBoutonPage = (numeroPage) => {
        const boutonPage = document.createElement("button");
        boutonPage.type = "button";
        boutonPage.classList.add("pagination-btn", "pagination-numero");
        boutonPage.textContent = numeroPage;

        if (numeroPage === pageActuelle) {
            boutonPage.classList.add("active");
            boutonPage.setAttribute("aria-current", "page");
        }

        boutonPage.addEventListener("click", () => {
            pageActuelle = numeroPage;
            afficherTitres(derniersTitresAffiches);
            conteneurCartes.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        conteneurPagination.appendChild(boutonPage);
    };

    const ajouterEllipses = () => {
        const points = document.createElement("span");
        points.classList.add("pagination-ellipsis");
        points.textContent = "...";
        points.setAttribute("aria-hidden", "true");
        conteneurPagination.appendChild(points);
    };

    const boutonPrecedent = document.createElement("button");
    boutonPrecedent.type = "button";
    boutonPrecedent.classList.add("pagination-btn", "pagination-precedent");
    boutonPrecedent.textContent = "Précédent";
    boutonPrecedent.disabled = pageActuelle === 1;
    boutonPrecedent.addEventListener("click", () => {
        if (pageActuelle > 1) {
            pageActuelle -= 1;
            afficherTitres(derniersTitresAffiches);
            conteneurCartes.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
    conteneurPagination.appendChild(boutonPrecedent);

    const delta = 2; // Nombre de pages affichées de chaque côté de la page actuelle
    const debutFenetre = Math.max(2, pageActuelle - delta);
    const finFenetre = Math.min(nombrePages - 1, pageActuelle + delta);

    // Toujours afficher la première page
    ajouterBoutonPage(1);

    // Ellipses avant la fenêtre si nécessaire
    if (debutFenetre > 2) {
        ajouterEllipses();
    }

    // Pages autour de la page actuelle
    for (let numeroPage = debutFenetre; numeroPage <= finFenetre; numeroPage++) {
        ajouterBoutonPage(numeroPage);
    }

    // Ellipses après la fenêtre si nécessaire
    if (finFenetre < nombrePages - 1) {
        ajouterEllipses();
    }

    // Toujours afficher la dernière page (si plus d'une page)
    if (nombrePages > 1) {
        ajouterBoutonPage(nombrePages);
    }

    const boutonSuivant = document.createElement("button");
    boutonSuivant.type = "button";
    boutonSuivant.classList.add("pagination-btn", "pagination-suivant");
    boutonSuivant.textContent = "Suivant";
    boutonSuivant.disabled = pageActuelle === nombrePages;
    boutonSuivant.addEventListener("click", () => {
        if (pageActuelle < nombrePages) {
            pageActuelle += 1;
            afficherTitres(derniersTitresAffiches);
            conteneurCartes.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
    conteneurPagination.appendChild(boutonSuivant);
};

const afficherTitres = (liste) => {
    derniersTitresAffiches = liste;
    const nombrePages = Math.max(1, Math.ceil(liste.length / ELEMENTS_PAR_PAGE));

    if (pageActuelle > nombrePages) {
        pageActuelle = nombrePages;
    }

    const elementsPage = paginerTitres(liste, pageActuelle);
    conteneurCartes.innerHTML = "";
    elementsPage.forEach(creerCarte);
    afficherPagination(liste.length);
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
    selectTri.addEventListener("change", appliquerFiltres);

    afficherTitres(titresFormates)
} catch (erreur) {
    console.error("Oups, un problème est survenu :", erreur.message);
}