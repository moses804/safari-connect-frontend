import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Import Member 3 Pages
import HostDashboard from "./pages/host/HostDashboard";
import ManageAccommodations from "./pages/host/ManageAccommodations";
import DriverDashboard from "./pages/driver/DriverDashboard";
import ManageTransports from "./pages/driver/ManageTransports";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Temporary Navigation for Testing */}
      <nav className="p-4 bg-white shadow-md flex gap-4">
        <Link to="/" className="text-blue-600 font-bold">
          Home
        </Link>
        <Link
          to="/host/dashboard"
          className="text-gray-700 hover:text-blue-500"
        >
          Host Dashboard
        </Link>
        <Link
          to="/driver/dashboard"
          className="text-gray-700 hover:text-blue-500"
        >
          Driver Dashboard
        </Link>
      </nav>

      <div className="p-4">
        <Routes>
          {/* Default Home Page */}
          <Route
            path="/"
            element={
              <div className="text-center mt-10">
                <h1 className="text-4xl font-bold text-primary">
                  Safari Connect
                </h1>
                <p className="mt-4 text-gray-600">
                  Welcome! Select a dashboard above to manage services.
                </p>
              </div>
            }
          />

          {/* Member 3 Routes */}
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/manage" element={<ManageAccommodations />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/manage" element={<ManageTransports />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
