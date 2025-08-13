import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavItem.css';

const COLOR_CLASSES = {
  '/': 'color-a2c2dd',
  '/about': 'color-d8a7b1',
  '/portfolio': 'color-bfd8bd',
  '/stocks': 'color-d3d3d3',
  '/login': 'color-f5f3ee'
};

export default function NavItem({ label, path, icon, isActive, action }) {
  const [hovered, setHovered] = useState(false);
  const activeColorClass = isActive ? COLOR_CLASSES[path] || '' : '';
  const iconSrc = hovered ? icon.hovered : icon.default;

  const linkClass = `nav-link ${isActive ? 'active' : ''} ${activeColorClass}`.trim();

  const handleClick = (e) => {
    if (action) {
      e.preventDefault();
      action();
    }
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const linkContent = (
    <div className="nav-content">
      <img src={iconSrc} alt={`${label} icon`} className="nav-icon-image" />
      <span className="nav-label">{label}</span>
    </div>
  );

  const commonProps = {
    className: linkClass,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  };

  return (
    <li className="nav-item">
      {action ? (
        <button {...commonProps} type="button" aria-label={`${label} button`}>
          {linkContent}
        </button>
      ) : (
        <Link {...commonProps} to={path}>
          {linkContent}
        </Link>
      )}
    </li>
  );
}
