import express from "express";
import { Todo } from "./types/todo";

const app = express();
const port = 3000;

let todos: Todo[] = [];

app.use(express.json());

app.get("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

app.post("/todos", (req, res) => {
  res.send(req.body);
});

app.delete("/todos/:id", (req, res) => {
  res.send("Hello World!");
});

app.put("/todos/:id", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
