import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Add state for errors
  const navigate = useNavigate(); // ✅ Create navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      // Store user data in state and localStorage
      setUser({ id: data.userId });
      localStorage.setItem("user", JSON.stringify({ id: data.userId }));

      navigate("/dashboard"); // ✅ Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again."); // ✅ Display error message
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
