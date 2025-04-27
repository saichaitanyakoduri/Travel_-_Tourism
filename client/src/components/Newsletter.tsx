import { useState } from 'react';
import { newsletterApi } from '../lib/api';
import { sendNewsletterConfirmation } from '../lib/emailjs';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Submit to API
      const response = await newsletterApi.subscribe(email);
      
      // Send confirmation email
      await sendNewsletterConfirmation(email);
      
      // Show success message
      setMessage({
        type: 'success',
        text: 'Successfully subscribed to our newsletter!'
      });
      
      // Clear form
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Show error message
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to subscribe. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="newsletter">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="newsletter-title">Get Travel Deals & Updates</h2>
          <p className="opacity-90 mb-8">Subscribe to our newsletter and be the first to receive exclusive deals, travel tips, and destination updates.</p>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button 
              type="submit" 
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              <i className="fas fa-paper-plane mr-2"></i> 
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 ${message.type === 'success' ? 'text-success' : 'text-error'}`} style={{color: message.type === 'success' ? 'white' : '#ffcccc'}}>
              {message.text}
            </div>
          )}
          
          <p className="newsletter-disclaimer">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from TravelWorld.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
