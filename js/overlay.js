document.addEventListener('DOMContentLoaded', function() {
    // Initialize with the first bike
    showFeaturedProduct(bicycleData[0]);
    
    // Set up keyboard navigation for demo purposes
    document.addEventListener('keydown', function(e) {
        // Right arrow key to show next bike
        if (e.code === 'ArrowRight') {
            const currentId = parseInt(document.querySelector('.featured-product').getAttribute('data-id'));
            const nextIndex = (currentId % bicycleData.length) + 1;
            const nextBike = bicycleData.find(bike => bike.id === nextIndex);
            if (nextBike) {
                showFeaturedProduct(nextBike);
            }
        }
        // Left arrow key to show previous bike
        else if (e.code === 'ArrowLeft') {
            const currentId = parseInt(document.querySelector('.featured-product').getAttribute('data-id'));
            const prevIndex = currentId > 1 ? currentId - 1 : bicycleData.length;
            const prevBike = bicycleData.find(bike => bike.id === prevIndex);
            if (prevBike) {
                showFeaturedProduct(prevBike);
            }
        }
    });
});

// Show a featured product with overlay
function showFeaturedProduct(product) {
    const featuredSection = document.querySelector('.featured-product');
    featuredSection.setAttribute('data-id', product.id);
    
    const featuredContent = `
        <div class="featured-image" style="background-image: url('${product.image}')"></div>
        <div class="overlay">
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
} 