import express from "express";
import { Todo } from "./types/todo";

const app = express();
const port = 3000;

let todos: Todo[] = [];

app.use(express.json());

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const deleteId = Number(req.params.id);
  todos = todos.filter((item) => item.id !== deleteId);
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  const putId = Number(req.params.id);

  const putTodosIndex = todos.findIndex((item) => item.id === putId);

  if (putTodosIndex === -1) {
    res.status(404).json({ error: "Id is not found" });
  } else {
    todos[putTodosIndex] = req.body;
    todos[putTodosIndex].id = putId;

    res.status(200).send(todos[putTodosIndex]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
