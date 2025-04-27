import { Link } from 'wouter';

const bookingModules = [
  {
    id: 'flights',
    title: 'Flight Booking',
    icon: 'fa-plane',
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1525727814726-40243090e9e3',
    description: 'Find and book your perfect flight to any destination worldwide with our best price guarantee.',
    stats: '200+ Airlines',
    link: '/flights'
  },
  {
    id: 'hotels',
    title: 'Hotel Booking',
    icon: 'fa-hotel',
    color: 'secondary',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    description: 'Discover luxury, budget, and boutique accommodations that suit your travel style and budget.',
    stats: '50,000+ Properties',
    link: '/hotels'
  },
  {
    id: 'buses',
    title: 'Bus Booking',
    icon: 'fa-bus',
    color: 'accent',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
    description: 'Book comfortable bus travel with premium coaches and convenient schedules across cities.',
    stats: '1,000+ Routes',
    link: '/buses'
  },
  {
    id: 'trains',
    title: 'Train Booking',
    icon: 'fa-train',
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1552437568-f37e435fa67d',
    description: 'Experience scenic rail journeys with easy booking on regional and international train routes.',
    stats: '500+ Destinations',
    link: '/trains'
  }
];

const BookingModules = () => {
  return (
    <section id="booking-modules" className="py-16 bg-neutral-light">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">Our Travel Services</h2>
        
        <div className="grid md-grid-cols-2 lg-grid-cols-4 gap-6">
          {bookingModules.map(module => (
            <div key={module.id} className="card">
              <div className="card-image">
                <img src={module.image} alt={module.title} />
              </div>
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${module.color}/10 rounded-lg flex items-center justify-center text-${module.color}`} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className={`fas ${module.icon} text-xl`}></i>
                  </div>
                  <h3 className="ml-4 text-xl font-bold">{module.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className={`font-medium text-${module.color}`}>{module.stats.split(' ')[0]}</span> {module.stats.split(' ').slice(1).join(' ')}
                  </div>
                  <Link href={module.link} className={`text-${module.color} font-medium hover-underline flex items-center`}>
                    Book Now <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingModules;
