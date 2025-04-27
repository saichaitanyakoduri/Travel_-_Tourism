const testimonials = [
  {
    id: 1,
    name: 'Sarah T.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    trip: 'Bali Getaway',
    rating: 5,
    text: 'TravelWorld made our honeymoon absolutely perfect. The flight and hotel bookings were seamless, and their customer service team was incredibly helpful when we needed to adjust our itinerary.'
  },
  {
    id: 2,
    name: 'Michael R.',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    trip: 'Frequent Traveler',
    rating: 5,
    text: 'I\'ve been using TravelWorld for years for both business and family trips. Their mobile app makes booking so easy, and I always find great deals on flights and hotels that I can\'t find elsewhere.'
  },
  {
    id: 3,
    name: 'Jennifer K.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    trip: 'Family Tour',
    rating: 4.5,
    text: 'Our family vacation was a breeze thanks to TravelWorld. The package deal saved us money, and the bus and train bookings for our multi-city tour were perfectly coordinated. Highly recommend!'
  }
];

const Testimonials = () => {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    
    // Full stars
    for (let i = 1; i <= Math.floor(rating); i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    
    // Half star if needed
    if (rating % 1 !== 0) {
      stars.push(<i key="star-half" className="fas fa-star-half-alt"></i>);
    }
    
    return stars;
  };
  
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600">Read genuine reviews from travelers who have experienced our services</p>
        </div>
        
        <div className="grid md-grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial">
              <div className="testimonial-stars mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text mb-4">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-author-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div>
                  <h4 className="testimonial-author-name">{testimonial.name}</h4>
                  <p className="testimonial-author-info">{testimonial.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
