import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => { 

  const url = "https://mern-todo-app-backend-yeas.onrender.com"
  const [name, setName] = useState(""); // State variable to store user’s name
  const [email, setEmail] = useState(""); //  State variable to store user’s email
  const [password, setPassword] = useState(""); //  State variable to store user’s password
  const [error, setError] = useState(""); //  State variable to store and display error messages
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => { 
    e.preventDefault(); // Prevents default form submission behavior (avoids page reload)
    setError(""); // Clear previous errors

    try {
      await axios.post("http://localhost:5000/api/users/register" || url, { 
        // Sending a POST request to backend API for user registration
        name,
        email,
        password,
      });
      alert("User registered successfully!");
      // navigate("/dashboard");
      navigate("/login");

    } catch (error) {
      console.error("Error registering user:", error); 
      alert("Registration failed. Please try again."); 
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Register</h2> 
       
      {error && <p className="text-red-500">{error}</p>}
      {/* Display error message if registration fails */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3">

        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name} 
          onChange={(e) => setName(e.target.value)} // Update name state on change
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
        />

        <button className="bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already a user?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
