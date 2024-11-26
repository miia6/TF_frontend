import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/TF_app_logo.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import { getCurrentUserData } from '../services/auth' 
import { getCourse, getUserCourses, getSelectedCourseCookies } from '../services/course'
import { getProjects, getUserCourseProject, getUserProjectCookies, getProjectMemberStatusCookies } from '../services/project'
import { getProjectApplicants, getSentApplications } from '../services/application'
import { getReceivedInvitations, getSentInvitations } from '../services/invitation'

import { logout } from '../services/auth'

import '../styles/tfmenu.css'

const TFmenu = () => {
    const [courseLoader, setCourseLoader] = useState(true)
    const [linksLoader, setLinksLoader] = useState(true)

    const selectedCourseId = getSelectedCourseCookies()
    const [course, setCourse] = useState(null)

    const [projectId, setProjectId] = useState(getUserProjectCookies()) 
    const projectMemberStatus = getProjectMemberStatusCookies()

    const [receivedInvitations, setReceivedInvitations] = useState()
    const [receivedApplications, setReceivedApplications] = useState()
    const [pendingApplications, setPendingApplications] = useState(0)
    const [pendingInvitations, setPendingInvitations] = useState(0)

    const [isProjectsOpen, setIsProjectsOpen] = useState(false)
    const [isCoursesOpen, setIsCoursesOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourse = await getCourse(selectedCourseId)
                    setCourse(fetchedCourse)

                    const projects = await getProjects(selectedCourseId)
                    const userProject = await getUserCourseProject(selectedCourseId)
                    if (userProject) {
                        setProjectId(userProject.id)
                    }

                    if (projectMemberStatus  === 'CREATOR') {
                        const pendingInvsAmount = await pendingInvitationsAmount(projects)
                        setPendingInvitations(pendingInvsAmount)
                        const receivedAppsAmount = await receivedApplicationsAmount()
                        setReceivedApplications(receivedAppsAmount)
                    }

                    if (!projectId) {
                        const pendingAppsAmount = await pendingApplicationsAmount(projects)
                        setPendingApplications(pendingAppsAmount)
                        const receivedInvsAmount = await receivedInvitationsAmount()
                        setReceivedInvitations(receivedInvsAmount)
                    }

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

    const pendingApplicationsAmount = async (projects) => {
        const applications = await getSentApplications()
        const pendingApps = applications.filter(
            (a) =>
            a.status === "PENDING" &&
            projects.some((project) => project.id === a.projectId)
        )
        return pendingApps.length
    }

    const pendingInvitationsAmount = async (projects) => {
        const userProject = await getUserCourseProject(selectedCourseId)
        const invitations = await getSentInvitations(userProject.id)
        const pendingInvs = invitations.filter(
            (i) =>
                i.status === "PENDING" &&
                projects.some((project) => project.id === i.projectId)
        )
        return pendingInvs.length
    }

    const receivedApplicationsAmount = async () => {
        const applications = await getProjectApplicants(projectId)
        let applicationsAmount = 0
        if (applications.length > 0) {
            for (const application of applications) {
                if (application.status === 'PENDING') {
                    applicationsAmount += 1
                }
            }
            return applicationsAmount
        } else {
            return 0
        }
    }

    const receivedInvitationsAmount  = async () => {
        const invitations = await getReceivedInvitations()
        let invitationsAmount = 0
        if (invitations.length > 0) {
            for (const invitation of invitations) {
                if (invitation.status === 'PENDING' && invitation.Project.courseId === selectedCourseId) {
                    invitationsAmount += 1
                }
            }
            return invitationsAmount
        } else {
            return 0
        }
    }

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
                                        {(!projectMemberStatus || projectMemberStatus === 'MEMBER') && (
                                            <>
                                                <li onClick={() => navigate('/sentApplications')} className="sidebar-sublink">
                                                    Applied projects
                                                    {pendingApplications > 0 && (
                                                        <span className="notification-badge-pending">
                                                            <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                        {pendingApplications}
                                                        </span>
                                                    )}
                                                </li>
                                                <li onClick={() => navigate('/receivedInvitations')} className="sidebar-sublink">
                                                    Received Invitations
                                                    {receivedInvitations > 0 && (
                                                        <span className="notification-badge">
                                                            <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                        {receivedInvitations}
                                                        </span>
                                                    )}
                                                </li>
                                            </>
                                        )}
                                        {projectId && projectMemberStatus === 'CREATOR' && (
                                            <>
                                                <li onClick={() => navigate(`/projectApplications/${projectId}`)} className="sidebar-sublink">
                                                    Received Applications
                                                    {receivedApplications > 0 && (
                                                        <span className="notification-badge">
                                                            <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                        {receivedApplications}
                                                        </span>
                                                    )}
                                                </li>
                                                <li onClick={() => navigate('/sentInvitations')} className="sidebar-sublink">
                                                    Sent Invitations
                                                    {pendingInvitations > 0 && (
                                                        <span className="notification-badge-pending">
                                                            <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                        {pendingInvitations}
                                                        </span>
                                                    )}
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
