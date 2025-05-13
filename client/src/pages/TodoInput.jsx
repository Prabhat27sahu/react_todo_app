import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Plus } from 'lucide-react';
import axios from 'axios';
import Navbar from './navbar';
import TodoList from './TodoList';
import toast from 'react-hot-toast';


const TodoInput = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [btn, clickbtn] = useState('');
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;
    
    // Reset form
    setTitle('');
    setDescription('');
  };

    const todoHandler = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/todo/',
          { title, description },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        clickbtn(); // Update the button state to trigger re-render of TodoList component
        clickbtn(false); // Reset the button state to false after updating
  
        if (response.status === 201) {
          console.log('message:', response.data.message);
          // alert("task added successful!");
          toast.success('task added successful!')
          setDescription('');
          setTitle('');
          
          
        }
      } catch (error) {
        toast.error("task failed to add. Please check your error.")
        // alert("task failed to add. Please check your error.");
        console.error("Task add failed:", error);
      }
  }
  


  return (
    <>
    <Navbar/>
    <Card className="w-full max-w-md mx-auto bg-transparent border-none shadow-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-neutral-400 h-11"
          />
          
          <Textarea
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-neutral-400 min-h-[100px]"
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium h-12" onClick={todoHandler}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
    <TodoList btn={btn} />
    </>
  );
};

export default TodoInput; 