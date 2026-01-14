import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
