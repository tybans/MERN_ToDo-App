import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { AuthContext } from "../context/AuthContext";
import { saveTasks, loadTasks } from "../utils/localStorage";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/tasks/${user.id}`
        );
        setTasks(data);
        saveTasks(data); // Save fetched tasks to localStorage
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  const addTask = async (text) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/tasks", {
        userId: user.id,
        text,
      });
      setTasks(data.tasks);
      saveTasks(data.tasks); // Save to localStorage
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Task Manager</h2>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;
