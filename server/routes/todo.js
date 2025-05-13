import express from 'express';
import { getAllTodos,createTodo,getTodoById,updateTodo,deleteTodo } from '../controllers/todo.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();
router.route('/getTodo').get(isAuthenticated, getAllTodos);
router.route('/').post(isAuthenticated, createTodo);
router.route('/:id').get(isAuthenticated, getTodoById).put(isAuthenticated, updateTodo);
router.route('/delete/:id').delete(isAuthenticated, deleteTodo);

// router.get('/:id', getTodoById);

export default router;