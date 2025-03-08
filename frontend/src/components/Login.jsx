import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
// UseNavigate for redirection and Link for navigation between pages

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  // Accessing setUser function from AuthContext to store user data after login

  const [email, setEmail] = useState("");
  // State variable to store user's email

  const [password, setPassword] = useState("");
  // ✅ State variable to store user's password

  const [error, setError] = useState("");
  // State variable to store and display error messages

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevents default form submission behavior (avoids page reload)

    setError("");
    // Clear any previous error messages before making the request

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
        // Sending a POST request to backend API for user authentication
      );

      // Store authenticated user data in the state and localStorage
      
      setUser({ id: data.userId, name: data.name });
      // Updating AuthContext with logged-in user data

      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.userId, name: data.name })
      );
      // Storing user ID in localStorage for persistent login


      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      setError("Invalid email or password. Please try again.");
      // Updating error state to show an error message in the UI
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      {/* Display error message if login fails */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3">

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}

          onChange={(e) => setEmail(e.target.value)}
          // Update email state on input change
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}

          onChange={(e) => setPassword(e.target.value)}
          // Update password state on input change
        />

        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>

      <p className="mt-4 text-gray-600">
        New user?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
