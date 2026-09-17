import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

let todos = [
    {
        id: 1,
        title: "Learn Express",
        completed: false
    },
    {
        id: 2,
        title: "Build Todo API",
        completed: false
    }
];

let nextId = 3;


// CREATE todo
app.post("/api/todos", (req, res) => {
    const { title, completed = false } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTodo = {
        id: nextId++,
        title,
        completed
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});


// GET all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});


// GET one todo
app.get("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.json(todo);
});


// UPDATE todo
app.put("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});


// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(index, 1);

    res.json({
        message: "Todo deleted successfully"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});