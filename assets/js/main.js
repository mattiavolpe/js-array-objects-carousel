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

// Select the thumbnail container element from the DOM
const thumbnailsContainer = document.querySelector(".thumbnails");
insertThumbnailsToDom(thumbnailsContainer, images);

// Select all the inserted movies from the DOM
const moviesElements = document.querySelectorAll(".single_movie");

// Select the thumbnails from the DOM
const thumbnailsElements = document.querySelectorAll(".single_thumbnail");

// Add the active class to the first movie, to make it the only visible one
let activeMovie = 0;
moviesElements[activeMovie].classList.add("active");
thumbnailsElements[activeMovie].classList.add("active");

// Select the left and right arrows from the DOM
const leftArrow = document.querySelector(".fa-chevron-left");
const rightArrow = document.querySelector(".fa-chevron-right");

// Select the play/pause button and the reverse button from the DOM
const playButton = document.querySelector(".fa-play");
const reverseButton = document.querySelector(".fa-arrow-rotate-left");

// Initialize a variable that will contain the timeout ID
let autoplay;
// Initialize a variable that will contain the direction of the autoplay
let direction = "forward";

// Listen for click on autoplay button and start/stop the autoplay based on the direction
playButton.addEventListener("click", () => {
  if (playButton.classList.contains("fa-play")) {
    autoplay = setInterval(() => {
      direction == "forward" ? rightArrow.click() : leftArrow.click();
    }, 3000);
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  } else {
    clearInterval(autoplay);
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  }
});

// Listen for click on reverse button to change the direction of the autoplay
reverseButton.addEventListener("click", () => {
  if (direction == "forward") {
    direction = "backward";
    reverseButton.classList.remove("fa-arrow-rotate-left");
    reverseButton.classList.add("fa-arrow-rotate-right");
  } else {
    direction = "forward";
    reverseButton.classList.remove("fa-arrow-rotate-right");
    reverseButton.classList.add("fa-arrow-rotate-left");
  }
});

// Listen for click on the left arrow for active movie switch
leftArrow.addEventListener("click", () => activeMovie = switchToPreviousMovie(moviesElements, thumbnailsElements, activeMovie));

// Listen for click on the right arrow for active movie switch
rightArrow.addEventListener("click", () => activeMovie = switchToNextMovie(moviesElements, thumbnailsElements, activeMovie));

// Listen for click on a thumbnail so set the relative movie as active
thumbnailsElements.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    activeMovie = setActiveMovieByThumbnail(moviesElements, thumbnailsElements, activeMovie, index);
  });
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
 * Creates the markup for the thumbnail of every single movie in the array and prints it to the DOM
 * @param {HTMLElement} thumbnailsContainer The thumbnails element that will contain the movie thumbnails
 * @param {object[]} moviesArray The array of objects that contains all the movies infos
 */
function insertThumbnailsToDom(thumbnailsContainer, moviesArray) {
  moviesArray.forEach(movie => {
    thumbnailsContainer.innerHTML += `
    <div class="single_thumbnail">
    <img src="./assets/${movie.image}" alt="${movie.title} cover image">
    </div>`;
  });
}

/**
 * Takes the current active movie and switches it's active state with the next one
 * @param {HTMLElement[]} moviesIntoDom The list of movies elements inserted into the DOM
 * @param {HTMLElement[]} thumbnailsIntoDom The list of thumbnails elements inserted into the DOM
 * @param {number} activeMovie The index of the current visible movie
 * @returns {number} The index of the next movie
 */
function switchToNextMovie(moviesIntoDom, thumbnailsIntoDom, activeMovie) {
  moviesIntoDom[activeMovie].classList.remove("active");
  thumbnailsIntoDom[activeMovie].classList.remove("active");
  activeMovie == moviesIntoDom.length - 1 ? activeMovie = 0 : activeMovie++;
  moviesIntoDom[activeMovie].classList.add("active");
  thumbnailsIntoDom[activeMovie].classList.add("active");
  return activeMovie;
}

/**
 * Takes the current active movie and switches it's active state with the previous one
 * @param {HTMLElement[]} moviesIntoDom The list of movies elements inserted into the DOM
 * @param {HTMLElement[]} thumbnailsIntoDom The list of thumbnails elements inserted into the DOM
 * @param {number} activeMovie The index of the current visible movie
 * @returns {number} The index of the previous movie
 */
function switchToPreviousMovie(moviesIntoDom, thumbnailsIntoDom, activeMovie) {
  moviesIntoDom[activeMovie].classList.remove("active");
  thumbnailsIntoDom[activeMovie].classList.remove("active");
  activeMovie == 0 ? activeMovie = moviesIntoDom.length - 1 : activeMovie--;
  moviesIntoDom[activeMovie].classList.add("active");
  thumbnailsIntoDom[activeMovie].classList.add("active");
  return activeMovie;
}

/**
 * Takes the current active movie and switches it's active state with the one relative to the thumbnail that received the click event
 * @param {HTMLElement[]} moviesIntoDom The list of movies elements inserted into the DOM
 * @param {HTMLElement[]} thumbnailsIntoDom The list of thumbnails elements inserted into the DOM
 * @param {number} activeMovie The index of the current visible movie
 * @param {number} index The index of the thumbnail that received the click event
 * @returns {number} The index of the previous movie
 */
function setActiveMovieByThumbnail(moviesIntoDom, thumbnailsIntoDom, activeMovie, index) {
  moviesIntoDom[activeMovie].classList.remove("active");
  thumbnailsIntoDom[activeMovie].classList.remove("active");
  activeMovie = index;
  moviesIntoDom[activeMovie].classList.add("active");
  thumbnailsIntoDom[activeMovie].classList.add("active");
  return activeMovie;
}