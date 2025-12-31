import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import './App.css'
import {FeedProvider} from './context/FeedContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'

function App() {
  return (
    <AuthProvider>
      <FeedProvider>
        <Router>
          <div className="flex flex-col">
            <Navbar />
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/contact' element={<Contact />}/>
                <Route path='/watch/*' element={<VideoPage />}/>
                <Route path='/channel/*' element={<ChannelPage />}/>
              </Route>
            </Routes>
          </div>
        </Router>
      </FeedProvider>
    </AuthProvider>
  )
}

export default App
