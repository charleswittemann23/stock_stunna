import React, { useState, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import './NavBar.css';
import { AuthContext } from '../context/AuthContext';
import {PAGE_ICONS} from '../assets/icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Memoize navigation items to prevent unnecessary re-renders
 const navItemsLeft = useMemo(() => [
  { id: 'home', label: 'Home', path: '/', icon: PAGE_ICONS.GLOBE_ICON },
  { id: 'stocks', label: 'Browse Stocks', path: '/stocks', icon: PAGE_ICONS.PAPER_ICON },
  ...(isAuthenticated
    ? [{ id: 'portfolio', label: 'My Portfolio', path: '/portfolio', icon: PAGE_ICONS.FOLDER_ICON }]
    : []
  )
], [isAuthenticated]);

  const navItemsRight = useMemo(() => [
  ...(isAuthenticated
    ? [
        { id: 'profile', label: 'My Profile', path: '/myprofile', icon: PAGE_ICONS.PROFILE_ICON },
        { id: 'logout', label: 'Logout', path: '#', icon: PAGE_ICONS.LOGOUT_ICON, action: logout }
      ]
    : [
        { id: 'login', label: 'Login', path: '/login', icon: PAGE_ICONS.LOGIN_ICON },
        { id: 'register', label:'Register', path: '/register', icon: PAGE_ICONS.KEYS_ICON}
      ]
  )
], [isAuthenticated, logout]);

  // Check if a route is active
  const isActiveRoute = (path) => {
    return path === '/' 
      ? location.pathname === '/'
      : location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleMobileNavClick = (item) => {
    if (item.action) {
      item.action();
    }
    closeMobileMenu();
  };

  return (
    <nav className="retro-navbar">
      <div className="nav-container">
        {/* Left navigation items */}
        <ul className={`nav-menu nav-menu-left ${mobileMenuOpen ? 'mobile-hidden' : ''}`}>
          
          {navItemsLeft.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={item.icon}
              isActive={isActiveRoute(item.path)}
            />
          ))}
        </ul>
          <h1 className="retro-title">Stock Stunna</h1>
        {/* Right navigation items */}
        <ul className={`nav-menu nav-menu-right ${mobileMenuOpen ? 'mobile-hidden' : ''}`}>
          {navItemsRight.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={item.icon}
              isActive={isActiveRoute(item.path)}
              action={item.action}
            />
          ))}
        </ul>

        {/* Hamburger menu button */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {[...navItemsLeft, ...navItemsRight].map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`mobile-nav-link nav-link-${item.id} ${
                isActiveRoute(item.path) ? 'active' : ''
              }`}
              onClick={() => handleMobileNavClick(item)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}