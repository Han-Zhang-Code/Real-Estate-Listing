/* global data */
var $cityName = document.querySelector('.city-name');
var $state = document.querySelector('.chose-state');
var $submit = document.querySelector('.search-section');

$submit.addEventListener('submit', submited);

var $listingRow = document.querySelector('#listing');
var $listingDetailRow = document.querySelector('#listing-detail-div');
// var $listingDetail = document.querySelector('#listing-detail');

function submited(event) {
  event.preventDefault();
  var cityName = $cityName.value;
  var state = $state.value;
  const datas = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open('GET', 'https://real-estate12.p.rapidapi.com/listings/sale?state=' + state + '&city=' + cityName + '&page=1');
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-RapidAPI-Key', 'd63b704875msheafa5d6283a4eb9p1edc65jsn7724aaf65392');
  xhr.setRequestHeader('X-RapidAPI-Host', 'real-estate12.p.rapidapi.com');
  xhr.send(datas);
  xhr.addEventListener('load', loadAjax);
  function loadAjax() {
    for (var i = 0; i < xhr.response.properties.length; i++) {
      data.allProperties.push(xhr.response.properties[i]);
    }
    renderListLising();
  }

  $searchSection.className = 'search-section hidden';
  $listingSection.className = 'listing-section';
  $listingDetailRow.className = 'listing-detail hidden';

}

var $searchSection = document.querySelector('.search-section');
var $listingSection = document.querySelector('.listing-section');
var $listingBack = document.querySelector('#listingBack');
$listingBack.addEventListener('click', goBackToHome);
function goBackToHome(event) {
  $listingSection.className = 'listing-section hidden';
  $searchSection.className = 'search-section ';
  $listingDetailRow.className = 'listing-detail hidden';
  empty($listingRow);
}

var $listingDetailBack = document.querySelector('#listingDetailBack');
$listingDetailBack.addEventListener('click', goBackToListing);
function goBackToListing(event) {
  $listingSection.className = 'listing-section ';
  $searchSection.className = 'search-section hidden';
  $listingDetailRow.className = 'listing-detail hidden';
  empty($listingDetailContainer);
  data.propertyDetail = null;
}

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

$listingRow.addEventListener('click', selectListing);
function selectListing(event) {
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
  } else {
    return 0;
  }
}
var $listingDetailContainer = document.querySelector('#listingDetail');
function renderListLising() {
  for (var i = 0; i < data.allProperties.length; i++) {
    var $columnThird = document.createElement('div');
    $columnThird.setAttribute('class', 'column-third add-align-items row');
    var $listing = document.createElement('div');
    $listing.setAttribute('class', 'listing  hover-effect');
    $listing.setAttribute('data-propertyID', data.allProperties[i].property_id);
    var $listingImage = document.createElement('img');
    if (data.allProperties[i].primary_photo === null) {
      $listingImage.setAttribute('alt', 'image not avaliable');
      $listingImage.setAttribute('class', 'columnfull listing-img mouse-hover');
    } else {
      $listingImage.setAttribute('src', data.allProperties[i].primary_photo.href);
      $listingImage.setAttribute('class', 'columnfull listing-img mouse-hover');
    }
    var $listingPriceDiv = document.createElement('div');
    var $listingPrice = document.createElement('p');
    $listingPrice.setAttribute('class', 'listing-price');
    $listingPrice.textContent = '$ ' + data.allProperties[i].list_price.toLocaleString('en-US');
    var $streetDiv = document.createElement('div');
    var $street = document.createElement('p');
    $street.setAttribute('class', 'street');
    $street.textContent = data.allProperties[i].location.address.line + ', ' + data.allProperties[i].location.address.city;
    var $zipCodeDiv = document.createElement('div');
    var $zipCode = document.createElement('p');
    $zipCode.setAttribute('class', 'zip-code');
    $zipCode.textContent = data.allProperties[i].location.address.state_code + ', ' + data.allProperties[i].location.address.postal_code;
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
// <div class="column-half row add-flex-direction add-align-items full-width-mobile">
//   <div class="detail-images add-align-items row">
//     <img src="images/original.jpeg" class="column-full">
//   </div>
//   <div class="dots add-align-items add-flex-direction">
//     <i class="fas fa-dot-circle fa-2xs add-padding"></i>
//     <i class="fas fa-circle fa-2xs add-padding"></i>
//     <i class="fas fa-circle fa-2xs add-padding"></i>
//   </div>
// </div>
// <div class="column-half full-width-mobile">
//   <div class="detail-price">$897,799</div>
//   <div class="detail-address">1403 Albany St, Los Angeles, CA 90015</div>
//   <div class="row add-space-between">
//     <div class="column-half add-overlay">
//       <div class="detail-icons row">
//         <div class="column-half add-align-items row">
//           <i class="fas fa-vector-square fa-4x add-color adjust-icon-size"></i>
//         </div>
//         <div class="column-half">
//           <p class="detail-title">Area</p>
//           <p class="detail-content">2682 sqft</p>
//         </div>
//       </div>
//     </div>
//     <div class="column-half add-overlay">
//       <div class="detail-icons row">
//         <div class="column-half add-align-items row">
//           <i class="fas fa-house-user fa-3x add-color adjust-icon-size"></i>
//         </div>
//         <div class="column-half">
//           <p class="detail-title">House Type</p>
//           <p class="detail-content">Multi-Family</p>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="row add-space-between">
//     <div class="column-half add-overlay">
//       <div class="detail-icons row">
//         <div class="column-half add-align-items row">
//           <i class="fas fa-bed fa-3x add-color adjust-icon-size"></i>
//         </div>
//         <div class="column-half">
//           <p class="detail-title">Bedrooms</p>
//           <p class="detail-content">5</p>
//         </div>
//       </div>
//     </div>
//     <div class="column-half add-overlay">
//       <div class="detail-icons row">
//         <div class="column-half add-align-items row">
//           <i class="fas fa-bath fa-3x add-color adjust-icon-size"></i>
//         </div>
//         <div class="column-half">
//           <p class="detail-title">Bathrooms</p>
//           <p class="detail-content">2</p>
//         </div>
//       </div>
//     </div>

//   </div>
//   <div>
//     <p class="description-title">Description</p>
//   </div>
//   <div>
//     <p class="description-content">This muti-family type house has 5 bedrooms and 2 bathrooms, the house
//       itself has the site area of 2,682 square feet,
//       with the lot size of 5,985 square feet. its last sold price is $550,000 on the date 2015-06-29.</p>
//   </div>
//   <div class="row add-space-between">
//     <p class="average-price">Average Listing Price in Los Angeles:</p>
//     <p class="average-price">$ 1,007,124</p>
//   </div>
// </div>
function renderListingDetail() {
  var $columnHalfWhole = document.createElement('div');
  $columnHalfWhole.setAttribute('class', 'column-half row add-flex-direction add-align-items full-width-mobile');
  var $imageDiv = document.createElement('div');
  $imageDiv.setAttribute('class', 'detail-images add-align-items row');
  var $createDetailImage = document.createElement('img');
  $createDetailImage.setAttribute('src', data.propertyDetail.photos[0].href);
  $createDetailImage.setAttribute('class', 'column-full');
  var $createDotsRow = document.createElement('div');
  $createDotsRow.setAttribute('class', 'dots add-align-items add-flex-direction');
  var $createHoloDot = document.createElement('i');
  $createHoloDot.setAttribute('class', 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail');
  $createHoloDot.setAttribute('data-id', 0);
  $createDotsRow.appendChild($createHoloDot);
  for (var i = 1; i < data.propertyDetail.photos.length; i++) {
    var $createDot = document.createElement('i');
    $createDot.setAttribute('class', 'fas fa-circle fa-2xs add-padding for-Dom-select-detail');
    $createDot.setAttribute('data-id', i);
    $createDotsRow.appendChild($createDot);
  }
  $listingDetailContainer.appendChild($columnHalfWhole);
  $columnHalfWhole.appendChild($imageDiv);
  $imageDiv.appendChild($createDetailImage);
  $columnHalfWhole.appendChild($createDotsRow);
  var $createDetailTextColumn = document.createElement('div');
  $createDetailTextColumn.setAttribute('class', 'column-half full-width-mobile');
  var $createDetailPrice = document.createElement('div');
  $createDetailPrice.setAttribute('class', 'detail-price');
  $createDetailPrice.textContent = '$ ' + data.propertyDetail.list_price.toLocaleString('en-US');
  var $createDetailAddress = document.createElement('div');
  $createDetailAddress.setAttribute('class', 'detail-address');
  $createDetailAddress.textContent = data.propertyDetail.location.address.line + ', ' + data.propertyDetail.location.address.city + ', ' + data.propertyDetail.location.address.state_code + ', ' + data.propertyDetail.location.address.postal_code;

  var $createFourColumnDiv = document.createElement('div');
  $createFourColumnDiv.setAttribute('class', 'row add-space-between');
  var $createIconColumnhalf = document.createElement('div');
  $createIconColumnhalf.setAttribute('class', 'column-half add-overlay');
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
  $createAreaContentDetail.textContent = data.propertyDetail.description.sqft;

  var $createIconColumnhalfType = document.createElement('div');
  $createIconColumnhalfType.setAttribute('class', 'column-half add-overlay');
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
  $createTypeContentDetail.textContent = data.propertyDetail.description.type;

  var $createIconColumnhalfBedroom = document.createElement('div');
  $createIconColumnhalfBedroom.setAttribute('class', 'column-half add-overlay');
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
  $createBedroomContentDetail.textContent = data.propertyDetail.description.beds;

  var $createIconColumnhalfBathroom = document.createElement('div');
  $createIconColumnhalfBathroom.setAttribute('class', 'column-half add-overlay');
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
  $createBathroomContentDetail.textContent = data.propertyDetail.description.baths;

  var $createDescriptionTitleDiv = document.createElement('div');
  var $createDescriptionTitle = document.createElement('p');
  $createDescriptionTitle.setAttribute('class', 'description-title');
  $createDescriptionTitle.textContent = 'Description';

  var $createDescriptionContentDiv = document.createElement('div');
  var $createDescriptionContent = document.createElement('p');
  $createDescriptionContent.setAttribute('class', 'description-content');
  $createDescriptionContent.textContent = 'this is dummy';

  var $createAverageDiv = document.createElement('div');
  $createAverageDiv.setAttribute('class', 'row add-space-between');
  var $createAverageTitle = document.createElement('p');
  $createAverageTitle.setAttribute('class', 'average-price');
  $createAverageTitle.textContent = 'Average Listing Price in Los Angeles:';
  var $createAverage = document.createElement('p');
  $createAverage.setAttribute('class', 'average-price');
  $createAverage.textContent = '$1,234,567';

  $listingDetailContainer.appendChild($createDetailTextColumn);
  $createDetailTextColumn.appendChild($createDetailPrice);
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

  var $selectAllIcon = document.querySelectorAll('.for-Dom-select-detail');
  $createDotsRow.addEventListener('click', event => {
    for (var i = 0; i < $selectAllIcon.length; i++) {
      if (event.target.matches('i')) {
        $selectAllIcon[i].className = 'fas fa-circle fa-2xs add-padding for-Dom-select-detail';
      }
      if ($selectAllIcon[i].getAttribute('data-id') === event.target.getAttribute('data-id')) {
        $selectAllIcon[i].className = 'fas fa-dot-circle fa-2xs add-padding for-Dom-select-detail';
        $createDetailImage.setAttribute('src', data.propertyDetail.photos[i].href);
      }
    }
  });

  return $listingDetailContainer;
}
