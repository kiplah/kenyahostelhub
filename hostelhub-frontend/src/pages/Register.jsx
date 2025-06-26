// (same imports as before)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "student", // or "landlord", etc.
      agree: false
  });


  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "username":
        if (!value.trim()) message = "Username is required";
        break;
      case "email":
        if (!value.includes("@")) message = "Enter a valid email";
        break;
      case "password":
        if (value.length < 8) message = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) message = "Passwords do not match";
        break;
      case "phone":
        if (!/^\d{9}$/.test(value)) message = "Phone number must be 9 digits (no leading 0)";
        break;
      case "agree":
        if (!value) message = "You must agree to the terms and policy.";
        break;
      default:
        break;
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {
      username: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      agree: true,
    };
    setTouched(allTouched);

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const msg = validateField(key, value);
      if (msg) newErrors[key] = msg;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const cleanedData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        re_password: formData.confirmPassword,
        role: "student",
        is_active: true,
      };

      await API.post("/auth/users/", cleanedData);

      const loginRes = await API.post("/auth/jwt/create/", {
        email: cleanedData.email,
        password: cleanedData.password,
      });

      const { access, refresh } = loginRes.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      toast.success("Account created successfully!");
      navigate("/post-hostel");
    } catch (err) {
      const backendErrors = {};
      if (err.response?.data) {
        for (const key in err.response.data) {
          const val = err.response.data[key];
          backendErrors[key] = Array.isArray(val) ? val[0] : val;
        }
        toast.error("Registration failed. Check highlighted fields.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      setErrors(backendErrors);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) => {
    if (!touched[name]) return "border-gray-300";
    if (errors[name]) return "border-red-500";
    return "border-green-500";
  };

  const renderError = (field) =>
    errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl px-6 py-8 sm:px-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-2">
          HostelHub Kenya
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">Create your account</p>

        {Object.values(errors).some(Boolean) && (
          <div className="text-red-600 text-sm mb-4 font-medium flex items-center">
            ❌ Please correct the highlighted fields below.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-sm ${inputClass("username")}`}
            />
            {renderError("username")}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-sm ${inputClass("email")}`}
            />
            {renderError("email")}
          </div>

          <div>
            <div className={`flex items-center border rounded-lg overflow-hidden ${inputClass("phone")}`}>
              <span className="px-3 bg-gray-100 text-gray-700 text-sm">🇰🇪 +254</span>
              <input
                type="tel"
                name="phone"
                placeholder="712345678"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-2 py-3 outline-none text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Format: 712345678 (no leading 0)</p>
            {renderError("phone")}
          </div>

          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-10 border rounded-lg text-sm ${inputClass("password")}`}
            />
            <button
              type="button"
              onClick={() => setShowPasswords((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 text-lg"
            >
              {showPasswords ? "👁️" : "👁️‍🗨️"}
            </button>
            {renderError("password")}
          </div>

          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-10 border rounded-lg text-sm ${inputClass("confirmPassword")}`}
            />
            <button
              type="button"
              onClick={() => setShowPasswords((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 text-lg"
            >
              {showPasswords ? "👁️" : "👁️‍🗨️"}
            </button>
            {renderError("confirmPassword")}
          </div>

          <label className="flex items-start text-sm text-gray-700">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2 mt-1 w-5 h-5"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-indigo-600 underline">Terms</a> and{" "}
              <a href="#" className="text-indigo-600 underline">Privacy Policy</a>.
            </span>
          </label>
          {renderError("agree")}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium text-sm transition duration-200 ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mt-4 space-y-2 sm:space-y-0">
            <a href="#" className="hover:underline">Forgot Password?</a>
            <a href="/login" className="hover:underline text-right">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
