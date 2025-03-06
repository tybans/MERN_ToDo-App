const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
      <div className="mt-4">
          {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks available.</p>
          ) : (
              <ul className="space-y-2">
                  {tasks.map(task => (
                      <li 
                          key={task.id} 
                          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                      >
                          {/* ✅ Clicking on text will also toggle completion */}
                          <span 
                              onClick={() => toggleTask(task.id)}
                              className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-black"}`}
                          >
                              {task.text}
                          </span>

                          <div className="flex gap-2">
                              {/* ✅ Toggle Complete/Incomplete */}
                              <button 
                                  onClick={() => toggleTask(task.id)} 
                                  className={`px-3 py-1 rounded ${task.completed ? "bg-green-500 text-white" : "bg-gray-300"}`}
                              >
                                  {task.completed ? "Incomplete" : "Complete"}
                              </button>

                              {/* ✅ Delete Task */}
                              <button 
                                  onClick={() => deleteTask(task.id)} 
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
