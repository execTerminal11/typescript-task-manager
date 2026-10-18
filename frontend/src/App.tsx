import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import type { Task } from "./types";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  return (
    <>
      {/* <header className="flex gap-10 flex-col m-10">
        <div className="flex items-center flex-col">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p>Stay organized. Get things done.</p>
        </div>
        <div className="border border-gray-200 rounded-md p-5">
          <h2 className="font-bold mb-3">New Task</h2>
          <form className="flex gap-5">
            <Input
              id="input"
              name="input"
              placeholder="What needs to be done?"
            ></Input>
            <Button>+ Add Task</Button>
          </form>
        </div>
      </header>
      <main className="flex flex-col m-10">
        <div className="flex">
          <Button>All</Button>
          <Button>Active</Button>
          <Button>Competed</Button>
        </div>
        <div className="border border-gray-200 rounded-xl">
          <h3> task</h3>
        </div>
      </main> */}

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6"></h1>
          <div className="flex mb-4">
            input[type="text" value="nexTask" onChange]
          </div>
          {/* https://dev.to/syawqy/create-task-manager-using-react-typescript-bfp */}
        </div>
      </div>
    </>
  );
}

export default App;
