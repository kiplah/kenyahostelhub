import { Link } from "react-router-dom";
import FadeInSection from "../components/FadeInSection";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

const heroSlides = [
  {
    title: "Welcome to HostelHub Kenya",
    subtitle: "Your trusted platform for safe, verified accommodation",
    image: "/images/about-hero1.jpg",
  },
  {
    title: "Connected with Landlords",
    subtitle: "Direct contact, transparent communication",
    image: "/images/about-hero2.jpg",
  },
  {
    title: "Supporting Communities",
    subtitle: "Empowering students and young professionals",
    image: "/images/about-hero3.jpg",
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* HERO CAROUSEL */}
      <section className="relative">
        <Carousel slides={heroSlides.map((s) => ({ ...s, cta: null }))} />
      </section>

      {/* MISSION */}
      <FadeInSection delay={0.1}>
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At HostelHub Kenya, our mission is to connect students, young professionals, and families with
            secure, clean, and verified housing across Kenya. We simplify the search for accommodations
            by making the process transparent, affordable, and scam-free.
          </p>
        </section>
      </FadeInSection>

      {/* VISION */}
      <FadeInSection delay={0.2}>
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto leading-relaxed">
            To become Kenya's most trusted digital platform for discovering safe, comfortable, and affordable
            accommodation — empowering lives and enabling education and growth without housing stress.
          </p>
        </section>
      </FadeInSection>

      {/* VALUES */}
      <FadeInSection delay={0.3}>
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              ["Verification", "Every listing is reviewed and confirmed to ensure security and quality."],
              ["Transparency", "You get real photos, verified details, and direct landlord contacts."],
              ["Support", "Our team is always ready to assist with finding your ideal space."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
                <h3 className="text-xl font-semibold mb-3 text-orange-600">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* MEET THE TEAM */}
      <FadeInSection delay={0.4}>
        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Vick Tech", role: "Founder & CEO", img: "/images/team1.jpg" },
              { name: "Jane Doe", role: "Product Manager", img: "/images/team2.jpg" },
              { name: "John Smith", role: "Customer Support", img: "/images/team3.jpg" },
              { name: "Alice Wang", role: "Marketing Lead", img: "/images/team4.jpg" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <h4 className="text-lg font-semibold mt-4">{member.name}</h4>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0.5}>
        <section className="py-16 px-6 bg-orange-500 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Find Your Next Home?</h2>
          <Link
            to="/hostels"
            className="inline-block mt-4 bg-white text-orange-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Explore Properties
          </Link>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
