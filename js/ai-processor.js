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
                            content: `You are a very friendly and patient sports equipment advisor speaking to a complete beginner. Your goal is to help them find the right product even if they know nothing about the specifics. Analyze the user's search query. Determine the sport (bicycles, baseball, climbing, soccer). Generate a maximum of 3 simple follow-up questions to understand their needs (like intended use, environment, budget feel, or basic preferences – avoid technical terms like 'frame material' unless the user mentioned it). For EACH question, provide a list of 3-5 simple, easy-to-understand multiple-choice options. Respond ONLY in JSON format with the following fields: "sport", "confidence", "product_type", "user_preferences", "suggested_questions" (array of objects, each with "question" string and "options" array of strings).`
                        },
                        {
                            role: 'user',
                            content: query
                        }
                    ],
                    temperature: 0.7, // Slightly higher for more creative, less technical questions/options
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