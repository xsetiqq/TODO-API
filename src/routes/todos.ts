import { Router } from "express";
import { Todo } from "../types/todo";
import { writeDB, readDB } from "../fs/dbReadWriter";

const router = Router();

let todos: Todo[] = [];

readDB().then((data) => {
  todos = data;
});

router.get("/", (req, res) => {
  res.status(200).json(todos);
  writeDB(todos);
});

router.get("/:id", (req, res) => {
  const Id = Number(req.params.id);
  const todo = todos.find((item) => item.id === Id);

  if (!todo) {
    res.status(404).json({ error: "Id is not found" });
  } else {
    res.json(todo);
  }
  writeDB(todos);
});

router.post("/", (req, res) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).send(newTodo);
  writeDB(todos);
});

router.delete("/:id", (req, res) => {
  const deleteId = Number(req.params.id);
  todos = todos.filter((item) => item.id !== deleteId);
  res.json(todos);
  writeDB(todos);
});

router.put("/:id", (req, res) => {
  const putId = Number(req.params.id);

  const putTodosIndex = todos.findIndex((item) => item.id === putId);

  if (putTodosIndex === -1) {
    res.status(404).json({ error: "Id is not found" });
  } else {
    const { title, completed } = req.body;
    if (title !== undefined) todos[putTodosIndex].title = title;
    if (completed !== undefined) todos[putTodosIndex].completed = completed;

    res.status(200).send(todos[putTodosIndex]);
    writeDB(todos);
  }
});

export default router;
