import { useState } from 'react'
// import Navbar from './components/navbar'
// import TodoInput from './components/TodoInput'
// import TodoList from '../components/TodoList'
import LoginPage from './pages/LoginPage'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TodoInput from './pages/TodoInput';
import toast,{Toaster} from 'react-hot-toast';


const appRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: <TodoInput/>
    
    
  },
  {
    path: "/login",
    element: <LoginPage />
    
  }

]);


function App() {
  return (
    <>
  <RouterProvider router={appRouter} /> 
  <Toaster/>
  
  </>
  )
}

  

export default App
