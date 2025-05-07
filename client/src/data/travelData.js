// This file contains hardcoded data for the travel booking application
// It eliminates the need for backend API calls

// Bus options - 10 buses from different companies
export const buses = [
  {
    id: 1,
    companyName: "Royal Express",
    from: "New York",
    to: "Washington DC",
    departureTime: "08:00 AM",
    arrivalTime: "12:30 PM",
    duration: "4h 30m",
    price: 45.99,
    amenities: ["WiFi", "AC", "Snacks", "USB Charging"],
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    companyName: "Comfort Lines",
    from: "Boston",
    to: "Philadelphia",
    departureTime: "10:15 AM",
    arrivalTime: "03:45 PM",
    duration: "5h 30m",
    price: 52.50,
    amenities: ["WiFi", "AC", "Restroom", "TV"],
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    companyName: "Golden Travels",
    from: "Los Angeles",
    to: "San Francisco",
    departureTime: "07:30 AM",
    arrivalTime: "02:30 PM",
    duration: "7h 00m",
    price: 65.99,
    amenities: ["WiFi", "AC", "Snacks", "Blankets"],
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    companyName: "City Connect",
    from: "Seattle",
    to: "Portland",
    departureTime: "09:00 AM",
    arrivalTime: "12:30 PM",
    duration: "3h 30m",
    price: 38.75,
    amenities: ["WiFi", "AC", "Toilet", "Snacks"],
    rating: 4.0,
    imageUrl: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?ixlib=rb-4.0.3"
  },
  {
    id: 5,
    companyName: "Mountain Rider",
    from: "Denver",
    to: "Salt Lake City",
    departureTime: "05:45 AM",
    arrivalTime: "02:15 PM",
    duration: "8h 30m",
    price: 72.50,
    amenities: ["WiFi", "AC", "Meals", "Entertainment"],
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?ixlib=rb-4.0.3"
  },
  {
    id: 6,
    companyName: "Southern Comfort",
    from: "Miami",
    to: "Orlando",
    departureTime: "11:30 AM",
    arrivalTime: "03:30 PM",
    duration: "4h 00m",
    price: 49.99,
    amenities: ["WiFi", "AC", "Restroom", "Movies"],
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1604478574842-b9c901a91654?ixlib=rb-4.0.3"
  },
  {
    id: 7,
    companyName: "Rapid Transit",
    from: "Chicago",
    to: "Detroit",
    departureTime: "06:30 AM",
    arrivalTime: "11:45 AM",
    duration: "5h 15m",
    price: 55.25,
    amenities: ["WiFi", "AC", "Power Outlets", "Snacks"],
    rating: 4.1,
    imageUrl: "https://images.unsplash.com/photo-1505243542579-da5adaec7672?ixlib=rb-4.0.3"
  },
  {
    id: 8,
    companyName: "Desert Cruiser",
    from: "Phoenix",
    to: "Las Vegas",
    departureTime: "07:00 AM",
    arrivalTime: "12:30 PM",
    duration: "5h 30m",
    price: 59.99,
    amenities: ["WiFi", "AC", "Toilet", "Drinks"],
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1541447261095-3c01fbce2dc3?ixlib=rb-4.0.3"
  },
  {
    id: 9,
    companyName: "Northern Express",
    from: "Minneapolis",
    to: "Milwaukee",
    departureTime: "08:45 AM",
    arrivalTime: "02:15 PM",
    duration: "5h 30m",
    price: 48.50,
    amenities: ["WiFi", "AC", "Restroom", "Comfortable Seats"],
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3"
  },
  {
    id: 10,
    companyName: "Atlantic Coast",
    from: "Atlanta",
    to: "Nashville",
    departureTime: "09:30 AM",
    arrivalTime: "02:30 PM",
    duration: "5h 00m",
    price: 54.75,
    amenities: ["WiFi", "AC", "Restroom", "Reclining Seats"],
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1498620142165-a48aa3fb6541?ixlib=rb-4.0.3"
  }
];

// Train options - 10 trains from different companies
export const trains = [
  {
    id: 1,
    companyName: "Amtrak Express",
    from: "New York",
    to: "Washington DC",
    departureTime: "07:30 AM",
    arrivalTime: "10:45 AM",
    duration: "3h 15m",
    price: 89.99,
    classes: ["Economy", "Business", "First"],
    amenities: ["WiFi", "Food Service", "Power Outlets"],
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    companyName: "Northeast Regional",
    from: "Boston",
    to: "Philadelphia",
    departureTime: "08:15 AM",
    arrivalTime: "12:30 PM",
    duration: "4h 15m",
    price: 75.50,
    classes: ["Economy", "Business"],
    amenities: ["WiFi", "Quiet Car", "Café"],
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1548014904-c8404b54466e?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    companyName: "Pacific Surfliner",
    from: "Los Angeles",
    to: "San Diego",
    departureTime: "09:00 AM",
    arrivalTime: "11:45 AM",
    duration: "2h 45m",
    price: 65.75,
    classes: ["Economy", "Business"],
    amenities: ["WiFi", "Café", "Bike Storage"],
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1551971860-0ca537e362e9?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    companyName: "California Zephyr",
    from: "Chicago",
    to: "San Francisco",
    departureTime: "02:00 PM",
    arrivalTime: "11:15 AM",
    duration: "51h 15m",
    price: 199.99,
    classes: ["Economy", "Roomette", "Bedroom"],
    amenities: ["Dining Car", "Observation Car", "Shower"],
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3"
  },
  {
    id: 5,
    companyName: "Empire Builder",
    from: "Seattle",
    to: "Chicago",
    departureTime: "04:40 PM",
    arrivalTime: "03:55 PM",
    duration: "46h 15m",
    price: 189.50,
    classes: ["Economy", "Roomette", "Bedroom"],
    amenities: ["Dining Car", "Observation Car", "Shower"],
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3"
  },
  {
    id: 6,
    companyName: "Silver Meteor",
    from: "New York",
    to: "Miami",
    departureTime: "03:15 PM",
    arrivalTime: "06:30 PM",
    duration: "27h 15m",
    price: 155.25,
    classes: ["Economy", "Roomette", "Bedroom"],
    amenities: ["Dining Car", "Café", "Shower"],
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3"
  },
  {
    id: 7,
    companyName: "Acela Express",
    from: "Washington DC",
    to: "Boston",
    departureTime: "06:00 AM",
    arrivalTime: "12:30 PM",
    duration: "6h 30m",
    price: 179.99,
    classes: ["Business", "First"],
    amenities: ["WiFi", "Power Outlets", "Café", "Conference Space"],
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3"
  },
  {
    id: 8,
    companyName: "Maple Leaf",
    from: "New York",
    to: "Toronto",
    departureTime: "07:15 AM",
    arrivalTime: "07:30 PM",
    duration: "12h 15m",
    price: 125.50,
    classes: ["Economy", "Business"],
    amenities: ["WiFi", "Café", "Border Services"],
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3"
  },
  {
    id: 9,
    companyName: "Cascades",
    from: "Portland",
    to: "Vancouver",
    departureTime: "08:30 AM",
    arrivalTime: "06:45 PM",
    duration: "10h 15m",
    price: 115.75,
    classes: ["Economy", "Business"],
    amenities: ["WiFi", "Café", "Bike Storage"],
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1508485034733-2c52be591b39?ixlib=rb-4.0.3"
  },
  {
    id: 10,
    companyName: "Sunset Limited",
    from: "New Orleans",
    to: "Los Angeles",
    departureTime: "09:00 AM",
    arrivalTime: "05:35 AM",
    duration: "46h 35m",
    price: 175.25,
    classes: ["Economy", "Roomette", "Bedroom"],
    amenities: ["Dining Car", "Observation Car", "Shower"],
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1473862170180-84427c485aca?ixlib=rb-4.0.3"
  }
];

// Hotel options - 10 hotels from different locations
export const hotels = [
  {
    id: 1,
    name: "Grand Luxury Resort & Spa",
    location: "Cancun, Mexico",
    rating: 5,
    pricePerNight: 349.99,
    amenities: ["Pool", "Spa", "Beach Access", "Free WiFi", "Restaurant"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    description: "Luxurious beachfront resort with stunning ocean views and world-class amenities."
  },
  {
    id: 2,
    name: "City Central Hotel",
    location: "New York, USA",
    rating: 4,
    pricePerNight: 289.50,
    amenities: ["Free WiFi", "Fitness Center", "Room Service", "Business Center"],
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
    description: "Contemporary hotel in the heart of Manhattan, steps away from major attractions."
  },
  {
    id: 3,
    name: "Alpine Lodge Resort",
    location: "Aspen, USA",
    rating: 4.5,
    pricePerNight: 425.75,
    amenities: ["Ski Access", "Hot Tub", "Fireplace", "Restaurant", "Spa"],
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
    description: "Cozy mountain lodge with direct access to ski slopes and breathtaking views."
  },
  {
    id: 4,
    name: "Seaside Villa",
    location: "Santorini, Greece",
    rating: 4.8,
    pricePerNight: 599.99,
    amenities: ["Private Pool", "Sea View", "Breakfast", "Airport Shuttle", "WiFi"],
    imageUrl: "https://images.unsplash.com/photo-1570213489059-0aac6626d401?ixlib=rb-4.0.3",
    description: "Elegant cliffside villa with private terrace and stunning caldera views."
  },
  {
    id: 5,
    name: "Heritage Palace Hotel",
    location: "Paris, France",
    rating: 4.7,
    pricePerNight: 475.50,
    amenities: ["Gourmet Restaurant", "Spa", "Concierge", "Bar", "Free WiFi"],
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3",
    description: "Historic hotel with elegant rooms and a prime location near major attractions."
  },
  {
    id: 6,
    name: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    rating: 4.6,
    pricePerNight: 275.25,
    amenities: ["Beach Access", "Pool", "Spa", "Water Sports", "Restaurant"],
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3",
    description: "Serene beachfront resort surrounded by lush tropical gardens and rice fields."
  },
  {
    id: 7,
    name: "Urban Boutique Hotel",
    location: "Tokyo, Japan",
    rating: 4.4,
    pricePerNight: 310.75,
    amenities: ["Free WiFi", "Restaurant", "Bar", "Fitness Center", "Business Center"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    description: "Modern boutique hotel with Japanese-inspired design in the heart of Tokyo."
  },
  {
    id: 8,
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    rating: 5,
    pricePerNight: 520.99,
    amenities: ["Pool", "Spa", "Desert Tours", "Multiple Restaurants", "Private Beach"],
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
    description: "Luxurious desert resort with stunning dune views and exceptional service."
  },
  {
    id: 9,
    name: "Lakeside Retreat",
    location: "Lake Como, Italy",
    rating: 4.9,
    pricePerNight: 650.50,
    amenities: ["Lake View", "Garden", "Restaurant", "Bar", "Boat Rental"],
    imageUrl: "https://images.unsplash.com/photo-1559599238-308793637427?ixlib=rb-4.0.3",
    description: "Historic villa converted into a luxury hotel with panoramic lake views."
  },
  {
    id: 10,
    name: "Skyline Tower Suites",
    location: "Singapore",
    rating: 4.7,
    pricePerNight: 385.25,
    amenities: ["Rooftop Pool", "Spa", "Restaurant", "Bar", "Fitness Center"],
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3",
    description: "Modern luxury hotel with stunning city views and rooftop infinity pool."
  }
];

// Popular destinations for display in the destination section
export const destinations = [
  {
    id: 1,
    name: "Santorini",
    location: "Greece",
    rating: 4.9,
    description: "Famous for its stunning sunsets, white-washed buildings, and blue domes.",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3",
    activities: ["Beach", "Sailing", "Wine Tasting", "Hiking"]
  },
  {
    id: 2,
    name: "Kyoto",
    location: "Japan",
    rating: 4.8,
    description: "Historic city with beautiful temples, traditional gardens, and geisha culture.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3",
    activities: ["Temple Visits", "Tea Ceremony", "Cherry Blossom Viewing", "Bamboo Forest"]
  },
  {
    id: 3,
    name: "New York City",
    location: "USA",
    rating: 4.7,
    description: "The city that never sleeps, known for its iconic skyline and diverse culture.",
    imageUrl: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3",
    activities: ["Broadway Shows", "Museums", "Shopping", "Central Park"]
  },
  {
    id: 4,
    name: "Machu Picchu",
    location: "Peru",
    rating: 4.9,
    description: "Ancient Incan citadel set against a breathtaking mountain backdrop.",
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3",
    activities: ["Hiking", "History Tour", "Photography", "Mountain Climbing"]
  },
  {
    id: 5,
    name: "Bora Bora",
    location: "French Polynesia",
    rating: 4.9,
    description: "Paradise island with crystal clear waters and overwater bungalows.",
    imageUrl: "https://images.unsplash.com/photo-1583146191066-d6947f49da21?ixlib=rb-4.0.3",
    activities: ["Snorkeling", "Diving", "Beach", "Luxury Resorts"]
  },
  {
    id: 6,
    name: "Barcelona",
    location: "Spain",
    rating: 4.7,
    description: "Vibrant city known for Gaudí architecture, beaches, and incredible food.",
    imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3",
    activities: ["Sagrada Familia", "La Rambla", "Beach", "Tapas Tours"]
  },
  {
    id: 7,
    name: "Cape Town",
    location: "South Africa",
    rating: 4.6,
    description: "Stunning coastal city with Table Mountain as its backdrop.",
    imageUrl: "https://images.unsplash.com/photo-1563656157432-67560011e209?ixlib=rb-4.0.3",
    activities: ["Table Mountain", "Safari", "Wine Tour", "Beach"]
  },
  {
    id: 8,
    name: "Venice",
    location: "Italy",
    rating: 4.8,
    description: "Romantic city built on canals with no cars and only gondolas for transportation.",
    imageUrl: "https://images.unsplash.com/photo-1545018595-53e583a82e56?ixlib=rb-4.0.3",
    activities: ["Gondola Ride", "St. Mark's Square", "Murano Glass", "Canal Tour"]
  },
  {
    id: 9,
    name: "Sydney",
    location: "Australia",
    rating: 4.7,
    description: "Vibrant harbor city famous for its Opera House and beautiful beaches.",
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3",
    activities: ["Opera House Tour", "Bondi Beach", "Harbor Cruise", "Bridge Climb"]
  },
  {
    id: 10,
    name: "Marrakech",
    location: "Morocco",
    rating: 4.5,
    description: "A vibrant mix of colors, spices, and traditions in ancient walled city.",
    imageUrl: "https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3",
    activities: ["Souks", "Gardens", "Palaces", "Camel Rides"]
  }
];

// Flight options - 10 flights from different airlines
export const flights = [
  {
    id: 1,
    airline: "Global Airways",
    flightNumber: "GA1234",
    from: "New York (JFK)",
    to: "London (LHR)",
    departureTime: "19:30",
    arrivalTime: "07:45",
    duration: "7h 15m",
    price: 549.99,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    airline: "Pacific Air",
    flightNumber: "PA789",
    from: "Los Angeles (LAX)",
    to: "Tokyo (NRT)",
    departureTime: "11:45",
    arrivalTime: "15:20",
    duration: "11h 35m",
    price: 832.50,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    airline: "East West Airlines",
    flightNumber: "EW456",
    from: "San Francisco (SFO)",
    to: "Singapore (SIN)",
    departureTime: "23:55",
    arrivalTime: "07:30",
    duration: "17h 35m",
    price: 999.99,
    class: "Economy",
    stops: 1,
    stopLocations: ["Hong Kong (HKG)"],
    imageUrl: "https://images.unsplash.com/photo-1587019563857-8393aad4233f?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    airline: "Sky Connect",
    flightNumber: "SC221",
    from: "Chicago (ORD)",
    to: "Paris (CDG)",
    departureTime: "18:20",
    arrivalTime: "09:15",
    duration: "8h 55m",
    price: 679.75,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1525624286470-719c9910fac3?ixlib=rb-4.0.3"
  },
  {
    id: 5,
    airline: "Sunshine Air",
    flightNumber: "SA345",
    from: "Miami (MIA)",
    to: "Cancun (CUN)",
    departureTime: "10:30",
    arrivalTime: "12:15",
    duration: "1h 45m",
    price: 299.50,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1587019563927-fb015794d912?ixlib=rb-4.0.3"
  },
  {
    id: 6,
    airline: "Atlantic Express",
    flightNumber: "AE789",
    from: "Boston (BOS)",
    to: "Dublin (DUB)",
    departureTime: "21:10",
    arrivalTime: "08:45",
    duration: "6h 35m",
    price: 459.99,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1608023136037-626dad6c6188?ixlib=rb-4.0.3"
  },
  {
    id: 7,
    airline: "Gulf Flyer",
    flightNumber: "GF555",
    from: "Dubai (DXB)",
    to: "Sydney (SYD)",
    departureTime: "02:15",
    arrivalTime: "22:05",
    duration: "13h 50m",
    price: 1199.75,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1551633188-53a0672d0702?ixlib=rb-4.0.3"
  },
  {
    id: 8,
    airline: "Northern Routes",
    flightNumber: "NR334",
    from: "Seattle (SEA)",
    to: "Anchorage (ANC)",
    departureTime: "14:20",
    arrivalTime: "16:50",
    duration: "3h 30m",
    price: 345.50,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3"
  },
  {
    id: 9,
    airline: "Southern Cross",
    flightNumber: "SC990",
    from: "Auckland (AKL)",
    to: "Melbourne (MEL)",
    departureTime: "08:45",
    arrivalTime: "10:30",
    duration: "3h 45m",
    price: 399.99,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1566435442267-2305de4303c1?ixlib=rb-4.0.3"
  },
  {
    id: 10,
    airline: "Euro Wings",
    flightNumber: "EW447",
    from: "Madrid (MAD)",
    to: "Rome (FCO)",
    departureTime: "16:30",
    arrivalTime: "18:55",
    duration: "2h 25m",
    price: 219.75,
    class: "Economy",
    stops: 0,
    imageUrl: "https://images.unsplash.com/photo-1610303655027-a0c3a61c7bb8?ixlib=rb-4.0.3"
  }
];