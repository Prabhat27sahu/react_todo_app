import { Todo } from "../models/todo.js";

// Get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            message: 'Todos fetched successfully',
            todos: todos
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new todo
export const createTodo = async (req, res) => {
    try {
        // Create a new Todo instance using the Todo model
        const todo = new Todo({
            title: req.body.title,        // Get title from request body
            description: req.body.description,  // Get description from request body
            completed: req.body.completed || false  // Optional completed status, defaults to false
        });
        
        // Save the new todo to MongoDB
        const newTodo = await todo.save();
        
        // Send success response with the created todo
        res.status(201).json({
            message: 'Todo created successfully',
            todo: newTodo
        });
    } catch (error) {
        // Send error response if something goes wrong
        res.status(400).json({ message: error.message });
    }
};

// Get single todo by ID
export const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update todo
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

        const updatedTodo = await todo.save();
        res.status(200).json({
            message: 'Todo updated successfully',
            updateTodo: updatedTodo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete todo
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
