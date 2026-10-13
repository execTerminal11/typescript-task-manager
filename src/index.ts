interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const task1 = {
    id: 1,
    title: "home chore",
    completed: false,
}
function information(task: Task): void {
    console.log(task)
}
information(task1)