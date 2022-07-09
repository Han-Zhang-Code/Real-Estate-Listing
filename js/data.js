/* exported data */
var data = {
  allProperties: [],
  propertyDetail: null,
  count: 0,
  favorite: [],
  totalProperties: 0,
  propertiesInOnePage: 0,
  view: ''
};

var previousTodosJSON = localStorage.getItem('myFavorite');
if (previousTodosJSON !== null) {
  data.favorite = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', tasks);
function tasks(event) {
  window.localStorage.setItem('myFavorite', JSON.stringify(data.favorite));
}
