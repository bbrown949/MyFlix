let data = {
  movie: [],
  editing: null
};

window.addEventListener('beforeunload', function storage(event) {
  const JSONData = JSON.stringify(data);
  localStorage.setItem('storage', JSONData);
});

const dataFromJSON = localStorage.getItem('storage');
if (dataFromJSON !== null) {
  data = JSON.parse(localStorage.getItem('storage'));
}
