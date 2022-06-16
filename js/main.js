var $cityName = document.querySelector('.city-name');
var $state = document.querySelector('.chose-state');
var $submit = document.querySelector('.search-section');

$submit.addEventListener('submit', submited);

var $listingRow = document.querySelector('#listing');

function submited(event) {
  event.preventDefault();
  var cityName = $cityName.value;
  var state = $state.value;
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open('GET', 'https://real-estate12.p.rapidapi.com/listings/sale?state=' + state + '&city=' + cityName + '&page=1');
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-RapidAPI-Key', 'd63b704875msheafa5d6283a4eb9p1edc65jsn7724aaf65392');
  xhr.setRequestHeader('X-RapidAPI-Host', 'real-estate12.p.rapidapi.com');

  xhr.send(data);
  xhr.addEventListener('load', loadAjax);
  function loadAjax() {
    for (var i = 0; i < xhr.response.properties.length; i++) {
      var $columnThird = document.createElement('div');
      $columnThird.setAttribute('class', 'column-third');
      $columnThird.setAttribute('data-propertyID', xhr.response.properties[i].property_id);
      var $listing = document.createElement('div');
      $listing.setAttribute('class', 'listing  hover-effects');
      var $listingImage = document.createElement('img');
      $listingImage.setAttribute('src', xhr.response.properties[i].primary_photo.href);
      $listingImage.setAttribute('class', 'columnfull listing-img');
      var $listingPriceDiv = document.createElement('div');
      var $listingPrice = document.createElement('p');
      $listingPrice.setAttribute('class', 'listing-price');
      $listingPrice.textContent = '$ ' + xhr.response.properties[i].list_price.toLocaleString('en-US');
      var $streetDiv = document.createElement('div');
      var $street = document.createElement('p');
      $street.setAttribute('class', 'street');
      $street.textContent = xhr.response.properties[i].location.address.line + ', ' + xhr.response.properties[i].location.address.city;
      var $zipCodeDiv = document.createElement('div');
      var $zipCode = document.createElement('p');
      $zipCode.setAttribute('class', 'zip-code');
      $zipCode.textContent = xhr.response.properties[i].location.address.state_code + ', ' + xhr.response.properties[i].location.address.postal_code;
      $listingRow.appendChild($columnThird);
      $columnThird.appendChild($listing);
      $listing.appendChild($listingImage);
      $listing.appendChild($listingPriceDiv);
      $listingPriceDiv.appendChild($listingPrice);
      $listing.appendChild($streetDiv);
      $streetDiv.appendChild($street);
      $listing.appendChild($zipCodeDiv);
      $zipCodeDiv.appendChild($zipCode);
    }

    return $listingRow;
  }

  $searchSection.className = 'search-section hidden';
  $listingSection.className = 'listing-section';

}

var $searchSection = document.querySelector('.search-section');
var $listingSection = document.querySelector('.listing-section');
var $listingBack = document.querySelector('#listingBack');
$listingBack.addEventListener('click', goBackToHome);
function goBackToHome(event) {
  $listingSection.className = 'listing-section hidden';
  $searchSection.className = 'search-section ';
  empty($listingRow);
}
function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}
