import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection"; // ensure this exists

const LOCATIONS = [
  "All",
  "Nairobi West",
  "Kilimani",
  "Ngara",
  "Kasarani",
  "South B",
  "South C",
  "Parklands",
  "Thika Road",
  "Rongai",
  "Westlands",
  "Kenyatta Uni Area",
  "JKUAT Area",
  "Moi University Area",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ExplorePremiumHostels() {
  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({ location: "", search: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get("/premium-hostels/")
      .then((res) => setHostels(res.data))
      .catch((err) => console.error("Failed to load premium hostels", err))
      .finally(() => setLoading(false));
  }, []);

  const applyFiltersAndSort = () => {
    return hostels
      .filter((hostel) => {
        const search = filters.search.toLowerCase();
        const matchesSearch =
          hostel.name.toLowerCase().includes(search) ||
          hostel.description?.toLowerCase().includes(search);
        const matchesLocation =
          !filters.location || hostel.location?.toLowerCase().includes(filters.location.toLowerCase());
        return matchesSearch && matchesLocation;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest": return new Date(b.created_at) - new Date(a.created_at);
          case "oldest": return new Date(a.created_at) - new Date(b.created_at);
          case "priceLow": return a.price - b.price;
          case "priceHigh": return b.price - a.price;
          case "rating": return (b.rating || 0) - (a.rating || 0);
          default: return 0;
        }
      })
      .slice(0, visibleCount);
  };

  const visibleHostels = applyFiltersAndSort();

  return (
    <div className="bg-gray-100 min-h-screen pt-12 pb-24">
      {/* HERO */}
      <FadeInSection>
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Discover Premium Student Accommodations</h1>
          <p className="mt-2 text-sm md:text-base">
            Curated hostels with top-tier amenities and great locations
          </p>
        </header>
      </FadeInSection>

      {/* FILTERS */}
      <FadeInSection delay={0.1}>
        <section className="text-center py-10 px-4">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Our Premium Collection</h2>
          <p className="text-sm text-gray-500 mb-4">
            Each property meets our standards for comfort, quality, and location.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setFilters((f) => ({ ...f, location: loc === "All" ? "" : loc }))}
                className={`px-4 py-2 text-sm rounded-full border transition ${
                  filters.location === loc || (loc === "All" && !filters.location)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search by name or description..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 border rounded w-full md:w-72 text-sm"
            />
          </div>
        </section>
      </FadeInSection>

      {/* GRID */}
      <FadeInSection delay={0.2}>
        <main className="px-4 max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading hostels...</p>
          ) : visibleHostels.length === 0 ? (
            <p className="text-center text-gray-500">No hostels found matching your criteria.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visibleHostels.map((hostel) => (
                <div
                  key={hostel.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={hostel.image || "/images/default.jpg"}
                      alt={hostel.name}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{hostel.name}</h3>
                    <p className="text-sm text-gray-600">{hostel.location}</p>
                    <p className="text-sm mt-2 text-gray-500">
                      {hostel.description?.slice(0, 60)}...
                    </p>
                    <div className="mt-2 text-blue-700 font-semibold">
                      Ksh {hostel.price.toLocaleString()}
                    </div>
                    <Link
                      to={`/hostels/${hostel.id}`}
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show More Button */}
          {!loading && visibleCount < hostels.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Show More Hostels
              </button>
            </div>
          )}
        </main>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0.3}>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white mt-16 py-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Need Help Finding Accommodation?</h2>
          <p className="mb-6 text-sm">
            Our team can help you find the perfect place tailored to your needs.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="bg-white text-orange-600 px-4 py-2 rounded font-semibold">
              Contact Our Team
            </Link>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-4 py-2 rounded font-semibold"
            >
              Join Our WhatsApp
            </a>
          </div>
        </div>
      </FadeInSection>

      <Footer />
    </div>
  );
}
