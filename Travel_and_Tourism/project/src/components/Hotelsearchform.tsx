import React, { useState } from 'react';

interface SearchFormHotelProps {
  onSearch: (searchData: {
    city: string;
    checkInDate: string;
    checkOutDate: string;
    rooms: number;
    roomSharing: string;
  }) => void;
}

const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];
const roomSharingOptions = ['Single', 'Double', 'Triple'];

const SearchFormHotel: React.FC<SearchFormHotelProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [rooms, setRooms] = useState<number>(1);
  const [roomSharing, setRoomSharing] = useState<string>('Single');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city || !checkInDate || !checkOutDate) {
      alert('Please fill in all required fields.');
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      alert('Check-out date must be later than check-in date.');
      return;
    }

    const searchData = {
      city,
      checkInDate,
      checkOutDate,
      rooms,
      roomSharing,
    };

    console.log('Submitting Hotel Search Data:', searchData);
    onSearch(searchData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Hotel Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">City*</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>Select a City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Check-In Date*</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Check-Out Date*</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Rooms</label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))}
            min={1}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Room Sharing</label>
          <select
            value={roomSharing}
            onChange={(e) => setRoomSharing(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {roomSharingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Search Hotels
        </button>
      </div>
    </form>
  );
};

export default SearchFormHotel;
