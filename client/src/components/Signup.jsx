import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobilenumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    try {
      const res = await API.post("/users/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        mobilenumber: form.mobilenumber,
      });

      console.log("✅ Registered User:", res.data);
      setMessage("✅ Signup successful");

      setTimeout(() => navigate("/login"), 1500); // redirect after 1.5s
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "❌ Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            name="mobilenumber"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Redirect Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
