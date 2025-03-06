import { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        addTask(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input 
                className="border p-2 w-full rounded-md" 
                type="text" 
                placeholder="Add a task" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
        </form>
    );
};

export default TaskForm;
