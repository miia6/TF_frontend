import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import '../styles/projectproposal.css'
import '../styles/userprojectcard.css'

const ProjectProposal = () => {
    const navigate = useNavigate()

    const [project, setProject] = useState(null) // temporary

    const handleProjectCreation = (project) => {
        if (project) {
            //localStorage.setItem('selectedCourse', course)
            alert("Project has been created successfully!")
            setProject(project) // temporary
            navigate('/yourProject')
        } else {
            console.log("No project created")
        }
    }

    return (
        <>
            < TFmenu />
            < CourseInfo />

            <div className="project-proposal-container">
                {project ? (
                    <UserProjectCard 
                        teamName={project.teamName} 
                        title={project.title} 
                        description={project.description} 
                        teammates={project.teammates} 
                    />
                ) : (
                    <ProjectProposalForm handleProjectCreation={handleProjectCreation} />
                )}
            </div>

        </>
    )
}

export default ProjectProposal