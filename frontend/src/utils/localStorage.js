export const saveTasks = (tasks) => { 
  // Function to save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  //  Convert tasks array to a JSON string and store it in localStorage under the key "tasks"
};

export const loadTasks = () => { 
  // Function to load tasks from localStorage
  const tasks = localStorage.getItem("tasks"); 
  // Retrieve the stored tasks from localStorage

  return tasks ? JSON.parse(tasks) : []; 
  // If tasks exist, parse them from JSON format to JavaScript object/array
  // If no tasks are found, return an empty array as the default value
};


// What this code does:
// saveTasks(tasks)
// Converts the tasks array into a JSON string.
// Saves it to localStorage under the key "tasks".
// loadTasks()
// Retrieves the stored tasks from localStorage.
// If tasks exist, it converts them from JSON format back into an array.
// If no tasks are found, it returns an empty array to prevent errors.
// This ensures that tasks persist even after the page is refreshed.