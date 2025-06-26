import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api";

export default function PostHostelForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    image: null,
    owner_name: "",
    contact_phone: "",
    contact_email: "",
    website: "",
    is_premium: false,
    available: true,
    rooms_available: "",
    gender_restriction: "unisex",
    has_security: false,
    has_water: false,
    has_power: false,
    has_wifi: false,
    has_parking: false,
    amenities: "",
    town: "",
    university_nearby: "",
    distance_to_campus: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Hostel name is required.";
    if (!formData.location.trim()) errs.location = "Location is required.";
    if (!formData.price) errs.price = "Price is required.";
    if (!formData.description.trim()) errs.description = "Description is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors.");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") payload.append(key, value);
    });

    try {
      setLoading(true);
      await API.post("/hostels/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Hostel posted successfully!");
      navigate("/hostels");
    } catch (error) {
      toast.error("Failed to post hostel.");
      if (error.response?.data) setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, label, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mt-1"
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Post a New Hostel</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          {renderInput("name", "Hostel Name")}
          {renderInput("location", "Location")}
          {renderInput("price", "Price (KES)", "number")}
          {renderInput("rooms_available", "Rooms Available", "number")}
        </div>

        {renderInput("description", "Description")}

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" name="image" onChange={handleChange} className="mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender Restriction</label>
          <select
            name="gender_restriction"
            value={formData.gender_restriction}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="unisex">Unisex</option>
            <option value="male_only">Male Only</option>
            <option value="female_only">Female Only</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["has_security", "has_water", "has_power", "has_wifi", "has_parking"].map((field) => (
            <label key={field} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              <span className="text-sm capitalize text-gray-700">
                {field.replace("has_", "").replace("_", " ")}
              </span>
            </label>
          ))}
        </div>

        {/* Toggleable Section */}
        <div className="mt-6 border-t pt-4">
          <button
            type="button"
            className="flex items-center text-indigo-600 text-sm font-medium hover:underline mb-2"
            onClick={() => setShowAdditional((prev) => !prev)}
          >
            {showAdditional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span className="ml-1">
              {showAdditional ? "Hide" : "Show"} Additional Details
            </span>
          </button>

          {showAdditional && (
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {renderInput("owner_name", "Owner Name")}
              {renderInput("contact_phone", "Contact Phone")}
              {renderInput("contact_email", "Contact Email", "email")}
              {renderInput("website", "Website", "url")}
              {renderInput("town", "Town")}
              {renderInput("university_nearby", "Nearby University")}
              {renderInput("distance_to_campus", "Distance to Campus")}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Other Amenities</label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post Hostel"}
        </button>
      </form>
    </div>
  );
}
