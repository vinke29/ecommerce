// Configuration settings for SportsFinder app

const config = {
    // OpenAI API key (this should be set by the user in the interface)
    openaiApiKey: '',
    
    // Feature flags
    features: {
        smartSearch: true,    // Enable smart search with AI processing
        showConfidence: false  // Show confidence score in UI (for debugging)
    },
    
    // API endpoints
    apis: {
        openai: 'https://api.openai.com/v1/chat/completions'
    }
};

// Get a config value
function getConfig(key) {
    if (key.includes('.')) {
        const parts = key.split('.');
        let current = config;
        for (const part of parts) {
            if (!current[part]) return null;
            current = current[part];
        }
        return current;
    }
    return config[key] || null;
}

// Set a config value
function setConfig(key, value) {
    if (key.includes('.')) {
        const parts = key.split('.');
        let current = config;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    } else {
        config[key] = value;
    }
}

// Export the functions and configuration
if (typeof module !== 'undefined') {
    module.exports = { config, getConfig, setConfig };
} 