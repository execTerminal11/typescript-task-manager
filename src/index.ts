interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 0, title: "home chore", completed: false },
  { id: 1, title: "feed my cat", completed: true },
  { id: 2, title: "go for a walk", completed: false },
];

function createTask(userTitle: string): Task | undefined {
  if (userTitle.trim() === "") {
    console.log("Error: title cannot be empty");
    return undefined;
  }

  const task: Task = {
    id: tasks.length ? 
    Math.max(...tasks.map((task) => task.id)) + 1 
    : 1,
    title: userTitle,
    completed: false,
  };

  tasks.push(task);
  return task;
}
createTask("try to do it");

// getAllTasks
(() : void => {
  console.log(tasks)
})();

function markTaskCompleted(yourId: number): Task | undefined {
  // const task = tasks.find((task) => task.id === yourId);
  if (!tasks[yourId]) {
    return undefined
  }
  tasks[yourId].completed = true;
  return tasks[yourId]

}

console.log(markTaskCompleted(2));

// function markTaskCompleted(yourId: number): Task | undefined {
//   const task = tasks.find((task) => task.id === yourId);
//   if (!task) {
//     return undefined
//   }
//   task.completed = true;
//   return task
// }

// console.log(markTaskCompleted(0));

function removeTask(yourId: number): Task[] {

  if(yourId > -1) {
    tasks.splice(yourId, 1)
  }
  return tasks
 
}
console.log(removeTask(1))





