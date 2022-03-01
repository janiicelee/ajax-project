const $susuwatari = document.querySelector('#susuwatari');
const $frontPage = document.querySelector('.front-page');
const $listPage = document.querySelector('#list-page');

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

  for (var i = 0; i < xhr.response.length; i++) {
    var $imgElement = document.createElement('img');
    $movielist.appendChild($imgElement);
    $imgElement.setAttribute('src', xhr.response[i].image);
  }
});

xhr.send();
