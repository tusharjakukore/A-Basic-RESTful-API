const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [];

// Routes
// GET all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
    const newTask = { id: Date.now().toString(), title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description };
        res.status(200).json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
