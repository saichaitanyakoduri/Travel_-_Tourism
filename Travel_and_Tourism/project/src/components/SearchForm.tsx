import React, { useState } from 'react';
import axios from 'axios';

interface SearchFormProps {
  type: 'flight' | 'train' | 'bus' | 'cab';
  onSearch: (searchResults: any) => void;
  fromLocation: string;
  setFromLocation: React.Dispatch<React.SetStateAction<string>>;
  toLocation: string;
  setToLocation: React.Dispatch<React.SetStateAction<string>>;
}

const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];

const SearchForm: React.FC<SearchFormProps> = ({
  type,
  onSearch,
  fromLocation,
  setFromLocation,
  toLocation,
  setToLocation,
}) => {
  const [date, setDate] = useState<string>('');
  const [travelType, setTravelType] = useState<string>('one-way');
  const [passengers, setPassengers] = useState<number>(1);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromLocation || !toLocation) {
      alert('Please provide both From and To locations.');
      return;
    }

    if (!date) {
      alert('Please provide the Date.');
      return;
    }

    const searchData = {
      fromLocation,
      toLocation,
      date,
      travelType,
      passengers,
    };

    try {
      // Dynamic route based on travel type
      const response = await axios.post(`http://localhost:8080/api/${type}s/search`, searchData);
      console.log('Response from server:', response.data);

      // Pass the results to the parent component
      onSearch(response.data.searchResults);
    } catch (error) {
      console.error('Error connecting to the backend:', error);
      alert('Failed to connect to the backend. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">From*</label>
          <select
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Departure Location
            </option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">To*</label>
          <select
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Destination
            </option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date*</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Travel Type</label>
          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="one-way">One-Way</option>
            <option value="round-trip">Round-Trip</option>
            <option value="multi-city">Multi-City</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Passengers</label>
          <input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            min={1}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
