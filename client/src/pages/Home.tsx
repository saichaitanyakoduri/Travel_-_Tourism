import HeroSection from '../components/HeroSection';
import FeaturedDestinations from '../components/FeaturedDestinations';
import BookingModules from '../components/BookingModules';
import HotelSearchSection from '../components/HotelSearchSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { useEffect } from 'react';

const Home = () => {
  // Update page title
  useEffect(() => {
    document.title = 'TravelWorld - Your Gateway to Amazing Destinations';
  }, []);
  
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <BookingModules />
      <HotelSearchSection />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
