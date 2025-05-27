import express from "express";

import todosRoutes from "./routes/todos";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
