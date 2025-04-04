// Questions for guided bicycle shopping experience
const questions = [
    {
        id: 1,
        text: "What type of riding will you be doing?",
        resultsCount: 15420,
        options: [
            { id: "trail", text: "Trail & Mountain" },
            { id: "road", text: "Road & Fitness" },
            { id: "commute", text: "Commuting & City" },
            { id: "leisure", text: "Casual & Leisure" }
        ]
    },
    {
        id: 2,
        text: "What's your experience level?",
        resultsCountByPreviousAnswer: {
            "trail": 4250,
            "road": 3820,
            "commute": 2100,
            "leisure": 5250
        },
        options: [
            { id: "beginner", text: "Beginner" },
            { id: "intermediate", text: "Intermediate" },
            { id: "advanced", text: "Advanced" }
        ]
    },
    {
        id: 3,
        text: "What's your budget?",
        resultsCountByPreviousAnswer: {
            "trail-beginner": 1250,
            "trail-intermediate": 1640,
            "trail-advanced": 1360,
            "road-beginner": 980,
            "road-intermediate": 1470,
            "road-advanced": 1370,
            "commute-beginner": 850,
            "commute-intermediate": 780,
            "commute-advanced": 470,
            "leisure-beginner": 2720,
            "leisure-intermediate": 1890,
            "leisure-advanced": 640
        },
        options: [
            { id: "budget", text: "Under $300" },
            { id: "mid", text: "$300 - $800" },
            { id: "premium", text: "Over $800" }
        ]
    },
    {
        id: 4,
        text: "Do you have any specific features you need?",
        resultsCountByPreviousAnswer: {
            "trail-beginner-budget": 320,
            "trail-beginner-mid": 680,
            "trail-beginner-premium": 250,
            "trail-intermediate-budget": 180,
            "trail-intermediate-mid": 850,
            "trail-intermediate-premium": 610,
            "trail-advanced-budget": 40,
            "trail-advanced-mid": 520,
            "trail-advanced-premium": 800,
            "road-beginner-budget": 190,
            "road-beginner-mid": 540,
            "road-beginner-premium": 250,
            "road-intermediate-budget": 60,
            "road-intermediate-mid": 730,
            "road-intermediate-premium": 680,
            "road-advanced-budget": 20,
            "road-advanced-mid": 350,
            "road-advanced-premium": 1000,
            "commute-beginner-budget": 410,
            "commute-beginner-mid": 360,
            "commute-beginner-premium": 80,
            "commute-intermediate-budget": 230,
            "commute-intermediate-mid": 410,
            "commute-intermediate-premium": 140,
            "commute-advanced-budget": 60,
            "commute-advanced-mid": 270,
            "commute-advanced-premium": 140,
            "leisure-beginner-budget": 1540,
            "leisure-beginner-mid": 1020,
            "leisure-beginner-premium": 160,
            "leisure-intermediate-budget": 620,
            "leisure-intermediate-mid": 940,
            "leisure-intermediate-premium": 330,
            "leisure-advanced-budget": 100,
            "leisure-advanced-mid": 290,
            "leisure-advanced-premium": 250
        },
        options: [
            { id: "suspension", text: "Suspension" },
            { id: "lightweight", text: "Lightweight" },
            { id: "gears", text: "Multiple Gears" },
            { id: "electric", text: "Electric Assist" },
            { id: "storage", text: "Storage/Rack" }
        ]
    }
];

// Final product matches based on user selections
const productMatches = {
    // Trail & Mountain Bike matches
    "trail-beginner-budget-suspension": [1, 2, 3],
    "trail-beginner-mid-suspension": [1, 4],
    "trail-beginner-premium-suspension": [4, 8],
    "trail-intermediate-mid-lightweight": [1, 6],
    "trail-intermediate-premium-lightweight": [8],
    "trail-advanced-premium-lightweight": [8],
    
    // Road Bike matches
    "road-beginner-mid-lightweight": [6],
    "road-beginner-premium-lightweight": [6, 8],
    "road-intermediate-mid-lightweight": [6],
    "road-intermediate-premium-lightweight": [8],
    "road-advanced-premium-lightweight": [8],
    
    // Commuter Bike matches
    "commute-beginner-budget-storage": [5, 7],
    "commute-beginner-mid-storage": [5, 7],
    "commute-intermediate-mid-storage": [5, 7],
    "commute-beginner-premium-electric": [4],
    "commute-intermediate-premium-electric": [4],
    
    // Leisure Bike matches
    "leisure-beginner-budget-gears": [2, 3],
    "leisure-beginner-mid-gears": [5, 7],
    "leisure-intermediate-mid-gears": [5, 7],
    "leisure-beginner-budget-storage": [7],
    "leisure-beginner-mid-storage": [7],
    "leisure-intermediate-mid-storage": [7]
}; 