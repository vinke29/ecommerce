/**
 * Utility functions for the SportsFinder application
 */

// Get display-friendly sport name
function getSportDisplayName(sport) {
    const displayNames = {
        'bicycle': 'Bicycles',
        'baseball': 'Baseball',
        'climbing': 'Climbing',
        'soccer': 'Soccer'
    };
    
    return displayNames[sport] || sport.charAt(0).toUpperCase() + sport.slice(1);
}

// Get display-friendly product type name
function getProductTypeDisplayName(productType) {
    // Replace hyphens with spaces and capitalize each word
    return productType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Format price with currency symbol
function formatPrice(price, currency = '$') {
    return `${currency}${price.toFixed(2)}`;
}

// Calculate discount percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
        return null;
    }
    
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Capitalize first letter of each word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, letter => letter.toUpperCase());
}

// Safe JSON parsing with error handling
function safeJsonParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return fallback;
    }
}

// Check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Create an HTML element with attributes and children
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // Append children
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    
    return element;
} 