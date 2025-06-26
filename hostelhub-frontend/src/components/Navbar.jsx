import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Home, Info, Plus, Mail } from "lucide-react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("access_token");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/hostels?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
            🏢 <span className="ml-2">HostelHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {[
              { label: "Home", to: "/" },
              { label: "Explore", to: "/hostels" },
              { label: "About", to: "/about" },
              {
                label: "Post Hostel",
                to: isAuthenticated ? "/post-hostel" : "/post-hostel-start",
              },
              { label: "Contact", to: "/contact" },
              { label: "Premium Listing", to: "/premium-listing" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`font-medium text-sm hover:text-orange-500 ${
                  location.pathname === to ? "text-orange-500 font-bold" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <input
              type="text"
              placeholder="Search areas..."
              className="border px-3 py-1 rounded-full text-sm w-48 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <a href="https://wa.me/254703924936" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/color/32/whatsapp--v1.png"
                alt="WhatsApp"
                className="ml-2"
              />
            </a>

            {isAuthenticated ? (
              <div className="relative group">
                <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer">
                  U
                </div>
                <div className="absolute top-full right-0 bg-white border shadow-md mt-2 w-48 hidden group-hover:block z-50">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Sign In
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setDrawerOpen(false)}
          ></div>

          <div className="ml-auto w-72 bg-[#0e1a38] text-white h-full shadow-lg">
            <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
              <div className="flex items-center text-xl font-bold">
                🏢 <span className="ml-2">HostelHub</span>
              </div>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                      setDrawerOpen(false);
                    }
                  }}
                  className="w-full rounded-full px-4 py-2 text-sm bg-white text-black"
                />
                <Search className="absolute right-3 top-2.5 text-gray-500" size={16} />
              </div>

              <Link to="/" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-2 rounded">
                <Home size={16} /> Home
              </Link>
              <Link to="/hostels" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-2 rounded">
                <Search size={16} /> Explore
              </Link>
              <Link to="/about" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-2 rounded">
                <Info size={16} /> About
              </Link>
              <Link to="/post-hostel" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-2 rounded">
                <Plus size={16} /> Post Hostel
              </Link>
              <Link to="/contact" className="flex items-center gap-2 hover:bg-blue-900 px-3 py-2 rounded">
                <Mail size={16} /> Contact
              </Link>

              <a
                href="https://wa.me/254703924936"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-green-500 text-center rounded py-2 font-semibold hover:bg-green-600"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button on Mobile */}
      <a
        href="https://wa.me/254703924936"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
      >
        💬
      </a>
    </>
  );
}
