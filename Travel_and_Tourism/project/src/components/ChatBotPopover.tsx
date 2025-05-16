import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const chatOptions = [
  {
    label: 'Flight Booking Details',
    prompt: 'Show me available flights',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Available Flights:</div>
        <ul className="space-y-2">
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">SkyWings Airlines</span>
            <span>08:00 AM → 11:30 AM <span className="text-xs">(Non-stop)</span></span>
            <span className="text-green-700 font-semibold">₹15,299</span>
          </li>
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Global Airways</span>
            <span>10:15 AM → 02:45 PM <span className="text-xs">(1 stop)</span></span>
            <span className="text-green-700 font-semibold">₹12,490</span>
          </li>
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">IndiGo</span>
            <span>10:15 AM → 02:45 PM <span className="text-xs">(1 stop)</span></span>
            <span className="text-green-700 font-semibold">₹9,890</span>
          </li>
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Air India</span>
            <span>10:15 AM → 02:45 PM <span className="text-xs">(1 stop)</span></span>
            <span className="text-green-700 font-semibold">₹10,090</span>
          </li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Select your departure and arrival cities in the booking form for more options.</div>
      </div>
    )
  },
  {
    label: 'Train Booking Details',
    prompt: 'Show me available trains',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Train Classes & Prices:</div>
        <ul className="grid grid-cols-2 gap-2">
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">1AC</span><span className="text-green-700 font-semibold">₹3,800</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">2AC</span><span className="text-green-700 font-semibold">₹2,200</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">3AC</span><span className="text-green-700 font-semibold">₹1,500</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">Sleeper (SL)</span><span className="text-green-700 font-semibold">₹750</span></li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Choose your route and class in the train booking form to see more details.</div>
      </div>
    )
  },
  {
    label: 'Bus Booking Details',
    prompt: 'Show me available bus routes',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Sample Bus Routes:</div>
        <ul className="space-y-2">
          <li className="bg-blue-50 rounded p-2">
            <span className="font-bold">Mumbai → Delhi</span>
            <div className="text-xs mt-1">Sleeper ₹300, AC3 ₹500, AC2 ₹700, AC1 ₹1,000</div>
          </li>
          <li className="bg-blue-50 rounded p-2">
            <span className="font-bold">Delhi → Bangalore</span>
            <div className="text-xs mt-1">Sleeper ₹900, AC3 ₹1,200, AC2 ₹1,500, AC1 ₹2,000</div>
          </li>
          <li className="bg-blue-50 rounded p-2">
            <span className="font-bold">Chennai → Hyderabad</span>
            <div className="text-xs mt-1">Sleeper ₹700, AC3 ₹1,000, AC2 ₹1,300, AC1 ₹1,700</div>
          </li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Enter your route in the booking form for more options.</div>
      </div>
    )
  },
  {
    label: 'Cab Booking Details',
    prompt: 'Show me available cabs',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Cab Types & Prices (per km):</div>
        <ul className="grid grid-cols-2 gap-2">
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">Economy</span><span>4 Passengers</span><span className="text-green-700 font-semibold">₹12</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">Premium Sedan</span><span>4 Passengers</span><span className="text-green-700 font-semibold">₹18</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">SUV</span><span>6 Passengers</span><span className="text-green-700 font-semibold">₹25</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">Minivan</span><span>7 Passengers</span><span className="text-green-700 font-semibold">₹30</span></li>
          <li className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="font-bold">Luxury</span><span>4 Passengers</span><span className="text-green-700 font-semibold">₹35</span></li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Choose your city and route for exact pricing.</div>
      </div>
    )
  },
  {
    label: 'Hotel Booking Details',
    prompt: 'Show me available hotels',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Featured Hotels:</div>
        <ul className="space-y-2">
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Luxury Hotel & Spa</span>
            <span>Goa</span>
            <span className="text-yellow-600">4.8★</span>
            <span className="text-green-700 font-semibold">₹1,299/day</span>
          </li>
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Business Hotel</span>
            <span>Mumbai</span>
            <span className="text-yellow-600">4.5★</span>
            <span className="text-green-700 font-semibold">₹1,499/day</span>
          </li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Search for your destination to see more hotel options.</div>
      </div>
    )
  },
  {
    label: 'Guide Booking Details',
    prompt: 'Show me available guides',
    response: (
      <div>
        <div className="font-semibold mb-2 text-blue-700">Popular Guides:</div>
        <ul className="space-y-2">
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Rahul Kumar</span>
            <span>Delhi</span>
            <span>8 years exp</span>
            <span>Speaks: English, Hindi, French</span>
            <span className="text-green-700 font-semibold">₹2,000</span>
          </li>
          <li className="bg-blue-50 rounded p-2 flex flex-col">
            <span className="font-bold">Priya Singh</span>
            <span>Agra</span>
            <span>5 years exp</span>
            <span>Speaks: English, Hindi, Spanish</span>
            <span className="text-green-700 font-semibold">₹1,800</span>
          </li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">Choose your destination to view available guides and specialties.</div>
      </div>
    )
  },
  {
    label: 'General Support',
    prompt: 'I need general support',
    response: (
      <span>How can I assist you? You can ask about bookings, cancellations, or any other service.</span>
    )
  }
];

const ChatBotPopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  type ChatMessage = { sender: 'user' | 'bot'; text?: string; jsx?: React.ReactNode };
const [messages, setMessages] = useState<ChatMessage[]>([
  { sender: 'bot', text: 'Hi! I am your travel assistant. How can I help you today?' }
]);

const handleOptionClick = (option: typeof chatOptions[0]) => {
  setMessages((prev) => [
    ...prev,
    { sender: 'user', text: option.prompt },
    { sender: 'bot', jsx: option.response }
  ]);
};

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chatbot"
      >
        {open ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Popover */}
      {open && (
        <div className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in" style={{height: '520px', maxHeight: '90vh'}}>
          <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white px-4 py-4 font-bold text-lg shadow-md flex items-center gap-2">
  <MessageCircle size={22} className="inline-block mr-1" /> Travel Chatbot
</div>
          <div className="flex-1 p-5 space-y-3 overflow-y-auto max-h-80 bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in">
  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`text-base px-4 py-2 rounded-2xl shadow ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-900 self-start' : 'bg-blue-200 text-blue-900 self-end ml-auto border border-blue-300'}`}
      style={{ alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end' }}
    >
      {msg.jsx ? msg.jsx : msg.text}
    </div>
  ))}
</div>
          <div className="border-t bg-gradient-to-r from-blue-50 via-white to-blue-100 sticky bottom-0 z-10">
  <div className="flex gap-3 overflow-x-auto py-3 px-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
    {chatOptions.map((opt) => (
      <button
        key={opt.label}
        className="min-w-[210px] h-14 flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all duration-200 ease-in-out text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={() => handleOptionClick(opt)}
        aria-label={opt.label}
      >
        {opt.label}
      </button>
    ))}
  </div>
</div>
        </div>
      )}
    </>
  );
};

export default ChatBotPopover;
