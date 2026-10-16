import { error } from "node:console";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "home chore", completed: false },
  { id: 2, title: "feed my cat", completed: true },
  { id: 3, title: "go for a walk", completed: false },
];

function createTask(userTitle: string): Task | undefined {
  if (userTitle.trim() === "") {
    console.log("Error: title cannot be empty");
    return undefined;
  }
  const task: Task = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: userTitle,
    completed: false,
  };
  tasks.push(task);
  return task;
}
createTask("try to do it");

function markTaskCompleted(yourId: number): string {
  const task: Task | undefined = tasks.find((task) => task.id === yourId);
  if (!task) {
    return "error";
  }
  task.completed = true;
  return "completed";
}
console.log(markTaskCompleted(1));

function removeTask(yourId: number): string {
  const index: number = tasks.findIndex((task) => task.id === yourId);
  if (index === -1) {
    return "error";
  } else {
    tasks.splice(index, 1);
    return "deleted";
  }
}
console.log(removeTask(3));

function getTasksById(yourId: number): Task | string {
   const task: Task | undefined = tasks.find((task) => task.id === yourId);
   if (!task) {
      return "error"
   } else {
    return task
   }
}
console.log(getTasksById(2))

function getAllTasks(): Task[] {
  return tasks;
}
console.log(getAllTasks())
