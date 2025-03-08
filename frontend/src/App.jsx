// Import necessary modules from React Router for navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import AuthProvider to manage authentication state
import { AuthProvider } from "./context/AuthContext";

// Import page components
import Home from "./pages/Home";        // Home page component
import Login from "./components/Login"; // Login component for user authentication
import Register from "./components/Register"; // Register component for new users
import Dashboard from "./pages/Dashboard"; // Dashboard component (protected after login)

function App() {
    return (
        // Wrap the entire application inside AuthProvider to provide authentication context globally
        <AuthProvider>
            {/* Router component enables routing in the application */}
            <Router>
                {/* Routes container for defining different paths in the app */}
                <Routes>
                    {/* Route for the home page ("/") */}
                    <Route path="/" element={<Home />} />

                    {/* Route for the login page ("/login") */}
                    <Route path="/login" element={<Login />} />

                    {/* Route for the registration page ("/register") */}
                    <Route path="/register" element={<Register />} />

                    {/* Route for the user dashboard ("/dashboard") */}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;



// What this code does:
// Uses BrowserRouter (Router) to enable navigation between different pages.
// Wraps the entire app inside AuthProvider to manage user authentication state globally.
// Defines different routes using Routes and Route:
// / → Home page
// /login → Login page
// /register → Registration page
// /dashboard → Dashboard (only accessible after login)
// Ensures proper page rendering based on the current URL.
// This structure provides a clean, modular, and scalable routing setup for your React app.