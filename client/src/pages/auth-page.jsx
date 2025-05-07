import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import '../styles/auth.css';

const AuthPage = () => {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // Form errors
  const [loginError, setLoginError] = useState('');
  const [registerErrors, setRegisterErrors] = useState({});
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLoginError('');
    setRegisterErrors({});
  };
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };
  
  const validateLoginForm = () => {
    if (!loginForm.username.trim()) {
      setLoginError('Username is required');
      return false;
    }
    if (!loginForm.password) {
      setLoginError('Password is required');
      return false;
    }
    return true;
  };
  
  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerForm.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!registerForm.password) {
      errors.password = 'Password is required';
    } else if (registerForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!registerForm.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!registerForm.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!registerForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    loginMutation.mutate({
      username: loginForm.username,
      password: loginForm.password
    });
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }
    
    registerMutation.mutate({
      username: registerForm.username,
      password: registerForm.password,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone || ''
    });
  };
  
  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h1 className="auth-logo-text">TravelEase</h1>
          </div>
          
          <div className="auth-tabs">
            <div 
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => handleTabChange('login')}
            >
              Login
            </div>
            <div 
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} 
              onClick={() => handleTabChange('register')}
            >
              Register
            </div>
          </div>
          
          {activeTab === 'login' ? (
            <div className="auth-form">
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Sign in to access your account</p>
              
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-username">Username</label>
                  <input 
                    type="text" 
                    id="login-username" 
                    className="form-input" 
                    placeholder="Enter your username"
                    name="username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    className="form-input" 
                    placeholder="Enter your password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>
                
                {loginError && <p className="form-error">{loginError}</p>}
                {loginMutation.isError && <p className="form-error">{loginMutation.error.message || 'Login failed'}</p>}
                
                <button 
                  type="submit" 
                  className="auth-button"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              
              <div className="auth-footer">
                Don't have an account? <a href="#" onClick={() => handleTabChange('register')}>Register now</a>
              </div>
            </div>
          ) : (
            <div className="auth-form">
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Join us to start booking your trips</p>
              
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-firstName">First Name</label>
                    <input 
                      type="text" 
                      id="register-firstName" 
                      className="form-input" 
                      placeholder="Enter your first name"
                      name="firstName"
                      value={registerForm.firstName}
                      onChange={handleRegisterChange}
                    />
                    {registerErrors.firstName && <p className="form-error">{registerErrors.firstName}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-lastName">Last Name</label>
                    <input 
                      type="text" 
                      id="register-lastName" 
                      className="form-input" 
                      placeholder="Enter your last name"
                      name="lastName"
                      value={registerForm.lastName}
                      onChange={handleRegisterChange}
                    />
                    {registerErrors.lastName && <p className="form-error">{registerErrors.lastName}</p>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="register-email">Email</label>
                  <input 
                    type="email" 
                    id="register-email" 
                    className="form-input" 
                    placeholder="Enter your email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                  />
                  {registerErrors.email && <p className="form-error">{registerErrors.email}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="register-phone">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    id="register-phone" 
                    className="form-input" 
                    placeholder="Enter your phone number"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="register-username">Username</label>
                  <input 
                    type="text" 
                    id="register-username" 
                    className="form-input" 
                    placeholder="Choose a username"
                    name="username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                  />
                  {registerErrors.username && <p className="form-error">{registerErrors.username}</p>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-password">Password</label>
                    <input 
                      type="password" 
                      id="register-password" 
                      className="form-input" 
                      placeholder="Create a password"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                    />
                    {registerErrors.password && <p className="form-error">{registerErrors.password}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-confirmPassword">Confirm Password</label>
                    <input 
                      type="password" 
                      id="register-confirmPassword" 
                      className="form-input" 
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                    {registerErrors.confirmPassword && <p className="form-error">{registerErrors.confirmPassword}</p>}
                  </div>
                </div>
                
                {registerMutation.isError && <p className="form-error">{registerMutation.error.message || 'Registration failed'}</p>}
                
                <button 
                  type="submit" 
                  className="auth-button"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
              
              <div className="auth-footer">
                Already have an account? <a href="#" onClick={() => handleTabChange('login')}>Sign in</a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="auth-hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover the World with TravelEase</h1>
          <p className="hero-subtitle">The easiest way to book your perfect journey.</p>
          
          <div className="hero-features">
            <div className="hero-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <p className="feature-text">Book flights, hotels, buses, and trains in one place</p>
            </div>
            <div className="hero-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <p className="feature-text">Secure payments and best price guarantee</p>
            </div>
            <div className="hero-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <p className="feature-text">24/7 customer support for all your travel needs</p>
            </div>
            <div className="hero-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <p className="feature-text">Exclusive deals and discounts for members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
