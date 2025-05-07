import React, { useState } from 'react';
import '../styles/newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus({
        success: false,
        message: 'Please enter a valid email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscriptionStatus({
        success: true,
        message: 'Thank you for subscribing to our newsletter!'
      });
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 5000);
    }, 1500);
  };

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
    // Pass the visibility state to the parent component or use a global state
    // This will be handled by the Chatbot component
    const chatbotEvent = new CustomEvent('toggleChatbot', {
      detail: { visible: !chatbotVisible }
    });
    document.dispatchEvent(chatbotEvent);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-grid">
          {/* Newsletter Signup */}
          <div>
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-text">Get exclusive travel deals, insider tips, and travel inspiration delivered straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required 
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscriptionStatus && (
              <div className={`mt-3 ${subscriptionStatus.success ? 'text-white' : 'text-red-300'}`}>
                {subscriptionStatus.message}
              </div>
            )}
          </div>
          
          {/* Chat with Us Button */}
          <div className="chat-container">
            <div className="chat-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h2 className="chat-title">Need Help Planning Your Trip?</h2>
            <p className="chat-text">Our travel experts are ready to assist you with any questions or special requirements.</p>
            <button id="open-chat" className="chat-button" onClick={toggleChatbot}>
              <i className="fas fa-headset"></i>Chat with Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
