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

let nextTaskId: number = 4;
function createTask(userTitle: string): Task | undefined {
  const title = userTitle.trim();
  if (title === "") {
    console.log("Error: title cannot be empty");
    return undefined;
  }

  const task: Task = {
    id: nextTaskId++,
    title: title,
    completed: false,
  };
  tasks.push(task);
  return task;
}
createTask("try to do it");

function markTaskCompleted(yourId: number): Task | undefined {
  const task: Task | undefined = tasks.find((task) => task.id === yourId);
  if (!task) {
    return undefined;
  } else {
    task.completed = true;
    return task;
  }
}
console.log(markTaskCompleted(1));

function deleteTask(yourId: number): boolean {
  const index: number = tasks.findIndex((task) => task.id === yourId);
  if (index === -1) {
    return false;
  } else {
    tasks.splice(index, 1);
    return true;
  }
}
console.log(deleteTask(3));

createTask("try to do it2");
createTask("try to do it3");

function getTaskById(yourId: number): Task | undefined {
  const task: Task | undefined = tasks.find((task) => task.id === yourId);
  if (!task) {
    return undefined;
  } else {
    return task;
  }
}
console.log(getTaskById(2));

function getAllTasks(): Task[] {
  return tasks;
}
console.log(getAllTasks());