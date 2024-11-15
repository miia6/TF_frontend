import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'

import { getCurrentUserData } from '../services/auth' 
import { getCourse, getUserCourses, getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject, getUserProjectCookies, getProjectMemberStatusCookies } from '../services/project'
import { logout } from '../services/auth'

import '../styles/tfmenu.css'

const TFmenu = () => {
    const [courseLoader, setCourseLoader] = useState(true)
    const [linksLoader, setLinksLoader] = useState(true)

    const selectedCourseId = getSelectedCourseCookies()
    const [course, setCourse] = useState(null)

    const projectId = getUserProjectCookies() //const [projectId, setProjectId] = useState(null)
    const [isProjectOwner, setIsProjectOwner] = useState(false)

    const [isProjectsOpen, setIsProjectsOpen] = useState(false)
    const [isCoursesOpen, setIsCoursesOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourse = await getCourse(selectedCourseId)
                    setCourse(fetchedCourse)

                    const projectMemberStatus = getProjectMemberStatusCookies()
                    if (projectMemberStatus  === 'CREATOR') {
                        setIsProjectOwner(true)
                    }

                    /*const fetchedProject = await getUserCourseProject(fetchedCourse.id)
                    if (fetchedProject) {
                        setProject(fetchedProject)
                        console.log('Fetched project:', fetchedProject.name)
                        const currentUser = await getCurrentUserData()
                        if (fetchedProject.Creator.name === currentUser.name) {
                            setIsProjectOwner(true)
                            console.log('User is an owner of the project.')
                        }
                    } else {
                        console.log('User is not a member of a project')
                    }*/

                } catch (error) {
                    console.error("Error fetching data:", error)
                } finally {
                    setCourseLoader(false)
                    setLinksLoader(false)
                }
            } else {
                setCourse(null)
                setCourseLoader(false)
                setLinksLoader(false)
            }
        }

        fetchData()
    }, [selectedCourseId])

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
                        {courseLoader ? (
                            <div className="loader"></div>
                        ) : (
                            <div className='course-name'>
                                <p>{course?.name || ' '}</p>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>

            {selectedCourseId && (
                <div className="sidebar-menu">
                    {linksLoader ? (
                        <div className="sidebar-loader"></div>
                    ) : (
                        <nav className="sidebar-links">
                            <ul className="link-list">
                                <li onClick={() => navigate('/dashboard')} className="sidebar-link">
                                    Frontpage
                                </li>

                                <li className="sidebar-link" onClick={() => setIsCoursesOpen(!isCoursesOpen)}>
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

                                <li className="sidebar-link" onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
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
                                        {!isProjectOwner && (
                                            <>
                                                <li onClick={() => navigate('/sentApplications')} className="sidebar-sublink">
                                                    Applied projects
                                                </li>
                                                <li onClick={() => navigate('/receivedInvitations')} className="sidebar-sublink">
                                                    Received Invitations
                                                </li>
                                            </>
                                        )}
                                        {projectId && isProjectOwner && (
                                            <>
                                                <li onClick={() => navigate(`/projectApplications/${projectId}`)} className="sidebar-sublink">
                                                    Received Applications
                                                </li>
                                                <li onClick={() => navigate('/sentInvitations')} className="sidebar-sublink">
                                                    Sent Invitations
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                )}

                                {projectId && (
                                    <li onClick={() => navigate('/teammatesFinding')} className="sidebar-link">
                                        Teammates
                                    </li>
                                )}

                                {!projectId && (
                                    <li onClick={() => navigate('/projectProposal')} className="sidebar-link">
                                        Create project
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            )}
        </>
    )
}

export default TFmenu
