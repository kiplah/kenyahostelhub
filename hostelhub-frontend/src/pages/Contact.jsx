import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";

export default function Contact() {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 text-center px-4">
        <h1 className="text-4xl font-bold mb-2">Connect With HostelHub Kenya</h1>
        <p className="text-lg">We’re here to support your housing journey across Kenya.</p>
      </section>

      {/* CONTACT CHANNELS */}
      <FadeInSection delay={0.1}>
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 uppercase">Our Contact Channels</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white shadow rounded p-6">
              <MapPin className="mx-auto mb-2 text-orange-500" size={32} />
              <h4 className="font-bold">Head Office</h4>
              <p className="text-sm text-gray-600 mt-2">Nairobi CBD, Kenya</p>
              <Link to="https://maps.google.com" target="_blank" className="text-blue-600 text-sm mt-2 inline-block">Get Directions →</Link>
            </div>
            <div className="bg-white shadow rounded p-6">
              <Phone className="mx-auto mb-2 text-orange-500" size={32} />
              <h4 className="font-bold">Call Us</h4>
              <p className="text-sm text-gray-600 mt-2">+254 700 000 000</p>
              <a href="tel:+254703924936" className="text-blue-600 text-sm mt-2 inline-block">Call Now →</a>
            </div>
            <div className="bg-white shadow rounded p-6">
              <Mail className="mx-auto mb-2 text-orange-500" size={32} />
              <h4 className="font-bold">Email Us</h4>
              <p className="text-sm text-gray-600 mt-2">support@hostelhub.co.ke</p>
              <a href="mailto:support@hostelhub.co.ke" className="text-blue-600 text-sm mt-2 inline-block">Send Email →</a>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CONTACT FORM */}
      <FadeInSection delay={0.2}>
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form className="grid gap-4 text-left">
              <input type="text" placeholder="Full Name *" required className="border px-4 py-3 rounded w-full" />
              <input type="email" placeholder="Email *" required className="border px-4 py-3 rounded w-full" />
              <input type="tel" placeholder="Phone Number (Optional)" className="border px-4 py-3 rounded w-full" />
              <textarea rows="5" placeholder="Your Message *" required className="border px-4 py-3 rounded w-full" />
              <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition">
                Send Priority Message
              </button>
            </form>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0.3}>
        <section className="bg-blue-900 text-white py-16 text-center px-6">
          <h2 className="text-2xl font-semibold mb-3">Need Help Finding the Right Hostel?</h2>
          <p className="text-sm mb-6">Get personalized help from our support team, 9am – 5pm (Mon–Fri)</p>
          <Link
            to="/hostels"
            className="bg-white text-blue-900 px-6 py-3 rounded font-semibold hover:bg-gray-100"
          >
            Browse Hostels
          </Link>
        </section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection delay={0.4}>
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I book a hostel?",
                a: "Simply browse listings, select one you like, and follow the booking instructions or message the landlord directly.",
              },
              {
                q: "Can I visit before booking?",
                a: "Yes, many landlords allow physical visits before booking. Just message them through the platform.",
              },
              {
                q: "Is there customer support?",
                a: "Yes. We offer 24/7 email support and WhatsApp assistance during business hours.",
              },
              {
                q: "How do I list my hostel?",
                a: "Visit the 'List Your Property' section and follow the prompts to get started.",
              },
            ].map((faq, i) => (
              <div key={i}>
                <h4 className="font-semibold text-gray-800">{faq.q}</h4>
                <p className="text-gray-600 text-sm mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
