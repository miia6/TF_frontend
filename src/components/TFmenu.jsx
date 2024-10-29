import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'
import '../styles/tfmenu.css'
import Cookies from 'js-cookie'
import { getCourse } from '../services/course'

const TFmenu = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const selectedCourse = localStorage.getItem('selectedCourse')
    const [isProjectFindingOpen, setIsProjectFindingOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    const [lastScrollPos, setLastScrollPos] = useState(0)

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        localStorage.removeItem('user')
        localStorage.removeItem('selectedCourse')
        localStorage.removeItem('createdProject')
        Cookies.remove('user')
        navigate('/')
    }

    const handleCourseChange = () => {
        navigate('/courseSelection')
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset
        setShowMenu(currentScrollPos < lastScrollPos || currentScrollPos < 10)
        setLastScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollPos])

    useEffect(() => {
        getCourse(selectedCourse).then((course) => {
            setCourse(course)
        }).catch((error) => {
            console.error("Failed to fetch course:", error)
        })
    }, [selectedCourse])


    return (
        <>
            {showMenu && (
                <div className="top-menu-bar">
                    <img src={logo} alt="TF logo" className="app-logo" />

                    <div className="course-section">
                        <p>Selected course:</p>
                        <div className='course-name'>
                            <p>{course?.name || 'No course selected'}</p>
                        </div>
                        <button className="change-course-button" onClick={handleCourseChange}>
                            Change Course
                        </button>
                    </div>

                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            )}

            {selectedCourse && (
                <div className="sidebar-menu">
                    <nav className="sidebar-links">
                        <ul className="link-list">

                            <li onClick={() => navigate('/dashboard')} className="sidebar-link">
                                Frontpage
                            </li>

                            <li className="sidebar-link"
                                onClick={() => setIsProjectFindingOpen(!isProjectFindingOpen)}
                            >
                                Projects
                            </li>
                            {isProjectFindingOpen && (
                                <ul className="sublink-list">
                                    <li onClick={() => navigate('/projectSearch')} className="sidebar-sublink">
                                        Search projects
                                    </li>
                                    <li onClick={() => navigate('/yourProject')} className="sidebar-sublink">
                                        Your project
                                    </li>
                                    <li onClick={() => navigate('/sentApplications')} className="sidebar-sublink">
                                        Sent applications
                                    </li>
                                    <li onClick={() => navigate('/projectApplications')} className="sidebar-sublink">
                                        Project Applications
                                    </li>
                                    <li onClick={() => navigate('/projecInvitations')} className="sidebar-sublink">
                                        Project invitations
                                    </li>
                                    <li onClick={() => navigate('/sentInvitations')} className="sidebar-sublink">
                                        Sent invitations
                                    </li>
                                </ul>
                            )}

                            <li onClick={() => navigate('/teammatesFinding')} className="sidebar-link">
                                Find teammates
                            </li>

                            <li onClick={() => navigate('/projectProposal')} className="sidebar-link">
                                Create project
                            </li>

                        </ul>
                    </nav>
                </div>
            )}
        </>
    )
}

export default TFmenu
