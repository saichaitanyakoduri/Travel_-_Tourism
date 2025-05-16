import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FilterPanel from '../components/FilterPanel';
import { Clock, Plane } from 'lucide-react';

interface Flight {
  id: number;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

const FlightBooking = () => {
  // State for search input
  const [fromLocation, setFromLocation] = useState<string>(''); // Departure location
  const [toLocation, setToLocation] = useState<string>(''); // Destination location

  // State for booking process
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0); // Step index for booking process
  const [selectedClass, setSelectedClass] = useState<string>('Normal'); // Seating class (Normal or Business)
  const [personalDetails, setPersonalDetails] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState<string>(''); // Selected payment method
  const [paymentDetails, setPaymentDetails] = useState<{ upiId: string }>({
    upiId: '',
  });
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Dummy search results
  const [searchResults] = useState<Flight[]>([
    {
      id: 1,
      airline: 'SkyWings Airlines',
      departure: '08:00 AM',
      arrival: '11:30 AM',
      duration: '3h 30m',
      price: 15299,
      stops: 0,
    },
    {
      id: 2,
      airline: 'Global Airways',
      departure: '10:15 AM',
      arrival: '02:45 PM',
      duration: '4h 30m',
      price: 12490,
      stops: 1,
    },
    {
      id: 3,
      airline: 'IndiGo',
      departure: '10:15 AM',
      arrival: '02:45 PM',
      duration: '4h 30m',
      price: 9890,
      stops: 1,
    },
    {
      id: 4,
      airline: 'Air India',
      departure: '10:15 AM',
      arrival: '02:45 PM',
      duration: '4h 30m',
      price: 10090,
      stops: 1,
    },
  ]);

  const handleSearch = (searchData: { from: string; to: string }) => {
    console.log('Search initiated with:', searchData);
  };

  const handleFilterChange = (_filters: any) => {
    console.log('Filter changed:', _filters);
  };

  const selectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep(1); // Move to the next step (seat selection)
  };

  const selectClass = (seatClass: string) => {
    setSelectedClass(seatClass);
    setTotalAmount(selectedFlight ? selectedFlight.price * (seatClass === 'Business' ? 1.5 : 1) : 0);
  };

  const handlePersonalDetailsChange = (name: string, email: string) => {
    setPersonalDetails({ name, email });
  };

  const handlePaymentDetailsChange = (upiId: string) => {
    setPaymentDetails({ upiId });
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const [emailSent, setEmailSent] = useState(false);
  const handleBooking = async () => {
    if (selectedFlight && personalDetails.name && personalDetails.email && paymentDetails.upiId) {
      // Send booking confirmation email
      await import('./sendBookingEmail').then(({ sendBookingEmail }) =>
        sendBookingEmail({
          toEmail: personalDetails.email,
          name: personalDetails.name,
          service: 'Flight',
          details: `${selectedFlight.airline}, ${selectedClass}, ${selectedFlight.departure} to ${selectedFlight.arrival}`,
          price: selectedFlight.price
        })
      );
      setEmailSent(true);
      setCurrentStep(4); // Move to the payment page directly
    } else {
      alert('Please complete all details before booking.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Flights</h1>
      {emailSent && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">Booking confirmation email sent!</div>
      )}

      <SearchForm
        type="flight"
        onSearch={handleSearch}
        fromLocation={fromLocation}
        setFromLocation={setFromLocation}
        toLocation={toLocation}
        setToLocation={setToLocation}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel type="flight" onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            {searchResults.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">{flight.airline}</h3>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{flight.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{flight.departure}</div>
                      <Plane className="h-6 w-6 mx-auto my-2 text-blue-600" />
                      <div className="text-lg font-semibold">{flight.arrival}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold">₹{flight.price}</div>
                      <button onClick={() => selectFlight(flight)} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {selectedFlight && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

                {/* Seat Selection */}
                {currentStep === 1 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Class</h3>
                    <div className="flex space-x-4">
                      <button onClick={() => selectClass('Normal')} className={`px-4 py-2 ${selectedClass === 'Normal' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                        Normal
                      </button>
                      <button onClick={() => selectClass('Business')} className={`px-4 py-2 ${selectedClass === 'Business' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        Business
                      </button>
                    </div>
                  </div>
                )}

                {/* Personal Details */}
                {currentStep === 2 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                    <input
                      type="text"
                      placeholder="Name"
                      value={personalDetails.name}
                      onChange={(e) => handlePersonalDetailsChange(e.target.value, personalDetails.email)}
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={personalDetails.email}
                      onChange={(e) => handlePersonalDetailsChange(personalDetails.name, e.target.value)}
                      className="border p-2 w-full"
                    />
                  </div>
                )}

                {/* Payment Method */}
                {currentStep === 3 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                    <button onClick={() => handlePaymentMethodChange('upi')} className={`px-4 py-2 ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                      UPI
                    </button>
                  </div>
                )}

                {/* Payment Details */}
                {currentStep === 3 && (
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="UPI ID"
                      value={paymentDetails.upiId}
                      onChange={(e) => handlePaymentDetailsChange(e.target.value)}
                      className="border p-2 w-full"
                    />
                  </div>
                )}

                {/* Booking Summary */}
                {currentStep === 3 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
                    <p className="text-sm text-gray-600">Class: {selectedClass}</p>
                    <p className="text-sm text-gray-600">Price: ₹{selectedFlight.price}</p>
                    <p className="text-lg font-bold">Total: ₹{selectedFlight.price}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {currentStep > 0 && (
                    <button onClick={() => setCurrentStep(currentStep - 1)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                      Back
                    </button>
                  )}
                  {currentStep < 3 && (
                    <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                      Next
                    </button>
                  )}
                  {currentStep === 3 && (
                    <button onClick={handleBooking} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                      Book Now
                    </button>
                  )}
                  {currentStep === 4 && emailSent && (
                    <button onClick={() => window.location.reload()} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 ml-4">
                      Book Another Flight
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;

