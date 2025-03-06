import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { saveTasks, loadTasks } from "../utils/localStorage";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(loadTasks()); // Load tasks on mount
    }, []);

    useEffect(() => {
        saveTasks(tasks); // Save tasks whenever they change
    }, [tasks]);

    const addTask = (text) => {
        const newTask = { id: Date.now(), text, completed: false };
        setTasks((prevTasks) => [...prevTasks, newTask]); // ✅ Updates immediately
    };

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    
    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center">Task Manager</h2>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </div>
    );
};

export default Dashboard;
