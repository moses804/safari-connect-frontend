import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Global Styles
import "./styles/globals.css";
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="app-container">
            {/* The Navbar stays visible across all pages */}
            <Navbar />

            <main className="main-content">
              {/* This component handles all the conditional logic and pages */}
              <AppRoutes />
            </main>

            <Footer />
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
