/*
Dato un array di oggetti letterali con:
url dell’immagine
titolo
descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

const images = [
  {
      image: 'img/01.webp',
      title: 'Marvel\'s Spiderman Miles Morale',
      text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  },
  
  {
      image: 'img/02.webp',
      title: 'Ratchet & Clank: Rift Apart',
      text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  },
  
  {
      image: 'img/03.webp',
      title: 'Fortnite',
      text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  },
  
  {
      image: 'img/04.webp',
      title: 'Stray',
      text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  },
  
  {
      image: 'img/05.webp',
      title: "Marvel's Avengers",
      text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];

// Select the carousel element from the DOM
const carouselElement = document.querySelector(".carousel");
insertMoviesToDom(carouselElement, images);

// Select all the inserted movies from the DOM
const moviesElements = document.querySelectorAll(".single_movie");

// Add the active class to the first movie, to make it the only visible one
let activeMovie = 0;
moviesElements[activeMovie].classList.add("active");

// Select the left and right arrows from the DOM
const leftArrow = document.querySelector(".fa-chevron-left");
const rightArrow = document.querySelector(".fa-chevron-right");

// Listen for click on the left arrow for active movie switch
leftArrow.addEventListener("click", () => {
  activeMovie = switchToNextMovie(moviesElements, activeMovie);
});

// Listen for click on the right arrow for active movie switch
rightArrow.addEventListener("click", () => {
  activeMovie = switchToPreviousMovie(moviesElements, activeMovie)
});

// <---------- FUNCTIONS ---------->

/**
 * Creates the markup for every single movie in the array and prints it to the DOM
 * @param {HTMLElement} carouselContainer The carousel element that will contain the movie image and its infos
 * @param {object[]} moviesArray The array of objects that contains all the movies infos
 */
function insertMoviesToDom(carouselContainer, moviesArray) {
  moviesArray.forEach(movie => {
    carouselContainer.innerHTML += `
    <div class="single_movie">
    <h2 class="movie_title">${movie.title}</h2>
    <img src="./assets/${movie.image}" alt="${movie.title} cover image">
    <h3 class="movie_description">${movie.text}</h3>
    </div>`;
  });
}

/**
 * Takes the current active movie and switches it's active state with the next one
 * @param {HTMLElement[]} moviesIntoDom The list of movies elements inserted into the DOM
 * @param {number} activeMovie The index of the current visible movie
 * @returns {number} The index of the next movie
 */
function switchToNextMovie(moviesIntoDom, activeMovie) {
  moviesIntoDom[activeMovie].classList.remove("active");
  activeMovie == moviesIntoDom.length - 1 ? activeMovie = 0 : activeMovie++;
  moviesIntoDom[activeMovie].classList.add("active");
  return activeMovie;
}

/**
 * Takes the current active movie and switches it's active state with the previous one
 * @param {HTMLElement[]} moviesIntoDom The list of movies elements inserted into the DOM
 * @param {number} activeMovie The index of the current visible movie
 * @returns {number} The index of the previous movie
 */
function switchToPreviousMovie(moviesIntoDom, activeMovie) {
  moviesIntoDom[activeMovie].classList.remove("active");
  activeMovie == 0 ? activeMovie = moviesIntoDom.length - 1 : activeMovie--;
  moviesIntoDom[activeMovie].classList.add("active");
  return activeMovie;
}