import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PremiumListing() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-blue-100 text-center py-16 px-4">
        <h1 className="text-4xl font-bold text-gray-800">🎖 Premium Listing</h1>
        <p className="mt-4 text-lg text-gray-600">
          Showcase your premium hostel to thousands of students across Kenya.
        </p>
        <Link
          to="/post-hostel"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
        >
          Start Premium Listing
        </Link>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-8">Our Premium Process</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["1. Verification", "ID verification, secure checks, and trust assurance."],
            ["2. Service Fee", "Only 10% service fee covering vetting + marketing."],
            ["3. Approval", "Get approved within 24-48 hours with priority review."]
          ].map(([title, desc]) => (
            <div key={title} className="bg-white p-6 rounded shadow">
              <h3 className="font-bold text-lg text-blue-600">{title}</h3>
              <p className="mt-2 text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Essential Documents</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Valid National ID or Passport</li>
              <li>Proof of hostel ownership or authorization</li>
              <li>Recent utility bill (last 3 months)</li>
              <li>KRA PIN (optional)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Media Requirements</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>At least 8 high-quality photos</li>
              <li>2-minute video tour</li>
              <li>Floor plan (optional)</li>
              <li>360° virtual tour (optional)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Guidelines */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎥 Premium Video Guidelines</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>At least 2 minutes long showing all rooms</li>
          <li>Must include exterior, kitchen, washrooms, beds, etc.</li>
          <li>Clear narration or captions are preferred</li>
          <li>Should be recent (last 2 months)</li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-blue-600 mb-6">Premium Listing Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "✅ Verified Badge",
              "📌 Priority Placement",
              "📷 Free Professional Photos",
              "🛠 24/7 Dedicated Support",
              "📣 Marketing Boost",
              "📊 Analytics Dashboard"
            ].map((benefit) => (
              <div key={benefit} className="bg-white p-6 rounded shadow text-center font-medium">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-white py-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">🔐 Security & Compliance</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>All personal data is encrypted and handled securely.</li>
          <li>No hidden charges – 10% fee clearly stated.</li>
          <li>False information may lead to permanent ban and legal consequences.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-orange-100 text-center py-16 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to List Your Premium Hostel?</h2>
        <p className="mb-6 text-gray-700">Get verified and get booked faster.</p>
        <Link
          to="/post-hostel"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold"
        >
          Start Premium Listing
        </Link>
        <p className="text-sm mt-4 text-gray-600">By listing, you agree to our Terms and Privacy Policy.</p>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">🤔 Premium Listing FAQs</h3>
        <div className="space-y-4 text-gray-700">
          <div>
            <strong>Why choose premium listing?</strong>
            <p>3x more visibility, verified badge, and priority placement = faster bookings.</p>
          </div>
          <div>
            <strong>Is the 10% service fee yearly?</strong>
            <p>Yes, it’s based on your annual price and paid once listing is live.</p>
          </div>
          <div>
            <strong>Can I upgrade from standard?</strong>
            <p>Yes, any listing can be upgraded anytime after verification.</p>
          </div>
        </div>
      </section>
      {/* FOOTER */}
             <Footer />
    </div>
  );
}
