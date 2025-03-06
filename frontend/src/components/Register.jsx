import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // ✅ Create navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users/register", { name, email, password });
            alert("User registered successfully!");
            navigate("/dashboard");  // ✅ Redirect to dashboard after success
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3">
                <input type="text" placeholder="Name" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-green-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
