import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { initEmailJS } from "./lib/emailjs";

// Initialize EmailJS with service ID
initEmailJS();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </AuthProvider>
);
