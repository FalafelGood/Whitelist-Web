// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { ClerkProvider } from '@clerk/react'

/*
  Note 1: I have duplicates of the CLERK_PUBLISHABLE_KEY in .env
  This isn't an accident: `import.meta.env.VITE_CLERK_PUBLISHABLE_KEY` is used here in place of `process.env.CLERK_PUBLISHABLE_KEY` since App.jsx is run by the browser (not Node).

  Note 2: All VITE env variables are public. This isn't a problem here since this this is a publishable key. Good thing to be aware of though.
*/
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Clerk key is not configured');
}

const clerkLocalization = {
  formButtonPrimary: 'Continue',
  signIn: {
    start: {
      title: 'Admin Login',
      subtitle: 'Unlimited power!!',
    },
  },
}

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Recommend from './pages/Recommend.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Admin from './pages/Admin.jsx'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} localization={clerkLocalization}>
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
              <Route path='/categories' element={<CategoriesPage />}/>
              <Route path='/admin' element={<Admin />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>
        </Router>
      </ClerkProvider>
      <Analytics />
    </QueryClientProvider>
  )
}

export default App
