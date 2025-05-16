import { useState } from 'react';
import { Plane, Train, Bus, Building2, Car, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const services = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Book domestic and international flights at the best prices.',
      link: '/flights'
    },
    {
      icon: Train,
      title: 'Train Booking',
      description: 'Hassle-free train ticket bookings across India.',
      link: '/trains'
    },
    {
      icon: Bus,
      title: 'Bus Booking',
      description: 'Wide network of bus services covering major routes.',
      link: '/buses'
    },
    {
      icon: Building2,
      title: 'Hotel Booking',
      description: 'Find and book the perfect accommodation for your stay.',
      link: '/hotels'
    },
    {
      icon: Car,
      title: 'Cab Services',
      description: 'Reliable cab services for local and outstation travel.',
      link: '/cabs'
    },
    {
      icon: MapPin,
      title: 'Tour Guides',
      description: 'Expert local guides to enhance your travel experience.',
      link: '/guides'
    }
  ];

  // Function to handle login action
  const handleLogin = () => {
    // Perform login logic here, for now, let's toggle login state
    setIsLoggedIn(true); // Assume user is logged in for demonstration purposes
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive travel solutions designed to make your journey seamless and memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            to={isLoggedIn ? service.link : '/signup'} // Redirect to signup if not logged in
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <service.icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <span className="text-blue-600 font-semibold">Learn more →</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Best Prices</h3>
            <p className="text-gray-600">
              Get the most competitive prices for all your travel needs.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Round-the-clock customer support for your convenience.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Secure Booking</h3>
            <p className="text-gray-600">
              Safe and secure payment options for worry-free transactions.
            </p>
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="text-center mt-8">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Log In / Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
