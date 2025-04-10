import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/Logo.png"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* <div className="flex flex-shrink-0 items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="cursor-pointer" 
          />
        </div> */}

        <div className="flex space-x-4">
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-white transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-white transition-colors">
            <FaGithub />
          </a>
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-white transition-colors">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-xl text-neutral-400 hover:text-white transition-colors">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-800 mt-4 pt-4 text-center text-neutral-400 text-sm">
        © 2025 HM. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

