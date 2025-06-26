import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import YouTube from 'react-youtube'
import Navbar from './components/Navbar.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import Channel from './components/Channel.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
