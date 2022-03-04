/* exported data */
var data = {
  view: 'list-page',
  films: [],
  reviews: [],
  editing: null,
  nextReviewId: 1
};

var previousData = localStorage.getItem('my-ghibli');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var reviewsJSON = JSON.stringify(data);
  localStorage.setItem('my-ghibli', reviewsJSON);
});
