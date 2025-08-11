import { useState } from 'react'
import './MyPortfolioButton.css'
import folder from '../assets/folder.png'
import openfolder from '../assets/directory_open_cool-0.png'


export default function MyPortfolioButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-black bg-[#A2C2DD] shadow-md transition-all duration-300"
       style={{
        backgroundColor: '#A2C2DD',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={hovered ? openfolder : folder}
        alt="Button Icon"
        className="w-1 h-1 transition-all duration-300"
      />
      <span className="text-base ">My Portfolio</span>
    </button>
  );
}