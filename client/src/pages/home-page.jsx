import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import HotelDeals from '@/components/HotelDeals';
import TransportOptions from '@/components/TransportOptions';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <SearchSection />
      <FeaturedDestinations />
      <HotelDeals />
      <TransportOptions />
      <Testimonials />
      <Newsletter />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HomePage;
