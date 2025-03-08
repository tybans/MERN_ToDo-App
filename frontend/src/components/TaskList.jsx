import { useEffect } from "react"; 
import axios from "axios"; 
import { saveTasks } from "../utils/localStorage"; 
// Importing saveTasks function to persist tasks in localStorage

const TaskList = ({ tasks, setTasks }) => { 
  // Defining TaskList component with props:
  //    - tasks: List of tasks to display
  //    - setTasks: Function to update tasks state

  useEffect(() => { 
    // useEffect runs when 'tasks' state changes
    saveTasks(tasks); 
    // Save the updated tasks list to localStorage
  }, [tasks]); 
  // Dependency array ensures this effect runs whenever 'tasks' changes

  const toggleTask = async (id) => { 
    // Function to toggle task completion status
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tasks/${id}`); 
      // Sending a PUT request to toggle task completion status on the server

      setTasks(tasks.map(task => task._id === id ? data : task)); 
      // Updating the task list: replacing the toggled task with updated data

      saveTasks(tasks); 
      // Save updated tasks to localStorage
    } catch (error) {
      console.error("Error toggling task:", error); 
    }
  };

  const deleteTask = async (id) => { 
    // Function to delete a task
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`); 
      // Sending a DELETE request to remove the task from the server

      const updatedTasks = tasks.filter(task => task._id !== id); 
      // Filtering out the deleted task from the list

      setTasks(updatedTasks); 
      // Updating the state with the remaining tasks

      saveTasks(updatedTasks); 
      // Saving the updated task list to localStorage
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
            // Looping through tasks and rendering each task item
            <li key={task._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              {/* List item:
                  - Unique key assigned using task._id
                  - Flexbox for layout (align items and distribute space)
                  - Gray background, padding, rounded corners */}
              
              <span className={task.completed ? "line-through text-gray-500" : "text-black"}>
                {/* Displaying task text:
                    - If completed, apply line-through and gray text
                    - Otherwise, keep black text */}
                {task.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task._id)} 
                  // Toggle task completion when clicked
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
