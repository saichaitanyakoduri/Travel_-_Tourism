
import { Link } from 'react-router-dom';
import { Plane, LogOut } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">TravelWorld</span>
        </Link>
        
        {!isLoggedIn ? (
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/trains" className="nav-link">Trains</Link>
            <Link to="/buses" className="nav-link">Buses</Link>
            <Link to="/flights" className="nav-link">Flights</Link>
            <Link to="/hotels" className="nav-link">Hotels</Link>
            <Link to="/cabs" className="nav-link">Cabs</Link>
            <Link to="/guides" className="nav-link">Guides</Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src=""
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-gray-600">{user.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;