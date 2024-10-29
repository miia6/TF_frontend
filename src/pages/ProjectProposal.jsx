import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import { createProject } from '../services/project'

const ProjectProposal = () => {
    const navigate = useNavigate()
    const [project, setProject] = useState(null) // temporary

    const handleProjectCreation = async (project) => {
        if (project) {
            const courseId = localStorage.getItem('selectedCourse') // courseId
            const user = localStorage.getItem('user')
            console.log(`${user} creating project in course ${courseId}`)

            await createProject({
                teamName: project.teamName,
                name: project.title,
                description: project.description,
                courseId: courseId,
            })

            localStorage.setItem('createdProject', JSON.stringify(project))
            setProject(project) // temporary
            alert("Project has been created successfully!")
            //navigate('/yourProject')
        } else {
            alert("Error creating a project")
        }
    }

    return (
        <>
            < TFmenu />

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
