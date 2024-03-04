# A-Basic-RESTful-API
A task of building a simple RESTful API using Node.js that manages a collection of tasks (e.g., to-do items). The API should allow users to perform basic CRUD (Create, Read, Update, Delete) operations on tasks

Step 1: Set Up Your Project

    Create a new directory for your project.
    Navigate to the project directory in your terminal.
    Initialize a new Node.js project by running npm init -y.
    Install necessary dependencies:
        npm install express body-parser
        
Step 2: Create Server File

    Create a file named server.js in your project directory.
    Require the necessary modules:

    javascript

const express = require('express');
const bodyParser = require('body-parser');
nitialize Express:

javascript

const app = express();
const port = process.env.PORT || 3000; // You can change the port as needed

Use body-parser middleware:

javascript

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

Step 3: Define Routes

    Define routes for CRUD operations:

    javascript

    const tasks = [];

    // Get all tasks
    app.get('/tasks', (req, res) => {
        res.json(tasks);
    });

    // Get a specific task by ID
    app.get('/tasks/:id', (req, res) => {
        const taskId = req.params.id;
        const task = tasks.find(task => task.id === taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    });

    // Create a new task
    app.post('/tasks', (req, res) => {
        const newTask = req.body;
        tasks.push(newTask);
        res.status(201).json(newTask);
    });

    // Update an existing task
    app.put('/tasks/:id', (req, res) => {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const index = tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        tasks[index] = updatedTask;
        res.json(updatedTask);
    });

    // Delete a task
    app.delete('/tasks/:id', (req, res) => {
        const taskId = req.params.id;
        const index = tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const deletedTask = tasks.splice(index, 1)[0];
        res.json(deletedTask);
    });

Step 4: Start the Server

    Add the following code to start the server:

    javascript

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

Step 5: Run Your Application

    In your terminal, run the command:

    bash

    node server.js

The simple RESTful API for managing tasks should now be up and running. We can test the API using tools like Postman or by sending HTTP requests from your frontend application.
