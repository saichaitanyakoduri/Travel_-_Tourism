import React from 'react';
import '../styles/hero.css';

const Hero = () => {
  const scrollToSearch = (e) => {
    e.preventDefault();
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDeals = (e) => {
    e.preventDefault();
    const dealsSection = document.getElementById('deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="hero"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
    >
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Discover Your Perfect Journey</h1>
          <p className="hero-subtitle">Explore the world's most amazing destinations with our exclusive deals on flights, hotels, and more.</p>
          <div className="hero-buttons">
            <a href="#search-section" className="hero-btn hero-btn-primary" onClick={scrollToSearch}>Start Exploring</a>
            <a href="#deals" className="hero-btn hero-btn-outline" onClick={scrollToDeals}>View Deals</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
