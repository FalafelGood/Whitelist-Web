import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import YouTube from 'react-youtube'
import Navbar from './components/Navbar.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import Channel from './components/Channel.jsx'
import './App.css'

// 640, 390

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <VideoPlayer videoId="sH3Br9SyzRU"/>
      <Channel />
    </Router>
  )
}

export default App
