import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const TodoList = ({ btn }) => {
  const [todos, setTodos] = useState([]);
  const [del, delclick] = useState(false);
  const [edit, editclick] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/todo/getTodo",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setTodos(response.data.todos || []);
        console.log("message:", response.data.message);
        console.log("API Response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [btn, del]);

  // Add console log to check todos state
  // console.log("Current todos state:", todos);

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("Todo ID is missing");
        toast.error("Unable to delete todo: Invalid ID");
        return;
      }
      const response = await axios.delete(
        `http://localhost:8000/api/v1/todo/delete/${_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Todo deleted successfully");
        delclick((prev) => !prev); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = async (_id) => {
    try {
      if (!_id) {
        console.error("Todo ID is missing");
        toast.error("Unable to set todo: Invalid ID");
        return;
      }
      const response = await axios.get(
        `http://localhost:8000/api/v1/todo/${_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Todo selected successfully");
        console.log("Selected Todo:", response.data);
        setTitle(response.data.title );
        setDescription(response.data.description);
       
        // editclick(prev => !prev); // Refresh the list
      }
    } catch (error) {
      console.error("Error in selecting todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <Card key={todo._id} className="bg-zinc-900/80 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">
                {todo.title}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-yellow-500"
                  onClick={() => handleEdit(todo._id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-red-500"
                  onClick={() => handleDelete(todo._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">{todo.description}</p>
              <p className="text-xs text-zinc-500 mt-2">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-zinc-400">No todos found</div>
      )}
    </div>
  );
};

export default TodoList;
