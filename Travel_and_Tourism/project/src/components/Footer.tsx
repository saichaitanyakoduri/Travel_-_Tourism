import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn] = useState(false); // Tracks login state
  const navigate = useNavigate();

  const handleSubscription = () => {
    alert(`Subscribed successfully with ${email}`);
    setEmail('');
  };

  const handleLinkClick = (path: string) => {
    if (isLoggedIn) {
      navigate(path); // Navigate to the service page if logged in
    } else {
      // Redirect to login page first
      navigate('/login', { state: { redirectPath: path } }); // Pass the desired service path
    }

    // Scroll to top of the page after navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-400">
              Your trusted travel partner providing comprehensive solutions for all your journey needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-6 w-6 text-gray-400 hover:text-white transition-transform transform hover:scale-110 cursor-pointer" title="Facebook" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="h-6 w-6 text-gray-400 hover:text-white transition-transform transform hover:scale-110 cursor-pointer" title="Twitter" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 text-gray-400 hover:text-white transition-transform transform hover:scale-110 cursor-pointer" title="Instagram" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="h-6 w-6 text-gray-400 hover:text-white transition-transform transform hover:scale-110 cursor-pointer" title="YouTube" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('/')}>Home</button></li>
              <li><button onClick={() => handleLinkClick('/about')}>About</button></li>
              <li><button onClick={() => handleLinkClick('/services')}>Services</button></li>
              <li><button onClick={() => handleLinkClick('/contact')}>Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('/flight-booking')}>Flight Booking</button></li>
              <li><button onClick={() => handleLinkClick('/hotel-booking')}>Hotel Booking</button></li>
              <li><button onClick={() => handleLinkClick('/train-booking')}>Train Booking</button></li>
              <li><button onClick={() => handleLinkClick('/bus-booking')}>Bus Booking</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Travel Street</li>
              <li>City, Country 12345</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Email: info@TravelWorld.com</li>
            </ul>
          </div>
        </div>

        {/* Newsletter and Language Selection */}
        <div className="mt-8 border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-md text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md text-white"
                onClick={handleSubscription}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Language</h3>
            <select className="w-full p-2 border rounded-md text-gray-900">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            <script
              type="text/javascript"
              src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            ></script>
          </div>

          {/* Tagline/Testimonials */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Our Motto</h3>
            <p className="text-gray-400 italic">"Your journey, our responsibility."</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Travel World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
