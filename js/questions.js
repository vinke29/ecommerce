// Sport types and their associated questions
const sportQuestions = {
    // Initial sport selection question (first question for all users)
    sportSelection: {
        text: "What sport are you shopping for?",
        resultsCount: 45000,
        options: [
            { id: "bicycles", text: "Cycling" },
            { id: "baseball", text: "Baseball" },
            { id: "climbing", text: "Climbing" },
            { id: "soccer", text: "Soccer" }
        ]
    },
    
    // Cycling questions - similar to the original implementation
    bicycles: [
        {
            text: "What type of bike are you looking for?",
            resultsCount: 15420,
            resultsCountByPreviousAnswer: {},
            options: [
                { id: "mountain", text: "Mountain Bike" },
                { id: "road", text: "Road Bike" },
                { id: "hybrid", text: "Hybrid Bike" },
                { id: "electric", text: "Electric Bike" },
                { id: "kids", text: "Kids Bike" }
            ]
        },
        {
            text: "What's your experience level?",
            resultsCount: 7500,
            resultsCountByPreviousAnswer: {
                "mountain": 3500,
                "road": 2800,
                "hybrid": 2200,
                "electric": 1500,
                "kids": 900
            },
            options: [
                { id: "beginner", text: "Beginner" },
                { id: "intermediate", text: "Intermediate" },
                { id: "advanced", text: "Advanced" }
            ]
        },
        {
            text: "What's your budget range?",
            resultsCount: 2500,
            resultsCountByPreviousAnswer: {
                "mountain-beginner": 1200,
                "mountain-intermediate": 950,
                "mountain-advanced": 800,
                "road-beginner": 950,
                "road-intermediate": 700,
                "road-advanced": 500,
                "hybrid-beginner": 800,
                "hybrid-intermediate": 600,
                "hybrid-advanced": 300,
                "electric-beginner": 650,
                "electric-intermediate": 520,
                "electric-advanced": 250,
                "kids-beginner": 400,
                "kids-intermediate": 150,
                "kids-advanced": 80
            },
            options: [
                { id: "budget", text: "$300 - $800" },
                { id: "mid", text: "$800 - $2000" },
                { id: "premium", text: "$2000+" }
            ]
        },
        {
            text: "Which features are important to you? (Select all that apply)",
            resultsCount: 500,
            resultsCountByPreviousAnswer: {
                "mountain-beginner-budget": 300,
                "mountain-beginner-mid": 250,
                "mountain-beginner-premium": 150,
                "mountain-intermediate-budget": 200,
                "mountain-intermediate-mid": 180,
                "mountain-intermediate-premium": 120,
                "mountain-advanced-budget": 100,
                "mountain-advanced-mid": 150,
                "mountain-advanced-premium": 200,
                "road-beginner-budget": 200,
                "road-beginner-mid": 180,
                "road-beginner-premium": 120,
                "road-intermediate-budget": 150,
                "road-intermediate-mid": 140,
                "road-intermediate-premium": 100,
                "road-advanced-budget": 80,
                "road-advanced-mid": 120,
                "road-advanced-premium": 150,
                "hybrid-beginner-budget": 180,
                "hybrid-beginner-mid": 150,
                "hybrid-beginner-premium": 100,
                "hybrid-intermediate-budget": 120,
                "hybrid-intermediate-mid": 110,
                "hybrid-intermediate-premium": 80,
                "hybrid-advanced-budget": 60,
                "hybrid-advanced-mid": 90,
                "hybrid-advanced-premium": 120,
                "electric-beginner-budget": 150,
                "electric-beginner-mid": 130,
                "electric-beginner-premium": 90,
                "electric-intermediate-budget": 110,
                "electric-intermediate-mid": 100,
                "electric-intermediate-premium": 70,
                "electric-advanced-budget": 50,
                "electric-advanced-mid": 80,
                "electric-advanced-premium": 100,
                "kids-beginner-budget": 100,
                "kids-beginner-mid": 80,
                "kids-beginner-premium": 60,
                "kids-intermediate-budget": 50,
                "kids-intermediate-mid": 40,
                "kids-intermediate-premium": 30,
                "kids-advanced-budget": 30,
                "kids-advanced-mid": 25,
                "kids-advanced-premium": 20
            },
            options: [
                { id: "lightweight", text: "Lightweight" },
                { id: "suspension", text: "Good Suspension" },
                { id: "speed", text: "Speed" },
                { id: "comfort", text: "Comfort" },
                { id: "durability", text: "Durability" },
                { id: "storage", text: "Storage Options" }
            ]
        }
    ],
    
    // Baseball equipment questions
    baseball: [
        {
            text: "What type of baseball equipment are you looking for?",
            resultsCount: 9800,
            options: [
                { id: "bats", text: "Baseball Bats" },
                { id: "gloves", text: "Fielding Gloves" },
                { id: "protective", text: "Protective Gear" },
                { id: "training", text: "Training Equipment" }
            ]
        },
        {
            text: "What level do you play at?",
            resultsCount: 4500,
            resultsCountByPreviousAnswer: {
                "bats": 2000,
                "gloves": 1500,
                "protective": 600,
                "training": 400
            },
            options: [
                { id: "youth", text: "Youth League" },
                { id: "highschool", text: "High School" },
                { id: "college", text: "College" },
                { id: "adult", text: "Adult Recreational" }
            ]
        },
        {
            text: "What's your budget range?",
            resultsCount: 1800,
            resultsCountByPreviousAnswer: {
                "bats-youth": 500,
                "bats-highschool": 600,
                "bats-college": 400,
                "bats-adult": 300,
                "gloves-youth": 400,
                "gloves-highschool": 350,
                "gloves-college": 300,
                "gloves-adult": 250
            },
            options: [
                { id: "budget", text: "Entry Level" },
                { id: "mid", text: "Mid-Range" },
                { id: "premium", text: "Professional Grade" }
            ]
        }
    ],
    
    // Climbing equipment questions
    climbing: [
        {
            text: "What type of climbing equipment are you looking for?",
            resultsCount: 8200,
            options: [
                { id: "harness", text: "Harnesses" },
                { id: "shoes", text: "Climbing Shoes" },
                { id: "ropes", text: "Ropes & Hardware" },
                { id: "chalk", text: "Chalk & Accessories" }
            ]
        },
        {
            text: "What type of climbing do you do?",
            resultsCount: 4100,
            resultsCountByPreviousAnswer: {
                "harness": 1200,
                "shoes": 1800,
                "ropes": 800,
                "chalk": 300
            },
            options: [
                { id: "indoor", text: "Indoor Gym" },
                { id: "sport", text: "Sport Climbing" },
                { id: "trad", text: "Traditional Climbing" },
                { id: "bouldering", text: "Bouldering" }
            ]
        },
        {
            text: "What's your experience level?",
            resultsCount: 2000,
            resultsCountByPreviousAnswer: {
                "harness-indoor": 400,
                "harness-sport": 300,
                "harness-trad": 200,
                "harness-bouldering": 100,
                "shoes-indoor": 500,
                "shoes-sport": 400,
                "shoes-trad": 300,
                "shoes-bouldering": 600
            },
            options: [
                { id: "beginner", text: "Beginner" },
                { id: "intermediate", text: "Intermediate" },
                { id: "advanced", text: "Advanced" }
            ]
        }
    ],
    
    // Soccer equipment questions
    soccer: [
        {
            text: "What type of soccer equipment are you looking for?",
            resultsCount: 11800,
            options: [
                { id: "cleats", text: "Soccer Cleats" },
                { id: "balls", text: "Soccer Balls" },
                { id: "guards", text: "Shin Guards" },
                { id: "apparel", text: "Jerseys & Apparel" }
            ]
        },
        {
            text: "What position do you play?",
            resultsCount: 5900,
            resultsCountByPreviousAnswer: {
                "cleats": 3000,
                "balls": 1200,
                "guards": 800,
                "apparel": 900
            },
            options: [
                { id: "forward", text: "Forward/Striker" },
                { id: "midfielder", text: "Midfielder" },
                { id: "defender", text: "Defender" },
                { id: "goalkeeper", text: "Goalkeeper" },
                { id: "allround", text: "All Positions" }
            ]
        },
        {
            text: "What type of playing surface do you use most?",
            resultsCount: 2500,
            resultsCountByPreviousAnswer: {
                "cleats-forward": 800,
                "cleats-midfielder": 900,
                "cleats-defender": 700,
                "cleats-goalkeeper": 300,
                "cleats-allround": 300
            },
            options: [
                { id: "firm", text: "Firm Ground" },
                { id: "soft", text: "Soft Ground" },
                { id: "artificial", text: "Artificial Turf" },
                { id: "indoor", text: "Indoor Court" }
            ]
        }
    ]
};

// Product matches for each sport based on user selections
const productMatches = {
    // Bicycle matches (simplified from original)
    bicycles: {
        "mountain-beginner-budget-lightweight": [1, 3],
        "mountain-beginner-budget-suspension": [2, 4],
        "road-beginner-mid-speed": [6],
        "hybrid-beginner-budget-comfort": [5],
        "electric-beginner-mid-speed": [4]
    },
    
    // Baseball equipment matches
    baseball: {
        "bats-youth-budget": [1],
        "bats-highschool-premium": [1],
        "gloves-highschool-mid": [2],
        "gloves-college-premium": [2]
    },
    
    // Climbing equipment matches
    climbing: {
        "harness-sport-beginner": [1],
        "harness-indoor-beginner": [1],
        "shoes-bouldering-intermediate": [2],
        "shoes-sport-beginner": [2]
    },
    
    // Soccer equipment matches
    soccer: {
        "cleats-midfielder-firm": [1],
        "cleats-forward-firm": [1],
        "cleats-defender-soft": [2],
        "cleats-forward-artificial": [2]
    }
};

// Backward compatibility with original implementation
const questions = sportQuestions.bicycles;

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = { sportQuestions, productMatches, questions };
}