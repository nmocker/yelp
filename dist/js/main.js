"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    _defineProperty(this, "handleSearch", function (event) {
      event.preventDefault();
      var restaurantEl = document.querySelector('[name="business-name"]');
      var restaurantTerm = restaurantEl.value;
      var locationEl = document.querySelector('[name="location-name"]');
      var locationTerm = locationEl.value;
      var sortEl = document.querySelector('[name="sort-by"]');
      var sortTerm = sortEl.value;
      var priceEl = document.querySelectorAll('[name="price"]:checked');
      var prices = [];

      for (var x = 0, l = priceEl.length; x < l; x++) {
        prices.push(priceEl[x].value);
      }

      if (priceEl.length === 0) {
        priceTerm === 0;
      } else {
        var priceTerm = prices.join(', ');
      }

      var openLoca = document.querySelector('[name="open"]');
      var openBo = openLoca.checked;
      var api = new YelpApi();

      if (locationTerm === '') {
        alert('You must at least enter a location!!');
      } else {
        api.businessSearch({
          term: restaurantTerm,
          location: locationTerm,
          sort_by: sortTerm,
          price: priceTerm,
          open_now: openBo
        });
      }
    });

    this.yelpListeners();
  }

  _createClass(Main, [{
    key: "yelpListeners",
    value: function yelpListeners() {
      var buttonEl = document.querySelector('[name="search"]');
      buttonEl.addEventListener('click', this.handleSearch);
      var bodyEl = document.querySelector('body');
      bodyEl.addEventListener('got-results', this.handleResults);
      bodyEl.addEventListener('got-error', this.handleSearchError);
    }
  }, {
    key: "handleResults",
    value: function handleResults(event) {
      var results = event.detail;
      console.log(results);
      var allReviewsEl = document.querySelector('.results');
      allReviewsEl.textContent = '';

      for (var r in results) {
        var review = results[r];
        var reviewEl = document.createElement('li');
        allReviewsEl.appendChild(reviewEl);
        var reviewContainer = document.createElement('div');
        reviewContainer.setAttribute('class', 'review-container');
        reviewEl.appendChild(reviewContainer);
        var infoContainerEl = document.createElement('div');
        infoContainerEl.setAttribute('class', 'info-container');
        reviewContainer.appendChild(infoContainerEl);
        var statsContainer = document.createElement('div');
        statsContainer.setAttribute('class', 'stats-container');
        headingContainer.appendChild(statsContainer);
        var reviewLinkEl = document.createElement('a');
        reviewLinkEl.setAttribute('href', review.url);
        reviewLinkEl.setAttribute('target', '_blank');
        headingContainer.appendChild(reviewLinkEl);
        var nameEl = document.createElement('h2');
        reviewLinkEl.appendChild(nameEl);
        nameEl.textContent = review.name;
        var ratingEl = document.createElement('span');
        statsContainer.appendChild(ratingEl);
        ratingEl.innerText = review.rating + '⭐';
        var priceEl = document.createElement('span');
        priceEl.setAttribute('class', 'pricing');
        statsContainer.appendChild(priceEl);
        priceEl.innerText = review.price;
        var imageEl = document.createElement('img');
        imageEl.setAttribute('src', review.image_url);
        reviewContainer.appendChild(imageEl);
      }
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
