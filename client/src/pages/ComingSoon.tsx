import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const ComingSoon = () => {
  const [location] = useLocation();
  const [pageName, setPageName] = useState('This page');
  
  useEffect(() => {
    // Set appropriate page title based on URL
    const path = location.split('/')[1];
    
    if (path) {
      // Convert path to title case and remove hyphens
      const formattedPath = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setPageName(formattedPath);
      document.title = `${formattedPath} - Coming Soon | TravelWorld`;
    } else {
      document.title = 'Coming Soon | TravelWorld';
    }
  }, [location]);

  return (
    <div className="py-16 min-h-[70vh] flex flex-col items-center justify-center bg-neutral-light text-center">
      <div className="container max-w-3xl">
        <div className="mb-6">
          <span className="inline-block p-4 bg-blue-100 text-blue-500 rounded-full">
            <i className="fas fa-tools text-4xl"></i>
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Coming Soon!</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {pageName} is currently under construction and will be available soon. Our team is working hard to bring you an amazing experience!
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">What to expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="fas fa-magic text-indigo-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Amazing Features</h3>
              <p className="text-gray-600">Powerful tools to make your travel planning easier than ever</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-hand-holding-usd text-green-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Exclusive Deals</h3>
              <p className="text-gray-600">Special discounts and offers available only to our members</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-orange-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Fast, reliable, and secure booking experience</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/" className="btn btn-primary">
            <i className="fas fa-home mr-2"></i> Back to Home
          </a>
          <a href="/flights" className="btn btn-outline-primary">
            <i className="fas fa-plane mr-2"></i> Book a Flight
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;