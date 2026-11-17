// Exercice 1

// 1 - console.log("Début")
// 2 - console.log("Fin")
// 3- console.log("Asynchrone")

// setTimeout est une fonction asynchrone,
// donc elle permet de faire tourner le reste du code sans bloquer, en attendant qu'elle s'execute.
// le premier et le dernier message s'executent avant et le message asynchone après.


// Exercice 2

/* const afficherAvecDelai = (message, delai) => {
    setTimeout(() => {
        console.log(message)
    }, delai)
}

let msg = "Bonjour, comment vas-tu ?"

afficherAvecDelai(msg, 500)

msg = "Super, et toi ?"

afficherAvecDelai(msg, 1000)

msg = "Oui, très bien"

afficherAvecDelai(msg, 1500) */



// Exercice 3

/* const attendre = (ms) => {
    return new Promise((resolve,) => {
        setTimeout(() => resolve("Terminé"), ms)
    })
}

attendre(1000)
   .then(message => console.log(message)) */


// Exercice 4

const simulerRequete = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random()
      if (n < 0.1) {
        reject(new Error("Serveur injoignable"))
      } else if (n < 0.2) {
        reject(new Error("Délai dépassé"))
      } else {
        resolve("Donnée reçue")
      }
    }, 2000)
  })
}

simulerRequete()
  .then(donnee => console.log(donnee))
  .catch(erreur => console.error(erreur.message))