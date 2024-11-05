import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'

import { getCourse, getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject } from '../services/project'
import { logout } from '../services/auth'

import '../styles/tfmenu.css'

const TFmenu = () => {
    const [course, setCourse] = useState(null)
    const [hasProject, setHasProject] = useState(false)
    const [isProjectFindingOpen, setIsProjectFindingOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    const selectedCourseId = getSelectedCourseCookies() 

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourseAndProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourse = await getCourse(selectedCourseId)
                    setCourse(fetchedCourse)
                    console.log("Fetched course: ", fetchedCourse.name)

                    const project = await getUserCourseProject(fetchedCourse.id)
                    setHasProject(!!project)
                    
                    /*if (project) {
                        console.log('User has an existing project: ' + project.name)  
                    } else {
                        console.log('User has not created any projects')
                    }*/
                    
                } catch (error) {
                    console.error("Failed to fetch course:", error)
                }

            } else {
                setCourse(null)
            }
        }

        fetchCourseAndProjectData()
    }, [selectedCourseId])

    const handleLogout = () => {
        logout() 
        navigate('/')
    }

    const handleCourseChange = () => {
        navigate('/courseSelection')
    }

    const logoSectionStyle = {
        backgroundColor: selectedCourseId ? '#16423C' : '#E9EFEC', 
        width: '12rem',
        height: '100%',
    }

    return (
        <>
            {showMenu && (
                <div className="top-menu-bar">
                    <div className="logo-section" style={logoSectionStyle}>
                        <img src={logo} alt="TF logo" className="app-logo" />
                    </div>

                    <div className="course-section">
                        <p>Selected course:</p>
                        <div className='course-name'>
                            <p>{course?.name || ' '}</p>
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

            {selectedCourseId && (
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

                            {!hasProject && (
                                <li onClick={() => navigate('/projectProposal')} className="sidebar-link">
                                    Create project
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    )
}

export default TFmenu
