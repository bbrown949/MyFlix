
function comingMovie() {
  viewSpinner();
  const $ul = document.querySelector('.list');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_7ga9nt4v');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const items = xhr.response.items;
    for (let i = 0; i < items.length; i++) {
      const description = movieDescription(items[i]);
      $ul.append(description);
    }
    hideSpinner();
  });
  xhr.send();
}

window.addEventListener('load', comingMovie);

function movieDescription(object) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'descriptions');
  $li.setAttribute('data-id', object.id);

  const $briefCon = document.createElement('div');
  $briefCon.setAttribute('class', 'brief-container');
  $li.append($briefCon);

  const $briefImg = document.createElement('div');
  $briefImg.setAttribute('class', 'image-container');
  $briefCon.appendChild($briefImg);

  const $anchor = document.createElement('a');
  $anchor.setAttribute('data-id', object.id);
  $briefImg.append($anchor);

  const $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'brief-image');
  $anchor.appendChild($img);

  const $briefDesc = document.createElement('div');
  $briefDesc.setAttribute('class', 'brief-description text-align-center');
  $briefCon.append($briefDesc);

  const $anchors = document.createElement('a');
  $anchors.setAttribute('data-id', object.id);
  $briefDesc.append($anchors);

  const $title = document.createElement('p');
  $title.setAttribute('data-id', object.id);
  $title.setAttribute('class', 'brief-title');
  $title.textContent = object.title;
  $anchors.append($title);

  const $year = document.createElement('h6');
  $year.setAttribute('data-id', object.id);
  $year.setAttribute('class', 'brief-year');
  $year.textContent = object.year;
  $anchors.append($year);

  const $deleteBox = document.createElement('div');
  $deleteBox.setAttribute('class', 'delete-button hidden');
  $briefDesc.append($deleteBox);

  const $delete = document.createElement('a');
  $delete.setAttribute('class', 'delete');
  $delete.textContent = 'Delete';
  $deleteBox.append($delete);

  return $li;
}

function detailsMovie(object) {
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row details');
  $row.setAttribute('data-id', object.id);

  const $detailImgCont = document.createElement('div');
  $detailImgCont.setAttribute('class', 'detailed-image-container column-half');
  $row.append($detailImgCont);

  const $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'detailed-image column-half');
  $detailImgCont.append($img);

  const $detailedText = document.createElement('div');
  $detailedText.setAttribute('class', 'column-half detailed-text');
  $row.append($detailedText);

  const $descriptionBox = document.createElement('div');
  $descriptionBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($descriptionBox);

  const $desciptionText = document.createElement('div');
  $desciptionText.setAttribute('class', 'description-box');
  $descriptionBox.append($desciptionText);

  const $descriptionTitle = document.createElement('h4');
  $descriptionTitle.setAttribute('class', 'brief-title');
  $descriptionTitle.textContent = 'Title: ' + object.title;
  $desciptionText.append($descriptionTitle);

  const $descriptionYear = document.createElement('h4');
  $descriptionYear.setAttribute('class', 'brief-year');
  $descriptionYear.textContent = object.year;
  $desciptionText.append($descriptionYear);

  const $descriptionReleaseDate = document.createElement('h4');
  $descriptionReleaseDate.textContent = 'Release Date: ' + object.releaseState;
  $desciptionText.append($descriptionReleaseDate);

  const $descriptionRunningTime = document.createElement('h4');
  $descriptionRunningTime.textContent = 'Running Time in Minutes: ' + object.runtimeMins + ' mins';
  $desciptionText.append($descriptionRunningTime);

  const $descriptionGenre = document.createElement('h4');
  $descriptionGenre.textContent = 'Genre: ' + object.genres;
  $desciptionText.append($descriptionGenre);

  const $descriptionDirector = document.createElement('h4');
  $descriptionDirector.textContent = 'Director: ' + object.directors;
  $desciptionText.append($descriptionDirector);

  const $descriptionStars = document.createElement('h4');
  $descriptionStars.textContent = 'Stars: ' + object.stars;
  $desciptionText.append($descriptionStars);

  const $plotBox = document.createElement('div');
  $plotBox.setAttribute('class', 'detailed-box-plot text-align-center');
  $detailedText.append($plotBox);

  const $descriptionPlot = document.createElement('div');
  $descriptionPlot.setAttribute('class', 'description-box');
  $plotBox.append($descriptionPlot);

  const $plotText = document.createElement('h4');
  $plotText.textContent = 'BRIEF PLOT';
  $descriptionPlot.append($plotText);

  const $plot = document.createElement('p');
  $plot.setAttribute('class', 'detailed-description');
  $plot.textContent = object.plot;
  $descriptionPlot.append($plot);

  return $row;
}

function hideList() {
  const $listBox = document.querySelector('.list-box');
  $listBox.className = 'list-box hidden';
  const $details = document.querySelector('.detail-container');
  $details.setAttribute('class', 'detail-container');
  const $listContainer = document.querySelector('.list-container');
  const $watchList = document.querySelector('.watch-list-container');
  $listContainer.className = 'list-container column-full';
  $watchList.setAttribute('class', 'watch-list-container column-full hidden');
}

function viewWatchList(event) {
  const $watchList = document.querySelector('.watch-list-container');
  $watchList.className = 'watch-list-container column-full';
}

function hideWatchList(event) {
  const $listContainer = document.querySelector('.list-container');
  const $watchList = document.querySelector('.watch-list-container');
  $listContainer.className = 'list-container column-full';
  $watchList.setAttribute('class', 'watch-list-container column-full hidden');
}

const $ul = document.querySelector('.list');

$ul.addEventListener('click', getDetails);

function getDetails(event) {
  viewSpinner();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_7ga9nt4v');
  xhr.responseType = 'json';
  if (event.target.tagName === 'P' || event.target.tagName === 'H6' || event.target.tagName === 'IMG') {
    const text = event.target.closest('a');
    const $textIds = text.getAttribute('data-id');
    const stringId = String($textIds);
    hideList();

    xhr.addEventListener('load', function (event) {
      const items = xhr.response.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === stringId) {
          const singleMovie = items[i];
          const descriptionOfSingleMovie = detailsMovie(singleMovie);
          const $detailContainer = document.querySelector('.detail-container');
          $detailContainer.append(descriptionOfSingleMovie);
        }
      }

      hideSpinner();
    });
    xhr.send();
  }
}

const $homeBtn = document.querySelector('.red-background');
$homeBtn.addEventListener('click', showList);

function showList() {
  const $listBox = document.querySelector('.list-box');
  $listBox.className = 'list-box';
  const $details = document.querySelector('.detail-container');
  $details.className = 'hidden detail-container full-column';
  hideWatchList();
  const $deleteBtn = document.querySelectorAll('.delete-button');
  for (let q = 0; q < $deleteBtn.length; q++) {
    $deleteBtn[q].className = 'hidden delete-button';
  }
  const $row = document.querySelector('.details');
  if ($details.contains($row)) {
    $details.removeChild($row);
  }
}

const $addToList = document.querySelector('.add-to-list');

$addToList.addEventListener('click', function addToWatchList(event) {
  const $addToListText = document.querySelector('.add-to-list');
  const $li = $addToListText.nextElementSibling;
  const $img = $li.querySelector('img');
  const $imgValue = $img.getAttribute('src');
  const $title = $li.querySelector('.brief-title');
  const $year = $li.querySelector('.brief-year');
  const $id = $li.getAttribute('data-id');
  const datas = {
    image: $imgValue,
    title: $title.textContent,
    year: $year.textContent,
    id: String($id)
  };
  data.movie.push(datas);
  const addToWatchList = movieDescription(datas);
  const $ul = document.querySelector('.watch-list');
  $ul.append(addToWatchList);
  $addingPopUp.className = 'adding-btn-popup-container column-full';
});

const $addingPopUp = document.querySelector('.adding-btn-popup-container');
const $popUpPerfectBtn = document.querySelector('.popup-confirm-btn');
$popUpPerfectBtn.addEventListener('click', popUpRemove);

function popUpRemove(event) {
  $addingPopUp.className = 'hidden adding-btn-popup-container column-full';
}

const $watchListBtn = document.querySelector('.yellow-background');

$watchListBtn.addEventListener('click', watchList);

function watchList(event) {
  hideList();
  const $deleteBtn = document.querySelectorAll('.delete-button');
  for (let q = 0; q < $deleteBtn.length; q++) {
    $deleteBtn[q].className = 'delete-button';
  }
  const details = document.querySelector('.detail-container');
  details.className = 'column-full detail-container hidden';
  viewWatchList();
  emptyText();
}

function emptyText() {
  const movies = data.movie;
  const $watchListText = document.querySelector('.watch-list-text');
  if (movies.length === 0) {
    $watchListText.className = 'watch-list-text';
  } else {
    $watchListText.className = 'watch-list-text hidden';
  }
}

window.addEventListener('DOMContentLoaded', loadWatchList);
function loadWatchList(event) {
  const movies = data.movie;
  const $ul = document.querySelector('.watch-list');
  for (let i = 0; i < movies.length; i++) {
    const selectedMovie = movieDescription(movies[i]);
    $ul.prepend(selectedMovie);
  }
}

window.addEventListener('click', deleteMovie);

function deleteMovie(event) {
  const $deleteButton = document.querySelectorAll('.delete');
  for (let i = 0; i < $deleteButton.length; i++) {
    if (event.target === $deleteButton[i]) {
      const $deleteBackground = document.querySelector('.delete-confirm-background');
      $deleteBackground.className = 'delete-confirm-background';
      const $movieToBeRemoved = event.target.closest('li');
      const $removeMovieId = $movieToBeRemoved.getAttribute('data-id');
      data.editing = $removeMovieId;
    }
  }
}

const $deleteNo = document.querySelector('.delete-no');
$deleteNo.addEventListener('click', removePopup);
function removePopup(event) {
  const $deleteBackground = document.querySelector('.delete-confirm-background');
  $deleteBackground.className = 'delete-confirm-background hidden';
}

const $deleteYes = document.querySelector('.delete-yes');

$deleteYes.addEventListener('click', removeMovie);

function removeMovie(event) {
  const $shadeBackground = document.querySelector('.delete-confirm-background');
  $shadeBackground.className = 'delete-confirm-background hidden';
  const $ul = document.querySelector('.watch-list');
  const $li = $ul.querySelectorAll('li');
  for (let q = 0; q < $li.length; q++) {
    const ids = $li[q].getAttribute('data-id');
    if (ids === data.editing) {
      $ul.removeChild($li[q]);
    }
  }
  for (let i = 0; i < data.movie.length; i++) {
    if (data.editing === data.movie[i].id) {
      data.movie.splice(i, 1);
    }
  }
  emptyText();
}

const $offline = document.querySelector('.offline');
window.addEventListener('offline', function (event) {
  $offline.className = 'offline';
});

const $offlineButton = document.querySelector('.offline-button');

$offlineButton.addEventListener('click', closeOfflineDiv);

function closeOfflineDiv(event) {
  $offline.className = 'offline hidden';
}

const $spinner = document.querySelector('.spinner');

function viewSpinner() {
  $spinner.className = 'spinner';
}
function hideSpinner() {
  $spinner.className = 'hidden spinner';
}
