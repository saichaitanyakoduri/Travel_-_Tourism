import { useState } from 'react';
import { Link } from 'wouter';
import { newsletterApi } from '../lib/api';
import { sendNewsletterConfirmation } from '../lib/emailjs';
import { FaGlobeAmericas, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to API
      const response = await newsletterApi.subscribe(email);
      
      // Send confirmation email
      await sendNewsletterConfirmation(email);
      
      // Show success message
      setSubscriptionMessage({
        type: 'success',
        text: 'Successfully subscribed to our newsletter!'
      });
      
      // Clear form
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Show error message
      setSubscriptionMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to subscribe. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid lg-grid-cols-5 md-grid-cols-2 gap-8 mb-10">
          <div className="lg-grid-cols-2">
            <div className="flex items-center mb-4">
              <FaGlobeAmericas className="text-3xl text-white mr-2" />
              <Link href="/" className="text-2xl font-bold font-poppins text-white">
                TravelWorld
              </Link>
            </div>
            <p className="text-gray mb-6 max-w-md">
              We're dedicated to making travel accessible, enjoyable, and memorable for everyone. 
              With TravelWorld, your perfect journey is just a few clicks away.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Destinations</a></li>
              <li><a href="#" className="footer-link">Travel Deals</a></li>
              <li><a href="#" className="footer-link">Travel Blog</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/flights" className="footer-link">Flight Booking</Link></li>
              <li><Link href="/hotels" className="footer-link">Hotel Booking</Link></li>
              <li><Link href="/buses" className="footer-link">Bus Booking</Link></li>
              <li><Link href="/trains" className="footer-link">Train Booking</Link></li>
              <li><Link href="/deals" className="footer-link">Vacation Packages</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-links">
              <li className="flex items-start mb-2">
                <FaMapMarkerAlt className="mt-1 mr-3 text-secondary" />
                <span className="text-gray-400">123 Travel Street, New York, NY 10001, USA</span>
              </li>
              <li className="flex items-center mb-2">
                <FaPhoneAlt className="mr-3 text-secondary" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center mb-2">
                <FaEnvelope className="mr-3 text-secondary" />
                <span className="text-gray-400">info@travelworld.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Newsletter</h4>
            <p className="text-gray mb-4">Subscribe to our newsletter for the latest travel deals and updates.</p>
            
            <form onSubmit={handleNewsletterSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-secondary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            {subscriptionMessage && (
              <div className={`mt-2 text-sm ${subscriptionMessage.type === 'success' ? 'text-success' : 'text-error'}`}>
                {subscriptionMessage.text}
              </div>
            )}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} TravelWorld. All rights reserved. | 
            <a href="#" className="hover:text-white transition ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
