document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Add event listeners
    document.querySelector('.carousel-button.prev').addEventListener('click', scrollCarouselLeft);
    document.querySelector('.carousel-button.next').addEventListener('click', scrollCarouselRight);
    
    // Filter pills event listeners
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Filter products based on selected pill
            filterProducts(this.innerText);
        });
    });
    
    // Search form event listener
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        // If search query is not empty, filter products
        if (searchQuery) {
            filterProductsBySearch(searchQuery);
        } else {
            // If empty, show all products
            initializeApp();
        }
    });
});

// Initialize the application and load all products
function initializeApp() {
    // Load all products into the carousel
    loadProductsIntoCarousel(bicycleData);
    
    // Display the first product details
    if (bicycleData.length > 0) {
        displayProductDetails(bicycleData[0]);
    }
    
    // Load related products
    loadRelatedProducts(bicycleData);
}

// Load products into the carousel
function loadProductsIntoCarousel(products) {
    const carousel = document.querySelector('.product-carousel');
    carousel.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        carousel.appendChild(productCard);
    });
    
    // Add event listeners to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            productCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Display the details of the selected product
            const productId = parseInt(this.getAttribute('data-id'));
            const selectedProduct = products.find(p => p.id === productId);
            displayProductDetails(selectedProduct);
            
            // Scroll to product details
            document.querySelector('.product-details').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Set the first card as active
    if (productCards.length > 0) {
        productCards[0].classList.add('active');
    }
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    const cardContent = `
        <div class="product-image" style="background-image: url('${product.image}')"></div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                $${product.price.toFixed(2)}
            </div>
            <p class="product-review">"${product.reviewSnippet}"</p>
        </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
}

// Display product details
function displayProductDetails(product) {
    const productDetails = document.querySelector('.product-details');
    
    const detailsContent = `
        <div class="product-details-content">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details-info">
                <h2 class="product-details-title">${product.title}</h2>
                <div class="product-details-price">
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    $${product.price.toFixed(2)}
                </div>
                <div class="product-details-description">
                    <p>${product.description}</p>
                </div>
                <div class="product-details-features">
                    <h4>Features</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-details-review">
                    <p>"${product.reviewSnippet}"</p>
                </div>
                <p><strong>Ideal for:</strong> ${product.idealFor}</p>
                <a href="${product.buyLink}" class="buy-button" target="_blank">Buy Now</a>
            </div>
        </div>
    `;
    
    productDetails.innerHTML = detailsContent;
}

// Load related products
function loadRelatedProducts(products) {
    // Get a random subset of products for related products section
    const relatedProducts = getRandomSubset(products, 4);
    const relatedProductsGrid = document.querySelector('.related-products-grid');
    relatedProductsGrid.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        relatedProductsGrid.appendChild(productCard);
    });
    
    // Add event listeners to related product cards
    const relatedProductCards = document.querySelectorAll('.related-products-grid .product-card');
    relatedProductCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const selectedProduct = products.find(p => p.id === productId);
            
            // Update the carousel to highlight the selected product
            const carouselCards = document.querySelectorAll('.product-carousel .product-card');
            carouselCards.forEach(c => c.classList.remove('active'));
            
            const matchingCard = document.querySelector(`.product-carousel .product-card[data-id="${productId}"]`);
            if (matchingCard) {
                matchingCard.classList.add('active');
                // Scroll the carousel to show the selected product
                matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            
            // Display the details of the selected product
            displayProductDetails(selectedProduct);
            
            // Scroll to product details
            document.querySelector('.product-details').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Get random subset of products
function getRandomSubset(array, size) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}

// Scroll carousel left
function scrollCarouselLeft() {
    const carousel = document.querySelector('.product-carousel');
    carousel.scrollBy({ left: -350, behavior: 'smooth' });
}

// Scroll carousel right
function scrollCarouselRight() {
    const carousel = document.querySelector('.product-carousel');
    carousel.scrollBy({ left: 350, behavior: 'smooth' });
}

// Filter products based on selected pill
function filterProducts(filterText) {
    let filteredProducts = [];
    
    switch(filterText) {
        case 'All':
            filteredProducts = bicycleData;
            break;
        case 'Mountain Bikes':
            filteredProducts = bicycleData.filter(product => product.type.includes('Mountain') && !product.type.includes('Electric'));
            break;
        case 'Road Bikes':
            filteredProducts = bicycleData.filter(product => product.type.includes('Road'));
            break;
        case 'Hybrid Bikes':
            filteredProducts = bicycleData.filter(product => product.type.includes('Hybrid'));
            break;
        case 'Under $200':
            filteredProducts = bicycleData.filter(product => product.price < 200);
            break;
        case '$200-$500':
            filteredProducts = bicycleData.filter(product => product.price >= 200 && product.price <= 500);
            break;
        case 'Over $500':
            filteredProducts = bicycleData.filter(product => product.price > 500);
            break;
        default:
            filteredProducts = bicycleData;
    }
    
    // Load filtered products into carousel
    loadProductsIntoCarousel(filteredProducts);
    
    // Display the first filtered product details
    if (filteredProducts.length > 0) {
        displayProductDetails(filteredProducts[0]);
    } else {
        // If no products match the filter, display a message
        document.querySelector('.product-details').innerHTML = '<p>No products match your filter criteria. Please try another filter.</p>';
    }
    
    // Also update related products based on the filtered list
    loadRelatedProducts(filteredProducts.length > 0 ? filteredProducts : bicycleData);
}

// Filter products by search query
function filterProductsBySearch(query) {
    const filteredProducts = bicycleData.filter(product => {
        return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            product.idealFor.toLowerCase().includes(query) ||
            product.features.some(feature => feature.toLowerCase().includes(query))
        );
    });
    
    // Load filtered products into carousel
    loadProductsIntoCarousel(filteredProducts);
    
    // Display the first filtered product details
    if (filteredProducts.length > 0) {
        displayProductDetails(filteredProducts[0]);
    } else {
        // If no products match the search, display a message
        document.querySelector('.product-details').innerHTML = '<p>No products match your search criteria. Please try a different search term.</p>';
    }
    
    // Also update related products based on the filtered list
    loadRelatedProducts(filteredProducts.length > 0 ? filteredProducts : bicycleData);
    
    // Update heading to show search results
    document.querySelector('.search-results h2').textContent = `Search Results for "${query}"`;
} 