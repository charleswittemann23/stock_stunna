import { useState } from 'react'
import './components/MyPortfolioButton'
import NavBar from './components/NavBar.jsx'
import {Outlet} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div >
      <NavBar/>

      <Outlet />
      <footer>This is a footer!</footer>
    </div>
        
    </>
  )
}

export default App
