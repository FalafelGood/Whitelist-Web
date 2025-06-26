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
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
        {/* <VideoPlayer videoId="sH3Br9SyzRU"/>
        <Channel /> */}
      </div>
      {/* <img src="../src/assets/black-no-text.svg" width="50px" /> */}
    </Router>
  )
}

export default App
