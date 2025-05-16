import { useState } from 'react';
import axios from 'axios';
import { Star, MapPin, Languages, Award } from 'lucide-react';
import { sendBookingEmail } from '../sendBookingEmail';

const popularDestinations: string[] = [
  'Agra', 'Jaipur', 'Varanasi', 'Delhi', 'Mumbai', 'Udaipur'
];

type GuideType = {
  id: number;
  name: string;
  location: string;
  experience: string;
  languages: string[];
  rating: number;
  price: number;
  image: string;
  specialization: string[];
  availability: boolean;
};

const guides: GuideType[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    location: 'Delhi',
    experience: '8 years',
    languages: ['English', 'Hindi', 'French'],
    rating: 4.8,
    price: 2000,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
    specialization: ['Historical Sites', 'Cultural Tours'],
    availability: true
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'Agra',
    experience: '5 years',
    languages: ['English', 'Hindi', 'Spanish'],
    rating: 4.9,
    price: 1800,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
    specialization: ['Taj Mahal Tours', 'Photography Tours'],
    availability: true
  }
];

const GuideBooking: React.FC = () => {
  const [, setSelectedLocation] = useState<string>('');
  const [step, setStep] = useState<string>('search');
  const [selectedGuide, setSelectedGuide] = useState<GuideType | null>(null);
  const [otp, setOtp] = useState<string>('');
  const [bookingData, setBookingData] = useState<{
    tourDate: string;
    numberOfPeople: number;
    phoneNumber: string;
    email: string;
    specialRequirements?: string;
  }>({
    tourDate: '',
    numberOfPeople: 1,
    phoneNumber: '',
    email: '',
    specialRequirements: ''
  });

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setStep('guides');
  };

  const handleGuideSelect = (guide: GuideType) => {
    setSelectedGuide(guide);
    setStep('booking');
  };

  const handleBooking = async () => {
    try {
      const { tourDate, numberOfPeople, phoneNumber, email } = bookingData;
      const bookingDetails = {
        guideId: selectedGuide?.id,
        tourDate,
        numberOfPeople,
        phoneNumber,
        email
      };

      if (!selectedGuide) throw new Error('Guide not selected');

      const response = await axios.post('http://localhost:3000/api/book-guide', bookingDetails);

      if (response.status === 201) {
        // Send confirmation email
        if (email) {
          await import('./sendBookingEmail').then(({ sendBookingEmail }) =>
            sendBookingEmail({
              toEmail: email,
              name: 'Guest',
              service: 'Guide',
              details: `${selectedGuide?.name}, ${tourDate}, ${numberOfPeople} people`
            })
          );
        }
        setStep('otp');
      } else {
        console.error('Error booking guide');
      }
    } catch (error) {
      const err = error as Error;
      console.error('Booking Error:', err.message || 'Unexpected error:', err);
      // Handle error, perhaps show a message to the user
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otp', { otp, bookingId: selectedGuide?.id });

      if (response.status === 200) {
        setStep('payment');
      } else {
        console.error('Invalid OTP');
      }
    } catch (error) {
      const err = error as Error;
      console.error('OTP Verification Error:', err.message || 'Unexpected error:', err);
      // Handle error, perhaps show a message to the user
    }
  };

  const renderLocationSearch = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularDestinations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationSelect(location)}
              className="p-4 border rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGuideList = () => (
    <div className="space-y-6">
      {guides.map((guide) => (
        <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full md:w-48 object-cover"
                src={guide.image}
                alt={guide.name}
              />
            </div>
            <div className="p-6 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{guide.name}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-1 text-gray-600">{guide.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{guide.rating}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{guide.experience} experience</span>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <Languages className="h-4 w-4 mr-1" />
                  <span>{guide.languages.join(', ')}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-2xl font-bold">₹{guide.price}</div>
                <button
                  onClick={() => handleGuideSelect(guide)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Book Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookingForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tour Date</label>
            <input
              type="date"
              onChange={(e) => setBookingData({ ...bookingData, tourDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of People</label>
            <input
              type="number"
              onChange={(e) => setBookingData({ ...bookingData, numberOfPeople: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              onChange={(e) => setBookingData({ ...bookingData, phoneNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
          <textarea
            onChange={(e) => setBookingData({ ...bookingData, specialRequirements: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
      <p>Please enter the OTP sent to your phone number to verify the booking.</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter OTP"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleOtpVerification}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <p>Proceed to payment for your booking.</p>
      <div className="mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Book a Guide</h1>
      {step === 'search' && renderLocationSearch()}
      {step === 'guides' && renderGuideList()}
      {step === 'booking' && renderBookingForm()}
      {step === 'otp' && renderOtpVerification()}
      {step === 'payment' && renderPayment()}
    </div>
  );
};

export default GuideBooking;
