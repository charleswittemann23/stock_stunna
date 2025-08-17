import { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './HomePage.css'

export default function HomePage(){
  const { login, isAuthenticated, user, refreshAuth } = useContext(AuthContext);
  isAuthenticated ? console.log(user) : console.log("No user is logged in")
    const chartsData = useLoaderData()
    console.log(chartsData)
    return (
    <div className="retro-content">
      
      <h2>
            {isAuthenticated ? 
            (<>Hello {user.username}! Welcome to your stock portfolio hub!</>) : (<>Please sign in to access full features</>)}
          </h2>
      <div className="content-card">
        <p>This is your home for all stock financial data and complex analysis. Welcome to my retro pixel-style portfolio!</p>
        
          
        
        <div className="pixel-grid">
          <div className="pixel-box color-a2c2dd">Series of data points, percentages from US market, Europe</div>
          <div className="pixel-box color-d8a7b1">Chart 2</div>
          <div className="pixel-box color-bfd8bd">Chart 3</div>
        </div>
      </div>
    </div>
  );
}