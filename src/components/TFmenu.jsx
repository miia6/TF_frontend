import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'

import { getCourse, getUserCourses, getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject, getAppliedProjectsCookies } from '../services/project'
import { logout } from '../services/auth'

import '../styles/tfmenu.css'

const TFmenu = () => {
    const [course, setCourse] = useState(null)
    const [project, setProject] = useState(null)
    const [hasProject, setHasProject] = useState(false)

    const [isProjectsOpen, setIsProjectsOpen] = useState(false)
    const [isCoursesOpen, setIsCoursesOpen] = useState(false)

    const selectedCourseId = getSelectedCourseCookies() 

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourseData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourse = await getCourse(selectedCourseId)
                    setCourse(fetchedCourse)
                    console.log("Fetched course: ", fetchedCourse.name)
                } catch (error) {
                    console.error("Failed to fetch course:", error)
                }
            } else {
                setCourse(null)
            }
        }

        fetchCourseData()
    }, [selectedCourseId])

    useEffect(() => {
        const fetchProjectData = async () => {
            if (course) {
                try {
                    const fetchedProject = await getUserCourseProject(course.id)
                    setHasProject(!!fetchedProject)      
                    if (fetchedProject) {
                        setProject(fetchedProject)
                        console.log('User has an existing project: ' + fetchedProject.name)  
                    }
                    
                } catch (error) {
                    console.error("Failed to fetch projects:", error)
                }
            }
        }

        fetchProjectData()
    }, [course])


    const handleLogout = () => {
        logout() 
        navigate('/')
    }

    const logoSectionStyle = {
        backgroundColor: selectedCourseId ? '#16423C' : '#E9EFEC', 
        width: '12rem',
        height: '100%',
    }

    return (
        <>
            <div className="top-menu-bar">
                <div className="logo-section" style={logoSectionStyle}>
                    <img src={logo} alt="TF logo" className="app-logo" />
                </div>
                
                {selectedCourseId && (
                    <div className="selected-course-section">
                        <p>Selected course:</p>
                        <div className='course-name'>
                            <p>{course?.name || ' '}</p>
                        </div>
                    </div>
                )}

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>

            {selectedCourseId && (

                <div className="sidebar-menu">                    
                    <nav className="sidebar-links">
                        <ul className="link-list">

                            <li onClick={() => navigate('/dashboard')} className="sidebar-link">
                                Frontpage
                            </li>

                            <li className="sidebar-link"
                                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                            >
                                Courses
                            </li>
                            {isCoursesOpen && (
                                <ul className="course-sublink-list">
                                    <li onClick={() => navigate('/courseSelection')} className="sidebar-course-sublink">
                                        Change course
                                    </li>
                                    <li onClick={() => navigate('/joinCourse')} className="sidebar-course-sublink">
                                        Join more courses
                                    </li>
                                </ul>
                            )}

                            <li className="sidebar-link"
                                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                            >
                                Projects
                            </li>
                            {isProjectsOpen && (
                                <ul className="sublink-list">
                                    <li onClick={() => navigate('/projectSearch')} className="sidebar-sublink">
                                        Search projects
                                    </li>
                                    <li onClick={() => navigate('/yourProject')} className="sidebar-sublink">
                                        Your project
                                    </li>
                                    <li onClick={() => navigate('/sentApplications')} className="sidebar-sublink">
                                        Applied projects
                                    </li>
                                    <li onClick={() => navigate(`/projectApplications/${project.id}`)} className="sidebar-sublink">
                                        Received Applications
                                    </li>
                                    <li onClick={() => navigate('/projecInvitations')} className="sidebar-sublink">
                                        Project Invitations
                                    </li>
                                    <li onClick={() => navigate('/sentInvitations')} className="sidebar-sublink">
                                        Received Invitations
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
