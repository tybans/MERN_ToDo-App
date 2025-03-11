import { useEffect, useState, useContext } from "react";
//  Importing React hooks:
//    - useEffect: For side effects (fetching tasks on component mount)
//    - useState: For managing tasks state
//    - useContext: To access authentication context

import { useNavigate } from "react-router-dom";
import axios from "axios";
//  make HTTP requests to the backend

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { AuthContext } from "../context/AuthContext";
//  Importing AuthContext to get the logged-in user’s information

import { saveTasks, loadTasks } from "../utils/localStorage";
// Importing utility functions for saving and loading tasks from localStorage

const Dashboard = () => {

  const url = "https://mern-todo-app-backend-yeas.onrender.com"
  const { user } = useContext(AuthContext);
  //  Accessing user data from AuthContext (checks if user is logged in)

  const [tasks, setTasks] = useState([]);
  //  State variable to store tasks for the current user

  const navigate = useNavigate();
  //  Creating navigate function to handle redirections

  useEffect(() => {
    //  useEffect runs when the component mounts or when 'user' changes

    // Check if user is not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Function to fetch user-specific tasks from the backend
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/tasks/${user.id}` || url
        );
        //  Making a GET request to fetch tasks for the logged-in user

        setTasks(data);
        //  Updating state with fetched tasks

        saveTasks(data);
        //  Storing fetched tasks in localStorage for offline access
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
    // Call the fetchTasks function when the component mounts
  }, [user]);
  //  Dependency array: runs effect when 'user' changes

  const addTask = async (text) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/tasks" || url, {
        userId: user.id,
        text,
      });

      setTasks(data.tasks);
      // Updating tasks state with the new list of tasks

      saveTasks(data.tasks);
      // Saving updated tasks to localStorage
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    // JSX structure for the Dashboard component
    <div className="flex h-screen">
      {/* Sidebar with User Info */}
      <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">My Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task._id} className="mb-2">
                ✔️ {task.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Display Logged-In User Name in Sidebar */}
        <div className="mt-auto border-t border-gray-500 pt-4">
          <p className="text-sm">Welcome,</p>
          {user?.name ? (
            <h5 className="text-lg font-bold">{user.name}</h5>
          ) : (
            <p className="text-gray-400">Guest</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold text-center">Task Manager</h2>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Dashboard;
