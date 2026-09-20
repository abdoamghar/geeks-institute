const express = require("express");
const router = express.Router();

const todos = [];

router.get("/", (req, res) => {
    res.json(todos);
});

router.post("/", (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = req.body.title ?? todo.title;
    todo.completed = req.body.completed ?? todo.completed;

    res.json(todo);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = todos.splice(index, 1);

    res.json(deletedTodo[0]);
});

module.exports = router;