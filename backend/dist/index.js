const tasks = [
    { id: 1, title: "home chore", completed: false },
    { id: 2, title: "feed my cat", completed: true },
    { id: 3, title: "go for a walk", completed: false },
];
let nextTaskId = 4;
function createTask(userTitle) {
    const title = userTitle.trim();
    if (title === "") {
        console.log("Error: title cannot be empty");
        return undefined;
    }
    const task = {
        id: nextTaskId++,
        title: userTitle,
        completed: false,
    };
    tasks.push(task);
    return task;
}
createTask("try to do it");
function markTaskCompleted(yourId) {
    const task = tasks.find((task) => task.id === yourId);
    if (!task) {
        undefined;
    }
    task.completed = true;
    return task;
}
console.log(markTaskCompleted(1));
function deleteTask(yourId) {
    const index = tasks.findIndex((task) => task.id === yourId);
    if (index === -1) {
        return false;
    }
    else {
        tasks.splice(index, 1);
        return true;
    }
}
console.log(deleteTask(3));
createTask("try to do it2");
createTask("try to do it3");
function getTaskById(yourId) {
    const task = tasks.find((task) => task.id === yourId);
    if (!task) {
        undefined;
    }
    else {
        return task;
    }
}
console.log(getTaskById(2));
function getAllTasks() {
    return tasks;
}
console.log(getAllTasks());
export {};
//# sourceMappingURL=index.js.map