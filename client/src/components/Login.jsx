import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      return setMessage("❌ Please enter both fields");
    }

    try {
      const res = await API.post("/users/login", {
        identifier: form.identifier,
        password: form.password,
      });

      console.log(res.data);
      setMessage("✅ Login successful");
      localStorage.setItem("token", res.data.token);

      setTimeout(() => navigate("/dashboard"), 1500); // redirect to dashboard
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="identifier"
            placeholder="Email or Mobile Number"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition duration-200 font-semibold"
          >
            Login
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
