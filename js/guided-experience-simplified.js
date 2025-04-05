// guided-experience-simplified.js

// Ensure ai-processor.js is loaded first and defines AIQueryProcessor globally or via modules
let aiProcessorSimplified = null;
try {
    const storedApiKey = localStorage.getItem('openai_api_key') || '';
    console.log(`[guided-exp] Initializing with API key: ${storedApiKey ? 'Found key' : 'No key'}, Length: ${storedApiKey.length}`);
    
    if (typeof AIQueryProcessor !== 'undefined') {
        aiProcessorSimplified = new AIQueryProcessor(storedApiKey);
    } else {
        console.error("AIQueryProcessor class not available");
    }
} catch (error) {
    console.error("Error initializing AIQueryProcessor:", error);
}

// Global state for this guided flow
let currentAIQuestionIndex = 0;
let aiAnswers = {};
let currentAISport = null;
let currentAIQuestions = [];
let finalProductRecommendation = null; // To store the single final product

// --- DOM Element References (Ensure IDs match index.html) ---
const guidedPageElement = document.getElementById('guided-page');
const aiInteractionArea = document.getElementById('ai-interaction-area');
const aiQuestionContainer = document.getElementById('ai-question-container');
const aiOptionsContainer = document.getElementById('ai-options-container');
const aiBackButton = document.getElementById('ai-back-button');
const aiSkipButton = document.getElementById('ai-skip-button');
const finalResultArea = document.getElementById('final-result-area');
const finalProductDisplay = document.getElementById('final-product-display');
const searchAgainButtonGuided = document.getElementById('search-again-button'); // Button within guided page

// Add event listeners if elements exist
if (aiBackButton) aiBackButton.addEventListener('click', handleAIBack);
if (aiSkipButton) aiSkipButton.addEventListener('click', handleAISkip);
if (searchAgainButtonGuided) searchAgainButtonGuided.addEventListener('click', () => {
    if (typeof showPage === 'function') showPage('search-page');
});

// --- Main Function to Start the Flow ---
async function startSimplifiedGuidedExperience(initialQuery) {
    console.log("Starting Simplified Guided Experience with query:", initialQuery);
    if (!aiProcessorSimplified) {
        displayAIError("AI Processor not initialized.");
        return;
    }

    // Reset state
    currentAIQuestionIndex = 0;
    aiAnswers = {};
    currentAISport = null;
    currentAIQuestions = [];
    finalProductRecommendation = null;
    if(aiInteractionArea) aiInteractionArea.classList.remove('hidden');
    if(finalResultArea) finalResultArea.classList.add('hidden');
    if(aiQuestionContainer) aiQuestionContainer.innerHTML = ''; // Clear previous questions
    if(aiOptionsContainer) aiOptionsContainer.innerHTML = ''; // Clear previous options

    // Update API key in processor instance - fetch fresh from localStorage
    const freshApiKey = localStorage.getItem('openai_api_key') || '';
    console.log(`[guided-exp] Using fresh API key from localStorage: ${freshApiKey ? 'Found' : 'Not found'}, Length: ${freshApiKey.length}`);
    
    if (!freshApiKey || freshApiKey.length < 30) { // OpenAI keys are typically longer than 30 chars
        console.error("Invalid or missing API key in localStorage");
        displayAIError("OpenAI API Key is not configured correctly. Please update your API key.");
        return;
    }
    
    aiProcessorSimplified.setApiKey(freshApiKey);
    if (!aiProcessorSimplified.isConfigured) {
        displayAIError("OpenAI API Key is not configured.");
        return;
    }

    displayAILoading("Analyzing your request and preparing questions...");

    try {
        // --- Initial AI Call: Get Sport, Preferences, and Questions ---
        const analysisResult = await aiProcessorSimplified.analyzeQuery(initialQuery);
        console.log("Initial AI Analysis:", analysisResult);

        hideAILoading();

        // Validate response
        if (!analysisResult || !analysisResult.sport || !analysisResult.suggested_questions || analysisResult.suggested_questions.length === 0) {
            console.error("AI analysis failed or didn't provide sport/questions.", analysisResult);
            displayAIError("Sorry, I couldn't determine the sport or generate questions based on your request. Please try rephrasing.");
            return;
        }

        // Store initial results
        currentAISport = analysisResult.sport;
        aiAnswers['initial_query'] = initialQuery;
        aiAnswers['detected_sport'] = currentAISport;
        if (analysisResult.product_type) aiAnswers['detected_product_type'] = analysisResult.product_type;
        if (analysisResult.user_preferences) aiAnswers['detected_preferences'] = analysisResult.user_preferences;

        // Prepare questions array
        currentAIQuestions = analysisResult.suggested_questions.map((q, index) => ({
            id: `ai_q_${index}`,
            question: q,
            type: 'text' // Assuming text input for now
        }));

        // Start the question sequence
        currentAIQuestionIndex = 0;
        loadNextAIQuestion();

    } catch (error) {
        console.error("Error during initial AI query:", error);
        hideAILoading();
        displayAIError(`An error occurred: ${error.message}. Please try again.`);
    }
}

// --- Question Handling ---

function loadNextAIQuestion() {
    console.log(`[guided-exp] loadNextAIQuestion called. Index: ${currentAIQuestionIndex}`);
    
    // Re-fetch elements inside the function to ensure they are fresh
    const currentQuestionContainer = document.getElementById('ai-question-container');
    const currentOptionsContainer = document.getElementById('ai-options-container');

    // Ensure elements exist
    console.log(`[guided-exp] Checking DOM elements: currentQuestionContainer=${!!currentQuestionContainer}, currentOptionsContainer=${!!currentOptionsContainer}`);
    if (!currentQuestionContainer || !currentOptionsContainer) {
        displayAIError("UI Error: Cannot display question. Container elements not found.");
        return;
    }

    // Check if we've finished all questions
    if (currentAIQuestionIndex >= currentAIQuestions.length) {
        console.log("All AI questions answered.");
        finalizeAndShowResult();
        return;
    }

    const question = currentAIQuestions[currentAIQuestionIndex];
    console.log(`[guided-exp] Current question object:`, question);
    if (!question || !question.question) {
         console.error("Invalid question object or missing question text.", question);
         displayAIError("Error retrieving the next question.");
         return; // Stop if question is invalid
    }

    // --- Attempt 1: innerHTML (with logging) ---
    console.log(`[guided-exp] Attempting to set innerHTML for question: ${question.question}`);
    currentQuestionContainer.innerHTML = `<h2>${question.question}</h2>`;
    console.log(`[guided-exp] AFTER setting innerHTML, currentQuestionContainer.innerHTML is:`, currentQuestionContainer.innerHTML);
    
    // --- Check if it worked --- 
    if (!currentQuestionContainer.querySelector('h2')) {
        console.error('[guided-exp] FAILED to set question using innerHTML. Trying alternative method.');
        // --- Attempt 2: Manual Element Creation ---
        currentQuestionContainer.innerHTML = ''; // Clear again just in case
        const h2Element = document.createElement('h2');
        h2Element.textContent = question.question;
        currentQuestionContainer.appendChild(h2Element);
        console.log(`[guided-exp] AFTER alternative appendChild, currentQuestionContainer.innerHTML is:`, currentQuestionContainer.innerHTML);
    } else {
        console.log('[guided-exp] innerHTML method seems to have worked.');
    }

    // --- Continue with Options --- 
    currentOptionsContainer.innerHTML = ''; // Clear previous options
    console.log('[guided-exp] Cleared options container');

    // Create input field and button (assuming type 'text')
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = `answer_${question.id}`;
    inputElement.placeholder = 'Your answer here...';
    inputElement.className = 'ai-answer-input';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Next';
    submitButton.className = 'ai-answer-submit';
    submitButton.onclick = () => handleAISubmit(question.id, inputElement.value);

    // *** Use local variables for appending ***
    currentOptionsContainer.appendChild(inputElement);
    currentOptionsContainer.appendChild(submitButton);
    console.log('[guided-exp] Appended input and button to options container');

    // Add Enter key listener
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAISubmit(question.id, inputElement.value);
        }
    });
    inputElement.focus();

    updateAINavigation();
}

function handleAISubmit(questionId, answerValue) {
    const answer = answerValue.trim();
    if (answer) {
        aiAnswers[questionId] = answer; // Store the answer
        console.log(`Answer stored for ${questionId}: ${answer}`);
    } else {
        console.log(`Question ${questionId} skipped (no answer provided).`);
        // Optionally store null or skip storing for skipped questions
        delete aiAnswers[questionId]; // Remove if previously answered then cleared
    }
    currentAIQuestionIndex++;
    loadNextAIQuestion();
}

function handleAIBack() {
    if (currentAIQuestionIndex > 0) {
        currentAIQuestionIndex--;
        // Don't delete the answer when going back, allow user to see/edit it
        loadNextAIQuestion();
        // Pre-fill the input with the previous answer if it exists
        const questionId = currentAIQuestions[currentAIQuestionIndex]?.id;
        const inputElement = document.getElementById(`answer_${questionId}`);
        if(inputElement && aiAnswers[questionId]) {
            inputElement.value = aiAnswers[questionId];
        }
    } else {
        console.log("Cannot go back from the first AI question.");
        // Optionally allow going back to search page?
        // if (typeof showPage === 'function') showPage('search-page');
    }
}

function handleAISkip() {
    const questionId = currentAIQuestions[currentAIQuestionIndex]?.id;
    console.log(`Skipping question ${questionId}`);
    delete aiAnswers[questionId]; // Ensure no answer is stored if skipped
    currentAIQuestionIndex++;
    loadNextAIQuestion();
}

function updateAINavigation() {
    if (!aiBackButton || !aiSkipButton) return;
    aiBackButton.classList.toggle('hidden', currentAIQuestionIndex <= 0);
    aiSkipButton.classList.toggle('hidden', currentAIQuestionIndex >= currentAIQuestions.length); // Hide skip on last question?
    // Or maybe hide skip once finalizing results? -> hide when finalizing
}

// --- Result Handling ---

async function finalizeAndShowResult() {
    console.log("Finalizing results with answers:", aiAnswers);
    if(aiInteractionArea) aiInteractionArea.classList.add('hidden'); // Hide question area
    if(finalResultArea) finalResultArea.classList.remove('hidden'); // Show result area
    if(finalProductDisplay) finalProductDisplay.innerHTML = ''; // Clear previous result

    displayAILoading("Finding the best match based on your answers...");

    // ** TODO: Implement actual product filtering/selection logic here **
    // This function needs to take `aiAnswers` and use them to search
    // through the relevant product data (e.g., `window.bicycleData`).
    // For now, it will just pick a random product from the detected sport category.
    finalProductRecommendation = findBestMatchBasedOnAI(aiAnswers);

    hideAILoading();

    if (finalProductRecommendation) {
        displayFinalProduct(finalProductRecommendation);
    } else {
        displayAIError("Couldn't find a suitable product based on your answers. Try searching again with different terms or answers.", true); // Allow search again
    }
}

// ** Placeholder Filtering Logic - Needs Real Implementation **
function findBestMatchBasedOnAI(answers) {
    console.warn("findBestMatchBasedOnAI is using placeholder logic!");
    const sport = answers.detected_sport;
    let productPool = [];

    try {
         switch (sport?.toLowerCase()) {
            case 'bicycles': productPool = window.bicycleData || []; break;
            case 'baseball': productPool = window.baseballData || []; break;
            case 'climbing': productPool = window.climbingData || []; break;
            case 'soccer':   productPool = window.soccerData || []; break;
            default: return null;
        }
    } catch (e) {
        console.error("Error accessing product data for filtering:", e);
        return null;
    }
   

    if (productPool.length === 0) {
        console.log("No products available for sport:", sport);
        return null;
    }

    // --- Add real filtering/scoring based on `answers` here --- 
    // Example: Score products based on keyword matches in description/features vs answers.
    // For now, just pick a random one from the pool.
    const randomIndex = Math.floor(Math.random() * productPool.length);
    console.log(`Placeholder: Selecting random product at index ${randomIndex} from ${productPool.length} options.`);
    return productPool[randomIndex];
}

function displayFinalProduct(product) {
    if (!finalProductDisplay) return;
    console.log("Displaying final product:", product);

    // Simple display - enhance this for a large visual
    // Ensure product object has expected properties (name, image, description, price)
    finalProductDisplay.innerHTML = `
        <div class="final-product-card">
             <img src="${product.images && product.images.length > 0 ? product.images[0] : 'img/placeholder.png'}" alt="${product.name || 'Product'}" class="final-product-image">
             <h3>${product.name || 'Recommended Product'}</h3>
             <p>${product.description || 'No description available.'}</p>
             <div class="final-price">${product.price ? `$${product.price.toFixed(2)}` : 'Price unavailable'}</div>
             ${product.discountedPrice ? `<div class="final-discount">Sale: $${product.discountedPrice.toFixed(2)}</div>` : ''}
             <!-- Add more details or a 'View Details' button -->
         </div>
    `;
    // Add CSS for .final-product-card, .final-product-image, .final-price, .final-discount
}


// --- UI Helpers ---

function displayAILoading(message) {
    console.log("Loading:", message);
     if (!aiQuestionContainer || !aiOptionsContainer) return;
     // Simple text loading indicator
     aiQuestionContainer.innerHTML = `<p class="loading-message">${message || 'Processing...'}</p>`; // Needs CSS for .loading-message
     aiOptionsContainer.innerHTML = ''; // Clear options area
     if(aiBackButton) aiBackButton.classList.add('hidden');
     if(aiSkipButton) aiSkipButton.classList.add('hidden');
     
     // Show loading indicator in final result area too if needed
     if(finalResultArea && !finalResultArea.classList.contains('hidden')) {
         if(finalProductDisplay) finalProductDisplay.innerHTML = `<p class="loading-message">${message || 'Processing...'}</p>`;
     }
}

function hideAILoading() {
    // Clear loading message if it exists
    const loadingMsg = aiQuestionContainer?.querySelector('.loading-message');
    if (loadingMsg) loadingMsg.remove();
    const loadingMsgFinal = finalProductDisplay?.querySelector('.loading-message');
     if (loadingMsgFinal) loadingMsgFinal.remove();
}

function displayAIError(message, showSearchAgain = false) {
    console.error("AI Flow Error:", message);
     if (!aiQuestionContainer || !aiOptionsContainer) return;
     aiQuestionContainer.innerHTML = `<p class="error-message">${message}</p>`;
     aiOptionsContainer.innerHTML = '';
     if(aiBackButton) aiBackButton.classList.add('hidden');
     if(aiSkipButton) aiSkipButton.classList.add('hidden');
     
     // Also show error in final result area if appropriate
      if(finalResultArea && !finalResultArea.classList.contains('hidden')) {
         if(finalProductDisplay) finalProductDisplay.innerHTML = `<p class="error-message">${message}</p>`;
     }

     if(showSearchAgain && searchAgainButtonGuided) {
         // Make sure search again button is visible within the guided page context
         // (It might already be visible if finalResultArea is shown)
     }
}

// Ensure necessary helper functions (like getSportDisplayName) are available
// If they were in the old guided-experience.js, they might need to be moved to utils.js
function getSportDisplayName(sportId) {
    if (!sportId) return 'Sport';
    const displayNames = {
        'bicycles': 'Bicycles',
        'bicycle': 'Bicycles',
        'baseball': 'Baseball',
        'climbing': 'Climbing',
        'soccer': 'Soccer'
    };
    return displayNames[sportId.toLowerCase()] || sportId;
}

console.log("Simplified Guided Experience script loaded."); 