const $form = document.querySelector('form');
// const $zipCodeSubmit = document.querySelector('.zip-code-submit');
// const $zipCodeBox = document.querySelector('.zip-code-box');
const homePage = document.querySelector('div[data-view="home-page"]');
const concertsPage = document.querySelector('div[data-view="concerts-page"]');
// const $idTitle = document.getElementById('new-entry-edit-entry');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${event.target.elements.zip.value}&apikey=ZFm9uGxzlS7CTPfB8oSgdagA9F3BCNt8`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr response', xhr.response);
  });
  xhr.send();
  // console.log(event.target.elements.zip.value);
});

function viewSwap(view) {

  if (view === 'home-page') {
    homePage.classList.remove('hidden');
    concertsPage.classList.add('hidden');
  } else if (view === 'concerts-page') {
    homePage.classList.add('hidden');
    concertsPage.classList.remove('hidden');
  }
}

const $concertsButton = document.querySelector('.concerts-button');
$concertsButton.addEventListener('click', function () {
  viewSwap('concerts-page');
  $form.reset();

});

// function renderConcerts(concerts) {
//   const $li = document.createElement('li');
//   $li.setAttribute('data-concerts-id', concerts.entryId);

//   const $row = document.createElement('div');
//   $row.setAttribute('class', 'row');
//   $li.appendChild($row);

//   const $columnOne = document.createElement('div');
//   $columnHalfOne.setAttribute('class', 'column-one');
//   $row.appendChild($row);

//   $li.setAttribute('data-entry-id', concerts.entryId);

//   return $li;
// }
