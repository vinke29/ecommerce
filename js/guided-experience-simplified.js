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
        currentAIQuestions = analysisResult.suggested_questions.map((qData, index) => ({
            id: `ai_q_${index}`,
            question: qData.question,
            options: qData.options || [], // Ensure options array exists
            type: 'multiple-choice' // Set type based on API response structure
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

    // --- Display Question and Progress --- 
    const progressIndicator = `(${currentAIQuestionIndex + 1}/${currentAIQuestions.length})`;
    currentQuestionContainer.innerHTML = `<h2>${question.question} <span class="question-progress">${progressIndicator}</span></h2>`;
    console.log(`[guided-exp] AFTER setting innerHTML, currentQuestionContainer.innerHTML is:`, currentQuestionContainer.innerHTML);
    
    // --- Continue with Options --- 
    currentOptionsContainer.innerHTML = ''; // Clear previous options
    console.log('[guided-exp] Cleared options container');

    // --- Create Option Buttons --- 
    if (question.type === 'multiple-choice' && question.options && question.options.length > 0) {
        question.options.forEach(optionText => {
            const optionButton = document.createElement('button');
            optionButton.textContent = optionText;
            optionButton.className = 'ai-option-button'; // New class for styling
            optionButton.onclick = () => handleAISubmit(question.id, optionText);
            currentOptionsContainer.appendChild(optionButton);
        });
        console.log(`[guided-exp] Appended ${question.options.length} option buttons.`);
    } else {
        // Fallback to text input if needed (though prompt asks for options)
        console.warn('[guided-exp] Question type not multiple-choice or no options provided. Falling back to text input.');
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = `answer_${question.id}`;
        inputElement.placeholder = 'Your answer here...';
        inputElement.className = 'ai-answer-input'; // Existing class

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Next';
        submitButton.className = 'ai-answer-submit'; // Existing class
        submitButton.onclick = () => handleAISubmit(question.id, inputElement.value);

        currentOptionsContainer.appendChild(inputElement);
        currentOptionsContainer.appendChild(submitButton);
        console.log('[guided-exp] Appended fallback text input and button.');

        inputElement.addEventListener('keypress', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 handleAISubmit(question.id, inputElement.value);
             }
         });
        inputElement.focus();
    }

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
    console.log("Finalizing results by asking AI for recommendations based on answers:", aiAnswers);
    if(aiInteractionArea) aiInteractionArea.classList.add('hidden'); // Hide question area
    if(finalResultArea) finalResultArea.classList.remove('hidden'); // Show result area
    if(finalProductDisplay) finalProductDisplay.innerHTML = ''; // Clear previous result

    displayAILoading("Asking the expert for the best match based on your answers...");

    try {
        // --- Get AI Recommendation --- 
        const recommendationResult = await getAIRecommendation(aiAnswers, currentAIQuestions);
        hideAILoading();

        if (recommendationResult && recommendationResult.products && recommendationResult.products.length > 0) {
            console.log("AI Recommendation Result:", recommendationResult);
            // Display the AI-generated recommendations
            displayAIRecommendations(recommendationResult.products);
        } else {
            console.error("AI failed to provide recommendations.", recommendationResult);
            displayAIError("Sorry, I couldn't come up with specific recommendations based on our conversation. Try searching again?", true);
        }
    } catch (error) {
        console.error("Error getting AI recommendation:", error);
        hideAILoading();
        displayAIError(`An error occurred while getting recommendations: ${error.message}. Please try again.`, true);
    }
}

// --- Function to get Recommendation from AI --- 
async function getAIRecommendation(answers, questionsAsked) {
    // 1. Format the conversation history
    let conversationSummary = `Original Query: ${answers.initial_query}\nDetected Sport: ${answers.detected_sport}\n\n`;
    questionsAsked.forEach((q, index) => {
        const questionId = q.id;
        const answer = answers[questionId];
        if (answer) {
            conversationSummary += `Q${index + 1}: ${q.question}\nA${index + 1}: ${answer}\n\n`;
        }
    });
    console.log("Sending conversation summary to AI:", conversationSummary);

    // 2. Define the recommendation prompt (can be refined)
    const recommendationPrompt = {
         model: 'gpt-3.5-turbo',
         messages: [
             {
                 role: 'system',
                 content: `You are a sports equipment expert. Based on the following conversation history (user query and Q&A), recommend 1 to 3 specific products. For each product, provide a name, a brief description of why it fits the user's needs based on their answers, and ideally key features (if known, otherwise omit). Avoid overly technical jargon. Focus on beginner-friendly options unless the conversation indicates otherwise. Respond ONLY in JSON format with a single key "products" which is an array of objects. Each object in the array should have keys: "name" (string), "reason" (string, explaining the fit), and optionally "features" (array of strings).`
             },
             {
                 role: 'user',
                 content: conversationSummary
             }
         ],
         temperature: 0.6, 
         response_format: { type: 'json_object' }
     };

    // 3. Call the AI (using the existing processor instance, assuming apiKey is set)
    if (!aiProcessorSimplified || !aiProcessorSimplified.isConfigured) {
        throw new Error("AI Processor not configured for recommendation call.");
    }

    try {
        // Note: We might need a more generic method in AIQueryProcessor if we add more call types
        // For now, let's reuse the fetch logic structure mentally
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiProcessorSimplified.apiKey.trim()}` 
            },
            body: JSON.stringify(recommendationPrompt)
        });

        console.log(`[AI Recommendation] API response status: ${response.status}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            console.error('OpenAI Recommendation API error:', data.error || `Status ${response.status}`);
            throw new Error(data.error?.message || `API request failed with status ${response.status}`);
        }

        // Extract and parse the JSON content
        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
             try {
                 const result = JSON.parse(data.choices[0].message.content);
                 return result; // Should contain { products: [...] }
             } catch (e) {
                 console.error('Error parsing AI recommendation response:', e, data.choices[0].message.content);
                 throw new Error('Failed to parse AI recommendation response.');
             }
        } else {
             console.error('Invalid response structure from OpenAI recommendation API:', data);
             throw new Error('Invalid response structure from AI.');
        }

    } catch (error) {
        console.error('Error calling OpenAI for recommendation:', error);
        throw error; // Re-throw the error to be caught by finalizeAndShowResult
    }
}


// --- Display AI Recommendations --- 
// (Replaces the old displayFinalProduct)
function displayAIRecommendations(products) {
    if (!finalProductDisplay) return;
    console.log("Displaying AI recommendations:", products);

    // Get the correct local product data pool based on the detected sport
    let localProductPool = [];
    try {
         switch (currentAISport?.toLowerCase()) {
            case 'bicycles': localProductPool = window.bicycleData || []; break;
            case 'baseball': localProductPool = window.baseballData || []; break;
            case 'climbing': localProductPool = window.climbingData || []; break;
            case 'soccer':   localProductPool = window.soccerData || []; break;
        }
    } catch (e) {
        console.error("Error accessing local product data for display:", e);
    }

    let htmlContent = '';
    products.forEach((aiProduct, index) => {
        // Find the matching product in the local data by name (case-insensitive)
        const localProduct = localProductPool.find(p => 
            p.name?.toLowerCase() === aiProduct.name?.toLowerCase()
        );
        
        console.log(`AI recommended: ${aiProduct.name}, Local match found:`, localProduct);

        // --- Determine Image and Price --- 
        let imageUrl, price, discountedPrice;
        let features = aiProduct.features || []; // Start with AI features

        if (localProduct) {
            // Use local data if found
            imageUrl = localProduct.images?.[0] || localProduct.image || 'https://via.placeholder.com/400x300.png?text=Product+Image';
            price = localProduct.price;
            discountedPrice = localProduct.discountedPrice;
            // If AI didn't provide features, use local ones
            if (features.length === 0 && localProduct.features && localProduct.features.length > 0) {
                features = localProduct.features;
            }
        } else {
            // Fallback if local data not found
            imageUrl = 'https://placehold.co/400x300/2a2a2a/eeeeee/png?text=Image+Not+Found'; // Different online placeholder
            price = null; // No price info
            discountedPrice = null;
            // Keep AI features if available
        }

        // --- Generate HTML --- 
        htmlContent += `
            <div class="final-product-card ai-recommendation">
                 <img src="${imageUrl}" alt="${aiProduct.name || 'Product'}" class="ai-recommendation-image">
                 <h3>${index + 1}. ${aiProduct.name || 'Recommended Product'}</h3>
                 ${price ? `<div class="ai-recommendation-price">${discountedPrice ? `<span class="original">$${price.toFixed(2)}</span> $${discountedPrice.toFixed(2)}` : `$${price.toFixed(2)}`}</div>` : ''}
                 <p><strong>Why it fits:</strong> ${aiProduct.reason || 'No specific reason provided.'}</p>
                 ${features.length > 0 
                    ? `<h4>Key Features:</h4><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>` 
                    : ''}
             </div>
        `;
    });

    if(htmlContent === '') { // Should not happen if products array is not empty, but safety check
        htmlContent = `<p class="error-message">Could not display recommendations.</p>`;
    }

    finalProductDisplay.innerHTML = htmlContent;
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