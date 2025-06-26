import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h4 className="text-xl font-bold text-white mb-3">HostelHub Kenya</h4>
          <p className="text-sm">
            Kenya’s trusted platform for finding verified, secure, and affordable hostels.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">🏠 Home</Link></li>
            <li><Link to="/hostels" className="hover:text-white">🔍 Explore</Link></li>
            <li><Link to="/about" className="hover:text-white">📘 About Us</Link></li>
            <li><Link to="/post-hostel" className="hover:text-white">🏢 Post a Hostel</Link></li>
            <li><Link to="/contact" className="hover:text-white">📞 Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info + Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">📍 Nairobi, Kenya</p>
          <p className="text-sm mt-1">✉️ vicktechsolutions4@gmail.com</p>
          <a
            href="https://wa.me/254703924936"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            💬 WhatsApp Us
          </a>

          <div className="flex gap-4 mt-6">
            {[
              ["facebook", "https://facebook.com"],
              ["instagram", "https://instagram.com"],
              ["twitter", "https://twitter.com"],
            ].map(([name, link]) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HostelHub Kenya. All rights reserved.
      </div>
    </footer>
  );
}
