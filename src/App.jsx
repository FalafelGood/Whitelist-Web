// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import {FeedProvider} from './context/FeedContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Recommend from './pages/Recommend.jsx'
// import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/watch/*' element={<VideoPage />}/>
            <Route path='/channel/*' element={<ChannelPage />}/>
            <Route path='/search/*' element={<SearchPage />}/>
            <Route path='/recommend' element={<Recommend />}/>
          </Routes>
        </div>
      </Router>
      <Analytics />
    </QueryClientProvider>
  )
}

export default App
