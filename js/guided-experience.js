document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentQuestionIndex = 0;
    let userSelections = [];
    let activeResultIndex = 0;
    let finalProducts = [];
    
    // Get elements
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const initialSearch = document.getElementById('initial-search');
    const startSearchBtn = document.getElementById('start-search');
    const resultsNumber = document.getElementById('results-number');
    const currentQuestion = document.getElementById('current-question');
    const optionsContainer = document.getElementById('options');
    const finalCount = document.getElementById('final-count');
    const resultsCarousel = document.querySelector('.results-carousel');
    
    // Event listeners
    startSearchBtn.addEventListener('click', startGuidedExperience);
    initialSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startGuidedExperience();
        }
    });
    
    // Start guided experience
    function startGuidedExperience() {
        // Validate that there's some text in the search box
        if (initialSearch.value.trim() === '') {
            initialSearch.classList.add('error');
            setTimeout(() => initialSearch.classList.remove('error'), 800);
            return;
        }
        
        // Hide step 1, show step 2
        step1.style.display = 'none';
        step2.style.display = 'flex';
        
        // Show first question
        showQuestion(0);
    }
    
    // Show a question
    function showQuestion(index) {
        currentQuestionIndex = index;
        const question = questions[index];
        
        // Display question text
        currentQuestion.textContent = question.text;
        
        // Clear options container
        optionsContainer.innerHTML = '';
        
        // Create option elements
        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option.text;
            optionElement.dataset.id = option.id;
            
            optionElement.addEventListener('click', function() {
                selectOption(option.id);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Update results count
        updateResultsCount();
    }
    
    // Update results count
    function updateResultsCount() {
        let count;
        
        if (currentQuestionIndex === 0) {
            count = questions[0].resultsCount;
        } else {
            const previousSelections = userSelections.join('-');
            count = questions[currentQuestionIndex].resultsCountByPreviousAnswer[previousSelections] || 0;
        }
        
        // Animate count change
        animateCount(parseInt(resultsNumber.textContent.replace(/,/g, '')), count);
    }
    
    // Animate count change
    function animateCount(start, end) {
        let current = start;
        const step = Math.ceil(Math.abs(end - start) / 50);
        const timer = setInterval(() => {
            if ((end > start && current >= end) || (end < start && current <= end)) {
                clearInterval(timer);
                resultsNumber.textContent = end.toLocaleString();
                return;
            }
            
            current = end > start ? current + step : current - step;
            resultsNumber.textContent = current.toLocaleString();
        }, 10);
    }
    
    // Select an option
    function selectOption(optionId) {
        // Add selection to user selections
        userSelections[currentQuestionIndex] = optionId;
        
        // Trim selections to current question index
        userSelections = userSelections.slice(0, currentQuestionIndex + 1);
        
        // Highlight selected option
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.id === optionId) {
                option.classList.add('selected');
            }
        });
        
        // Move to next question or show results
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                showQuestion(currentQuestionIndex + 1);
            } else {
                showResults();
            }
        }, 800);
    }
    
    // Show results
    function showResults() {
        // Get matching products based on user selections
        const selectionKey = userSelections.join('-');
        const productIds = productMatches[selectionKey] || [];
        
        // If no products match, show a fallback
        if (productIds.length === 0) {
            productIds.push(1, 2); // Default to first two products as fallback
        }
        
        // Get the final products
        finalProducts = productIds.map(id => bicycleData.find(product => product.id === id));
        
        // Update final count
        finalCount.textContent = finalProducts.length;
        
        // Hide step 2, show step 3
        step2.style.display = 'none';
        step3.style.display = 'block';
        
        // Clear carousel
        resultsCarousel.innerHTML = '';
        
        // Create carousel item for each product
        finalProducts.forEach((product, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${index === 0 ? 'active' : ''}`;
            resultItem.dataset.index = index;
            
            const html = `
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
                <div class="carousel-controls">
                    <div class="carousel-button prev"><i class="fas fa-chevron-left"></i></div>
                    <div class="carousel-button next"><i class="fas fa-chevron-right"></i></div>
                </div>
            `;
            
            resultItem.innerHTML = html;
            resultsCarousel.appendChild(resultItem);
        });
        
        // Create navigation dots
        const navigationDots = document.querySelector('.navigation-dots');
        navigationDots.innerHTML = '';
        
        for (let i = 0; i < finalProducts.length; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.index = i;
            
            dot.addEventListener('click', function() {
                showProduct(i);
            });
            
            navigationDots.appendChild(dot);
        }
        
        // Add event listeners to carousel buttons
        document.querySelectorAll('.carousel-button.prev').forEach(button => {
            button.addEventListener('click', showPreviousProduct);
        });
        
        document.querySelectorAll('.carousel-button.next').forEach(button => {
            button.addEventListener('click', showNextProduct);
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (step3.style.display === 'block') {
                if (e.code === 'ArrowLeft') {
                    showPreviousProduct();
                } else if (e.code === 'ArrowRight') {
                    showNextProduct();
                }
            }
        });
    }
    
    // Show a specific product
    function showProduct(index) {
        if (index < 0) {
            index = finalProducts.length - 1;
        } else if (index >= finalProducts.length) {
            index = 0;
        }
        
        // Update active result item
        document.querySelectorAll('.result-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.result-item[data-index="${index}"]`).classList.add('active');
        
        // Update active dot
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
        
        // Update active index
        activeResultIndex = index;
    }
    
    // Show previous product
    function showPreviousProduct() {
        showProduct(activeResultIndex - 1);
    }
    
    // Show next product
    function showNextProduct() {
        showProduct(activeResultIndex + 1);
    }
}); 