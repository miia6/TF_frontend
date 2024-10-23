//import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'

import '../styles/dashboard.css'
import '../styles/projectfinding.css'

const ProjectFinding = () => {
    const navigate = useNavigate()

    return (
        <>
            < TFmenu />
            < CourseInfo />

            <div className="project-finding-buttons">
                <button onClick={() => navigate('/projectSearch')} className="project-finding-button">
                    Search projects
                </button>
                <button onClick={() => navigate('/yourProject')} className="project-finding-button">
                    Your project
                </button>
                <button onClick={() => navigate('/sentApplications')} className="project-finding-button">
                    Sent applications
                </button>
                <button onClick={() => navigate('/projectApplications')} className="project-finding-button">
                    Project applications
                </button>
                <button onClick={() => navigate('/projectInvitations')} className="project-finding-button">
                    Project Invitations
                </button>
                <button onClick={() => navigate('/sentInvitations')} className="project-finding-button">
                    Sent invitations
                </button>
            </div>
        </>
    )
}

export default ProjectFinding