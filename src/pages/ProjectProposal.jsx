import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import '../styles/projectproposal.css'
import '../styles/projectproposal.css'

const ProjectProposal = () => {
    const navigate = useNavigate()

    return (
        <div className="project-proposal-container">
            <ProjectProposalForm />
        </div>
    )
}

export default ProjectProposal