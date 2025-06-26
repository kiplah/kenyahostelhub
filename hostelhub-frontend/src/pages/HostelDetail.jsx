import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function HostelDetail() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false); // 👈 NEW

  const token = localStorage.getItem("access_token");
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/hostels/${id}/`)
      .then((res) => {
        setHostel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hostel:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-10">Loading hostel...</p>;
  if (!hostel) return <p className="p-10 text-red-600">Hostel not found.</p>;

  const openWhatsApp = () => {
    const message = `Hi, I'm interested in ${hostel.name}. Is a room available?`;
    const phone = hostel.owner_contact?.replace(/[^0-9]/g, "") || "254700000000";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in to book.");

    setIsSubmitting(true);

    API.post(
      "/bookings/",
      { hostel: hostel.id, message },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert("Booking request sent!");
        setMessage("");
        setShowBookingForm(false); // Hide form after submission
      })
      .catch((err) => {
        console.error(err);
        alert("Booking failed");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <img
          src={hostel.image || "https://via.placeholder.com/800x400"}
          alt={hostel.name}
          className="w-full h-72 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
          <p className="text-gray-600 text-sm mb-2">{hostel.location}</p>
          <p className="text-lg font-semibold mb-4 text-blue-700">
            Ksh {hostel.price} per month
          </p>

          <p className="mb-4 text-gray-700">
            {hostel.description || "No description provided."}
          </p>

          <ul className="text-sm text-gray-600 mb-4">
            <li>Total Rooms: {hostel.total_rooms}</li>
            <li>Available Rooms: {hostel.available_rooms}</li>
            <li>Owner: {hostel.owner_name || "N/A"}</li>
            <li>Contact: {hostel.owner_contact || "N/A"}</li>
          </ul>

          <div className="flex gap-4 mb-4">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              onClick={openWhatsApp}
            >
              Chat via WhatsApp
            </button>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowBookingForm(true)}
            >
              Book Now
            </button>
          </div>

          {/* Conditional Booking Form */}
          {showBookingForm && (
            <form onSubmit={handleBooking} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional message to owner"
                className="w-full p-2 border rounded"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Book Now"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
