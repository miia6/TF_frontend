// HOMEPAGE / APP

import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import logo from './assets/TF_app_logo.jpg'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import CourseSelection from './pages/CourseSelection'
import ProjectProposal from './pages/ProjectProposal'

import ProjectSearch from './pages/ProjectSearch'
import UserProject from './pages/UserProject'
//import SentApplications from './pages/SentApplications'
//import ProjectApplications from '/pages/ProjectApplications'
//import ProjectInvitations from '/pages/ProjectInvitations'
//import SentInvitations from '/pages/SentInvitations'

import TeammatesFinding from './pages/TeammatesFinding'
import PrivateRoute from './components/PrivateRoute'
import { isTokenExpired } from './services/auth'

import './App.css'

function AppContent() {
    const navigate = useNavigate()

    const location = useLocation()
    const showAppLogoAndHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'
    const appLogoAndHeaderLoginAndSignup = location.pathname === '/login' || location.pathname === '/signup'

    /*useEffect(() => {
        isTokenExpired() && navigate('/login')
    }, [navigate])*/

    useEffect(() => {
        const publicPaths = ['/', '/login', '/signup']
        if (!publicPaths.includes(location.pathname) && isTokenExpired()) {
            navigate('/login')
        }
        /*if (location.pathname !== '/signup' && isTokenExpired()) {
            navigate('/login');
        }*/
    }, [navigate, location.pathname])

    return (
        <div className="App">
            {showAppLogoAndHeader && (
                <>
                    <div className={`App-header-container ${appLogoAndHeaderLoginAndSignup ? 'App-header-container-flex' : ''}`}>
                        <div className={`App-logo ${appLogoAndHeaderLoginAndSignup ? 'App-logo-flex' : ''}`}>
                            <img src={logo} alt="TF Logo" />
                        </div>
                        <header className="App-header">
                            <h1>TeammatesFinding</h1>
                            <nav>
                                <a href="/login">Login</a>
                                <a href="/signup">Sign up</a>
                            </nav>
                        </header>
                    </div>
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
                            <button onClick={() => navigate('/signup')}>Sign up</button>
                        </div>
                    </section>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/courseSelection" element={<PrivateRoute><CourseSelection /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/teammatesFinding" element={<PrivateRoute><TeammatesFinding /></PrivateRoute>} />
                <Route path="/projectProposal" element={<PrivateRoute><ProjectProposal /></PrivateRoute>} />

                <Route path="/projectSearch" element={<PrivateRoute><ProjectSearch /></PrivateRoute>} />
                <Route path="/yourProject" element={<PrivateRoute><UserProject /></PrivateRoute>} />
                {/*<Route path="/sentApplications" element={<SentApplications />} />*/}
                {/*<Route path="/projectApplications" element={<projectApplications />} />*/}
                {/*<Route path="/projectInvitations" element={<projectInvitations />} />*/}
                {/*<Route path="/sentInvitations" element={<sentInvitations />} />*/}

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


