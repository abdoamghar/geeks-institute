import { TodoList } from "./todo.js";

const todoList = new TodoList();

todoList.addTask("Learn JavaScript");
todoList.addTask("Learn Node.js");
todoList.addTask("Build a project");

todoList.completeTask("Learn JavaScript");

todoList.listTasks();