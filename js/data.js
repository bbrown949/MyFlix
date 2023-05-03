// // // /* exported data */
let data = {
  view: 'home-page',
  entries: [],
  search: [],
  editing: null,
  nextEntryId: 1
};

const localStorageData = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', function (event) {
  const concertsJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', concertsJSON);
});
if (localStorageData !== null) {
  data = JSON.parse(localStorageData);
}
