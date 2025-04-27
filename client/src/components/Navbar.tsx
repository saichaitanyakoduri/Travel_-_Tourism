import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import { FaGlobeAmericas, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentLocation] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentLocation]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="navbar-brand">
                <FaGlobeAmericas className="mr-2 text-3xl" />
                TravelWorld
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link href="/flights" className="nav-link flex items-center">
                    Flights <FaChevronDown className="ml-1 text-xs" />
                  </Link>
                  <div className="dropdown-menu">
                    <Link href="/flights?type=domestic" className="dropdown-item">Domestic Flights</Link>
                    <Link href="/flights?type=international" className="dropdown-item">International Flights</Link>
                    <Link href="/flights/status" className="dropdown-item">Flight Status</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link href="/hotels" className="nav-link flex items-center">
                    Hotels <FaChevronDown className="ml-1 text-xs" />
                  </Link>
                  <div className="dropdown-menu">
                    <Link href="/hotels?type=luxury" className="dropdown-item">Luxury Hotels</Link>
                    <Link href="/hotels?type=budget" className="dropdown-item">Budget Stays</Link>
                    <Link href="/hotels?type=vacation" className="dropdown-item">Vacation Rentals</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link href="/buses" className="nav-link flex items-center">
                    Buses <FaChevronDown className="ml-1 text-xs" />
                  </Link>
                  <div className="dropdown-menu">
                    <Link href="/buses?type=city" className="dropdown-item">City Buses</Link>
                    <Link href="/buses?type=intercity" className="dropdown-item">Inter-city Buses</Link>
                    <Link href="/buses?type=luxury" className="dropdown-item">Luxury Coaches</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link href="/trains" className="nav-link flex items-center">
                    Trains <FaChevronDown className="ml-1 text-xs" />
                  </Link>
                  <div className="dropdown-menu">
                    <Link href="/trains?type=express" className="dropdown-item">Express Trains</Link>
                    <Link href="/trains?type=sleeper" className="dropdown-item">Sleeper Trains</Link>
                    <Link href="/trains?type=scenic" className="dropdown-item">Scenic Railways</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link href="/deals" className="nav-link">Deals</Link>
                </li>
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <Link href="/booking-history" className="nav-link">My Bookings</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/profile" className="nav-link">Profile</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
            {/* Auth Buttons */}
            <div className="desktop-menu flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Hi, {user?.firstName}</span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={openLoginModal}
                    className="font-medium hover:text-primary transition"
                  >
                    Login
                  </button>
                  <button 
                    onClick={openSignupModal}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <nav>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link href="/" className="block py-2 nav-link">Home</Link>
              </li>
              <li>
                <Link href="/flights" className="block py-2 nav-link">Flights</Link>
              </li>
              <li>
                <Link href="/hotels" className="block py-2 nav-link">Hotels</Link>
              </li>
              <li>
                <Link href="/buses" className="block py-2 nav-link">Buses</Link>
              </li>
              <li>
                <Link href="/trains" className="block py-2 nav-link">Trains</Link>
              </li>
              <li>
                <Link href="/deals" className="block py-2 nav-link">Deals</Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link href="/booking-history" className="block py-2 nav-link">My Bookings</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="block py-2 nav-link">Profile</Link>
                  </li>
                </>
              )}
            </ul>
            <div className="navbar-auth">
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button 
                    onClick={openLoginModal}
                    className="btn btn-outline-primary"
                  >
                    Login
                  </button>
                  <button 
                    onClick={openSignupModal}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Auth Modals */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={closeModals} 
          onSignupClick={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(true);
          }} 
        />
      )}
      
      {isSignupModalOpen && (
        <SignupModal 
          onClose={closeModals} 
          onLoginClick={() => {
            setIsSignupModalOpen(false);
            setIsLoginModalOpen(true);
          }} 
        />
      )}
    </>
  );
};

export default Navbar;
