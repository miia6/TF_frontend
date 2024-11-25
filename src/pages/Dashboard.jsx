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

    //console.log(invitationsAmount, applicationsAmount)

    return (
        <>
            <TFmenu />

            <div className="notification-container">
                <div className="notification-form">

                    {/* non-members */}
                    {!projectId && !invitationsAmount && (
                        <>
                            <h3>You're not a member of a project yet</h3>
                            <p>Create your own project or apply to existing projects</p>
                        </>
                    )}

                    {!projectId && invitationsAmount && parseInt(invitationsAmount, 10) === 0 && (
                        <>
                            <h3>You're not a member of a project yet</h3>
                            <p>Create your own project or apply to existing projects</p>
                        </>
                    )}

                    {!projectId && invitationsAmount && parseInt(invitationsAmount, 10) > 0 && (
                        <>
                            <h3>You're not a member of a project yet</h3>
                            <p>Create your own project or apply to existing projects</p>
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


                    {/* project owners */}
                    {projectId && !invitationsAmount && parseInt(applicationsAmount, 10) === 0 && (
                        <>
                            <h3>Personal status: project owner</h3>
                            <p>No new applications</p>
                        </>
                    )}

                    {projectId && !invitationsAmount && applicationsAmount && parseInt(applicationsAmount, 10) > 0 && (
                        <>
                            <h3>Personal status: project owner</h3>
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

                    {/* project members */}
                    {projectId && !invitationsAmount && !applicationsAmount && (
                        <h3>Personal status: project member</h3>
                    )}

                </div>
            </div>

            <div className="dashboard-container">
                {projectId && projectStatus === 'CREATOR' && (
                    <>
                        <h3>Find teammates</h3>
                        <p>Search and invite teammates</p>
                        <div className="dashboard-link-container">
                            <a href="/teammatesFinding">Find teammates</a>
                        </div>
                    </>
                )}

                {projectId && (
                    <>
                        <h3>Your project </h3>
                        <p>View your project</p>
                        <div className="dashboard-link-container">
                            <a href="/yourProject">Your project</a>
                        </div>

                        <h3>View projects</h3>
                        <p>Search and view existing projects</p>
                        <div className="dashboard-link-container">
                            <a href="/projectSearch">View projects</a>
                        </div>
                    </>
                )}

                {!projectId && (
                    <>
                        <h3>Create a new project</h3>
                        <p>Have an idea for project? Create a new project, where you can invite students and students can apply to your project:</p>
                        <div className="dashboard-link-container">
                            <a href="/projectProposal">Create Project</a>
                        </div>

                        <h3>Search projects</h3>
                        <p>Search and apply existing projects</p>
                        <div className="dashboard-link-container">
                            <a href="/projectSearch">Search projects</a>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Dashboard
