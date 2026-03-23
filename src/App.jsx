import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Success from './pages/Success'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
