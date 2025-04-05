// Sports Equipment Data
const sportsData = {
    // Bicycle data from original implementation
    bicycles: [
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
    ],

    // Baseball equipment
    baseball: [
        {
            id: 1,
            title: "Louisville Slugger 2023 Meta",
            type: "Baseball Bat",
            price: 349.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000",
            description: "The Louisville Slugger Meta is a premium BBCOR certified bat with a massive sweet spot and incredible pop off the barrel.",
            features: [
                "BBCOR certified for high school and college play",
                "3-piece composite design",
                "Premium RTX end cap",
                "VCX vibration control connection",
                "Premium LS Pro comfort grip",
                "Balanced swing weight"
            ],
            reviewSnippet: "Incredible pop and feel - worth every penny for serious players!",
            idealFor: "Competitive high school and college players",
            buyLink: "#"
        },
        {
            id: 2,
            title: "Rawlings Heart of the Hide",
            type: "Baseball Glove",
            price: 249.99,
            originalPrice: 279.99,
            image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000",
            description: "The Rawlings Heart of the Hide baseball glove is crafted from premium steer hide leather for exceptional durability and performance.",
            features: [
                "Premium steer hide leather construction",
                "Deer-tanned cowhide lining",
                "Tennessee Tanning pro lace",
                "11.75-inch pattern with I-web",
                "30% player break-in",
                "Padded thumb sleeve"
            ],
            reviewSnippet: "The perfect balance of quality and playability - breaks in beautifully!",
            idealFor: "Serious infielders at all levels of play",
            buyLink: "#"
        }
    ],

    // Climbing equipment
    climbing: [
        {
            id: 1,
            title: "Black Diamond Momentum Harness",
            type: "Climbing Harness",
            price: 64.95,
            originalPrice: 74.95,
            image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000",
            description: "The Black Diamond Momentum is a versatile all-around harness that's perfect for beginners and experienced climbers alike.",
            features: [
                "TrakFit adjustable leg loops",
                "Bullhorn-shaped waistbelt",
                "Pre-threaded Speed Adjust waistbelt buckle",
                "4 pressure-molded gear loops",
                "Haul loop",
                "Adjustable rear elastic riser"
            ],
            reviewSnippet: "Comfortable enough for long days at the crag and durable enough for gym sessions!",
            idealFor: "Indoor and outdoor sport climbing",
            buyLink: "#"
        },
        {
            id: 2,
            title: "La Sportiva Tarantulace",
            type: "Climbing Shoes",
            price: 85.00,
            originalPrice: 95.00,
            image: "https://images.unsplash.com/photo-1606994772823-4217d16f1645?q=80&w=1000",
            description: "The La Sportiva Tarantulace is an excellent entry-level climbing shoe that balances comfort and performance for new climbers.",
            features: [
                "Leather upper with synthetic lining",
                "Lace-up closure for precise fit",
                "FriXion® RS rubber sole",
                "Unlined leather upper",
                "Asymmetric toe profile",
                "Rounded toe box"
            ],
            reviewSnippet: "Perfect first climbing shoes - comfortable enough for beginners but perform well enough to progress!",
            idealFor: "Beginning to intermediate climbers",
            buyLink: "#"
        }
    ],

    // Soccer equipment
    soccer: [
        {
            id: 1,
            title: "Nike Phantom GX Elite",
            type: "Soccer Cleats",
            price: 274.99,
            originalPrice: 299.99,
            image: "https://images.unsplash.com/photo-1527374133626-fb15ced82d1a?q=80&w=1000",
            description: "The Nike Phantom GX Elite soccer cleats deliver precision control and enhanced touch for elite level play.",
            features: [
                "Flyknit and NikeSkin construction",
                "All Conditions Control (ACC) technology",
                "Agility stud pattern",
                "Grippy top cloth",
                "Integrated tongue design",
                "Lightweight plate"
            ],
            reviewSnippet: "The touch and feel on these cleats is next level - perfect for creative midfielders!",
            idealFor: "Elite-level midfielders and attackers",
            buyLink: "#"
        },
        {
            id: 2,
            title: "Adidas Predator Edge",
            type: "Soccer Cleats",
            price: 224.99,
            originalPrice: 249.99,
            image: "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1000",
            description: "The Adidas Predator Edge cleats feature innovative technology for power and control, making them ideal for players who take set pieces.",
            features: [
                "Zone Skin upper with rubber elements",
                "Faceted frame for stability",
                "Control Frame outsole",
                "Hybrid stud pattern",
                "Laceless design",
                "Primeknit collar"
            ],
            reviewSnippet: "Incredible power for shots and precision for passing - worth every penny!",
            idealFor: "Players who take free kicks and like to strike from distance",
            buyLink: "#"
        }
    ]
};

// Make data globally available on the window object
window.bicycleData = sportsData.bicycles || [];
window.baseballData = sportsData.baseball || [];
window.climbingData = sportsData.climbing || [];
window.soccerData = sportsData.soccer || [];

// Export for use in other files (Node.js environment, less relevant for browser)
if (typeof module !== 'undefined') {
    module.exports = { sportsData }; // Only export the main object if needed for Node
} 