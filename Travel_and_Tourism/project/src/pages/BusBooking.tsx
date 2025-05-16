import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import FilterPanel from '../components/FilterPanel';
import { Clock, Bus, MapPin } from 'lucide-react';
import axios from 'axios';

interface Route {
  id: number;
  from: string;
  to: string;
  duration: string;
  price: { sleeper: number; ac3: number; ac2: number; ac1: number };
}

const BusBooking = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>([]); // Original list of routes
  const [searchResults, setSearchResults] = useState<Route[]>([]); // Filtered routes
  const [fromLocation, setFromLocation] = useState<string>(''); // From location
  const [toLocation, setToLocation] = useState<string>(''); // To location
  const [startDate, setStartDate] = useState<string>(''); // Start date
  const [returnDate, setReturnDate] = useState<string>(''); // Return date
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const [fetchError, setFetchError] = useState<boolean>(false); // Fetch error state

  // Fetch routes on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Route[]>('http://localhost:8080/api/buses');
        if (response.data.length > 0) {
          setAllRoutes(response.data);
          setSearchResults(response.data);
        } else {
          throw new Error('No routes found');
        }
        setFetchError(false); // Reset error state if successful
      } catch (error) {
        console.error('API fetch failed. Using fallback data.', error);
        setFetchError(true); // Set error state to true if API fails
        // Fallback data
        const fallbackRoutes: Route[] = [
          { id: 1, from: 'Mumbai', to: 'Delhi', duration: '3h 30m', price: { sleeper: 300, ac3: 500, ac2: 700, ac1: 1000 } },
          { id: 2, from: 'Mumbai', to: 'Bangalore', duration: '4h 15m', price: { sleeper: 350, ac3: 550, ac2: 750, ac1: 1050 } },
          { id: 3, from: 'Delhi', to: 'Bangalore', duration: '12h 0m', price: { sleeper: 900, ac3: 1200, ac2: 1500, ac1: 2000 } },
          { id: 4, from: 'Delhi', to: 'Mumbai', duration: '3h 0m', price: { sleeper: 400, ac3: 600, ac2: 800, ac1: 1200 } },
          { id: 5, from: 'Chennai', to: 'Hyderabad', duration: '9h 0m', price: { sleeper: 700, ac3: 1000, ac2: 1300, ac1: 1700 } },
          { id: 6, from: 'Kolkata', to: 'Durgapur', duration: '2h 45m', price: { sleeper: 250, ac3: 400, ac2: 600, ac1: 850 } },
        ];
        setAllRoutes(fallbackRoutes);
        setSearchResults(fallbackRoutes);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      setErrorMessage('');
      return;
    }

    setErrorMessage(null); // Clear previous errors
    const filteredResults = allRoutes.filter(
      (route) =>
        route.from.toLowerCase().includes(fromLocation.trim().toLowerCase()) &&
        route.to.toLowerCase().includes(toLocation.trim().toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Handle From and To location input changes
  const handleFromLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromLocation(e.target.value);
    setErrorMessage(null); // Clear error when user types
  };

  const handleToLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToLocation(e.target.value);
    setErrorMessage(null); // Clear error when user types
  };

  // Retry fetching data from API
  const retryFetchRoutes = () => {
    setFetchError(false);
    setLoading(true);
    fetchRoutes();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bus Booking</h1>

      {/* Error Message */}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

     

      {/* Loading State */}
      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <>
          {/* Search Form */}
          <SearchForm
            type="bus"
            onSearch={handleSearch}
            fromLocation={fromLocation}
            setFromLocation={handleFromLocationChange}
            toLocation={toLocation}
            setToLocation={handleToLocationChange}
            startDate={startDate}
            setStartDate={setStartDate}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
          />

          {/* Render search results */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel
                type="bus"
                onFilterChange={(filters) => {
                  // Apply dynamic filters here
                  console.log(filters);
                }}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="space-y-6">
                {searchResults.length > 0 ? (
                  searchResults.map((route) => (
                    <div key={route.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center space-x-4">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="text-xl font-semibold">
                                {route.from} → {route.to}
                              </h3>
                              <div className="flex items-center text-gray-600 mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{route.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <Bus className="h-6 w-6 text-blue-600" />
                            <div className="text-sm text-gray-600 mt-1">Bus Service</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹{route.price.sleeper}</div>
                            <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                              Select
                            </button>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹{route.price.ac3}</div>
                            <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                              Select
                            </button>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹{route.price.ac2}</div>
                            <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                              Select
                            </button>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">₹{route.price.ac1}</div>
                            <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No routes found. Try a different search.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusBooking;

