import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import '../styles/profile.css';

const ProfilePage = () => {
  const [location] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // Extract tab from URL path
  useEffect(() => {
    if (location.includes('bookings')) {
      setActiveTab('bookings');
    } else if (location.includes('settings')) {
      setActiveTab('settings');
    } else {
      setActiveTab('profile');
    }
  }, [location]);
  
  // Set initial user info
  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);
  
  // Fetch user's bookings
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
    error: bookingsErrorData
  } = useQuery({
    queryKey: ['/api/bookings'],
    enabled: !!user
  });
  
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditToggle = () => {
    setEditMode(!editMode);
    
    // Reset form if cancelling edit
    if (editMode) {
      setUserInfo({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || ''
      });
    }
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return;
    }
    
    // In a real app, submit form data to update profile
    // For this demo, just show a success message
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully'
    });
    
    setEditMode(false);
  };
  
  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const getStatusBadgeClass = (status) => {
    if (status === 'confirmed') return 'confirmed';
    if (status === 'pending') return 'pending';
    if (status === 'cancelled') return 'cancelled';
    return '';
  };
  
  // Get booking type display name
  const getBookingTypeDisplay = (type) => {
    if (type === 'hotel') return 'Hotel';
    if (type === 'bus') return 'Bus';
    if (type === 'train') return 'Train';
    return type;
  };
  
  // Get initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;
  };
  
  if (!user) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <div className="container">
            <div className="text-center py-5">
              <p>Please log in to view your profile</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="container">
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">Manage your account and view your bookings</p>
          </div>
          
          <div className="profile-grid">
            <div className="profile-sidebar">
              <div className="profile-user">
                <div className="profile-avatar">
                  {getInitials()}
                </div>
                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                <p className="profile-email">{user.email}</p>
                <button className="edit-profile-btn" onClick={() => { 
                  setActiveTab('profile');
                  setEditMode(true);
                }}>
                  Edit Profile
                </button>
              </div>
              
              <div className="profile-nav">
                <div 
                  className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="fas fa-user nav-icon"></i>
                  Profile Information
                </div>
                <div 
                  className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <i className="fas fa-ticket-alt nav-icon"></i>
                  My Bookings
                </div>
                <div 
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="fas fa-cog nav-icon"></i>
                  Account Settings
                </div>
              </div>
            </div>
            
            <div className="profile-main">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <>
                  <div className="section-header">
                    <h2 className="section-title">Profile Information</h2>
                  </div>
                  <div className="section-content">
                    {!editMode ? (
                      <>
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">First Name</label>
                            <p>{user.firstName}</p>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <p>{user.lastName}</p>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <p>{user.email}</p>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Phone</label>
                            <p>{user.phone || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="form-actions">
                          <button className="btn-primary" onClick={handleEditToggle}>
                            Edit Profile
                          </button>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={handleUpdateProfile}>
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input 
                              type="text" 
                              className="form-input"
                              name="firstName"
                              value={userInfo.firstName}
                              onChange={handleInfoChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input 
                              type="text" 
                              className="form-input"
                              name="lastName"
                              value={userInfo.lastName}
                              onChange={handleInfoChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input 
                              type="email" 
                              className="form-input"
                              name="email"
                              value={userInfo.email}
                              onChange={handleInfoChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input 
                              type="tel" 
                              className="form-input"
                              name="phone"
                              value={userInfo.phone}
                              onChange={handleInfoChange}
                            />
                          </div>
                        </div>
                        <div className="form-actions">
                          <button type="button" className="cancel-btn" onClick={handleEditToggle}>
                            Cancel
                          </button>
                          <button type="submit" className="save-btn">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}
              
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <>
                  <div className="section-header">
                    <h2 className="section-title">My Bookings</h2>
                  </div>
                  <div className="section-content">
                    {bookingsLoading ? (
                      <div className="text-center py-4">
                        <div className="loading-spinner"></div>
                        <p>Loading your bookings...</p>
                      </div>
                    ) : bookingsError ? (
                      <div className="text-center py-4">
                        <p>Error loading bookings: {bookingsErrorData?.message || 'Unknown error'}</p>
                      </div>
                    ) : !bookings?.length ? (
                      <div className="no-bookings">
                        <div className="no-bookings-icon">
                          <i className="fas fa-calendar-times"></i>
                        </div>
                        <p className="no-bookings-text">You don't have any bookings yet</p>
                        <a href="/" className="btn-primary">Explore Travel Options</a>
                      </div>
                    ) : (
                      <div className="booking-list">
                        {bookings.map((booking) => (
                          <div key={booking.id} className="booking-item">
                            <div className="booking-header">
                              <div className="booking-id">Booking #{booking.id}</div>
                              <div className="booking-date">{formatBookingDate(booking.bookingDate)}</div>
                            </div>
                            <div className="booking-info">
                              <div className={`booking-type ${booking.bookingType}`}>
                                {getBookingTypeDisplay(booking.bookingType)}
                              </div>
                              <h3 className="booking-title">
                                {booking.bookingType === 'hotel' ? 'Hotel Reservation' : 
                                 booking.bookingType === 'bus' ? 'Bus Tickets' : 
                                 booking.bookingType === 'train' ? 'Train Tickets' : 'Booking'}
                              </h3>
                              <div className="booking-details">
                                <div className="detail-item">
                                  <i className="fas fa-calendar-alt detail-icon"></i>
                                  <span className="detail-text">
                                    {formatBookingDate(booking.travelDate)}
                                    {booking.returnDate && ` - ${formatBookingDate(booking.returnDate)}`}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <i className="fas fa-user-friends detail-icon"></i>
                                  <span className="detail-text">
                                    {booking.guestCount} {booking.guestCount > 1 ? 'Guests' : 'Guest'}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <i className="fas fa-dollar-sign detail-icon"></i>
                                  <span className="detail-text">${booking.totalAmount.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="booking-status">
                                <div className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </div>
                                <div className="booking-actions">
                                  <button className="view-details-btn">View Details</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <>
                  <div className="section-header">
                    <h2 className="section-title">Account Settings</h2>
                  </div>
                  <div className="section-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Email Notifications</label>
                        <div className="mt-2">
                          <div className="form-check">
                            <input type="checkbox" id="notification-bookings" defaultChecked />
                            <label htmlFor="notification-bookings">Booking confirmations and updates</label>
                          </div>
                          <div className="form-check mt-2">
                            <input type="checkbox" id="notification-promotions" defaultChecked />
                            <label htmlFor="notification-promotions">Promotions and special offers</label>
                          </div>
                          <div className="form-check mt-2">
                            <input type="checkbox" id="notification-newsletter" defaultChecked />
                            <label htmlFor="notification-newsletter">Newsletter</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Language</label>
                        <select className="form-input">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Currency</label>
                        <select className="form-input">
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="jpy">JPY (¥)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="save-btn">
                        Save Preferences
                      </button>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <h3 className="section-subtitle mt-4">Security</h3>
                    <div className="form-group mt-3">
                      <button className="btn-primary">
                        Change Password
                      </button>
                    </div>
                    
                    <h3 className="section-subtitle mt-4">Delete Account</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <div className="form-group mt-3">
                      <button className="btn-outline-danger">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
