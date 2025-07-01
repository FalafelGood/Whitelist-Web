import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import './App.css'

function App() {
  const [category, setCategory] = useState ('recommended');

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/watch/*' element={<VideoPage />}/>
          <Route path='/channel/*' element={<ChannelPage />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
