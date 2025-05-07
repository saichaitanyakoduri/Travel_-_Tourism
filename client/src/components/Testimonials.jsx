import React from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      rating: 5,
      text: 'The hotel booking process was seamless, and the accommodations exceeded my expectations. The staff was incredibly helpful, and my entire trip was perfect!',
      location: 'Traveled to Bali, Indonesia'
    },
    {
      id: 2,
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      rating: 4.5,
      text: 'The luxury bus service was outstanding! Comfortable seats, on-time departure, and friendly staff made my journey enjoyable. I\'ll definitely use TravelEase again!',
      location: 'Traveled across Europe'
    },
    {
      id: 3,
      name: 'Emily Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      rating: 5,
      text: 'I booked a complete package including flights, hotel, and local transportation. Everything was perfectly organized, and the customer support was amazing whenever I had questions.',
      location: 'Traveled to Santorini, Greece'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    return stars;
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Read authentic reviews from travelers who have experienced our services.</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-header">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <div className="testimonial-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-trip">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
