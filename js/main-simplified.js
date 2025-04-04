document.addEventListener('DOMContentLoaded', function() {
    // Debug logs
    console.log('DOM loaded');
    console.log('Bicycle data:', bicycleData);
    
    // Initialize the application
    if (bicycleData && bicycleData.length > 0) {
        console.log('Loading first bike:', bicycleData[0]);
        showFeaturedProduct(bicycleData[0]); // Show the first bike by default
    } else {
        console.error('No bicycle data available!');
        document.querySelector('.featured-product').innerHTML = '<p>Error loading bicycle data. Please check your console.</p>';
    }
    
    // Filter pills event listeners
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Filter products based on selected pill
            filterAndShowFeaturedProduct(this.innerText);
        });
    });
    
    // Search form event listener
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        // If search query is not empty, filter products
        if (searchQuery) {
            searchAndShowFeaturedProduct(searchQuery);
        } else {
            // If empty, show default product
            showFeaturedProduct(bicycleData[0]);
        }
    });
});

// Show a featured product
function showFeaturedProduct(product) {
    console.log('Showing product:', product);
    const featuredSection = document.querySelector('.featured-product');
    
    try {
        const featuredContent = `
            <div class="featured-image" style="background-image: url('${product.image}')"></div>
            <div class="featured-info">
                <h2 class="featured-title">${product.title}</h2>
                <div class="featured-price">
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    $${product.price.toFixed(2)}
                </div>
                <p class="featured-quote">"${product.reviewSnippet}"</p>
                <a href="${product.buyLink}" class="featured-buy-button" target="_blank">Buy Now</a>
            </div>
        `;
        
        featuredSection.innerHTML = featuredContent;
        console.log('Image URL set to:', product.image);
    } catch (error) {
        console.error('Error displaying product:', error);
        featuredSection.innerHTML = `<p>Error displaying product: ${error.message}</p>`;
    }
}

// Filter products based on selected pill and show the first matching product
function filterAndShowFeaturedProduct(filterText) {
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
    
    console.log('Filtered products for', filterText, ':', filteredProducts);
    
    // Show the first product from filtered results or a message if none found
    if (filteredProducts.length > 0) {
        showFeaturedProduct(filteredProducts[0]);
    } else {
        const featuredSection = document.querySelector('.featured-product');
        featuredSection.innerHTML = '<p>No products match your filter criteria. Please try another filter.</p>';
    }
}

// Search products and show the first matching product
function searchAndShowFeaturedProduct(query) {
    const filteredProducts = bicycleData.filter(product => {
        return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            product.idealFor.toLowerCase().includes(query) ||
            product.features.some(feature => feature.toLowerCase().includes(query))
        );
    });
    
    // Show the first product from search results or a message if none found
    if (filteredProducts.length > 0) {
        showFeaturedProduct(filteredProducts[0]);
    } else {
        const featuredSection = document.querySelector('.featured-product');
        featuredSection.innerHTML = '<p>No products match your search criteria. Please try a different search term.</p>';
    }
    
    // Update heading to show search results
    document.querySelector('.search-results h2').textContent = `Search Results for "${query}"`;
} 