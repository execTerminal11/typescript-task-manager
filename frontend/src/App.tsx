import type { Task } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("http://localhost:300/api/firstLaunch");
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Couldn't fetch tasks:", error);
      }
    }
    getTasks();
  }, []);

  // const [tasks, setTasks] = useState<Task[]>(() => {
  //   const savesdTasks = localStorage.getItem("tasks");
  //   return savedTasks ? JSON.parse(savedTasks) : [];
  // });

  const [newTask, setNewTask] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const writeTask = async () => {
    await fetch("http://localhost:3000/api/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addTask),
    });
  };
  writeTask();

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6"></h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onKeyUp={(e) => {
                if (e.key === "Enter") addTask();
              }}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 p-2 border rounded-l-lg focus-outline-none focus:border-blue-500"
              placeholder="Add a new task..."
            />

            <button
              className="bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
              onClick={addTask}
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
                <label className="flex items-center flex-1 cursor-pointer">
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
                </label>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
