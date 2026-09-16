class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push({
            task: task,
            completed: false
        });
    }

    completeTask(taskName) {
        const task = this.tasks.find(task => task.task === taskName);

        if (task) {
            task.completed = true;
        }
    }

    listTasks() {
        console.log(this.tasks);
    }
}

export { TodoList };