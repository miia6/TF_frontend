import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import '../styles/projectproposal.css'
import '../styles/userprojectcard.css'
import { createProject } from '../services/project'

const ProjectProposal = () => {
    const navigate = useNavigate()

    const [project, setProject] = useState(null) // temporary

    const handleProjectCreation = async (project) => {
        if (project) {
            const courseId = localStorage.getItem('selectedCourse')


            await createProject({
                teamName: project.teamName,
                name: project.title,
                description: project.description,
                courseId: courseId,
            })
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
