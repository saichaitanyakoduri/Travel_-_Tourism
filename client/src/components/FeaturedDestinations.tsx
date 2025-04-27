import { Link } from 'wouter';

const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    rating: 4.9,
    reviews: '2.3k',
    price: '$1,299',
    discount: '20% OFF',
    description: 'Discover the breathtaking views of Santorini\'s whitewashed buildings and blue domes.'
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0',
    rating: 4.8,
    reviews: '3.1k',
    price: '$999',
    discount: '15% OFF',
    description: 'Experience the tropical paradise with pristine beaches and vibrant cultural heritage.'
  },
  {
    id: 3,
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb',
    rating: 4.9,
    reviews: '4.7k',
    price: '$1,799',
    discount: 'POPULAR',
    discountType: 'secondary',
    description: 'Relax in luxury overwater bungalows surrounded by crystal clear turquoise waters.'
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Destinations</h2>
          <Link href="/destinations" className="text-primary font-medium hover-underline flex items-center">
            View all destinations <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
        
        <div className="grid md-grid-cols-3 gap-6">
          {destinations.map(destination => (
            <div key={destination.id} className="card">
              <div className="card-image">
                <img src={destination.image} alt={destination.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="flex items-center text-sm">
                    <i className="fas fa-map-marker-alt mr-1"></i> {destination.country}
                  </p>
                </div>
                <div className={`absolute top-4 right-4 bg-white/90 text-${destination.discountType || 'primary'} px-2 py-1 rounded text-sm font-medium`}>
                  {destination.discount}
                </div>
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <i className="fas fa-star text-warning"></i>
                    <span className="ml-1 font-medium">{destination.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({destination.reviews} reviews)</span>
                  </div>
                  <p className="font-bold text-primary">{destination.price}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{destination.description}</p>
                <Link href={`/destinations/${destination.id}`} className="btn btn-outline-primary btn-block">
                  <i className="fas fa-info-circle mr-2"></i> View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
