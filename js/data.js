/* exported data */
let data = {
  view: 'list-page',
  films: [],
  reviews: [],
  editing: null,
  nextReviewId: 1
};

const previousData = localStorage.getItem('my-ghibli');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  const reviewsJSON = JSON.stringify(data);
  localStorage.setItem('my-ghibli', reviewsJSON);
});
