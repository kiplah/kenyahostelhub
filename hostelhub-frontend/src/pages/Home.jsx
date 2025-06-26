import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Carousel from "../components/Carousel";
import MotionContainer from "../components/MotionContainer";
import Footer from "../components/Footer";

export default function Home() {
  const [hostels, setHostels] = useState([]);

  const heroSlides = [
    {
      title: "Tranquil Bedrooms",
      subtitle: "Your sanctuary for rest & study",
      image: "/images/banner1.png",
      cta: { label: "Discover Hostels", link: "/hostels" },
    },
    {
      title: "Modern Living Spaces",
      subtitle: "Hostels, Bedsitters & Flats across Kenya",
      image: "/images/banner2.jpg",
      cta: { label: "Start Exploring", link: "/hostels" },
    },
    {
      title: "Safe & Verified",
      subtitle: "Book trusted properties hassle-free",
      image: "/images/banner3.png",
      cta: { label: "Find My Space", link: "/hostels" },
    },
  ];

  useEffect(() => {
    API.get("/hostels/")
      .then((res) => setHostels(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <MotionContainer delay={0}>
        <Carousel slides={heroSlides} />
      </MotionContainer>

      {/* Featured Listings */}
      <MotionContainer delay={0.1}>
        <section className="py-16 px-4 md:px-8">
          <p className="text-center text-orange-600 uppercase tracking-wider font-semibold">Featured</p>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
            Top Picks This Week
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {hostels.slice(0, 6).map((h) => (
              <Link
                key={h.id}
                to={`/hostels/${h.id}`}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <img
                  src={h.image || "/images/placeholder.jpg"}
                  alt={h.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{h.name}</h4>
                  <p className="text-gray-600">{h.location}</p>
                  <p className="text-orange-600 font-bold mt-1">Ksh {h.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/hostels" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              View All Listings
            </Link>
          </div>
        </section>
      </MotionContainer>

      {/* How It Works */}
      <MotionContainer delay={0.2}>
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl text-orange-500 uppercase font-semibold">How It Works</h2>
            <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-10">3 Simple Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                ["Browse", "Search trusted hostels, bedsitters, and apartments anywhere in Kenya."],
                ["Connect", "Chat instantly with verified landlords through WhatsApp."],
                ["Book", "Reserve securely and move in without worries."],
              ].map(([title, desc], idx) => (
                <div key={idx} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                  <h4 className="font-semibold text-lg">{title}</h4>
                  <p className="mt-2 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MotionContainer>

      {/* Why HostelHub Kenya */}
      <MotionContainer delay={0.3}>
        <section className="py-20 px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-xl text-orange-500 uppercase font-semibold">Why HostelHub Kenya?</h2>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Where Comfort Meets Trust</h3>
          <p className="text-gray-700 leading-relaxed">
            From students to professionals and families, find safe, clean, and cost-effective
            accommodations across Kenya—completely verified and supported.
          </p>
        </section>
      </MotionContainer>

      {/* Stats */}
      <MotionContainer delay={0.4}>
        <section className="bg-blue-50 py-16 px-4 text-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["500+", "Listings"],
              ["10,000+", "People Served"],
              ["100%", "Verified"],
              ["24/7", "Support"],
            ].map(([value, label], idx) => (
              <div key={idx}>
                <h4 className="text-4xl font-bold text-blue-600">{value}</h4>
                <p className="text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </MotionContainer>

      <Footer />
    </div>
  );
}
