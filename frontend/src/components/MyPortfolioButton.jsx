import { useState } from 'react'
import './MyPortfolioButton.css'
import folder from '../assets/folder.png'
import openfolder from '../assets/directory_open_cool-0.png'


export default function MyPortfolioButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`portfolio-btn ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`portfolio-icon ${hovered ? 'hovered' : ''}`}>
         <img
        src={hovered ? openfolder : folder}
        alt="Button Icon"
        className="portfolio-icon-image"

      />
      
      </div>
      <span>My Portfolio</span>
    </button>
  );
}