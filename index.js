const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// In-memory data store (no database). Resets every time the server restarts.
// ---------------------------------------------------------------------------
let todos = [
  { id: 1, title: "Learn Next.js", completed: true },
  { id: 2, title: "Build a Todo app", completed: false },
];
let nextId = 3;

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Todo API is running" });
});

// READ - list all todos
app.get("/api/todos", (_req, res) => {
  res.json(todos);
});

// READ - single todo
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// CREATE - add a todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  const todo = { id: nextId++, title: title.trim(), completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// UPDATE - edit title and/or completed
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "title must be a non-empty string" });
    }
    todo.title = title.trim();
  }
  if (completed !== undefined) {
    todo.completed = Boolean(completed);
  }
  res.json(todo);
});

// DELETE - remove a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some((t) => t.id === id);
  if (!exists) return res.status(404).json({ error: "Todo not found" });
  todos = todos.filter((t) => t.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Todo API listening on http://localhost:${PORT}`);
});
