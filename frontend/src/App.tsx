import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "./types";
import { useTasks } from "./hooks/useTasks";

interface TaskFormProps {
  onSubmit: (data: Task) => Promise<void>;
}

function TaskForm({ onSubmit }: TaskFormProps) {
  const { tasks, removeTask } = useTasks();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }
    try {
      await onSubmit({
        title: title.trim(),
      });
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6"></h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // onSubmit={handleSubmit}
              className="flex-1 p-2 border rounded-l-lg focus-outline-none focus:border-blue-500"
              placeholder="Add a new task..."
            />

            <button
              className="bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
              type="submit"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                {/* <label className="flex items/-center flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") addTask();
                    }}
                    className="mr-3 h-4 w-4 cursor-pointer accent-blue-500"
                  />
                  <span
                    className={`flex-1 ${task.completed ? "line-through to-gray-500" : ""}`}
                  >
                    {task.title}
                  </span>
                </label> */}
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}

function App() {
  const { addTask } = useTasks();

  return <TaskForm onSubmit={addTask} />;
}

export default App;
