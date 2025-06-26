// src/pages/PostHostelStart.js
import { useNavigate } from "react-router-dom";

export default function PostHostelStart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">List Your Hostel</h1>
      <p className="text-gray-700 max-w-xl">
        Want to rent out your student hostel? Post your listing and reach thousands of students across Kenya.
      </p>
      <div className="mt-8 space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
