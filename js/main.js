/* global data */
var $susuwatari = document.querySelector('#susuwatari');
var $frontPage = document.querySelector('.front-page');
var $listPage = document.querySelector('#list-page');
var $infoPage = document.querySelector('#info-page');
var $reviewPage = document.querySelector('#review-page');

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
    $addReviewButton.addEventListener('click', handleReviewButton);
  }
});

xhr.send();

var $movieinfo = document.querySelector('#movie-info');

function handlePosterClick(event) {

  if (event.target.tagName === 'IMG') {
    $movielist.className = 'hidden';
    $infoPage.className = '';
    $reviewPage.className = 'hidden';

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
  titleElement.setAttribute('id', 'movie-title');
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
  $reviewPage.className = 'hidden';

  if (event.target) {
    removeChildNodes($movieinfo);
  }
}

// show list when user clicks the 'my ghibli' tab
var $myGhibliTab = document.querySelector('#my-ghibli-tab');
$myGhibliTab.addEventListener('click', function (event) {
  $movielist.className = '';
  $infoPage.className = 'hidden';
  $reviewPage.className = 'hidden';

  if (event.target) {
    removeChildNodes($movieinfo);
  }
});

var $reviewsTab = document.querySelector('#reviews-tab');
var $reviewsList = document.querySelector('#reviews-list');

// show reviews when user clicks the 'reviews' tab
$reviewsTab.addEventListener('click', function (event) {
  $movielist.className = 'hidden';
  $infoPage.className = 'hidden';

  // when there is no review
  if (data.reviews.length === 0) {
    noReviews.className = 'text-center';
    newReview.className = 'hidden';
    $reviewPage.className = '';
    $reviewsList.className = 'hidden';
  } else {
    // when theres one or more reviews
    noReviews.className = 'text-center hidden';
    $reviewPage.className = '';
    newReview.className = 'hidden';
    $reviewsList.className = '';

    data.view = 'reviews-list';
  }

  if (event.target) {
    removeChildNodes($movieinfo);
  }
});

// click event function for the 'add review' button
var noReviews = document.querySelector('#no-reviews');
var newReview = document.querySelector('#new-review');
var $addReviewButton = document.querySelector('#add-review');

function handleReviewButton(event) {
  $reviewPage.className = '';
  noReviews.classList.add('hidden');
  newReview.className = '';
  $movielist.className = 'hidden';
  $infoPage.className = 'hidden';
  $reviewsList.className = 'hidden';

  var reviewMovieTitle = document.querySelector('#review-movie');
  var reviewImage = document.querySelector('#review-image');
  reviewMovieTitle.textContent = document.querySelector('#movie-title').textContent;
  reviewImage.setAttribute('src', document.querySelector('#movie-banner').src);
}

// submit event for the review form
var $form = document.querySelector('form');
var $ulElement = document.querySelector('ul');

$form.addEventListener('submit', saveReview);

function saveReview(event) {
  event.preventDefault();
  var review = {};
  review = {
    title: document.querySelector('#movie-title').textContent,
    image: document.querySelector('#movie-banner').src,
    text: $form.elements[0].value,
    reviewId: data.nextReviewId
  };

  // add new review to the data model
  data.nextReviewId++;
  data.reviews.unshift(review);
  $ulElement.prepend(createReviewListItem(review));
  $form.reset();

  // switches to the reviews list
  $movielist.className = 'hidden';
  $infoPage.className = 'hidden';
  noReviews.className = 'text-center hidden';
  newReview.className = 'hidden';
  $reviewPage.className = '';
  $reviewsList.className = '';

  data.view = 'reviews-list';
}

// create DOM to display the reviews
function createReviewListItem(review) {
  var liElement = document.createElement('li');
  liElement.setAttribute('data-review-id', review.reviewId);

  var titleElement = document.createElement('h2');
  titleElement.textContent = review.title;
  liElement.appendChild(titleElement);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('id', 'movie-banner');
  imageElement.setAttribute('src', review.image);
  liElement.appendChild(imageElement);

  var pElement = document.createElement('p');
  pElement.textContent = review.text;
  liElement.appendChild(pElement);

  return liElement;

}

var newReviewsList = document.querySelector('#new-reviews-list');

// remain the reviews list even after refreshing the page
document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.reviews.length; i++) {
    var result = createReviewListItem(data.reviews[i]);
    newReviewsList.appendChild(result);
  }
});
