// main-simplified.js

document.addEventListener('DOMContentLoaded', () => {
    initializeAppSimplified();
});

function initializeAppSimplified() {
    console.log("Initializing Simplified App...");

    // --- Page Elements ---
    const searchPage = document.getElementById('search-page');
    const guidedPage = document.getElementById('guided-page');
    const mainSearchInput = document.getElementById('main-search-input');
    const startFindingButton = document.getElementById('start-finding-button');
    const searchAgainButton = document.getElementById('search-again-button');

    // --- API Key Dialog Elements ---
    const apiKeyButton = document.getElementById('api-key-button');
    const apiKeyDialog = document.getElementById('api-key-dialog');
    const saveKeyButton = document.getElementById('save-key-button');
    const cancelKeyButton = document.getElementById('cancel-key-button');
    const apiKeyInput = document.getElementById('api-key-input');
    const overlay = document.getElementById('overlay');
    const emergencyCloseBtn = document.getElementById('emergency-close');

    // --- Input Validation ---
    if (!searchPage || !guidedPage || !mainSearchInput || !startFindingButton || !searchAgainButton || !apiKeyButton || !apiKeyDialog || !saveKeyButton || !cancelKeyButton || !apiKeyInput || !overlay || !emergencyCloseBtn) {
        console.error("Initialization failed: One or more essential elements not found in the DOM.");
        // Optionally display an error message to the user on the page itself
        document.body.innerHTML = "<p style='color:red; padding: 20px;'>Error: UI elements missing. Cannot initialize application.</p>";
        return;
    }

    // --- Initial State ---
    showPage('search-page'); // Start on the search page
    updateApiKeyButtonText(); // Set initial text for API key button

    // --- Event Listeners ---

    // Start Finding Button
    startFindingButton.addEventListener('click', handleStartFinding);

    // Main Search Input (Enter Key)
    mainSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            handleStartFinding();
        }
    });

    // API Key Button
    apiKeyButton.addEventListener('click', () => {
        apiKeyInput.value = localStorage.getItem('openai_api_key') || ''; // Pre-fill if exists
        apiKeyDialog.classList.remove('hidden');
        overlay.classList.remove('hidden');
        apiKeyInput.focus();
    });

    // Save API Key
    saveKeyButton.addEventListener('click', () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey && apiKey.startsWith('sk-')) { // Basic validation
            localStorage.setItem('openai_api_key', apiKey);
            // Update AI processor instance if it exists
            if (window.aiProcessorSimplified) {
                window.aiProcessorSimplified.setApiKey(apiKey);
            }
            closeApiKeyDialog();
            updateApiKeyButtonText();
            showNotification('API key saved successfully!'); // Assumes showNotification exists (e.g., in utils.js)
        } else {
            showNotification('Please enter a valid OpenAI API key (should start with sk-).', 'error');
        }
    });

    // Cancel/Close API Key Dialog
    cancelKeyButton.addEventListener('click', closeApiKeyDialog);
    overlay.addEventListener('click', closeApiKeyDialog);
    emergencyCloseBtn.addEventListener('click', closeApiKeyDialog);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !apiKeyDialog.classList.contains('hidden')) {
            closeApiKeyDialog();
        }
    });

    // Search Again Button (on results page)
    searchAgainButton.addEventListener('click', () => {
        showPage('search-page'); // Go back to the search page
        mainSearchInput.value = ''; // Clear the input
        mainSearchInput.focus();
    });
}

// --- Core Functions ---

function handleStartFinding() {
    const query = document.getElementById('main-search-input').value.trim();
    if (!query) {
        showNotification('Please enter what you are looking for.', 'error');
        return;
    }

    // Check if API key is set
    if (!localStorage.getItem('openai_api_key')) {
         showNotification('Please set your OpenAI API Key first.', 'error');
         // Optionally open the dialog directly
         document.getElementById('api-key-button').click();
         return;
    }

    console.log("Starting AI Guided Flow with query:", query);
    showPage('guided-page'); // Switch to the guided page

    // Call the function from guided-experience-simplified.js to start the AI flow
    if (typeof startSimplifiedGuidedExperience === 'function') {
        startSimplifiedGuidedExperience(query);
    } else {
        console.error("startSimplifiedGuidedExperience function not found! Check guided-experience-simplified.js.");
        // Display an error on the guided page if the function is missing
        const interactionArea = document.getElementById('ai-interaction-area');
        if(interactionArea) interactionArea.innerHTML = "<p class='error-message'>Error starting guided experience.</p>";
    }
}

function showPage(pageId) {
    console.log("Switching to page:", pageId);
    const searchPage = document.getElementById('search-page');
    const guidedPage = document.getElementById('guided-page');

    if (pageId === 'search-page') {
        if(searchPage) searchPage.classList.remove('hidden');
        if(guidedPage) guidedPage.classList.add('hidden');
         // Hide specific parts of guided page when switching back
         const interactionArea = document.getElementById('ai-interaction-area');
         const finalResultArea = document.getElementById('final-result-area');
         if(interactionArea) interactionArea.classList.remove('hidden'); // Show questions area initially
         if(finalResultArea) finalResultArea.classList.add('hidden'); // Hide results area
    } else if (pageId === 'guided-page') {
        if(searchPage) searchPage.classList.add('hidden');
        if(guidedPage) guidedPage.classList.remove('hidden');
         // Reset guided page state when switching to it
         const interactionArea = document.getElementById('ai-interaction-area');
         const finalResultArea = document.getElementById('final-result-area');
         if(interactionArea) interactionArea.classList.remove('hidden'); // Ensure interaction area is visible
         if(interactionArea) interactionArea.innerHTML = '<div id="ai-question-container"></div><div id="ai-options-container"></div><div class="ai-navigation"><button id="ai-back-button" class="secondary-button hidden">Back</button><button id="ai-skip-button" class="tertiary-button hidden">Skip</button></div>'; // Reset content
         if(finalResultArea) finalResultArea.classList.add('hidden'); // Hide results area
    } else {
        console.error("Unknown page ID:", pageId);
    }
}

function closeApiKeyDialog() {
    const apiKeyDialog = document.getElementById('api-key-dialog');
    const overlay = document.getElementById('overlay');
    if(apiKeyDialog) apiKeyDialog.classList.add('hidden');
    if(overlay) overlay.classList.add('hidden');
}

function updateApiKeyButtonText() {
     const apiKeyButton = document.getElementById('api-key-button');
     if (!apiKeyButton) return;
     if (localStorage.getItem('openai_api_key')) {
        apiKeyButton.textContent = 'Update API Key';
    } else {
        apiKeyButton.textContent = 'Set OpenAI API Key';
    }
}

// Placeholder for showNotification - ensure this is defined (e.g., in utils.js)
function showNotification(message, type = 'success') {
    console.log(`Notification (${type}): ${message}`);
    // Actual implementation might create a temporary div element
    // Example structure:
    /*
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (document.body.contains(notification)) {
             document.body.removeChild(notification);
        }
    }, 3000);
    */
}

