import { useState } from 'react'
import './components/MyPortfolioButton'
import NavBar from './components/NavBar.jsx'
import {Outlet} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
    <div className='retro-body'>

      <NavBar/>
      
      <Outlet />
      
      <footer>This is a footer!</footer>
    </div>
    
    </>
  )
}

export default App
