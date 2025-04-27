import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ComingSoon from "./pages/ComingSoon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FlightBooking from "./pages/FlightBooking";
import HotelBooking from "./pages/HotelBooking";
import BusBooking from "./pages/BusBooking";
import TrainBooking from "./pages/TrainBooking";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import ChatbotWidget from "./components/ChatbotWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/flights" component={FlightBooking} />
      <Route path="/hotels" component={HotelBooking} />
      <Route path="/buses" component={BusBooking} />
      <Route path="/trains" component={TrainBooking} />
      <Route path="/packages" component={ComingSoon} />
      <Route path="/deals" component={ComingSoon} />
      <Route path="/activities" component={ComingSoon} />
      <Route path="/travel-guides" component={ComingSoon} />
      <Route path="/profile" component={Profile} />
      <Route path="/booking-history" component={BookingHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="app-wrapper">
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
