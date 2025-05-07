import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import HotelBooking from "@/pages/hotel-booking";
import BusBooking from "@/pages/bus-booking";
import TrainBooking from "@/pages/train-booking";
import BusesPage from "@/pages/buses-page";
import HotelsPage from "@/pages/hotels-page";
import TrainsPage from "@/pages/trains-page";
import FlightsPage from "@/pages/flights-page";
import DealsPage from "@/pages/deals-page";
import ProfilePage from "@/pages/profile-page";
import '@/styles/global.css';

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/hotels" component={HotelsPage} />
      <Route path="/hotels/:id" component={HotelBooking} />
      <Route path="/buses" component={BusesPage} />
      <Route path="/buses/:id" component={BusBooking} />
      <Route path="/trains" component={TrainsPage} />
      <Route path="/trains/:id" component={TrainBooking} />
      <Route path="/flights" component={FlightsPage} />
      <Route path="/deals" component={DealsPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/profile/bookings" component={ProfilePage} />
      <ProtectedRoute path="/profile/settings" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
