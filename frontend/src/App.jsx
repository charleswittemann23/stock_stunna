import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import {Outlet} from 'react-router-dom'
import './App.css'
import NewsSection from './components/NewsSection.jsx'
import About from './components/AboutPage.jsx'

function App() {
  return (
    <>
    <div className='retro-body'>

      <NavBar/>
      
      <Outlet />
      

      <NewsSection />
      <About/>
      
    </div>
    
    </>
  )
}

export default App
