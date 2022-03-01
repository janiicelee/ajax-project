const $susuwatari = document.querySelector('#susuwatari');
const $frontPage = document.querySelector('.front-page');
const $listPage = document.querySelector('#list-page');

function clickSuswatari(event) {
  $frontPage.className = 'front-page hidden';
  $listPage.className = '';
}

$susuwatari.addEventListener('click', clickSuswatari);
