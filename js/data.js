const bicycleData = [
    {
        id: 1,
        title: "Mongoose Switchback Comp",
        type: "Mountain Bike",
        price: 549.99,
        originalPrice: 749.99,
        image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1000",
        description: "The Mongoose Switchback Comp is a perfect entry-level mountain bike for beginners looking to explore trails and rough terrains. It features a lightweight aluminum frame and reliable components.",
        features: [
            "Lightweight aluminum frame",
            "100mm suspension fork",
            "Shimano drivetrain",
            "Disc brakes for reliable stopping power",
            "27.5-inch wheels",
            "21-speed shifting system"
        ],
        reviewSnippet: "Great for riding on trails and handling rough terrains with ease!",
        idealFor: "Trail riding and rough terrains",
        buyLink: "https://www.amazon.com/Mongoose-Switchback-Mountain-Small-Silver/dp/B07CXTF5ZT"
    },
    {
        id: 2,
        title: "Huffy Rock Creek Mountain Bike",
        type: "Mountain Bike",
        price: 98.00,
        originalPrice: 118.00,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000",
        description: "The Huffy Rock Creek is an affordable mountain bike for beginners and casual riders. It offers a comfortable ride with basic features for light off-road use.",
        features: [
            "Hardtail frame for durability",
            "Front suspension fork for smoother rides",
            "18-speed Shimano drivetrain",
            "Linear pull brakes",
            "26-inch wheels",
            "Steel frame construction"
        ],
        reviewSnippet: "Perfect for casual weekend rides on both pavement and light trails!",
        idealFor: "Casual rides and light off-road use",
        buyLink: "https://www.amazon.com/Huffy-Hardtail-Mountain-Summit-26-inch/dp/B08KWFVDLT"
    },
    {
        id: 3,
        title: "Huffy Women's Rock Creek Mountain Bike",
        type: "Mountain Bike",
        price: 98.00,
        originalPrice: 118.00,
        image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1000",
        description: "The women's version of the Huffy Rock Creek mountain bike, designed with a frame geometry that's more comfortable for female riders. Perfect for beginners looking for casual riding experiences.",
        features: [
            "Step-through frame design",
            "Front suspension fork",
            "18-speed Shimano shifting",
            "Padded saddle for comfort",
            "26-inch wheels",
            "Linear pull brakes"
        ],
        reviewSnippet: "The perfect beginner bike for weekend rides in the park and light trails!",
        idealFor: "Women riders seeking comfort on casual rides",
        buyLink: "https://www.amazon.com/Huffy-Hardtail-Mountain-Daisy-26-inch/dp/B08KWH98D4"
    },
    {
        id: 4,
        title: "Hyper 26\" Mountain Electric Bike",
        type: "Electric Mountain Bike",
        price: 599.99,
        originalPrice: 999.99,
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1000",
        description: "The Hyper E-ride Electric Mountain Bike combines traditional cycling with electric assistance, making it easier to tackle hills and longer rides. Perfect for beginners who want a little extra help.",
        features: [
            "36V battery for electric assist",
            "20 mile range on electric power",
            "Front suspension fork",
            "Disc brakes front and rear",
            "Shimano 7-speed drivetrain",
            "LED display for battery life and mode"
        ],
        reviewSnippet: "Amazing bike for beginners - the electric assist makes hills a breeze!",
        idealFor: "Beginners who need assistance with hills and longer rides",
        buyLink: "https://www.walmart.com/ip/Hyper-E-Ride-26-Electric-Mountain-Bike-36-Volt-Battery/563088518"
    },
    {
        id: 5,
        title: "Kent Springdale Hybrid Bicycle",
        type: "Hybrid Bike",
        price: 179.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1000",
        description: "The Kent Springdale is a versatile hybrid bike that's perfect for beginners who plan to ride mainly on paved roads but occasionally on light trails. It offers a comfortable, upright riding position.",
        features: [
            "Aluminum frame for lightweight riding",
            "21-speed Shimano shifting",
            "700c wheels for smooth rolling",
            "Front suspension fork",
            "Rear rack included",
            "Linear pull brakes"
        ],
        reviewSnippet: "Perfect commuter bike for beginners - comfortable, reliable, and versatile!",
        idealFor: "Commuting and casual riding on pavement and light trails",
        buyLink: "https://www.amazon.com/Kent-Springdale-Womens-Hybrid-Bicycle/dp/B07K46SJL2"
    },
    {
        id: 6,
        title: "Schwinn Phocus 1400 Road Bike",
        type: "Road Bike",
        price: 499.99,
        originalPrice: 599.99,
        image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1000",
        description: "The Schwinn Phocus 1400 is an excellent entry-level road bike for beginners interested in fitness riding or getting into road cycling. It's lightweight and designed for speed on paved surfaces.",
        features: [
            "Aluminum frame with carbon fiber fork",
            "14-speed Shimano drivetrain",
            "Dual pivot caliper brakes",
            "700c wheels with road tires",
            "Drop handlebars for aerodynamic positioning",
            "Quick-release wheels for easy transport"
        ],
        reviewSnippet: "Fast, lightweight, and responsive - perfect first road bike for fitness and fun!",
        idealFor: "Fitness riding and entry-level road cycling",
        buyLink: "https://www.amazon.com/Schwinn-Phocus-Bicycle-18-Inch-Medium/dp/B00P470I5I"
    },
    {
        id: 7,
        title: "sixthreezero Around The Block Cruiser",
        type: "Cruiser Bike",
        price: 269.99,
        originalPrice: 299.99,
        image: "https://images.unsplash.com/photo-1484920274317-87885fcbc504?q=80&w=1000",
        description: "The sixthreezero Around The Block is a classic cruiser bike perfect for beginners who want a comfortable, relaxed ride. Ideal for leisurely rides on flat terrain like beach boardwalks or neighborhood streets.",
        features: [
            "Steel frame with step-through design",
            "7-speed Shimano drivetrain",
            "26-inch wheels with wide tires",
            "Cushioned saddle for comfort",
            "Upright riding position",
            "Rear rack for carrying items"
        ],
        reviewSnippet: "The most comfortable bike ever - perfect for relaxed rides around the neighborhood!",
        idealFor: "Leisurely rides and casual cruising",
        buyLink: "https://www.amazon.com/sixthreezero-Around-Womens-Cruiser-26-Inch/dp/B00INBVUIA"
    },
    {
        id: 8,
        title: "Tommaso Imola Endurance Road Bike",
        type: "Road Bike",
        price: 849.99,
        originalPrice: 949.99,
        image: "https://images.unsplash.com/photo-1523740856324-f2ce89135981?q=80&w=1000",
        description: "The Tommaso Imola is a premium entry-level road bike with higher-quality components than most beginner bikes. It's perfect for those who are serious about getting into road cycling.",
        features: [
            "Full aluminum frame and fork",
            "Shimano Claris 24-speed drivetrain",
            "Compact crankset for easier hill climbing",
            "Premium saddle for long-distance comfort",
            "700c wheels with road tires",
            "Lifetime frame warranty"
        ],
        reviewSnippet: "Outstanding quality for the price - handles beautifully and performs like more expensive bikes!",
        idealFor: "Serious beginners looking for quality and performance",
        buyLink: "https://www.amazon.com/Tommaso-Imola-Endurance-Aluminum-Shimano/dp/B01LZK6LXM"
    }
];

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = { bicycleData };
} 