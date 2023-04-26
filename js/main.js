const $form = document.querySelector('form');
// const $zipCodeSubmit = document.querySelector('.zip-code-submit');
// const $zipCodeBox = document.querySelector('.zip-code-box');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${event.target.elements.zip.value}&apikey=ZFm9uGxzlS7CTPfB8oSgdagA9F3BCNt8`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send();
});
