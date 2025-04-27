import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hello! I\'m your TravelWorld assistant. How can I help you today? Ask me about flights, hotels, or travel tips!'
  }
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [messageId, setMessageId] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messageId,
      sender: 'user',
      text: inputText.trim()
    };
    
    setMessages([...messages, userMessage]);
    setMessageId(messageId + 1);
    setInputText('');
    
    // Generate bot response after a slight delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText.trim());
      const botMessage: Message = {
        id: messageId + 1,
        sender: 'bot',
        text: botResponse
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setMessageId(messageId + 2);
    }, 800);
  };
  
  // Simple function to generate bot responses based on keywords
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('flight') || input.includes('fly') || input.includes('plane')) {
      return "Our flight booking system allows you to search for flights to hundreds of destinations worldwide. You can filter by price, airlines, or departure times. Would you like me to help you search for a specific flight?";
    } else if (input.includes('hotel') || input.includes('stay') || input.includes('accommodation')) {
      return "We offer a wide range of hotels from luxury 5-star resorts to budget-friendly options. You can search based on location, price, amenities, and guest ratings. Is there a specific destination you're interested in?";
    } else if (input.includes('bus') || input.includes('coach')) {
      return "Our bus booking service covers both city and intercity routes with comfortable seating options. You can compare prices, check schedules, and book tickets online. What route are you interested in?";
    } else if (input.includes('train') || input.includes('rail')) {
      return "We offer train bookings for express, sleeper, and scenic routes. You can view seat availability, compare fares, and book tickets directly through our platform. Would you like information about a specific train route?";
    } else if (input.includes('package') || input.includes('vacation') || input.includes('holiday')) {
      return "Our vacation packages combine flights, hotels, and sometimes activities to give you the best deals. We have packages for beach getaways, city explorations, and adventure trips. What type of vacation are you planning?";
    } else if (input.includes('cancel') || input.includes('refund')) {
      return "For cancellations and refunds, please check your booking confirmation email for cancellation policy. Most bookings can be cancelled or modified through your account. Would you like me to guide you through the cancellation process?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('cheap') || input.includes('deal')) {
      return "We constantly update our prices to ensure you get the best deals. You can also enable price alerts for specific routes to be notified when prices drop. Would you like to know about our current promotions?";
    } else if (input.includes('help') || input.includes('support') || input.includes('service')) {
      return "Our customer service team is available 24/7 to assist you with any issues. You can reach them at support@travelworld.com or call +1 (555) 123-4567. Is there a specific issue I can help with now?";
    } else if (input.includes('thank')) {
      return "You're welcome! I'm happy to assist you with your travel plans. Is there anything else you'd like to know about our services?";
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hello there! How can I assist with your travel plans today? Feel free to ask about flights, hotels, buses, trains, or our vacation packages.";
    } else {
      return "Thank you for your message! I'm not sure I fully understand. Could you please clarify what travel information you're looking for? I can help with flight bookings, hotel reservations, bus or train tickets, and travel tips.";
    }
  };
  
  return (
    <div className="chatbot-widget">
      {/* Chat Toggle Button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        <i className="fas fa-comments"></i>
      </button>
      
      {/* Chat Dialog */}
      {isOpen && (
        <div className="chat-dialog">
          <div className="chat-header">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h3 className="font-bold">TravelBot</h3>
                <p className="text-xs opacity-90">Online | Ask me anything</p>
              </div>
            </div>
            <button onClick={toggleChat}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'bot' ? 'message-bot' : 'message-user'}`}
              >
                {message.sender === 'bot' && (
                  <div className="message-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="message-content">
                  <p>{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="message-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-area">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Type your message..." 
                value={inputText}
                onChange={handleInputChange}
              />
              <button type="submit" className="chat-submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
