import { Button } from '../components/ui/button';
import './navbar.css';

const Navbar = ({ isLoggedIn = false, onLogout }) => {
  return (
    <nav className="bg-zinc-900 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="navbar-logo">
        <h1 className="text-xl font-bold text-white">Todo App</h1>
      </div>
      <div className="navbar-buttons">
        {!isLoggedIn ? (
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
          >
            Login
          </Button>
        ) : (
          <Button 
            onClick={onLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
