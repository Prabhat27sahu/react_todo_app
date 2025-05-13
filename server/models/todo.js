import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Todo = mongoose.model('Todo', todoSchema);

// export default Todo;

