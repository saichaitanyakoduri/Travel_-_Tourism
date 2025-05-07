import React, { useState, useEffect, useRef } from 'react';
import '../styles/chatbot.css';

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Hi there! I\'m your TravelEase assistant. How can I help you today?'
    },
    {
      type: 'bot',
      text: 'You can ask me about:',
      suggestions: [
        'How do I book a hotel?',
        'How do I book a train?',
        'How do I book a bus?',
        'Tell me about your destinations',
        'What\'s your cancellation policy?',
        'Do you have any current promotions?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Listen for the custom event from the Newsletter component
    const handleToggleChatbot = (event) => {
      setVisible(event.detail.visible);
    };

    document.addEventListener('toggleChatbot', handleToggleChatbot);

    return () => {
      document.removeEventListener('toggleChatbot', handleToggleChatbot);
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    addMessage('user', inputText);
    
    // Clear input
    setInputText('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      let followupSuggestions = [];
      
      // Simple response logic based on keywords
      const input = inputText.toLowerCase();
      
      if (input.includes('book') && (input.includes('flight') || input.includes('plane'))) {
        botResponse = 'We\'re currently expanding our flight booking services. In the meantime, you can explore our hotel, bus, and train booking options. Would you like to know more about these?';
        followupSuggestions = ['How do I book a hotel?', 'How do I book a train?', 'How do I book a bus?'];
      } else if (input.includes('book') && input.includes('hotel')) {
        botResponse = 'To book a hotel, browse our listings, select your preferred property, choose your dates and room type. Then click "Book Now" to confirm your reservation without entering payment details. You\'ll receive a confirmation email instantly.';
        followupSuggestions = ['Popular hotels', 'Hotel amenities', 'Cancellation policy'];
      } else if (input.includes('book') && input.includes('train')) {
        botResponse = 'For train bookings, simply select your departure and arrival stations, preferred date and class. Select your seats and click "Complete Booking". Your booking will be confirmed via email with no payment processing required.';
        followupSuggestions = ['Train schedules', 'Available classes', 'Luggage policy'];
      } else if (input.includes('book') && input.includes('bus')) {
        botResponse = 'Booking a bus is easy! Choose your route, travel date, and number of passengers. Review your booking and click "Confirm" to receive your e-ticket by email. No payment details needed!';
        followupSuggestions = ['Popular routes', 'Bus amenities', 'Booking changes'];
      } else if (input.includes('payment') || input.includes('pay') || input.includes('credit card')) {
        botResponse = 'We\'ve simplified our booking process to remove payment steps. Just complete your booking and receive confirmation via email. Our system focuses on reservation management without payment processing.';
      } else if (input.includes('cancellation') || input.includes('policy')) {
        botResponse = 'Our streamlined cancellation policy allows free cancellation up to 24 hours before your scheduled service for all bookings. No questions asked, and no cancellation fees.';
      } else if (input.includes('promotion') || input.includes('deal') || input.includes('discount')) {
        botResponse = 'We have several ongoing promotions! Check our "Deals" section for the latest offers. Currently, we have up to 20% off on select destinations and hotels, with special rates on bus and train services too.';
        followupSuggestions = ['Current deals', 'Seasonal offers'];
      } else if (input.includes('destination') || input.includes('where') || input.includes('location')) {
        botResponse = 'We offer various amazing destinations! Popular choices include Santorini, Maldives, Bali, Paris, Tokyo, New York, and many more. Each destination has curated hotels and transportation options.';
        followupSuggestions = ['Tell me about Santorini', 'Best time to visit Bali', 'Popular destinations'];
      } else if (input.includes('email') || input.includes('confirmation')) {
        botResponse = 'When you complete a booking, you\'ll automatically receive a confirmation email with all your booking details. This typically arrives within minutes of completing your booking.';
      } else {
        botResponse = 'Thank you for your message. Is there anything specific about our hotel, train, or bus bookings I can help with? Feel free to explore our destinations or ask about our services.';
        followupSuggestions = ['How do I book a hotel?', 'Tell me about your destinations', 'What\'s your cancellation policy?'];
      }
      
      addMessage('bot', botResponse, followupSuggestions);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    // Add user message with the suggestion
    addMessage('user', suggestion);
    
    // Simulate bot response based on the suggestion
    setTimeout(() => {
      let botResponse;
      let followupSuggestions = [];
      
      if (suggestion.includes('book a hotel')) {
        botResponse = 'Booking a hotel is simple! Browse our hotel listings, select the property you like, choose your dates and room type, and click "Book Now". You\'ll then receive a confirmation without any payment details required.';
        followupSuggestions = ['Show me popular hotels', 'What amenities are available?'];
      } else if (suggestion.includes('book a train')) {
        botResponse = 'For train bookings, go to the Trains section, enter your departure and arrival stations, select your date and preferred class. Choose your seats and click "Complete Booking" to receive your e-ticket confirmation by email.';
        followupSuggestions = ['Show train schedules', 'What classes are available?'];
      } else if (suggestion.includes('book a bus')) {
        botResponse = 'Bus booking is straightforward! Select your route, travel date, and number of seats. Review your booking details and click "Confirm" to receive your ticket confirmation by email without payment processing.';
        followupSuggestions = ['Popular bus routes', 'Bus amenities'];
      } else if (suggestion.includes('destinations')) {
        botResponse = 'We offer a variety of amazing destinations! Our most popular ones include Santorini, Maldives, Bali, Paris, and Tokyo. Each destination features curated hotels, transportation options, and local attractions.';
        followupSuggestions = ['Tell me about Santorini', 'Best time to visit Bali'];
      } else if (suggestion.includes('cancellation policy')) {
        botResponse = 'Our simplified cancellation policy allows free cancellation up to 24 hours before your scheduled service for all bookings. You\'ll receive a full refund without any questions asked.';
      } else if (suggestion.includes('promotions')) {
        botResponse = 'Yes! We currently have several promotions running: 20% off on Santorini packages, discounted luxury hotel stays in major cities, and special rates on premium bus and train services. Check out our Deals section for all current offers!';
        followupSuggestions = ['Current deals', 'Seasonal offers'];
      }
      
      addMessage('bot', botResponse, followupSuggestions);
    }, 1000);
  };

  const addMessage = (type, text, suggestions = []) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type, text, suggestions }
    ]);
  };

  if (!visible) return null;

  return (
    <div className="chatbot active">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <i className="fas fa-robot"></i>
          <h3>TravelEase Assistant</h3>
        </div>
        <button className="chatbot-close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}>
            {message.type === 'bot' && (
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
            )}
            <div className="message-content">
              <p>{message.text}</p>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="suggestions">
                  {message.suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx} 
                      className="suggestion-button"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="chatbot-input">
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="chatbot-input-field" 
            placeholder="Type your message..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="chatbot-submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
