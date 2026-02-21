const express = require('express');
const router = express.Router();

// In-memory store
let todos = [];
let nextId = 1;

// List todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Get single todo
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// Create todo
router.post('/', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }
  const todo = { id: nextId++, title: title.trim(), completed: Boolean(completed) };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update entire todo
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { title, completed } = req.body;
  if (!title || typeof title !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'title (string) and completed (boolean) are required' });
  }
  todos[idx] = { id, title: title.trim(), completed };
  res.json(todos[idx]);
});

// Patch todo (partial)
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  const { title, completed } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string') return res.status(400).json({ error: 'title must be a string' });
    todo.title = title.trim();
  }
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') return res.status(400).json({ error: 'completed must be boolean' });
    todo.completed = completed;
  }
  res.json(todo);
});

// Delete todo
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = todos.splice(idx, 1);
  res.json(deleted);
});

module.exports = router;
