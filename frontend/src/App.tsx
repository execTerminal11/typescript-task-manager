import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
        <header className="flex gap-10 flex-col m-10">
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
        </main>
    </>
  );
}

export default App;
