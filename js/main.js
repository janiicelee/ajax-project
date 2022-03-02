/* global data */
var $susuwatari = document.querySelector('#susuwatari');
var $frontPage = document.querySelector('.front-page');
var $listPage = document.querySelector('#list-page');
var $infoPage = document.querySelector('#info-page');

// click the susuwatari to start
function clickSuswatari(event) {
  $frontPage.className = 'front-page hidden';
  $listPage.className = '';
}
$susuwatari.addEventListener('click', clickSuswatari);

// show movie list on list page
var $movielist = document.querySelector('#movie-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  // console.log(xhr.status);
  // console.log(xhr.response);
  data.films = xhr.response;

  for (var i = 0; i < data.films.length; i++) {
    var $imgElement = document.createElement('img');
    $movielist.appendChild($imgElement);
    $imgElement.setAttribute('src', xhr.response[i].image);
    $imgElement.setAttribute('data-movie-index', i);
    $imgElement.setAttribute('id', 'movie-poster');

    $movielist.addEventListener('click', handlePosterClick);
  }
});

xhr.send();

var $movieinfo = document.querySelector('#movie-info');

function handlePosterClick(event) {

  if (event.target.tagName === 'IMG') {
    $movielist.className = 'hidden';
    $infoPage.className = '';
    var id = event.target.getAttribute('data-movie-index');
    var movieInfoDOMTree = createMovieInfo(data.films[id]);
    $movieinfo.appendChild(movieInfoDOMTree);
  }
}

// remove childNodes for the detail page
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// create info page for each movie
function createMovieInfo(movie) {

  var $movieInfoContainer = document.createElement('div');
  var titleElement = document.createElement('h2');
  titleElement.textContent = movie.title + ' ' + movie.original_title;
  $movieInfoContainer.appendChild(titleElement);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', movie.movie_banner);
  imgElement.setAttribute('id', 'movie-banner');
  $movieInfoContainer.appendChild(imgElement);

  var pElement = document.createElement('p');
  pElement.textContent = movie.description;
  $movieInfoContainer.appendChild(pElement);

  var infobox = document.createElement('div');
  infobox.setAttribute('class', 'info-box');
  $movieInfoContainer.appendChild(infobox);

  var ulElement = document.createElement('ul');
  infobox.appendChild(ulElement);

  var liElement1 = document.createElement('li');
  liElement1.textContent = 'Director: ' + movie.director;
  ulElement.appendChild(liElement1);

  var liElement2 = document.createElement('li');
  liElement2.textContent = 'Producer: ' + movie.producer;
  ulElement.appendChild(liElement2);

  var liElement3 = document.createElement('li');
  liElement3.textContent = 'Release Year: ' + movie.release_date;
  ulElement.appendChild(liElement3);

  var liElement4 = document.createElement('li');
  liElement4.textContent = 'Running Time: ' + movie.running_time + ' min';
  ulElement.appendChild(liElement4);

  return $movieInfoContainer;
}

// click event for the 'go back' button in the info page.
var $goBackButton = document.querySelector('#go-back');
$goBackButton.addEventListener('click', goBackToList);

function goBackToList(event) {
  $infoPage.className = 'hidden';
  $movielist.className = '';

  if (event.target) {
    removeChildNodes($movieinfo);
  }
}
