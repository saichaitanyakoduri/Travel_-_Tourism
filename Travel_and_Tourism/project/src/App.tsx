import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBotPopover from './components/ChatBotPopover';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HotelBooking from './pages/HotelBooking';
import FlightBooking from './pages/FlightBooking';
import TrainBooking from './pages/TrainBooking';
import BusBooking from './pages/BusBooking';
import CabBooking from './pages/CabBooking';
import GuideBooking from './pages/GuideBooking';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import './index.css'; // Ensure index.css is imported

// Define your routes
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: '/login',
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: '/signup',
      element: (
        <Layout>
          <Signup />
        </Layout>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: '/hotels',
      element: (
        <Layout>
          <HotelBooking />
        </Layout>
      ),
    },
    {
      path: '/flights',
      element: (
        <Layout>
          <FlightBooking />
        </Layout>
      ),
    },
    {
      path: '/trains',
      element: (
        <Layout>
          <TrainBooking />
        </Layout>
      ),
    },
    {
      path: '/buses',
      element: (
        <Layout>
          <BusBooking />
        </Layout>
      ),
    },
    {
      path: '/cabs',
      element: (
        <Layout>
          <CabBooking />
        </Layout>
      ),
    },
    {
      path: '/guides',
      element: (
        <Layout>
          <GuideBooking />
        </Layout>
      ),
    },
    {
      path: '/about',
      element: (
        <Layout>
          <About />
        </Layout>
      ),
    },
    {
      path: '/services',
      element: (
        <Layout>
          <Services />
        </Layout>
      ),
    },
    {
      path: '/blog',
      element: (
        <Layout>
          <Blog />
        </Layout>
      ),
    },
    {
      path: '/contact',
      element: (
        <Layout>
          <Contact />
        </Layout>
      ),
    },
  ],
  {
    // Add React Router v7 future flags
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

// Layout component wraps Navbar, Footer, and page content
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ChatBotPopover />
      <Footer />
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
