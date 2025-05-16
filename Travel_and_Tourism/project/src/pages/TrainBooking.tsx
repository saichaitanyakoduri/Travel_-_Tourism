import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { Train } from 'lucide-react';

type Train = {
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  price: { [key: string]: number };
};

const TrainBooking = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [step, setStep] = useState('search');
  const [, setSelectedTrain] = useState<Train | null>(null);
  const [, setSelectedClass] = useState<string | null>(null);
  const [personalDetails, setPersonalDetails] = useState<{ name: string; age: string; contact: string }>({
    name: '',
    age: '',
    contact: '',
  });
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{ upi: string; cardNumber: string; expiry: string; cvv: string }>({
    upi: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [, setPaymentSuccess] = useState(false);

  // State for locations
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');

  const handleSearch = (searchData: { fromLocation: string; toLocation: string }) => {
    console.log('Search Data:', searchData);
    setStep('results');
  };

  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
    setStep('class');
  };

  const handleSelectClass = (classType: { name: string; price: number }) => {
    setSelectedClass(classType.name);
    setSelectedPrice(classType.price);
    setStep('personal');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePayment = async () => {
    setPaymentSuccess(true);
    // Send booking confirmation email
    if (email) {
      const { name } = personalDetails;
      await import('./sendTrainBookingEmail').then(({ sendTrainBookingEmail }) =>
        sendTrainBookingEmail({
          toEmail: email,
          name: name || 'Guest',
          trainName: 'Selected Train',
          price: selectedPrice || 0
        })
      );
      setEmailSent(true);
    }
    setStep('success');
  };

  const renderClassSelection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Select Class</h2>
      <div className="train-classes">
        {[{ name: '1AC', price: 3800 }, { name: '2AC', price: 2200 }, { name: '3AC', price: 1500 }, { name: 'SL', price: 750 }].map(
          (classType, index) => (
            <div key={index} className="train-class-card">
              <h3 className="train-class-title">
                {classType.name} - ₹{classType.price}
              </h3>
              <button
                onClick={() => handleSelectClass(classType)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Select
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Enter Personal Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={personalDetails.name}
        onChange={handleInputChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="age"
        placeholder="Age"
        value={personalDetails.age}
        onChange={handleInputChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={personalDetails.contact}
        onChange={handleInputChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={handleProceedToPayment}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );

  const renderPayment = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      <p>Total Price: ₹{selectedPrice}</p>
      <div className="mt-4">
        <label className="block font-bold mb-2">Email for Confirmation</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <h3 className="font-bold">UPI Payment</h3>
        <input
          type="text"
          name="upi"
          placeholder="Enter UPI ID"
          value={paymentDetails.upi}
          onChange={handlePaymentDetailsChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <h3 className="font-bold">Card Payment</h3>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handlePaymentDetailsChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="expiry"
          placeholder="Expiry Date (MM/YY)"
          value={paymentDetails.expiry}
          onChange={handlePaymentDetailsChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={handlePaymentDetailsChange}
          className="mb-4 p-2 border rounded w-full"
        />
      </div>
      <button onClick={handlePayment} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
        Complete Payment
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Payment Successful!</h2>
      <p>Your booking has been confirmed. Thank you for choosing our service!</p>
      {emailSent && (
        <div className="mt-4 text-blue-700 font-semibold">A booking confirmation email has been sent to {email}.</div>
      )}
      <button
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Book Another Train
      </button>
    </div>
  );

  const renderTrainResults = () => {
    const filteredTrains = trains.filter(
      (train) => train.departure.includes(fromLocation) && train.arrival.includes(toLocation),
    );

    return (
      <div className="space-y-6">
        {filteredTrains.map((train, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{train.name}</h3>
                <p className="text-gray-600">Train #{train.number}</p>
              </div>
              <button
                onClick={() => handleSelectTrain(train)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Train Booking</h1>
      <SearchForm
        type="train"
        onSearch={handleSearch}
        fromLocation={fromLocation}
        setFromLocation={setFromLocation}
        toLocation={toLocation}
        setToLocation={setToLocation}
      />
      <div className="mt-8">
        {step === 'search' && renderTrainResults()}
        {step === 'class' && renderClassSelection()}
        {step === 'personal' && renderPersonalDetails()}
        {step === 'payment' && renderPayment()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};

const trains: Train[] = [
  {
    name: 'Rajdhani Express',
    number: '16954',
    departure: 'Delhi',
    arrival: 'Mumbai',
    duration: '15h 55m',
    price: { sleeper: 750, ac3: 1500, ac2: 2200, ac1: 3800 },
  },
  {
    name: 'Shatabdi Express',
    number: '14237',
    departure: 'mumbai',
    arrival: 'delhi',
    duration: '5h',
    price: { sleeper: 900, ac3: 1600, ac2: 2500, ac1: 4200 },
  },
  {
    name: 'Garib Rath Express',
    number: '12028',
    departure: 'Hyderabad',
    arrival: 'bangalore',
    duration: '5h',
    price: { sleeper: 900, ac3: 1600, ac2: 2500, ac1: 4200 },
  },
  {
    name: ' Rajdhani Express',
    number: '17059',
    departure: 'Delhi',
    arrival: 'Kolkata',
    duration: '5h',
    price: { sleeper: 900, ac3: 1600, ac2: 2500, ac1: 4200 },
  },
];

export default TrainBooking;
