import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();

connectDB();


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],  // Specify exact origin instead of env variable
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
    exposedHeaders: ["*", "Authorization"]
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);



const port =  process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

