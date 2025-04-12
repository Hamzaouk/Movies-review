import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png"
import { Search, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const navigate = useNavigate();

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check user's preferred color scheme
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  // Apply theme class to document when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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
      <nav className={`fixed top-0 left-0 right-0 z-50 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)] ${darkMode ? 'bg-black' : 'bg-white'}`}>
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
                  className={`${
                    darkMode 
                      ? 'bg-gray-800 text-white focus:ring-gray-600' 
                      : 'bg-gray-200 text-gray-800 focus:ring-gray-300'
                  } pl-3 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 w-64`}
                />
                <button 
                  type="submit"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Theme Toggle - Desktop */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Favorites Link - Desktop */}
              <Link 
                to="/favoris" 
                className={`flex items-center ${
                  darkMode 
                    ? 'text-white hover:text-red-500' 
                    : 'text-gray-800 hover:text-red-500'
                } transition-colors duration-300`}
              >
                <Heart size={20} className="mr-2" />
                <span>Favoris</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Theme Toggle - Mobile */}
              <button 
                onClick={toggleTheme}
                className={`p-1.5 rounded-full ${
                  darkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button
                className={`${darkMode ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'} p-2`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 ${darkMode ? 'bg-black' : 'bg-white'}`}>
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4 px-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${
                  darkMode 
                    ? 'bg-gray-800 text-white focus:ring-gray-600' 
                    : 'bg-gray-200 text-gray-800 focus:ring-gray-300'
                } pl-3 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 w-full`}
              />
              <button 
                type="submit"
                className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Favorites Link */}
            <Link 
              to="/favoris" 
              className={`flex items-center px-3 py-2 ${
                darkMode 
                  ? 'text-white hover:text-red-500 hover:bg-gray-900' 
                  : 'text-gray-800 hover:text-red-500 hover:bg-gray-100'
              } rounded-md transition-colors duration-300`}
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