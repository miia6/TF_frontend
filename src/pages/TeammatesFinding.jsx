import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import '../styles/projectproposal.css'

const ProjectProposal = () => {
    const navigate = useNavigate()

    return (
        <div className="project-proposal-container">
            <h1>Find your teammates</h1>
            <h3>Description of the page</h3>

            <h3>Your project has 2 applications</h3>

            <button type="submit" className="submit-button">
                View applications
            </button>

            <div>

            </div>
        </div>
    )
}

export default ProjectProposal