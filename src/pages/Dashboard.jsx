import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import TFmenu from '../components/TFmenu'

import { getSelectedCourseCookies } from '../services/course'
import { getUserProjectCookies, getProjectMemberStatusCookies } from '../services/project'
import { getApplicationsAmountCookies } from '../services/application'
import { getInvitationsAmountCookies } from '../services/invitation'

import '../styles/dashboard.css'

const Dashboard = () => {
    const projectId = getUserProjectCookies() 
    const projectStatus = getProjectMemberStatusCookies()
    const selectedCourseId = getSelectedCourseCookies() 
    const invitationsAmount = getInvitationsAmountCookies()
    const applicationsAmount = getApplicationsAmountCookies()

    console.log(invitationsAmount, applicationsAmount)

    return (
        <>
            <TFmenu />

            <div className="notification-container">
                <div className="notification-form">
                    {invitationsAmount && parseInt(invitationsAmount, 10) > 0 && (
                        <>
                            <h3>New invitations</h3>
                            <p>
                                <span className="notification-dashboard-badge">
                                    <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                    {invitationsAmount}
                                </span>
                                You have {invitationsAmount} new invitations
                            </p>
                            <div className="notification-link-container">
                                <a href="/receivedInvitations">View invitations</a>
                            </div>
                        </>
                    )}

                    {invitationsAmount && parseInt(invitationsAmount, 10) === 0 && (
                        <h3>No new invitations</h3>
                    )}
                    
                    {projectId && applicationsAmount && parseInt(applicationsAmount, 10) > 0 && (
                        <>
                            <h3>New applications</h3>
                            <p>
                                <span className="notification-dashboard-badge">
                                    <FontAwesomeIcon icon={faBell} style={{ marginRight: '0.3rem' }} />
                                    {applicationsAmount}
                                </span>
                                You have {applicationsAmount} new applications.
                            </p>
                            <div className="notification-link-container">
                                <Link to={`/projectApplications/${projectId}`}>View applications</Link>
                            </div>
                        </>
                    )}

                    {projectId && applicationsAmount && parseInt(applicationsAmount, 10) === 0 && (
                        <h3>No new applications</h3>
                    )}     

                    {!invitationsAmount && !applicationsAmount && projectId && (
                        <h3>You're a member of a project</h3>
                    )}

                    {!invitationsAmount && !applicationsAmount && !projectId && (
                        <h3>You're not a member of a project</h3>
                    )}

                </div>
            </div>

            <div className="dashboard-container">
                {projectId && projectStatus === 'CREATOR' && (
                    <>
                        <h2>Teammates Finding </h2>
                        <p>Search teammates</p>
                        <div className="dashboard-link-container">
                            <a href="/teammatesFinding">Teammates Finding</a>
                        </div>
                    </>
                )}

                {projectId && (
                    <>
                        <h2>Your project </h2>
                        <p>View your project</p>
                        <div className="dashboard-link-container">
                            <a href="/yourProject">Your project</a>
                        </div>
                    </>
                )}

                {!projectId && (
                    <>
                        <h2>Create a new project</h2>
                        <p>Have an idea for project? Create a new project, where you can invite students and students can apply to your project:</p>
                        <div className="dashboard-link-container">
                            <a href="/projectProposal">Create Project</a>
                        </div>
                    </>
                )}

                <h2>Search projects</h2>
                <p>Search existing projects</p>
                <div className="dashboard-link-container">
                    <a href="/projectSearch">Search projects</a>
                </div>

            </div>
        </>
    )
}

export default Dashboard
