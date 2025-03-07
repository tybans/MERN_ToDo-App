import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to the To-Do App</h1>
            <p className="text-lg text-gray-600 mb-6">Manage your tasks efficiently and stay organized.</p>
            <div className="flex gap-4">
                <Link to="/login">
                    <button className="bg-green-500 text-black px-6 py-2 rounded-md text-lg">Login</button>
                </Link>
                <Link to="/register">
                    <button className="bg-yellow-500 text-black px-6 py-2 rounded-md text-lg">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
