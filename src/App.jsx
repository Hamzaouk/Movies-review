import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detailpage from './pages/detailpage'
import Favoris from './pages/Favoris'

function App() {
  const [theme, setTheme] = useState('dark'); // Default theme

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />           
            <Route path="/Detailpage/movie/:id" element={<Detailpage />} />
            <Route path="/favoris" element={<Favoris />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App