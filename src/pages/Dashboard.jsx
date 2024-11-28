import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import TFmenu from '../components/TFmenu'

import { getSelectedCourseCookies } from '../services/course'
import { getUserProjectCookies, getProjectMemberStatusCookies, getProjects, getUserCourseProject } from '../services/project'
import { getSentApplications, getProjectApplicants } from '../services/application'
import { getSentInvitations, getReceivedInvitations } from '../services/invitation'

import '../styles/dashboard.css'

const Dashboard = () => {
    const selectedCourseId = getSelectedCourseCookies() 
    const [projectId, setProjectId] = useState(getUserProjectCookies()) 

    const projectStatus = getProjectMemberStatusCookies()
    const [projectMember, setProjectMember] = useState(false)

    const [receivedInvitations, setReceivedInvitations] = useState(0)
    const [receivedApplications, setReceivedApplications] = useState(0)
    const [pendingApplications, setPendingApplications] = useState(0)
    const [pendingInvitations, setPendingInvitations] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCourseId) {
                try {
                    const projects = await getProjects(selectedCourseId)
                    const userProject = await getUserCourseProject(selectedCourseId)
                    if (userProject) {
                        setProjectId(userProject.id)
                        setProjectMember(true)
                    }

                    if (projectStatus === 'CREATOR') {
                        setProjectMember(false)
                        const pendingInvsAmount = await pendingInvitationsAmount(projects)
                        setPendingInvitations(pendingInvsAmount)
                        const fetchedProject = await getUserCourseProject(selectedCourseId)
                        const receivedAppsAmount = await receivedApplicationsAmount(fetchedProject)
                        setReceivedApplications(receivedAppsAmount)
                    }

                    if (!projectId) {
                        const pendingAppsAmount = await pendingApplicationsAmount(projects)
                        setPendingApplications(pendingAppsAmount)
                        const receivedInvsAmount = await receivedInvitationsAmount()
                        setReceivedInvitations(receivedInvsAmount)
                    }

                } catch (error) {
                    console.error("Error fetching data " + error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchData()
    }, [selectedCourseId, projectId])


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

    const receivedApplicationsAmount = async (fetchedProject) => {
        const applications = await getProjectApplicants(fetchedProject.id)
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

    return (
        <>
            <TFmenu />

            <div className="notification-container">

                {isLoading ? (
                    <div className="dashboard-loader"></div>
                ) : (

                    <div className="notification-form">

                        {/* non-members */}
                        {!projectId && (
                            <>
                                <h3>You're not a member of a project yet</h3>
                        
                                {receivedInvitations > 0 && (
                                    <>
                                        <p>
                                            <span className="notification-dashboard-badge">
                                                <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                {receivedInvitations}
                                            </span>
                                            You have {receivedInvitations} new invitations
                                        </p>
                                        <div className="notification-link-container">
                                            <Link to="/receivedInvitations">View invitations</Link>
                                        </div>
                                    </>
                                )}

                                {pendingApplications > 0 && (
                                    <>
                                        <p>
                                            <span className="notification-dashboard-pending">
                                                <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                {pendingApplications}
                                            </span>
                                            You have {pendingApplications} pending applications
                                        </p>
                                        <div className="notification-link-container">
                                            <Link to="/sentApplications">View applications</Link>
                                        </div>
                                    </>
                                )}

                            </>
                        )}


                        {/* project owners */}
                        {projectId && projectStatus && projectStatus === 'CREATOR' &&(
                            <>
                                <h3>Personal status: project owner</h3>

                                {receivedApplications > 0 && (
                                    <>
                                        <p>
                                            <span className="notification-dashboard-badge">
                                                <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                {receivedApplications}
                                            </span>
                                            You have {receivedApplications} new applications
                                        </p>
                                        <div className="notification-link-container">
                                            <Link to={`/projectApplications/${projectId}`}>View applications</Link>
                                        </div>
                                    </>
                                )}

                                {pendingInvitations > 0 && (
                                    <>
                                        <p>
                                            <span className="notification-dashboard-pending">
                                                <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                                {pendingInvitations}
                                            </span>
                                            You have {pendingInvitations } pending invitations
                                        </p>
                                        <div className="notification-link-container">
                                            <Link to="/sentInvitations">View invitations</Link>
                                        </div>
                                    </>
                                )}

                            </>
                        )}

                        {/* project members */}
                        {projectId && projectMember && (
                            <h3>Personal status: project member</h3>
                        )}

                    </div>
                )}
            </div>

            <div className="dashboard-container">
                {projectId && projectStatus === 'CREATOR' && (
                    <>
                        <div className="dashboard-section">
                            <h3>Find teammates</h3>
                            <p>Search and invite teammates</p>
                            <div className="dashboard-link-container">
                                <a href="/teammatesFinding">Teammates</a>
                            </div>
                        </div>
                    </>
                )}

                {projectId && (
                    <>
                        <div className="dashboard-section">
                            <h3>Your project</h3>
                            <p>View your project</p>
                            <div className="dashboard-link-container">
                                <a href="/yourProject">Your project</a>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>View projects</h3>
                            <p>Search and view existing projects</p>
                            <div className="dashboard-link-container">
                                <a href="/projectSearch">Search projects</a>
                            </div>
                        </div>
                    </>
                )}

                {!projectId && (
                    <>
                        <div className="dashboard-section">
                            <h3>Create a new project</h3>
                            <p>Have an idea for a project? Create a new project, where you can invite students and students can apply to your project</p>
                            <div className="dashboard-link-container">
                                <a href="/projectProposal">Create Project</a>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>Search projects</h3>
                            <p>Don't want to create a new project? Search and apply to existing projects</p>
                            <div className="dashboard-link-container">
                                <a href="/projectSearch">Search projects</a>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Dashboard
