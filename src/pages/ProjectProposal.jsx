import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import { getCurrentUserEmail } from '../services/auth'
import { createProject, getUserCourseProject } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'

const ProjectProposal = () => {
    const [project, setProject] = useState(null) 
    const [hasProject, setHasProject] = useState(false)
    
    const selectedCourse = getSelectedCourseCookies() 

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourse) {
                try {
                    const existingProject = await getUserCourseProject(selectedCourse)
                    setProject(existingProject)
                    setHasProject(!!existingProject)
                    console.log("Existing project: ", existingProject.name)
                } catch (error) {
                    console.error("Failed to check project existence:", error)
                }

            } 
        }

        fetchProjectData()
    }, [selectedCourse])

    const handleProjectCreation = async (project) => {
        if (project) {
            const courseId = getSelectedCourseCookies() // localStorage.getItem('selectedCourse')
            const userEmail = getCurrentUserEmail() // localStorage.getItem('user')
            console.log(`User ${userEmail} creating project in course ${courseId}`)

            await createProject({
                teamName: project.teamName,
                name: project.title,
                description: project.description,
                courseId: courseId,
            })

            setProject(project) 
            setHasProject(true)
            alert("Project has been created successfully!")
        } else {
            alert("Error creating a project")
        }
    }

    return (
        <>
            < TFmenu />

            <div className="project-proposal-container">
                {hasProject ? (
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
