import { useState } from 'react';
import SearchForm from '../components/SearchForm'; // Import SearchForm component
import { MapPin, CheckCircle } from 'lucide-react'; // Only import what is used

type Step = 'search' | 'booking' | 'confirmed'; // Define allowed states for the step

const CabBooking = () => {
  const [_step, _setStep] = useState<Step>('search'); // Step state
  const [fromLocation, setFromLocation] = useState<string>(''); // From location
  const [toLocation, setToLocation] = useState<string>(''); // To location
  const [startDate, setStartDate] = useState<string>(''); // Start date
  const [returnDate, setReturnDate] = useState<string>(''); // Return date
  const [error, setError] = useState<string>(''); // State for error message
  const [selectedCity, setSelectedCity] = useState<string>(''); // State for selected city

  // Static data for cabs
  const cabTypes = [
    {
      type: 'Economy',
      capacity: '4 Passengers',
      price: 12,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2070&q=80',
    },
    {
      type: 'Premium Sedan',
      capacity: '4 Passengers',
      price: 18,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2070&q=80',
    },
    {
      type: 'SUV',
      capacity: '6 Passengers',
      price: 25,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2071&q=80',
    },
    {
      type: 'Luxury',
      capacity: '4 Passengers',
      price: 35,
      image: 'https://images.unsplash.com/photo-1583152327285-479b1d06a75e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjA3fDB8MHxwaG90by1wYWNrZXxlbnwwfDB8fGZpbGwtZG93bmxvYWR8ZW58MHx8fHwxNjgwMDI0MTE5&ixlib=rb-1.2.1&q=80&w=400',
    },
    {
      type: 'Minivan',
      capacity: '7 Passengers',
      price: 30,
      image: 'https://images.unsplash.com/photo-1530665984782-cba418b59494?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3MnwwfDF8c2VhY2h8MXx8Y2FiJTIwbWluJTIwdmlhbnxlbnwwfDB8fGZpbGwtZG93bmxvYWR8ZW58MHx8fHwxNjc3NzQzNjU5&ixlib=rb-1.2.1&q=80&w=400',
    },
  ];

  // Handle search logic
  const handleSearch = () => {
    if (!selectedCity || !fromLocation || !toLocation || !startDate) {
      setError('Please enter all required fields: "City", "From", "To", and "Start Date".');
      return;
    }
    setError(''); // Clear any previous error
    _setStep('booking');
  };

  // Handle booking logic
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const handleBooking = async () => {
    if (!selectedCity || !fromLocation || !toLocation || !startDate) {
      setError('Please complete the search form before booking.');
      return;
    }
    if (!email) {
      setError('Please enter your email for confirmation.');
      return;
    }
    await import('./sendBookingEmail').then(({ sendBookingEmail }) =>
      sendBookingEmail({
        toEmail: email,
        name: 'Guest',
        service: 'Cab',
        details: `${fromLocation} to ${toLocation}, ${selectedCity}, ${startDate}`
      })
    );
    setEmailSent(true);
    _setStep('confirmed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book a Cab</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {_step === 'search' && (
        <SearchForm
          type="cab"
          onSearch={handleSearch}
          fromLocation={fromLocation}
          setFromLocation={setFromLocation}
          toLocation={toLocation}
          setToLocation={setToLocation}
          startDate={startDate}
          setStartDate={setStartDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      )}

      {/* Display sample cabs before search */}
      <div className="mt-8">
        {/* Show this message if search form is incomplete */}
        {(!selectedCity || !fromLocation || !toLocation || !startDate) && (
          <div className=" ">
            
          </div>
        )}

        <div className="mb-6 text-xl font-semibold text-gray-700">
          <span>Available Cabs</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cabTypes.map((cab, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={cab.image}
                alt={cab.type}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cab.type}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{cab.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">₹{cab.price}/km</div>
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {_step === 'confirmed' && (
        <div className="mt-8 text-center">
          <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
          <h2 className="text-2xl font-semibold mt-4">Booking Confirmed</h2>
          <p className="text-gray-600 mt-2">
            Your cab has been successfully booked! We will send you the details shortly.
          </p>
          {emailSent && (
            <div className="mt-4 text-blue-700 font-semibold">A booking confirmation email has been sent to {email}.</div>
          )}
          <button
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Book Another Cab
          </button>
        </div>
      )}
    </div>
  );
};

export default CabBooking;
