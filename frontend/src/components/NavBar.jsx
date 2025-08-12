import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyPortfolioButton from './MyPortfolioButton';
import './Navbar.css';

// Main Navbar Component with React Router Integration
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Define navigation items with their routes matching your router
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'portfolio', label: 'My Portfolio', path: '/portfolio' },
    { id: 'stocks', label: 'Browse Stocks', path: '/stocks' }, // You'll need to add this route
    { id: 'about', label: 'About', path: '/about' }, // You'll need to add this route
    { id: 'login', label: 'Login', path: '/login' }
  ];

  // Function to check if a route is active
  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    
      <nav className="retro-navbar">
        <div className="nav-container">
          <MyPortfolioButton />
          
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-hidden' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link nav-link-${item.id} ${isActiveRoute(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`mobile-nav-link nav-link-${item.id} ${isActiveRoute(item.path) ? 'active' : ''}`}
                onClick={handleMobileMenuClick}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    
  );
}