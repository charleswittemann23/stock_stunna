// pages/ErrorPage.js
import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-display">
          <h1 className="error-title">SYSTEM ERROR</h1>
          <div className="error-code">
            {error.status === 404 ? '404' : 'ERROR'}
          </div>
          <p className="error-message">
            {error.status === 404 
              ? 'PAGE NOT FOUND' 
              : error.statusText || error.message || 'An unexpected error occurred'}
          </p>
          <div className="error-details">
            <p>The requested resource could not be located in our retro database.</p>
          </div>
          <div className="error-actions">
            <Link to="/" className="retro-button">
              RETURN HOME
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="retro-button secondary"
            >
              GO BACK
            </button>
          </div>
        </div>
        
        
      </div>

      
    </div>
  );
};

export default NotFound;