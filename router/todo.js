const express = require('express');
const uuidv4 = require('uuid').v4;
const router = express.Router();

let todos = [
  {
    id: uuidv4(),
    todo: "do laundry",
    done: "false"
  },
  {
    id: uuidv4(),
    todo: "wash dishes",
    done: "false"
  }
];

// GET all todos
router.get('/get-all-todos', (req, res) => {
  res.json(todos);
});

// GET todo by ID
router.get('/get-todo-by-id/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "The Todo ID you are looking for does not exist, please check the ID" });
  }
});

// GET todos by done status
router.get('/get-todos-by-done/:done', (req, res) => {
  const doneStatus = req.params.done === 'true';
  const newDoneArray = todos.filter(t => t.done === String(doneStatus));
  res.json(newDoneArray);
});

// POST new todo
router.post('/create-new-todo', (req, res) => {
  const newTodo = {
    id: uuidv4(),
    todo: req.body.todo,
    done: "false"
  };
  todos.push(newTodo);
  res.json(todos);
});

router.delete('/delete-by-id/:id', (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      res.json({ message: `Todo with ID ${todoId} has been deleted`, todos });
    } else {
      res.status(404).json({ message: "The Todo ID you are looking for does not exist, please check the ID" });
    }
  });

module.exports = router;
