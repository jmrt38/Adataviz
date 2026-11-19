// Imports

import { formaterDonnee } from "./utils.js"

// Test formaterDonnee

describe("formaterDonnee", () => {
  it("retourne l'objet avec toutes les clés", () => {
    const livre = {
        rang: 565,
        type_de_document: "Livre adulte",
        reservations: 79,
        titre: "Le nouveau",
        auteur: "Higashino, Keigo",
    }
    expect(formaterDonnee(livre))
    .toEqual({
        rang: 565,
        type: "Livre adulte",
        reservations: 79,
        titre: "Le nouveau",
        auteur: "Higashino, Keigo",
    })
  })

  it("remplace les valeurs null par des chaînes vides", () => {
    const livre = {
        rang: 659,
        type_de_document: null,
        reservations: 72,
        titre: "Uncharted",
        auteur: null,
    }
    expect(formaterDonnee(livre))
    .toEqual({
        rang: 659,
        type: "",
        reservations: 72,
        titre: "Uncharted",
        auteur: "",
    })
  })
})