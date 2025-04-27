import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaTimes } from 'react-icons/fa';

interface SignupModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const SignupModal = ({ onClose, onLoginClick }: SignupModalProps) => {
  const { register, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validatePassword = (password) => {
    // Password must be at least 8 characters with letters, numbers, and special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters with letters, numbers, and special characters');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      if (success) {
        onClose(); // Close modal on successful registration
      } else {
        setError(authError || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header" style={{ backgroundColor: 'var(--secondary)' }}>
          <h2 className="modal-title">Create Your Account</h2>
          <p>Join TravelWorld for the best travel deals</p>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          {error && (
            <div className="alert alert-error mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="first-name">First Name</label>
                  <input 
                    type="text" 
                    id="first-name"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="last-name">Last Name</label>
                  <input 
                    type="text" 
                    id="last-name"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email Address</label>
              <input 
                type="email" 
                id="signup-email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Password</label>
              <input 
                type="password" 
                id="signup-password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long with letters, numbers, and special characters.
              </p>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="terms"
                  name="agreeTerms"
                  className="form-check-input"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the <a href="#" className="text-secondary">Terms of Service</a> and <a href="#" className="text-secondary">Privacy Policy</a>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-block mt-4"
              style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={onLoginClick}
                className="text-secondary hover-underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
