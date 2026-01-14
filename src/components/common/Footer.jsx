// src/components/common/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} SafariConnect. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
