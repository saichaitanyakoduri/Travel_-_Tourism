import { useState } from 'react';
import SearchForm from '../components/Hotelsearchform';
import FilterPanel from '../components/FilterPanel';
import { Star, MapPin } from 'lucide-react';

const HotelBooking = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'Luxury Hotel & Spa',
      location: 'Goa',
      rating: 4.8,
      price: 1299,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      name: 'Business Hotel',
      location: 'Mumbai',
      rating: 4.5,
      price: 1499,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
  ]);

  const handleSearch = () => {
    const filteredResults = searchResults.filter((hotel) =>
      hotel.location.toLowerCase().includes(toLocation.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleFilterChange = (filters: { price?: number; rating?: number }) => {
    let filteredResults = [...searchResults];

    if (typeof filters.price === 'number') {
      filteredResults = filteredResults.filter((hotel) => hotel.price <= filters.price);
    }

    if (typeof filters.rating === 'number') {
      filteredResults = filteredResults.filter((hotel) => hotel.rating >= filters.rating);
    }

    setSearchResults(filteredResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Stay</h1>

      <SearchForm
        onSearch={handleSearch}
        fromLocation={fromLocation}
        setFromLocation={setFromLocation}
        toLocation={toLocation}
        setToLocation={setToLocation}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              searchResults.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full md:w-48 object-cover"
                        src={hotel.image}
                        alt={hotel.name}
                      />
                    </div>
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="ml-1 text-gray-600">{hotel.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-semibold">{hotel.rating}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-bold">₹{hotel.price}</span>
                            <span className="text-gray-600">/Day</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => handleBookHotel(hotel)}>
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hotels found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
