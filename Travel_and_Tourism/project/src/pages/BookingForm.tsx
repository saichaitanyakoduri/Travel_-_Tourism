import { useState } from 'react';
import { sendBookingEmail } from '../sendBookingEmail';

const BookingForm = ({ guideId, mode }: { guideId: string, mode: 'guide' | 'train' | 'bus' | 'cab' | 'flight' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !phone || !date || !time) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/booking/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId,
          bookingDetails: {
            name,
            phone,
            date,
            time,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book.');
      }

      const data = await response.json();
      alert('Booking successful!');
      console.log('Booking Data:', data);
      // Send booking confirmation email
      if (data?.bookingDetails?.email) {
        await sendBookingEmail({
          toEmail: data.bookingDetails.email,
          subject: `Booking Confirmation for ${mode}`,
          message: `Dear ${name}, your booking for ${mode} on ${date} at ${time} has been confirmed. Thank you for booking with us!`
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to book. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Booking Details for {mode}</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
