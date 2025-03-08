import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clears user from context
    localStorage.removeItem("user"); // Remove user from localStorage
    // localStorage.removeItem("token"); // Remove auth token (if stored)
    localStorage.removeItem("tasks"); // ✅ Remove tasks from localStorage

    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      // className="bg-red-500 text-white px-4 py-2 rounded w-full text-left mt-4"
      className="w-fit bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-md text-center"

    >
      Logout
    </button>
  );
};

export default Logout;
