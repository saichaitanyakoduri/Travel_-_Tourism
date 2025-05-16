import { Link } from 'react-router-dom';
import { Plane, Train, Bus, Building2, Clock, Calendar } from 'lucide-react';

const Dashboard = () => {
  const recentBookings = [
    { type: 'flight', from: 'New York', to: 'London', date: '2024-03-25' },
    { type: 'hotel', location: 'Paris', date: '2024-04-10' },
    { type: 'train', from: 'Berlin', to: 'Munich', date: '2024-03-30' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          to="/flights"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Plane className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book Flights</h3>
          <p className="text-gray-600">Find the best flight deals</p>
        </Link>

        <Link
          to="/trains"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Train className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book Trains</h3>
          <p className="text-gray-600">Travel by rail</p>
        </Link>

        <Link
          to="/buses"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Bus className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book Buses</h3>
          <p className="text-gray-600">Intercity bus travel</p>
        </Link>

        <Link
          to="/hotels"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Building2 className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book Hotels</h3>
          <p className="text-gray-600">Find perfect accommodations</p>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {recentBookings.map((booking, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {booking.type === 'flight' && <Plane className="h-6 w-6 text-blue-600" />}
                {booking.type === 'hotel' && <Building2 className="h-6 w-6 text-blue-600" />}
                {booking.type === 'train' && <Train className="h-6 w-6 text-blue-600" />}
                {booking.type === 'bus' && <Bus className="h-6 w-6 text-blue-600" />}
                <div>
                  <p className="font-semibold">
                    {booking.type === 'hotel'
                      ? booking.location
                      : `${booking.from} to ${booking.to}`}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {booking.date}
                  </div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;