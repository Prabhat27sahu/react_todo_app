import { Card, CardContent } from '../components/ui/card';
import { Check, Trash } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [todoId, setTodoId] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/todo/');
        if (response.status === 200) {
          setTodoId(response.data.todos);
          console.log('message:', response.data.message);
        }
      }
      catch (error) {
        console.error('Error fetching todo:', error);
      }
      
  }
  fetchTodo();
  }, []);
  return (
    <Card className="mb-3 bg-zinc-900/80 border-zinc-800 shadow-md overflow-hidden" key={todo._id}>
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <button 
            onClick={() => onToggle(todo._id)}
            className={cn("flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-0.5", 
              todo.completed 
                ? "bg-green-500 border-green-600 text-white" 
                : "border-zinc-600 hover:border-purple-500"
            )}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </button>
          
          <div className="flex-1">
            <h3 className={cn("font-medium text-sm text-white",
              todo.completed && "line-through text-zinc-400"
            )}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={cn("text-xs mt-1 text-zinc-400", 
                todo.completed && "line-through text-zinc-500"
              )}>
                {todo.description}
              </p>
            )}
          </div>
          
          <button 
            onClick={() => onDelete(todo._id)}
            className="text-zinc-500 hover:text-red-500 transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const TodoList = ({ todo = [], onToggleComplete, onDeleteTodo }) => {
  if (todo.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-500">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      {todos.map(todo => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onToggle={onToggleComplete}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList; 