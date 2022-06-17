/* global data */
var $cityName = document.querySelector('.city-name');
var $state = document.querySelector('.chose-state');
var $submit = document.querySelector('.search-section');

$submit.addEventListener('submit', submited);

var $listingRow = document.querySelector('#listing');

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
    // console.log(data);
    renderListLising();
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

$listingRow.addEventListener('click', selectListing);
function selectListing(event) {
  var propertyId = event.target.closest('.listing').getAttribute('data-propertyid');
  for (var i = 0; i < data.allProperties.length; i++) {
    if (data.allProperties[i].property_id === propertyId) {
      data.propertyDetail = data.allProperties[i];
    }
  }
  renderListingDetail();
}
var $listingDetailContainer = document.querySelector('#listingDetail');
function renderListLising() {
  for (var i = 0; i < data.allProperties.length; i++) {
    var $columnThird = document.createElement('div');
    $columnThird.setAttribute('class', 'column-third add-align-items row');
    var $listing = document.createElement('div');
    $listing.setAttribute('class', 'listing  hover-effects');
    $listing.setAttribute('data-propertyID', data.allProperties[i].property_id);
    var $listingImage = document.createElement('img');
    if (data.allProperties[i].primary_photo === null) {
      $listingImage.setAttribute('alt', 'image not avaliable');
      $listingImage.setAttribute('class', 'columnfull listing-img');
    } else {
      $listingImage.setAttribute('src', data.allProperties[i].primary_photo.href);
      $listingImage.setAttribute('class', 'columnfull listing-img');
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
  $createIconColumnhalf.setAttribute('class', 'column-half add-overlay');
  var $createDetailIconDivType = document.createElement('div');
  $createDetailIconDiv.setAttribute('class', 'detail-icons row');
  var $createSmallIconDivType = document.createElement('div');
  $createSmallIconDiv.setAttribute('class', 'column-half add-align-items row');
  var $createSmallIconType = document.createElement('i');
  $createSmallIcon.setAttribute('class', 'fas fa-vector-square fa-4x add-color adjust-icon-size');
  var $createSmallIconContentDivType = document.createElement('div');
  $createSmallIconContentDiv.setAttribute('class', 'column-half');
  var $createTypeContent = document.createElement('p');
  $createAreaContent.setAttribute('class', 'detail-title');
  $createAreaContent.textContent = 'Area';
  var $createTypeContentDetail = document.createElement('p');
  $createAreaContentDetail.setAttribute('class', 'detail-title');
  $createAreaContentDetail.textContent = data.propertyDetail.description.sqft;

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

  // $createDetailTextColumn.appendChild($createFourColumnDiv);
  $createFourColumnDiv.appendChild($createIconColumnhalfType);
  $createIconColumnhalfType.appendChild($createDetailIconDivType);
  $createDetailIconDivType.appendChild($createSmallIconDivType);
  $createSmallIconDivType.appendChild($createSmallIconType);
  $createDetailIconDivType.appendChild($createSmallIconContentDivType);
  $createSmallIconContentDivType.appendChild($createTypeContent);
  $createSmallIconContentDivType.appendChild($createTypeContentDetail);

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

  // var $createDetailTextColumn = document.createElement('div');
  // $createDetailTextColumn.setAttribute('class', 'column-half full-width-mobile');
  // var $createDetailPrice = document.createElement('div');
  // $createDetailPrice.setAttribute('class', 'detail-price');
  // $createDetailPrice.textContent = data.propertyDetail.list_price.toLocaleString('en-US');
  // var $createDetailAddress = document.createElement('div');
  // $createDetailAddress.setAttribute('class', 'detail-address');
  // $createDetailAddress.textContent = data.propertyDetail.address.line + ', ' + data.propertyDetail.address.city + ', ' + data.propertyDetail.address.state_code + ', ' + data.propertyDetail.address.postal_code;

  // $listingDetailContainer.appendChild($createDetailTextColumn);
  // $createDetailTextColumn.appendChild($createDetailPrice);
  // $createDetailTextColumn.appendChild($createDetailAddress);

  return $listingDetailContainer;
}
