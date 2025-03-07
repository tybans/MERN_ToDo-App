import { useEffect } from "react";
import axios from "axios";
import { saveTasks } from "../utils/localStorage";

const TaskList = ({ tasks, setTasks }) => {
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const toggleTask = async (id) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.map(task => task._id === id ? data : task));
      saveTasks(tasks);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      const updatedTasks = tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className={task.completed ? "line-through text-gray-500" : "text-black"}>
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task._id)}
                  className={`px-3 py-1 rounded ${task.completed ? "bg-green-500" : "bg-gray-300"}`}
                >
                  {task.completed ? "Incomplete" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
