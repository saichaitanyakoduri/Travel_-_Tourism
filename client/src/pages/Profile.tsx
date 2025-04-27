import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { userApi } from '../lib/api';

const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, authLoading, setLocation]);
  
  // Set document title
  useEffect(() => {
    document.title = 'My Profile - TravelWorld';
  }, []);
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
      });
      
      // Fetch additional profile data if available
      fetchProfileData();
    }
  }, [user]);
  
  const fetchProfileData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const response = await userApi.getProfile();
      
      if (response.user) {
        // Merge any additional user data from the API
        setProfileData(prev => ({
          ...prev,
          ...response.user,
          // Don't overwrite the core user data we already have
          firstName: user.firstName || prev.firstName,
          lastName: user.lastName || prev.lastName,
          email: user.email || prev.email
        }));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');
      
      // This would be implemented with a real backend
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    setLocation('/');
  };
  
  if (authLoading || !isAuthenticated) {
    return (
      <div className="py-16 bg-neutral-light min-h-screen">
        <div className="container">
          <div className="card p-6 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-neutral-light min-h-screen">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid md-grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="card">
            <div className="p-6 text-center border-b">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                {user.firstName ? user.firstName.charAt(0) : ''}
                {user.lastName ? user.lastName.charAt(0) : ''}
              </div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="flex justify-center">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold mb-4 border-b pb-2">Account Options</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/booking-history" className="flex items-center text-gray-700 hover:text-primary transition">
                    <i className="fas fa-history mr-3 w-5 text-center"></i> My Bookings
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-primary transition">
                    <i className="fas fa-heart mr-3 w-5 text-center"></i> Saved Favorites
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-primary transition">
                    <i className="fas fa-credit-card mr-3 w-5 text-center"></i> Payment Methods
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-primary transition">
                    <i className="fas fa-bell mr-3 w-5 text-center"></i> Notifications
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-primary transition">
                    <i className="fas fa-shield-alt mr-3 w-5 text-center"></i> Security
                  </a>
                </li>
                <li>
                  <button 
                    className="flex items-center text-red-600 hover:text-red-800 transition w-full text-left"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-3 w-5 text-center"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Profile Form */}
          <div className="card col-span-2">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              
              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success mb-4">
                  {successMessage}
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-error mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid md-grid-cols-2 gap-4 mb-6">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={true} // Email cannot be edited
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <h3 className="font-bold mb-4 border-b pb-2">Address Information</h3>
                
                <div className="grid md-grid-cols-2 gap-4 mb-6">
                  <div className="form-group md-grid-cols-2">
                    <label className="form-label">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input 
                      type="text" 
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleInputChange}
                      className="form-control"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                )}
              </form>
              
              <div className="mt-10">
                <h3 className="font-bold mb-4 border-b pb-2">Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                    </div>
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        id="emailNotifications" 
                        className="form-check-input"
                        defaultChecked={true}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive text messages for booking updates</p>
                    </div>
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        id="smsNotifications" 
                        className="form-check-input"
                        defaultChecked={false}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-sm text-gray-600">Receive travel deals and updates</p>
                    </div>
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        id="newsletter" 
                        className="form-check-input"
                        defaultChecked={true}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
