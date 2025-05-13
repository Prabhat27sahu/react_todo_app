import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

    const handleSubmit = (e) => {    // Defines a function that handles form submission
      e.preventDefault();          // Prevents the default form submission behavior (page reload)
      if (!email || !password) {     // Checks if both email and password values exist/are truthy
        
        alert("Please fill in all fields");
        return;
      }
    };

  



  const loginHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('message:', response.data.message);
      // alert("Login successful!");
      toast.success('Login successful!')
      
      navigate('/dashboard'); // Redirect on success
  
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
      // alert("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b14] p-4">
      <Card className="w-full max-w-md bg-zinc-900/90 border-zinc-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">Login to Task Manager</CardTitle>
          <p className="text-zinc-400 text-sm">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-1 top-1 h-7 w-7 p-0 text-zinc-500 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium h-11"
              onClick={loginHandler}
            >
              Sign In
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-zinc-400 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage; 