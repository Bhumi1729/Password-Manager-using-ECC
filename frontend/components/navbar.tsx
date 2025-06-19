"use client"

import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import { Menu, X, Lock, Shield } from 'lucide-react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Handle body scroll locking when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // For regular page navigation
  const navigateTo = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };
    // For anchor links (sections)
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Give time for menu to close
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Get navbar height
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        // Scroll to element with offset for fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        });
      } else if (id === '') {
        // Home - scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback
        window.location.hash = id;
      }
    }, 300);
  };

  return (
    <>      <nav className="fixed top-0 left-0 right-0 z-20 px-5 py-3 shadow-md shadow-black/20">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="relative flex items-center justify-between max-w-5xl mx-auto"><div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigateTo('/')}>            <div className="relative">                <Shield className="h-7 w-7 text-cyan-400" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-cyan-400 rounded-full filter blur-sm -z-10"
                />
              </div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                CryptoVault
              </h1>
            </div>          <div className="hidden md:flex items-center space-x-10">
            <NavLink active={true} href="#">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#faqs">FAQ</NavLink>
          </div>
            <div className="hidden md:flex items-center space-x-5">
            <button onClick={() => router.push("/auth/login")}  className="text-base px-5 py-2 text-gray-300 hover:text-white transition-colors relative overflow-hidden group">
              <span className="relative z-10">Login</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => router.push("/auth/signup")} className="text-base px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-white relative overflow-hidden group">
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></span>
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-transform duration-200 hover:scale-110 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu - Completely separate from the main navbar */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col md:hidden
          transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 py-16">
          {/* Menu Links */}
          <button 
            onClick={() => scrollToSection('')}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
          >
            Home
          </button>
          
          <button 
            onClick={() => scrollToSection('features')}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
          >
            Features
          </button>
            <button 
            onClick={() => scrollToSection('faqs')}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
          >
            FAQ
          </button>
          
          <div className="pt-6 flex flex-col items-center space-y-4 w-56">
            <button 
              onClick={() => navigateTo("/auth/login")} 
              className="w-full py-2 border border-blue-500 rounded-md text-blue-400 transition-all duration-300 hover:bg-blue-500/20"
            >
              Login
            </button>
            
            <button 
              onClick={() => navigateTo("/auth/signup")} 
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => {
  return (
    <a 
      href={href}      className={`relative text-base font-medium transition-colors duration-200 group ${
        active ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >      <span className="relative py-1 inline-block">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
      </span>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
      )}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 transition-opacity duration-300"></span>
    </a>
  );
};

export default Navbar;