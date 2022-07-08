/* eslint-disable no-unused-vars */
/* global data */
/* global google */
// eslint-disable-next-line no-unused-vars
var $cityName = document.querySelector('.city-name');
var $state = document.querySelector('.chose-state');
var $submit = document.querySelector('.search-form');
var $listingRow = document.querySelector('#listing');
var $listingDetailRow = document.querySelector('#listing-detail-div');
var $favoriteListingRow = document.querySelector('#favoriteListing');
var $favoriteSection = document.querySelector('#favorite-list-div');
var $searchSection = document.querySelector('.search-section');
var $listingSection = document.querySelector('.listing-section');
var $listingBack = document.querySelector('#listingBack');
var $favoriteBack = document.querySelector('#favoriteBack');
var $listingDetailBack = document.querySelector('#listingDetailBack');
var $listingDetailContainer = document.querySelector('#listingDetail');
var $myFavoriteList = document.querySelector('#favorite-list');
var $noFavorite = document.querySelector('#noFavorite');
var $listingDetailContainerAll = document.querySelector('#listingDetailContainerAll');

var intervalID = null;
let map;
let marker;

$submit.addEventListener('submit', submited);
$listingBack.addEventListener('click', goBackToHome);
$listingDetailBack.addEventListener('click', goBackToListing);
$listingRow.addEventListener('click', selectListing);
$favoriteBack.addEventListener('click', backFromFavorite);
$favoriteListingRow.addEventListener('click', selectFavoriteListing);
$myFavoriteList.addEventListener('click', showFavoriteList);
var $selectNextPage = document.querySelector('.next-page');
var $selectPreviousPage = document.querySelector('.previous-page');
var $selectPopUp = document.querySelector('.popup');
var page = 1;
var cityName = null;
var state = null;

document.querySelector('#close').addEventListener('click', function () {
  $selectPopUp.className = 'popup row hidden';
});

$selectNextPage.addEventListener('click', event => {
  event.preventDefault();
  if (page < Math.floor(data.totalProperties / data.propertiesInOnePage)) {
    page = page + 1;
  } else {
    page = Math.floor(data.totalProperties / data.propertiesInOnePage);
  }
  getData(state, cityName, page);
});

$selectPreviousPage.addEventListener('click', event => {
  event.preventDefault();
  if (page > 1) {
    page = page - 1;
  } else {
    page = 1;
  }
  getData(state, cityName, page);
});

function submited(event) {
  event.preventDefault();
  cityName = $cityName.value;
  state = $state.value;
  page = 1;
  getData(state, cityName, page);

  $searchSection.className = 'search-section hidden';
  $listingSection.className = 'listing-section';
  $listingDetailRow.className = 'listing-detail hidden';
  $favoriteSection.className = 'favorite-section hidden';
  $submit.reset();
}

function getData(state, cityName, page) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open('GET', 'https://real-estate12.p.rapidapi.com/listings/sale?state=' + state + '&city=' + cityName + '&page=' + page);
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-RapidAPI-Key', 'd63b704875msheafa5d6283a4eb9p1edc65jsn7724aaf65392');
  xhr.setRequestHeader('X-RapidAPI-Host', 'real-estate12.p.rapidapi.com');
  xhr.send();
  xhr.addEventListener('load', loadAjax);

  function loadAjax() {
    if (xhr.response.error === 'No property found, please check your parameters and try again!') {
      goBackToHome();
      $selectPopUp.className = 'popup row';
      return;
    }
    data.allProperties = [];
    for (var i = 0; i < xhr.response.properties.length; i++) {
      data.allProperties.push(xhr.response.properties[i]);
    }
    data.totalProperties = xhr.response.meta.total;
    data.propertiesInOnePage = xhr.response.meta.count;
    empty($listingRow);
    renderListLising();
  }

}

function goBackToHome(event) {
  $listingSection.className = 'listing-section hidden';
  $searchSection.className = 'search-section ';
  $listingDetailRow.className = 'listing-detail hidden';
  $favoriteSection.className = 'favorite-section hidden';
  empty($listingRow);
  data.allProperties = [];
}

function goBackToListing(event) {
  $listingSection.className = 'listing-section ';
  $searchSection.className = 'search-section hidden';
  $listingDetailRow.className = 'listing-detail hidden';
  $favoriteSection.className = 'favorite-section hidden';
  empty($listingDetailContainer);
  empty($favoriteListingRow);
  empty($listingRow);
  renderListLising();
  data.propertyDetail = null;
  data.count = 0;
  clearInterval(intervalID);

}
function backFromFavorite() {
  $listingSection.className = 'listing-section ';
  $searchSection.className = 'search-section hidden';
  $listingDetailRow.className = 'listing-detail hidden';
  $favoriteSection.className = 'favorite-section hidden';
  empty($listingDetailContainer);
  empty($listingRow);
  renderListLising();
  data.propertyDetail = null;

  data.count = 0;
  clearInterval(intervalID);
}

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

function selectListing(event) {
  empty($listingDetailContainer);
  if (event.target.matches('img')) {
    var propertyId = event.target.closest('.listing').getAttribute('data-propertyid');
    for (var i = 0; i < data.allProperties.length; i++) {
      if (data.allProperties[i].property_id === propertyId) {
        data.propertyDetail = data.allProperties[i];
      }
    }
    renderListingDetail();
    $searchSection.className = 'search-section hidden';
    $listingSection.className = 'listing-section hidden';
    $listingDetailRow.className = 'listing-detail';
    $favoriteSection.className = 'favorite-section hidden';
  } else {
    return 0;
  }
}

function selectFavoriteListing(event) {
  empty($listingDetailContainer);
  if (event.target.matches('img')) {
    var propertyId = event.target.closest('.listing').getAttribute('data-propertyid');
    for (var i = 0; i < data.favorite.length; i++) {
      if (data.favorite[i].property_id === propertyId) {
        if (data.favorite[i].property_id !== null) {
          data.propertyDetail = data.favorite[i];
          renderListingDetail();
          $searchSection.className = 'search-section hidden';
          $listingSection.className = 'listing-section hidden';
          $listingDetailRow.className = 'listing-detail';
          $favoriteSection.className = 'favorite-section hidden';
        }
      }
    }
    // renderListingDetail();
    // $searchSection.className = 'search-section hidden';
    // $listingSection.className = 'listing-section hidden';
    // $listingDetailRow.className = 'listing-detail';
    // $favoriteSection.className = 'favorite-section hidden';
  } else {
    return 0;
  }
}

function renderOneListListing(property) {
  var $columnThird = document.createElement('div');
  $columnThird.setAttribute('class', 'column-third add-align-items row');
  var $listing = document.createElement('div');
  $listing.setAttribute('class', 'listing  hover-effect');
  $listing.setAttribute('data-propertyID', property.property_id);
  var $listingImage = document.createElement('img');
  if (property.primary_photo === null) {
    $listingImage.setAttribute('src', 'images/PhotoNotAvaliable.jpeg');
    $listingImage.setAttribute('alt', 'image not avaliable');
    $listingImage.setAttribute('class', 'columnfull listing-img mouse-hover');
  } else {
    $listingImage.setAttribute('src', property.primary_photo.href);
    $listingImage.setAttribute('class', 'columnfull listing-img mouse-hover');
  }
  var $listingPriceDiv = document.createElement('div');
  $listingPriceDiv.setAttribute('class', 'row add-space-between add-align-items');
  var $listingPrice = document.createElement('p');
  $listingPrice.setAttribute('class', 'listing-price');
  $listingPrice.textContent = '$ ' + property.list_price.toLocaleString('en-US');

  var $createFavoriteIcon = document.createElement('i');
  if (data.favorite.some(function (favorite) { return favorite.property_id === property.property_id; })) {
    $createFavoriteIcon.setAttribute('class', 'fas fa-heart edit-heart hover-effects');
  } else {
    $createFavoriteIcon.setAttribute('class', 'far fa-heart edit-heart hover-effects');
  }

  var $streetDiv = document.createElement('div');
  var $street = document.createElement('p');
  $street.setAttribute('class', 'street');
  $street.textContent = property.location.address.line + ', ' + property.location.address.city;
  var $zipCodeDiv = document.createElement('div');
  var $zipCode = document.createElement('p');
  $zipCode.setAttribute('class', 'zip-code');
  $zipCode.textContent = property.location.address.state_code + ', ' + property.location.address.postal_code;
  $columnThird.appendChild($listing);
  $listing.appendChild($listingImage);
  $listing.appendChild($listingPriceDiv);
  $listingPriceDiv.appendChild($listingPrice);
  $listingPriceDiv.appendChild($createFavoriteIcon);
  $listing.appendChild($streetDiv);
  $streetDiv.appendChild($street);
  $listing.appendChild($zipCodeDiv);
  $zipCodeDiv.appendChild($zipCode);

  $createFavoriteIcon.addEventListener('click', event => {
    if (event.target.getAttribute('class') === 'far fa-heart edit-heart hover-effects') {
      data.favorite.push(property);
      event.target.closest('i').className = 'fas fa-heart edit-heart hover-effects';
    } else if (event.target.getAttribute('class') === 'fas fa-heart edit-heart hover-effects') {
      for (var i = 0; i < data.favorite.length; i++) {
        if (data.favorite[i].property_id === property.property_id) {
          data.favorite.splice(i, 1);
          $createFavoriteIcon.setAttribute('class', 'far fa-heart edit-heart hover-effects');
        }
      }
    }
  });

  return $columnThird;
}

function renderListLising() {
  for (var i = 0; i < data.allProperties.length; i++) {
    $listingRow.appendChild(renderOneListListing(data.allProperties[i]));
  }
}

function renderOneListingDetail(propertyDetail) {

  var $columnHalfWhole = document.createElement('div');
  $columnHalfWhole.setAttribute('class', 'column-half row add-flex-direction add-align-items full-width-mobile');
  var $imageDiv = document.createElement('div');
  $imageDiv.setAttribute('class', 'detail-images add-align-items row');
  var $createDetailImage = document.createElement('img');

  if (propertyDetail.photos === null) {
    $createDetailImage.setAttribute('src', 'images/PhotoNotAvaliable.jpeg');
    $createDetailImage.setAttribute('class', 'column-full hover-effect');
  } else {
    $createDetailImage.setAttribute('src', propertyDetail.photos[0].href);
    $createDetailImage.setAttribute('class', 'column-full hover-effect');
  }

  var $createDotsRow = document.createElement('div');
  $createDotsRow.setAttribute('class', 'dots add-align-items add-flex-direction');
  var $createHoloDot = document.createElement('i');
  $createHoloDot.setAttribute('class', 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects');
  $createHoloDot.setAttribute('data-id', 0);
  $createDotsRow.appendChild($createHoloDot);
  if (propertyDetail.photos !== null) {
    for (var i = 1; i < propertyDetail.photos.length; i++) {
      var $createDot = document.createElement('i');
      $createDot.setAttribute('class', 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects');
      $createDot.setAttribute('data-id', i);
      $createDotsRow.appendChild($createDot);
    }
  }
  $listingDetailContainer.appendChild($columnHalfWhole);
  $columnHalfWhole.appendChild($imageDiv);
  $imageDiv.appendChild($createDetailImage);
  $columnHalfWhole.appendChild($createDotsRow);
  var $createDetailTextColumn = document.createElement('div');
  $createDetailTextColumn.setAttribute('class', 'column-half full-width-mobile');

  var $createPriceDiv = document.createElement('div');
  $createPriceDiv.setAttribute('class', 'row add-space-between add-align-items');

  var $createDetailPrice = document.createElement('div');
  $createDetailPrice.setAttribute('class', 'detail-price');
  $createDetailPrice.textContent = '$ ' + propertyDetail.list_price.toLocaleString('en-US');

  var $createDetailHeart = document.createElement('i');
  if (data.favorite.some(favorite => { return favorite.property_id === propertyDetail.property_id; })) {
    $createDetailHeart.setAttribute('class', 'fas fa-heart edit-detail-heart hover-effects');
  } else {
    $createDetailHeart.setAttribute('class', 'far fa-heart edit-detail-heart hover-effects');
  }

  var $createDetailAddress = document.createElement('div');
  $createDetailAddress.setAttribute('class', 'detail-address');
  $createDetailAddress.textContent = propertyDetail.location.address.line + ', ' + propertyDetail.location.address.city + ', ' + propertyDetail.location.address.state_code + ', ' + propertyDetail.location.address.postal_code;

  var $createFourColumnDiv = document.createElement('div');
  $createFourColumnDiv.setAttribute('class', 'row add-space-between');
  var $createIconColumnhalf = document.createElement('div');
  $createIconColumnhalf.setAttribute('class', 'column-half add-overlay hover-effect');
  var $createDetailIconDiv = document.createElement('div');
  $createDetailIconDiv.setAttribute('class', 'detail-icons row');
  var $createSmallIconDiv = document.createElement('div');
  $createSmallIconDiv.setAttribute('class', 'column-half add-align-items row');
  var $createSmallIcon = document.createElement('i');
  $createSmallIcon.setAttribute('class', 'fas fa-vector-square fa-4x add-color adjust-icon-size');
  var $createSmallIconContentDiv = document.createElement('div');
  $createSmallIconContentDiv.setAttribute('class', 'column-half');
  var $createAreaContent = document.createElement('p');
  $createAreaContent.setAttribute('class', 'detail-title');
  $createAreaContent.textContent = 'Area';
  var $createAreaContentDetail = document.createElement('p');
  $createAreaContentDetail.setAttribute('class', 'detail-title');
  $createAreaContentDetail.textContent = propertyDetail.description.sqft + ' sqft';

  var $createIconColumnhalfType = document.createElement('div');
  $createIconColumnhalfType.setAttribute('class', 'column-half add-overlay hover-effect');
  var $createDetailIconDivType = document.createElement('div');
  $createDetailIconDivType.setAttribute('class', 'detail-icons row');
  var $createSmallIconDivType = document.createElement('div');
  $createSmallIconDivType.setAttribute('class', 'column-half add-align-items row');
  var $createSmallIconType = document.createElement('i');
  $createSmallIconType.setAttribute('class', 'fas fa-house-user fa-3x add-color adjust-icon-size');
  var $createSmallIconContentDivType = document.createElement('div');
  $createSmallIconContentDivType.setAttribute('class', 'column-half');
  var $createTypeContent = document.createElement('p');
  $createTypeContent.setAttribute('class', 'detail-title');
  $createTypeContent.textContent = 'House Type';
  var $createTypeContentDetail = document.createElement('p');
  $createTypeContentDetail.setAttribute('class', 'detail-title');
  var needCapitals = ['condos', 'farm', 'townhome', 'land', 'mobile'];
  if (needCapitals.includes(propertyDetail.description.type)) {
    var temp = propertyDetail.description.type.split('');
    temp[0] = temp[0].toUpperCase();
    propertyDetail.description.type = temp.join('');
  } else if (propertyDetail.description.type === 'single_family') {
    propertyDetail.description.type = 'Single-Family';
  } else if (propertyDetail.description.type === 'multi_family') {
    propertyDetail.description.type = 'Multi-Family';
  }
  $createTypeContentDetail.textContent = propertyDetail.description.type;

  var $createIconColumnhalfBedroom = document.createElement('div');
  $createIconColumnhalfBedroom.setAttribute('class', 'column-half add-overlay hover-effect');
  var $createDetailIconDivBedroom = document.createElement('div');
  $createDetailIconDivBedroom.setAttribute('class', 'detail-icons row');
  var $createSmallIconDivBedroom = document.createElement('div');
  $createSmallIconDivBedroom.setAttribute('class', 'column-half add-align-items row');
  var $createSmallIconBedroom = document.createElement('i');
  $createSmallIconBedroom.setAttribute('class', 'fas fa-bed fa-3x add-color adjust-icon-size');
  var $createSmallIconContentDivBedroom = document.createElement('div');
  $createSmallIconContentDivBedroom.setAttribute('class', 'column-half');
  var $createBedroomContent = document.createElement('p');
  $createBedroomContent.setAttribute('class', 'detail-title');
  $createBedroomContent.textContent = 'Bedroom';
  var $createBedroomContentDetail = document.createElement('p');
  $createBedroomContentDetail.setAttribute('class', 'detail-title');
  $createBedroomContentDetail.textContent = propertyDetail.description.beds;

  var $createIconColumnhalfBathroom = document.createElement('div');
  $createIconColumnhalfBathroom.setAttribute('class', 'column-half add-overlay hover-effect');
  var $createDetailIconDivBathroom = document.createElement('div');
  $createDetailIconDivBathroom.setAttribute('class', 'detail-icons row');
  var $createSmallIconDivBathroom = document.createElement('div');
  $createSmallIconDivBathroom.setAttribute('class', 'column-half add-align-items row');
  var $createSmallIconBathroom = document.createElement('i');
  $createSmallIconBathroom.setAttribute('class', 'fas fa-bath fa-3x add-color adjust-icon-size');
  var $createSmallIconContentDivBathroom = document.createElement('div');
  $createSmallIconContentDivBathroom.setAttribute('class', 'column-half');
  var $createBathroomContent = document.createElement('p');
  $createBathroomContent.setAttribute('class', 'detail-title');
  $createBathroomContent.textContent = 'Bathroom';
  var $createBathroomContentDetail = document.createElement('p');
  $createBathroomContentDetail.setAttribute('class', 'detail-title');
  $createBathroomContentDetail.textContent = propertyDetail.description.baths;

  var $createDescriptionTitleDiv = document.createElement('div');
  var $createDescriptionTitle = document.createElement('p');
  $createDescriptionTitle.setAttribute('class', 'description-title');
  $createDescriptionTitle.textContent = 'Description';

  var $createDescriptionContentDiv = document.createElement('div');
  var $createDescriptionContent = document.createElement('p');

  if (propertyDetail.description.sold_price === null) {
    propertyDetail.description.sold_price = 'not provided';
  }

  $createDescriptionContent.setAttribute('class', 'description-content');
  $createDescriptionContent.textContent = 'This ' + propertyDetail.description.type +
  ' house has ' + propertyDetail.description.beds + ' bedrooms and ' +
  propertyDetail.description.baths + ' bathrooms, the house it-self has the site area of ' +
  propertyDetail.description.sqft + ' square feet, with the lot size of ' +
  propertyDetail.description.lot_sqft + ' square feet. its last sold price is $' +
  propertyDetail.description.sold_price.toLocaleString('en-US') + ' on the date ' +
  propertyDetail.description.sold_date + '.';

  var average = 0;
  var sum = 0;
  for (var j = 0; j < data.allProperties.length - 1; j++) {
    sum += data.allProperties[j].list_price;
  }
  average = sum / data.allProperties.length;

  var $createAverageDiv = document.createElement('div');
  $createAverageDiv.setAttribute('class', 'row add-space-between');
  var $createAverageTitle = document.createElement('p');
  $createAverageTitle.setAttribute('class', 'average-price');
  $createAverageTitle.textContent = 'Average Listing Price in ' + propertyDetail.location.address.city + ':';
  var $createAverage = document.createElement('p');
  $createAverage.setAttribute('class', 'average-price');
  $createAverage.textContent = '$' + average.toLocaleString('en-US', { maximumFractionDigits: 0 });

  $listingDetailContainer.appendChild($createDetailTextColumn);
  $createDetailTextColumn.appendChild($createPriceDiv);
  $createPriceDiv.appendChild($createDetailPrice);
  $createPriceDiv.appendChild($createDetailHeart);
  $createDetailTextColumn.appendChild($createDetailAddress);

  $createDetailTextColumn.appendChild($createFourColumnDiv);
  $createFourColumnDiv.appendChild($createIconColumnhalf);
  $createIconColumnhalf.appendChild($createDetailIconDiv);
  $createDetailIconDiv.appendChild($createSmallIconDiv);
  $createSmallIconDiv.appendChild($createSmallIcon);
  $createDetailIconDiv.appendChild($createSmallIconContentDiv);
  $createSmallIconContentDiv.appendChild($createAreaContent);
  $createSmallIconContentDiv.appendChild($createAreaContentDetail);

  $createFourColumnDiv.appendChild($createIconColumnhalfType);
  $createIconColumnhalfType.appendChild($createDetailIconDivType);
  $createDetailIconDivType.appendChild($createSmallIconDivType);
  $createSmallIconDivType.appendChild($createSmallIconType);
  $createDetailIconDivType.appendChild($createSmallIconContentDivType);
  $createSmallIconContentDivType.appendChild($createTypeContent);
  $createSmallIconContentDivType.appendChild($createTypeContentDetail);

  $createFourColumnDiv.appendChild($createIconColumnhalfBedroom);
  $createIconColumnhalfBedroom.appendChild($createDetailIconDivBedroom);
  $createDetailIconDivBedroom.appendChild($createSmallIconDivBedroom);
  $createSmallIconDivBedroom.appendChild($createSmallIconBedroom);
  $createDetailIconDivBedroom.appendChild($createSmallIconContentDivBedroom);
  $createSmallIconContentDivBedroom.appendChild($createBedroomContent);
  $createSmallIconContentDivBedroom.appendChild($createBedroomContentDetail);

  $createFourColumnDiv.appendChild($createIconColumnhalfBathroom);
  $createIconColumnhalfBathroom.appendChild($createDetailIconDivBathroom);
  $createDetailIconDivBathroom.appendChild($createSmallIconDivBathroom);
  $createSmallIconDivBathroom.appendChild($createSmallIconBathroom);
  $createDetailIconDivBathroom.appendChild($createSmallIconContentDivBathroom);
  $createSmallIconContentDivBathroom.appendChild($createBathroomContent);
  $createSmallIconContentDivBathroom.appendChild($createBathroomContentDetail);

  $createDetailTextColumn.appendChild($createDescriptionTitleDiv);
  $createDescriptionTitleDiv.appendChild($createDescriptionTitle);

  $createDetailTextColumn.appendChild($createDescriptionContentDiv);
  $createDescriptionContentDiv.appendChild($createDescriptionContent);

  $createDetailTextColumn.appendChild($createAverageDiv);
  $createAverageDiv.appendChild($createAverageTitle);
  $createAverageDiv.appendChild($createAverage);

  $createDetailHeart.addEventListener('click', event => {
    if (event.target.getAttribute('class') === 'far fa-heart edit-detail-heart hover-effects') {
      data.favorite.push(propertyDetail);
      event.target.closest('i').className = 'fas fa-heart edit-detail-heart hover-effects';
    } else if (data.favorite.some(function (favorite) { return favorite.property_id === propertyDetail.property_id; })) {
      data.favorite.splice(propertyDetail, 1);
      $createDetailHeart.setAttribute('class', 'far fa-heart edit-detail-heart hover-effects');
    }
  });

  var $selectAllIcon = document.querySelectorAll('.for-Dom-select-detail');
  $createDotsRow.addEventListener('click', event => {
    clearInterval(intervalID);
    data.count = 0;
    intervalID = setInterval(() => {
      if (data.count < $selectAllIcon.length - 1) {
        $selectAllIcon[data.count].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
        $selectAllIcon[data.count + 1].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
        $createDetailImage.setAttribute('src', propertyDetail.photos[data.count + 1].href);
        $createDetailImage.setAttribute('class', 'column-full hover-effect');
      } else if (data.count === $selectAllIcon.length - 1) {
        $selectAllIcon[data.count].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
        $selectAllIcon[0].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
        $createDetailImage.setAttribute('src', propertyDetail.photos[0].href);
        $createDetailImage.setAttribute('class', 'column-full hover-effect');
      }
      if (data.count < $selectAllIcon.length - 1) {
        data.count++;
      } else if (data.count === $selectAllIcon.length - 1) {
        data.count = 0;
      }

    }, 3000);
    for (var i = 0; i < $selectAllIcon.length; i++) {
      if (event.target.matches('i')) {
        $selectAllIcon[i].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
      }
      if ($selectAllIcon[i].getAttribute('data-id') === event.target.getAttribute('data-id')) {
        $selectAllIcon[i].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
        $createDetailImage.setAttribute('src', propertyDetail.photos[i].href);
        $createDetailImage.setAttribute('class', 'column-full hover-effect');
      }
    }
  });

  intervalID = setInterval(() => {
    if (data.count < $selectAllIcon.length - 1) {
      $selectAllIcon[data.count].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
      $selectAllIcon[data.count + 1].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
      $createDetailImage.setAttribute('src', propertyDetail.photos[data.count + 1].href);
      $createDetailImage.setAttribute('class', 'column-full hover-effect');
    } else if (data.count === $selectAllIcon.length - 1) {
      $selectAllIcon[data.count].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
      $selectAllIcon[0].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail hover-effects';
      $createDetailImage.setAttribute('src', propertyDetail.photos[0].href);
      $createDetailImage.setAttribute('class', 'column-full hover-effect');
    }
    if (data.count < $selectAllIcon.length - 1) {
      data.count++;
    } else if (data.count === $selectAllIcon.length - 1) {
      data.count = 0;
    }
  }, 3000);
  if (data.propertyDetail.location.address.coordinate !== null) {
    var $createGoogleMapContainerDiv = document.createElement('div');
    $createGoogleMapContainerDiv.setAttribute('id', 'map');
    $listingDetailContainer.appendChild($createGoogleMapContainerDiv);

    map = new google.maps.Map($createGoogleMapContainerDiv, {
      center: { lat: data.propertyDetail.location.address.coordinate.lat, lng: data.propertyDetail.location.address.coordinate.lon },
      zoom: 8
    });
    marker = new google.maps.Marker({
      position: { lat: data.propertyDetail.location.address.coordinate.lat, lng: data.propertyDetail.location.address.coordinate.lon },
      map
    });
  }
  return $listingDetailContainer;
}

function renderListingDetail() {
  renderOneListingDetail(data.propertyDetail);
}

function showFavoriteList() {
  if (data.favorite.length === 0) {
    empty($favoriteListingRow);
    data.count = 0;
    $listingSection.className = 'listing-section hidden';
    $searchSection.className = 'search-section hidden';
    $listingDetailRow.className = 'listing-detail hidden';
    $favoriteSection.className = 'favorite-section';
    $noFavorite.className = 'row';
  } else if (data.favorite.length !== 0) {
    $noFavorite.className = 'row hidden';
    data.count = 0;
    empty($favoriteListingRow);
    $listingSection.className = 'listing-section hidden';
    $searchSection.className = 'search-section hidden';
    $listingDetailRow.className = 'listing-detail hidden';
    $favoriteSection.className = 'favorite-section';
    for (var i = 0; i < data.favorite.length; i++) {
      $favoriteListingRow.appendChild(renderOneListListing(data.favorite[i]));
    }
  }

}
