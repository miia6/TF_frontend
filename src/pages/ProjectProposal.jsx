import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import { createProject, getUserCourseProject } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'

const ProjectProposal = () => {
    const [hasProject, setHasProject] = useState(false)
    const selectedCourseId = getSelectedCourseCookies() 

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const existingProject = await getUserCourseProject(selectedCourseId)
                    setHasProject(!!existingProject)
                } catch (error) {
                    console.error("Failed to check project existence:", error)
                }
            } 
        }

        fetchProjectData()
    }, [selectedCourseId])

    const handleProjectCreation = async (project) => {
        if (project) {
            console.log(`Creating project in course ${selectedCourseId}`)

            const createdProject = await createProject({
                name: project.title,
                description: project.description,
                //tags: project.tags,
                teamName: project.teamName,
                teammates: project.teammates,
                courseId: selectedCourseId,
            })

            console.log("Created project response: " + createdProject)
            setHasProject(true)
    
            alert("Project has been created successfully!")
            navigate("/yourProject")
        } else {
            alert("Error creating a project")
        }
    }

    return (
        <>
            < TFmenu />

            <div className="project-proposal-container">
                {hasProject ? (
                    <div className="has-project">
                        <h3>You're already a member of a project</h3>
                        <a href="/yourProject">View your project</a>
                    </div>
                ) : (
                    <ProjectProposalForm handleProjectCreation={handleProjectCreation} />
                )}
            </div>

        </>
    )
}

export default ProjectProposal
