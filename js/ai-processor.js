// AI Query Processor for SportsFinder
// This module uses OpenAI's API to analyze user search queries and extract relevant information

class AIQueryProcessor {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.isConfigured = !!apiKey;
        this.sportKeywords = {
            bicycles: ['bike', 'bicycle', 'cycling', 'mountain bike', 'road bike', 'cycling', 'biking', 'pedal'],
            baseball: ['baseball', 'bat', 'glove', 'mitt', 'ball', 'baseball bat', 'baseball glove', 'catcher'],
            climbing: ['climbing', 'rock climbing', 'boulder', 'harness', 'belay', 'carabiner', 'climbing shoes'],
            soccer: ['soccer', 'football', 'cleats', 'shin guard', 'soccer ball', 'football boot', 'goalkeeper']
        };
    }

    // Simple keyword-based analysis (fallback if API is not configured)
    simpleAnalyzeQuery(query) {
        query = query.toLowerCase();
        let detectedSport = null;
        let confidence = 0;
        
        // Check each sport's keywords
        for (const [sport, keywords] of Object.entries(this.sportKeywords)) {
            for (const keyword of keywords) {
                if (query.includes(keyword)) {
                    detectedSport = sport;
                    confidence = 0.8; // Fixed confidence for keyword matches
                    break;
                }
            }
            if (detectedSport) break;
        }
        
        return {
            sport: detectedSport,
            confidence: confidence,
            original_query: query
        };
    }

    // Use OpenAI API to analyze the query
    async analyzeQuery(query) {
        // If API key is not configured, fall back to simple analysis
        if (!this.isConfigured || !this.apiKey) {
            console.error('AnalyzeQuery called but API key not configured or missing!', this.apiKey);
            return this.simpleAnalyzeQuery(query);
        }

        // Clean up the API key - remove any leading/trailing whitespace
        const cleanApiKey = this.apiKey.trim();
        
        console.log(`[ai-processor] Making API call. Key starts with: ${cleanApiKey?.substring(0, 5)}... Is configured: ${this.isConfigured}`);
        console.log(`[ai-processor] Key length: ${cleanApiKey?.length}, Contains 'Bearer'?: ${cleanApiKey?.includes('Bearer')}`);

        try {
            // Log the exact headers being sent (without revealing full key)
            const authHeader = `Bearer ${cleanApiKey}`;
            console.log(`[ai-processor] Auth header format: ${authHeader.substring(0, 15)}...`);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a sports equipment advisor. Analyze the user's search query to understand their needs. Determine the sport (bicycles, baseball, climbing, soccer) and any mentioned product types or preferences (e.g., terrain type for bikes, material, skill level). Based on this analysis, generate 2-3 specific follow-up questions to clarify their needs and help narrow down product choices. The questions should be relevant to the detected sport and preferences. Respond ONLY in JSON format with the following fields: "sport" (one of the available sports or null if unclear), "confidence" (a number between 0 and 1), "product_type" (specific product type if detectable, or null), "user_preferences" (array of detected preferences), "suggested_questions" (array of 2-3 string questions).`
                        },
                        {
                            role: 'user',
                            content: query
                        }
                    ],
                    temperature: 0.5, // Slightly increased for more creative question generation
                    response_format: { type: 'json_object' }
                })
            });

            // Log HTTP status code
            console.log(`[ai-processor] OpenAI API response status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.error) {
                console.error('OpenAI API error:', data.error);
                return this.simpleAnalyzeQuery(query);
            }

            let result;
            try {
                result = JSON.parse(data.choices[0].message.content);
                // Add the original query to the result
                result.original_query = query;
                return result;
            } catch (e) {
                console.error('Error parsing OpenAI response:', e);
                return this.simpleAnalyzeQuery(query);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            return this.simpleAnalyzeQuery(query);
        }
    }

    // Set the API key after initialization
    setApiKey(apiKey) {
        if (apiKey) {
            this.apiKey = apiKey.trim(); // Ensure no whitespace
        } else {
            this.apiKey = null;
        }
        this.isConfigured = !!this.apiKey;
    }
}

// Export the AIQueryProcessor class
if (typeof module !== 'undefined') {
    module.exports = { AIQueryProcessor };
} 