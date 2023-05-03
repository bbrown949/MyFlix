const $form = document.querySelector('form');
const $homePage = document.querySelector('div[data-view="home-page"]');
const $concertsPage = document.querySelector('div[data-view="concerts-page"]');
const $myConcertsPage = document.querySelector('div[data-view="my-concerts-page"]');
const $availableShows = document.querySelector('#available');
const $myConcertsUl = document.querySelector('#myConcerts');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${event.target.elements.zip.value}&apikey=ZFm9uGxzlS7CTPfB8oSgdagA9F3BCNt8`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response._embedded.events.length; i++) {
      const concertEntry = xhr.response._embedded.events[i];
      const concertEntryElement = renderConcerts(concertEntry);
      $availableShows.appendChild(concertEntryElement);
      data.search.push(concertEntry);
    }
  });
  xhr.send();
  viewSwap('concerts-page');
});

// shawn method below
$availableShows.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  const $closestLi = event.target.closest('li');
  const favorite = {};
  favorite.concertId = $closestLi.getAttribute('data-concerts-id');
  if (!data.entries.some(concert => concert.concertId === favorite.concertId)) {
    data.entries.unshift(favorite);
    event.target.className = 'fa-solid fa-heart fa-redheart';
  }

  const $liClone = $closestLi.cloneNode(true);
  $myConcertsUl.appendChild($liClone);

});

function viewSwap(view) {

  if (view === 'home-page') {
    $homePage.classList.remove('hidden');
    $concertsPage.classList.add('hidden');
    $myConcertsPage.classList.add('hidden');
  } else if (view === 'concerts-page') {
    $homePage.classList.add('hidden');
    $concertsPage.classList.remove('hidden');
    $myConcertsPage.classList.add('hidden');
  }
}

const $myConcertsButton = document.querySelector('.concerts-button');
$myConcertsButton.addEventListener('click', function () {
  $homePage.classList.add('hidden');
  $concertsPage.classList.add('hidden');
  $myConcertsPage.classList.remove('hidden');
  $form.reset();
});

const $homeButton = document.querySelector('.home-button');
$homeButton.addEventListener('click', function () {
  viewSwap('home-page');
  $form.reset();
});

const $backToConcertsButton = document.querySelector('.back-to-concerts');
$backToConcertsButton.addEventListener('click', function () {
  viewSwap('concerts-page');
  $form.reset();
});

function renderConcerts(concerts) {
  const $li = document.createElement('li');
  $li.setAttribute('data-concerts-id', concerts.id);

  const $imgLine = document.createElement('img');
  $imgLine.setAttribute('src', concerts.images[0].url);
  $imgLine.setAttribute('alt', 'api-image');
  $li.appendChild($imgLine);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'concert-data-row');
  $li.appendChild($row);

  const $columnOne = document.createElement('div');
  $columnOne.setAttribute('class', 'column-one');
  $row.appendChild($columnOne);

  const $concertName = document.createElement('p');
  $concertName.textContent = concerts.name;
  $columnOne.appendChild($concertName);

  const $concertData = document.createElement('p');
  $concertData.textContent = concerts.dates.start.localDate;
  $columnOne.appendChild($concertData);

  const $concertTime = document.createElement('p');
  $concertData.textContent = concerts.dates.start.localDate;
  $columnOne.appendChild($concertTime);

  const $concertVenue = document.createElement('p');
  $concertVenue.textContent = concerts._embedded.venues[0].name;
  $columnOne.appendChild($concertVenue);

  const $iconElement = document.createElement('i');
  $iconElement.className = 'fa-solid fa-heart';

  $columnOne.appendChild($iconElement);

  return $li;
}
