import React from 'react';

interface Booking {
  id: number;
  type: string; // 'flight', 'train', 'cab', etc.
  fromLocation: string;
  toLocation: string;
  startDate: string;
  returnDate: string;
  passengers: number;
  status: 'confirmed' | 'pending' | 'cancelled'; // Status of the booking
}

interface BookingHistoryProps {
  bookings: Booking[]; // List of booking history
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Booking ID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">From</th>
              <th className="px-4 py-2 border">To</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">Return Date</th>
              <th className="px-4 py-2 border">Passengers</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="px-4 py-2 border">{booking.id}</td>
                <td className="px-4 py-2 border">{booking.type}</td>
                <td className="px-4 py-2 border">{booking.fromLocation}</td>
                <td className="px-4 py-2 border">{booking.toLocation}</td>
                <td className="px-4 py-2 border">{booking.startDate}</td>
                <td className="px-4 py-2 border">{booking.returnDate}</td>
                <td className="px-4 py-2 border">{booking.passengers}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      booking.status === 'confirmed'
                        ? 'bg-green-500'
                        : booking.status === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;
