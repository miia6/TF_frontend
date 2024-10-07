// HOMEPAGE / APP

import logo from './assets/TF_app_logo.jpg'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'

// import { useState, useEffect, useRef } from 'react'

// import services
// import components

function AppContent() {

  const location = useLocation()
  const showAppLogoAndHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'
  const isLoginOrSignUpPage = location.pathname === '/login' || location.pathname === '/register'

  const navigate = useNavigate()

  return (
    <div className="App">
      {showAppLogoAndHeader && (
        <>
          <div className={`App-logo ${isLoginOrSignUpPage ? 'App-logo-left' : ''}`}>
            <img src={logo} alt="TF Logo" />
          </div>
          <header className="App-header">
            <h1>TeammatesFinding</h1>
            <nav>
              <a href="/login">Login</a>
              <a href="/register">Sign up</a>
            </nav>
          </header>
        </>
      )}

      <Routes>
          <Route path="/" element={
            <section className="App-intro">
              <h2>Welcome to TeammatesFinding App</h2>
              <p>
                TeammatesFinding helps students find project teammates. Propose new projects or join existing teams easily.
              </p>
              <div className="App-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Sign up</button>
              </div>
            </section>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard appLogo={logo} />} />
          {/* You can add more routes for other pages here */}
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App


