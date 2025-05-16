import { Link } from 'react-router-dom';
import { Plane, Train, Bus, Building2, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="text-white space-y-6">
            <h1 className="text-5xl font-bold">Your Journey Begins Here</h1>
            <p className="text-xl max-w-2xl">
              Discover the world with our all-in-one travel solution. Book flights, trains, buses, and hotels seamlessly.
            </p>
            <Link 
              to="/flights"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            { icon: Plane, title: 'Flight Booking', path: '/flights' },
            { icon: Train, title: 'Train Booking', path: '/trains' },
            { icon: Bus, title: 'Bus Booking', path: '/buses' },
            { icon: Building2, title: 'Hotel Booking', path: '/hotels' },
          ].map((service, index) => (
            <Link
              key={index}
              to={service.path}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">Best prices guaranteed with 24/7 support</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[ 
            {
              image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
              title: "Taj Mahal",
              rating: 4.8,
            },
            {
              image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              title: "Tokyo",
              rating: 4.9,
            },
            {
              image: "https://images.unsplash.com/photo-1538097304804-2a1b932466a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              title: "Dubai",
              rating: 4.7,
            },
          ].map((destination, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{destination.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
