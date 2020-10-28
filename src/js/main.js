class Main {
	constructor() {
		this.yelpListeners();
	}
	yelpListeners() {
		const buttonEl = document.querySelector('[name="search"]');
		buttonEl.addEventListener('click', this.handleSearch);
		const bodyEl = document.querySelector('body');
		bodyEl.addEventListener('got-results', this.handleResults);
		bodyEl.addEventListener('got-error', this.handleSearchError);
	}

	handleSearch = (event) => {
		event.preventDefault();

		const restaurantEl = document.querySelector('[name="business-name"]');
		const restaurantTerm = restaurantEl.value;

		const locationEl = document.querySelector('[name="location-name"]');
		const locationTerm = locationEl.value;

		const sortEl = document.querySelector('[name="sort-by"]');
		const sortTerm = sortEl.value;

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
		const openLoca = document.querySelector('[name="open"]');
		const openBo = openLoca.checked;

		const api = new YelpApi();
		if (locationTerm === '') {
			alert('You must at least enter a location!!');
		} else {
			api.businessSearch({
				term: restaurantTerm,
				location: locationTerm,
				sort_by: sortTerm,
				price: priceTerm,
				open_now: openBo,
			});
		}
	};
	handleResults(event) {
		const results = event.detail;
		console.log(results);

		const allReviewsEl = document.querySelector('.results');
		allReviewsEl.textContent = '';

		for (let r in results) {
			const review = results[r];
			const reviewEl = document.createElement('li');
			allReviewsEl.appendChild(reviewEl);

			const reviewContainer = document.createElement('div');
			reviewContainer.setAttribute('class', 'review-container');
			reviewEl.appendChild(reviewContainer);

			const infoContainerEl = document.createElement('div');
			infoContainerEl.setAttribute('class', 'info-container');
			reviewContainer.appendChild(infoContainerEl);
	

			const statsContainer = document.createElement('div');
			statsContainer.setAttribute('class', 'stats-container');
			headingContainer.appendChild(statsContainer);

			const reviewLinkEl = document.createElement('a');
			reviewLinkEl.setAttribute('href', review.url);
			reviewLinkEl.setAttribute('target', '_blank');
			headingContainer.appendChild(reviewLinkEl);

			const nameEl = document.createElement('h2');
			reviewLinkEl.appendChild(nameEl);
			nameEl.textContent = review.name;

			const ratingEl = document.createElement('span');
			statsContainer.appendChild(ratingEl);
			ratingEl.innerText = review.rating + '⭐';

			const priceEl = document.createElement('span');
			priceEl.setAttribute('class', 'pricing');
			statsContainer.appendChild(priceEl);
			priceEl.innerText = review.price;

			const imageEl = document.createElement('img');
			imageEl.setAttribute('src', review.image_url);
			reviewContainer.appendChild(imageEl);

		}
	}
}
new Main();

