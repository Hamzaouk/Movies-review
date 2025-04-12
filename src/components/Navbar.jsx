import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png"
import { Search, Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
    setIsMenuOpen(false);
  };

  // Updated search handler to match the second navbar's approach
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="logo" 
                className="cursor-pointer h-12 w-auto"
                onClick={() => handleNavigation("/")}
              />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white pl-3 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 w-64"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Favorites Link - Desktop */}
            <div className="hidden md:block">
              <Link 
                to="/favoris" 
                className="flex items-center text-white hover:text-red-500 transition-colors duration-300"
              >
                <Heart size={20} className="mr-2" />
                <span>Favoris</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-white hover:text-gray-400 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4 px-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white pl-3 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
              />
              <button 
                type="submit"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Favorites Link */}
            <Link 
              to="/favoris" 
              className="flex items-center px-3 py-2 text-white hover:text-red-500 hover:bg-gray-900 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart size={20} className="mr-2" />
              <span>Favoris</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;