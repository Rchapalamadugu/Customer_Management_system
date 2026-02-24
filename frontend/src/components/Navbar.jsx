import { Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-white text-lg font-bold tracking-tight">
              Customer Manager
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/" className={linkClass('/')}>
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link to="/add" className={linkClass('/add')}>
              <UserPlus className="h-4 w-4" />
              Add Customer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
