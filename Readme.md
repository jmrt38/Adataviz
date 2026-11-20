# 📚 BiblioScope

**Explorez le classement des 1 000 titres les plus réservés dans les bibliothèques de prêt de Paris.**

BiblioScope est une application web qui exploite les données ouvertes de la Ville de Paris pour présenter un classement des œuvres les plus populaires dans les bibliothèques parisiennes.

L'objectif est de rendre ces données plus accessibles et agréables à consulter grâce à une interface visuelle, des filtres interactifs et un système de pagination.

## 🖥️ Aperçu du projet

BiblioScope propose une présentation sous forme de cartes individuelles permettant de consulter rapidement les informations principales de chaque œuvre :

- Rang dans le classement.
- Titre de l'œuvre.
- Auteur.
- Type de document.
- Nombre de réservations.

## ✨ Fonctionnalités

### Consultation des données
- Récupération des 1 000 titres depuis l'API Open Data de Paris.
- Chargement des données par lots de 100 éléments.
- Affichage des œuvres sous forme de cartes.
- Identification visuelle des différents types de documents.

### Recherche et filtrage
- Recherche par titre ou par auteur.
- Filtrage par type de document.
- Possibilité d'afficher les documents dont le type n'est pas renseigné.

### Tri des résultats
- Nombre de réservations croissant.
- Nombre de réservations décroissant.
- Ordre alphabétique des titres (A-Z).
- Ordre alphabétique inversé (Z-A).

### Pagination
- Affichage de 20 œuvres par page.
- Navigation avec les boutons précédent et suivant.
- Accès direct à une page grâce aux numéros.
- Pagination compacte avec points de suspension.
- Réinitialisation automatique à la première page lors d'un changement de filtre ou de recherche.

### Interface
- Design responsive adapté aux différentes tailles d'écran.
- Cartes interactives avec effets au survol.
- Interface épurée et navigation intuitive.

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de la page |
| CSS3 | Mise en forme et responsive design |
| JavaScript (ES6+) | Logique applicative et manipulation du DOM |
| Fetch API | Récupération des données distantes |
| API Open Data Paris | Source des données |

**Aucune bibliothèque ou framework JavaScript n'est utilisé.** Le projet repose sur du JavaScript natif.

## 📡 Source des données

Les données proviennent du portail Open Data de la Ville de Paris.

**Jeu de données :** Les 1 000 titres les plus réservés dans les bibliothèques de prêt.

**Année du classement :** 2022.

Les données sont récupérées dynamiquement depuis l'API Explore de Paris Data.

## 🚀 Installation et lancement

1. Cloner le dépôt GitHub :

```bash
git clone URL_DU_DEPOT
```

2. Ouvrir le dossier du projet dans Visual Studio Code.

3. Lancer le projet avec un serveur local, par exemple avec l'extension Live Server.

4. Ouvrir l'application dans un navigateur.

> Le projet utilise des modules JavaScript ES6 et des requêtes Fetch. Il doit donc être lancé depuis un serveur local plutôt que directement en ouvrant le fichier HTML.

## 📁 Structure du projet

```text
adataviz/
│
├── index.html
├── style.css
├── main.js
├── utils.js
│
└── images/
    ├── book-icon.png
    ├── livre.png
    ├── BD.png
    ├── dvd.png
    └── nouveauté.png
```

## 🎯 Objectif pédagogique

Ce projet a été réalisé dans le cadre de ma formation en développement web à Ada Tech School.

Il m'a permis de mettre en pratique plusieurs notions fondamentales du développement front-end :

- Manipulation du DOM.
- Utilisation des tableaux et de leurs méthodes (`map`, `filter`, `sort`, `slice`).
- Programmation asynchrone avec `async/await`.
- Récupération et exploitation de données via une API.
- Organisation du code en modules JavaScript.
- Gestion des événements utilisateur.
- Création d'une interface responsive en CSS.
- Gestion de fonctionnalités interactives combinées : recherche, filtres, tri et pagination.

---

**Projet réalisé dans le cadre de la formation Ada Tech School.**