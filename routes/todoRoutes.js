const express = require('express');
const router = express.Router();
const todos = require('../controller/todoController.js');

router.get("/", todos.getTodos);
router.post("/", todos.addTodo);
router.get("/:id", todos.getTodo);
router.put("/:id/", todos.completeTodo);
router.delete("/:id/", todos.deleteTodo);
router.put("/:id/", todos.updateTodo);

// router.post("/add/", todos.addTodo);

module.exports = router;